// Empire FGA — edge access control (Cloudflare Pages Functions)
//
// Blocks every request EXCEPT the public marketing homepage and a short
// allowlist of static assets, behind HTTP Basic Auth. Enforced server-side —
// cannot be bypassed by disabling JavaScript, unlike a client-side redirect.
//
// Setup (Cloudflare Pages dashboard, once the repo is connected):
//   Settings -> Environment variables -> add:
//     BASIC_AUTH_USER = jim.totime
//     BASIC_AUTH_PASS = <a real password, set only in the dashboard, not here>
//
// Never hardcode credentials in this file — they're read from env vars below
// so they never live in the git repo or build output.

const PUBLIC_PATHS = new Set([
  '/',
  '/index.html',
  '/robots.txt',
  '/sitemap.xml',
  '/favicon.ico',
  '/favicon-16x16.png',
  '/favicon-32x32.png',
  '/favicon-64x64.png',
  '/favicon-256x256.png',
]);

// Extensions that index.html needs to render itself (fonts/css/images/js
// referenced directly by the public homepage). Everything else — every
// player profile page, platform.html, login.html, etc. — requires auth.
const PUBLIC_EXTENSIONS = new Set(['.css', '.js', '.woff', '.woff2', '.svg', '.ico']);

function isPublic(pathname) {
  if (PUBLIC_PATHS.has(pathname)) return true;
  const dot = pathname.lastIndexOf('.');
  if (dot !== -1 && PUBLIC_EXTENSIONS.has(pathname.slice(dot))) return true;
  return false;
}

function unauthorized() {
  return new Response('Authentication required.', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="Empire FGA", charset="UTF-8"' },
  });
}

export async function onRequest(context) {
  const { request, next, env } = context;
  const url = new URL(request.url);

  if (isPublic(url.pathname)) {
    return next();
  }

  const expectedUser = env.BASIC_AUTH_USER;
  const expectedPass = env.BASIC_AUTH_PASS;

  if (!expectedUser || !expectedPass) {
    // Env vars not configured yet in the Cloudflare dashboard — fail closed
    // (block access) rather than silently letting everyone through.
    return new Response('Access control not configured.', { status: 503 });
  }

  const authHeader = request.headers.get('Authorization') || '';
  if (!authHeader.startsWith('Basic ')) {
    return unauthorized();
  }

  let decoded = '';
  try {
    decoded = atob(authHeader.slice(6));
  } catch (e) {
    return unauthorized();
  }

  const sepIndex = decoded.indexOf(':');
  const user = sepIndex === -1 ? decoded : decoded.slice(0, sepIndex);
  const pass = sepIndex === -1 ? '' : decoded.slice(sepIndex + 1);

  if (user !== expectedUser || pass !== expectedPass) {
    return unauthorized();
  }

  return next();
}
