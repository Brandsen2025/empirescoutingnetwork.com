# -*- coding: utf-8 -*-
import json, re

with open('creds.json', encoding='utf-8') as f:
    creds = json.load(f)

CSS_BLOCK = '#app.esn-hidden{display:none!important}\n#loginGate a:hover{color:var(--t1)!important}\n\n'

def esn_users_js(user_defs):
    # user_defs: list of (username, name, role, initials)
    obj = {}
    for uname, name, role, initials in user_defs:
        obj[uname] = {"hash": creds[uname]['hash'], "name": name, "role": role, "initials": initials}
    return json.dumps(obj, ensure_ascii=False)

def gate_html(users_js, labels):
    title, subtitle, lbl_user, lbl_pass, btn, msg_unknown, msg_wrong, logout_lbl = labels
    return f'''<div id="loginGate" style="position:fixed;inset:0;z-index:9999;background:var(--bg);display:flex;align-items:center;justify-content:center;font-family:var(--B)">
  <form id="loginForm" style="width:320px;max-width:90vw;background:var(--bg2);border:1px solid var(--ln2);border-radius:8px;padding:28px 26px;box-shadow:0 12px 40px rgba(0,0,0,.5)">
    <div style="font-family:var(--D);font-size:1.1rem;font-weight:700;color:var(--t1);letter-spacing:.5px;margin-bottom:2px">EMPIRE FGA</div>
    <div style="font-family:var(--M);font-size:.62rem;color:var(--t3);letter-spacing:1.5px;text-transform:uppercase;margin-bottom:20px">{subtitle}</div>
    <label style="display:block;font-family:var(--D);font-size:.62rem;letter-spacing:1px;text-transform:uppercase;color:var(--t2);margin-bottom:5px">{lbl_user}</label>
    <input id="lg-user" type="text" autocomplete="username" style="width:100%;background:var(--bg3);border:1px solid var(--ln);border-radius:4px;color:var(--t1);padding:9px 10px;font-size:.85rem;margin-bottom:14px" required>
    <label style="display:block;font-family:var(--D);font-size:.62rem;letter-spacing:1px;text-transform:uppercase;color:var(--t2);margin-bottom:5px">{lbl_pass}</label>
    <input id="lg-pass" type="password" autocomplete="current-password" style="width:100%;background:var(--bg3);border:1px solid var(--ln);border-radius:4px;color:var(--t1);padding:9px 10px;font-size:.85rem;margin-bottom:6px" required>
    <div id="lg-err" style="display:none;color:var(--red);font-size:.68rem;margin-bottom:10px"></div>
    <button type="submit" style="width:100%;margin-top:10px;background:var(--gold);color:#0D1520;border:none;border-radius:4px;padding:10px;font-family:var(--D);font-weight:700;font-size:.78rem;letter-spacing:1px;text-transform:uppercase;cursor:pointer">{btn}</button>
  </form>
</div>
<script>
(function(){{
  var ESN_USERS = {users_js};
  var STORAGE_KEY = "esn_auth_v1";
  var MSG_UNKNOWN = "{msg_unknown}";
  var MSG_WRONG = "{msg_wrong}";
  function hashHex(str){{
    var enc = new TextEncoder().encode(str);
    return crypto.subtle.digest("SHA-256", enc).then(function(buf){{
      return Array.prototype.map.call(new Uint8Array(buf), function(b){{return b.toString(16).padStart(2,"0");}}).join("");
    }});
  }}
  function showApp(u){{
    document.getElementById("loginGate").style.display = "none";
    document.getElementById("app").classList.remove("esn-hidden");
    var n = document.getElementById("nu-name-slot"); if(n) n.textContent = u.name;
    var r = document.getElementById("nu-role-slot"); if(r) r.textContent = u.role;
    var a = document.getElementById("nu-avatar-slot"); if(a) a.textContent = u.initials;
  }}
  function tryStoredAuth(){{
    try{{
      var raw = localStorage.getItem(STORAGE_KEY);
      if(!raw) return false;
      var data = JSON.parse(raw);
      var u = ESN_USERS[data.u];
      if(u && data.h === u.hash){{ showApp(u); return true; }}
    }}catch(e){{}}
    return false;
  }}
  function doLogin(e){{
    e.preventDefault();
    var uEl = document.getElementById("lg-user");
    var pEl = document.getElementById("lg-pass");
    var errEl = document.getElementById("lg-err");
    var uname = uEl.value.trim().toLowerCase();
    var pass = pEl.value;
    var u = ESN_USERS[uname];
    if(!u){{ errEl.textContent = MSG_UNKNOWN; errEl.style.display = "block"; return; }}
    hashHex(pass).then(function(h){{
      if(h === u.hash){{
        localStorage.setItem(STORAGE_KEY, JSON.stringify({{u:uname, h:h}}));
        errEl.style.display = "none";
        showApp(u);
      }} else {{
        errEl.textContent = MSG_WRONG;
        errEl.style.display = "block";
        pEl.value = "";
      }}
    }});
  }}
  window.esnLogout = function(){{ localStorage.removeItem(STORAGE_KEY); location.reload(); }};
  document.addEventListener("DOMContentLoaded", function(){{
    var form = document.getElementById("loginForm");
    if(form) form.addEventListener("submit", doLogin);
    tryStoredAuth();
  }});
}})();
</script>
'''

CONFIGS = {
    'platform.html': {
        'users': [('laura', 'Laura Campailla Totime', 'Global Business Manager', 'LCT'),
                   ('jim', 'Jim Totime', 'Brandsen Sports CEO', 'JT')],
        'labels': ('EMPIRE FGA', 'Scouting Intelligence · Sign in', 'Username', 'Password',
                   'Sign In', 'Unknown user.', 'Incorrect password.', 'Log out'),
        'default_name': 'Jim Totime', 'default_role': 'Brandsen Sports CEO', 'default_initials': 'JT',
        'logout_title': 'Log out', 'logout_text': 'Log out',
    },
    'platform_es.html': {
        'users': [('daniel', 'Daniel Dominguez', 'ARG Sales Manager', 'DD'),
                   ('jordi', 'Jordi Tarrago', 'Ventas', 'JTa'),
                   ('jim', 'Jim Totime', 'Brandsen Sports CEO', 'JT')],
        'labels': ('EMPIRE FGA', 'Scouting Intelligence · Iniciar sesión', 'Usuario', 'Contraseña',
                   'Iniciar sesión', 'Usuario desconocido.', 'Contraseña incorrecta.', 'Cerrar sesión'),
        'default_name': 'Daniel Dominguez', 'default_role': 'ARG Sales Manager', 'default_initials': 'DD',
        'logout_title': 'Cerrar sesión', 'logout_text': 'Cerrar sesión',
    },
}

for fname, cfg in CONFIGS.items():
    with open(fname, encoding='utf-8') as f:
        content = f.read()

    for marker in ('loginGate', 'ESN_USERS', 'esn_auth_v1'):
        assert marker not in content, f'{fname}: {marker} unexpectedly already present'

    users_js = esn_users_js(cfg['users'])
    html_block = gate_html(users_js, cfg['labels'])

    assert content.count(CSS_BLOCK) == 0
    style_marker = '\n</style>\n'
    assert content.count(style_marker) == 1, f'{fname}: </style> marker not found once'
    content = content.replace(style_marker, '\n' + CSS_BLOCK + '</style>\n', 1)

    app_marker = '<div id="app">'
    assert content.count(app_marker) == 1, f'{fname}: <div id="app"> not found once'
    content = content.replace(app_marker, html_block + '<div id="app" class="esn-hidden">', 1)

    # rebuild nav-user block into dynamic version
    nav_re = re.compile(
        r'    <div><div class="nu-name">(.*?)</div><div class="nu-role">(.*?)</div></div>\n'
        r'    <div class="avatar">(.*?)</div>\n'
    )
    nav_matches = nav_re.findall(content)
    assert len(nav_matches) == 1, f'{fname}: static nav block matched {len(nav_matches)} times'
    dyn_block = (
        f'    <div><div class="nu-name" id="nu-name-slot">{cfg["default_name"]}</div>'
        f'<div class="nu-role" id="nu-role-slot">{cfg["default_role"]}</div></div>\n'
        f'    <div class="avatar" id="nu-avatar-slot">{cfg["default_initials"]}</div>\n'
        f'    <a href="#" onclick="esnLogout();return false;" style="color:var(--t3);font-family:var(--M);'
        f'font-size:.6rem;letter-spacing:1px;text-transform:uppercase;text-decoration:none;margin-left:10px" '
        f'title="{cfg["logout_title"]}">{cfg["logout_text"]}</a>\n'
    )
    content = nav_re.sub(dyn_block, content, count=1)

    with open(fname, 'w', encoding='utf-8') as f:
        f.write(content)

    print(f'{fname}: login gate (re)installed OK ({len(cfg["users"])} users) -> {[u[0] for u in cfg["users"]]}')

print('DONE')
