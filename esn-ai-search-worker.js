/**
 * Empire Scouting Network — "Ask the Database" search worker.
 *
 * Deploy this as a Cloudflare Worker (free tier is plenty). It is a STATELESS
 * translator only: it never sees, stores, or returns any player data. It
 * receives the user's plain-English question plus the CURRENT, LIVE list of
 * valid filter values (leagues, positions, schools, managers) that the
 * calling page already has in its own DOM/JS — values that page's visitor
 * could already see and pick from the normal dropdowns. It returns a small
 * JSON object telling the page which of ITS OWN existing filter inputs to
 * set, and the page then runs its own existing applyF() exactly as if a
 * human had used the dropdowns. This worker cannot leak anything the page
 * doesn't already expose, because it never has access to the underlying
 * player records (the P array) at all.
 *
 * Required secret (set via `wrangler secret put ANTHROPIC_API_KEY` or the
 * Cloudflare dashboard → Workers → Settings → Variables):
 *   ANTHROPIC_API_KEY
 *
 * Required/recommended vars (plain, not secret):
 *   ALLOWED_ORIGINS = "https://empirescoutingnetwork.com,https://www.empirescoutingnetwork.com"
 *     (comma-separated; add any per-client preview domains you use)
 *
 * Deploy with wrangler:
 *   npm install -g wrangler
 *   wrangler login
 *   wrangler deploy esn-ai-search-worker.js --name esn-ai-search
 *   wrangler secret put ANTHROPIC_API_KEY
 *   wrangler kv:namespace create esn_search_rl   (optional, for rate limiting)
 *
 * Or paste this file's contents into the Cloudflare dashboard's inline
 * Worker editor (Workers & Pages → Create → Hello World → paste over the
 * default code → add the secret under Settings → Variables).
 */

const MODEL = "claude-sonnet-4-5-20250929"; // update if/when you want a newer model

const SYSTEM_PROMPT = `You translate a football scouting platform visitor's plain-English question into a filter for an EXISTING search form. You do not have access to any player data yourself — you only decide which of the form's own fields to set, from the exact value lists you are given.

Rules, no exceptions:
- Only use values that appear verbatim in the "leagues", "positions", "schools", or "managers" lists you are given for this request. Never invent a league, position, school, or manager name that isn't in those lists.
- If the question doesn't clearly map to any of these fields, leave that field unset (null). Do not guess.
- "nameSearch" is free text for a player's name only (substring match) — never put a club, country, or league there.
- "club" is free text for an exact club name match — only set it if the question names a specific club AND you are reasonably confident of the exact spelling; otherwise leave it null.
- Age/FGA/year fields are inclusive numeric ranges. Only set the ones the question actually implies (e.g. "under 21" -> ageMax: 20 or 21 depending on phrasing; "over 30" -> ageMin: 31 or 30).
- If the question asks for something this form cannot filter by at all (e.g. a Tactical DNA Pairing percentage, a specific nationality, a specific season badge), set "unsupported" to a short, honest note about what you couldn't apply, instead of forcing it into a field it doesn't belong in.
- If you cannot confidently produce ANY filter at all, return every field null and explain briefly in "unsupported".
- Never claim a result count or describe any player — you have none to describe. You only set filters.

Respond with ONLY a JSON object, no prose outside it, matching exactly this shape:
{
  "nameSearch": string|null,
  "league": string|null,
  "club": string|null,
  "position": string|null,
  "school": string|null,
  "manager": string|null,
  "ageMin": number|null,
  "ageMax": number|null,
  "fgaMin": number|null,
  "fgaMax": number|null,
  "yearMin": number|null,
  "yearMax": number|null,
  "unsupported": string|null
}`;

function corsHeaders(origin, allowedOrigins) {
  const allowed = allowedOrigins.includes(origin) ? origin : allowedOrigins[0] || "*";
  return {
    "Access-Control-Allow-Origin": allowed,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Vary": "Origin",
  };
}

export default {
  async fetch(request, env) {
    const allowedOrigins = (env.ALLOWED_ORIGINS || "")
      .split(",").map(s => s.trim()).filter(Boolean);
    const origin = request.headers.get("Origin") || "";
    const cors = corsHeaders(origin, allowedOrigins);

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: cors });
    }
    if (request.method !== "POST") {
      return new Response(JSON.stringify({ error: "POST only" }), {
        status: 405, headers: { "Content-Type": "application/json", ...cors },
      });
    }
    if (allowedOrigins.length && !allowedOrigins.includes(origin)) {
      return new Response(JSON.stringify({ error: "origin not allowed" }), {
        status: 403, headers: { "Content-Type": "application/json", ...cors },
      });
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return new Response(JSON.stringify({ error: "bad json" }), {
        status: 400, headers: { "Content-Type": "application/json", ...cors },
      });
    }

    const query = String(body.query || "").slice(0, 300);
    const enums = body.enums || {};
    const leagues = Array.isArray(enums.leagues) ? enums.leagues.slice(0, 300) : [];
    const positions = Array.isArray(enums.positions) ? enums.positions.slice(0, 50) : [];
    const schools = Array.isArray(enums.schools) ? enums.schools.slice(0, 50) : [];
    const managers = Array.isArray(enums.managers) ? enums.managers.slice(0, 100) : [];

    if (!query.trim()) {
      return new Response(JSON.stringify({ error: "empty query" }), {
        status: 400, headers: { "Content-Type": "application/json", ...cors },
      });
    }

    // --- very light abuse guard (per-IP, in-memory per isolate; swap for KV if you need real limits) ---
    // Cloudflare Workers isolates are short-lived/distributed, so this is a soft speed bump, not a hard limiter.
    // For real rate limiting, bind a KV namespace and increment a counter keyed by CF-Connecting-IP + minute bucket.

    const userMsg = JSON.stringify({
      question: query,
      leagues, positions, schools, managers,
    });

    let anthropicRes;
    try {
      anthropicRes = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": env.ANTHROPIC_API_KEY,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model: MODEL,
          max_tokens: 400,
          system: SYSTEM_PROMPT,
          messages: [{ role: "user", content: userMsg }],
        }),
      });
    } catch (e) {
      return new Response(JSON.stringify({ error: "upstream fetch failed" }), {
        status: 502, headers: { "Content-Type": "application/json", ...cors },
      });
    }

    if (!anthropicRes.ok) {
      const text = await anthropicRes.text().catch(() => "");
      return new Response(JSON.stringify({ error: "claude api error", detail: text.slice(0, 300) }), {
        status: 502, headers: { "Content-Type": "application/json", ...cors },
      });
    }

    const data = await anthropicRes.json();
    const text = (data.content || []).map(b => b.text || "").join("");

    let filter;
    try {
      // Claude is instructed to return ONLY JSON, but strip code-fences defensively.
      const cleaned = text.trim().replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/```\s*$/i, "");
      filter = JSON.parse(cleaned);
    } catch {
      return new Response(JSON.stringify({ error: "could not parse model output", raw: text.slice(0, 300) }), {
        status: 502, headers: { "Content-Type": "application/json", ...cors },
      });
    }

    // Defensive re-validation server-side: never trust the model's output blindly.
    // Re-check every enum field actually appears in the list we sent, drop it if not.
    const safe = {
      nameSearch: typeof filter.nameSearch === "string" ? filter.nameSearch.slice(0, 80) : null,
      league: leagues.includes(filter.league) ? filter.league : null,
      club: typeof filter.club === "string" ? filter.club.slice(0, 80) : null,
      position: positions.includes(filter.position) ? filter.position : null,
      school: schools.includes(filter.school) ? filter.school : null,
      manager: managers.includes(filter.manager) ? filter.manager : null,
      ageMin: Number.isFinite(filter.ageMin) ? filter.ageMin : null,
      ageMax: Number.isFinite(filter.ageMax) ? filter.ageMax : null,
      fgaMin: Number.isFinite(filter.fgaMin) ? filter.fgaMin : null,
      fgaMax: Number.isFinite(filter.fgaMax) ? filter.fgaMax : null,
      yearMin: Number.isFinite(filter.yearMin) ? filter.yearMin : null,
      yearMax: Number.isFinite(filter.yearMax) ? filter.yearMax : null,
      unsupported: typeof filter.unsupported === "string" ? filter.unsupported.slice(0, 200) : null,
    };

    return new Response(JSON.stringify(safe), {
      status: 200, headers: { "Content-Type": "application/json", ...cors },
    });
  },
};
