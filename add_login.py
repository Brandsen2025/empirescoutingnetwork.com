# -*- coding: utf-8 -*-
import re, json

HASHES = {
    "laura": "25f289452419c3245e1b0e376aec58e9c364b8882e0f39e755dca52b53a1479f",
    "daniel": "afc61c5e180556c52c6f2dff27fe01e12190aabe11cbbaaef639772bba7cd122",
    "jordi": "e680c3c628134991a25ca6e5f0d076ff9aa85f63f9bc52d6fe68ad9df30219f9",
    "jim": "489312486e39f94bc07a435c00d835f83c34222c10c051a606b1f5242294e12c",
}

CSS_RULE = "\n#app.esn-hidden{display:none!important}\n#loginGate a:hover{color:var(--t1)!important}\n"

def gate_html(users_js, labels):
    return (
        '<div id="loginGate" style="position:fixed;inset:0;z-index:9999;background:var(--bg);'
        'display:flex;align-items:center;justify-content:center;font-family:var(--B)">\n'
        '  <form id="loginForm" style="width:320px;max-width:90vw;background:var(--bg2);'
        'border:1px solid var(--ln2);border-radius:8px;padding:28px 26px;box-shadow:0 12px 40px rgba(0,0,0,.5)">\n'
        '    <div style="font-family:var(--D);font-size:1.1rem;font-weight:700;color:var(--t1);'
        'letter-spacing:.5px;margin-bottom:2px">EMPIRE FGA</div>\n'
        '    <div style="font-family:var(--M);font-size:.62rem;color:var(--t3);letter-spacing:1.5px;'
        'text-transform:uppercase;margin-bottom:20px">' + labels['tagline'] + '</div>\n'
        '    <label style="display:block;font-family:var(--D);font-size:.62rem;letter-spacing:1px;'
        'text-transform:uppercase;color:var(--t2);margin-bottom:5px">' + labels['user'] + '</label>\n'
        '    <input id="lg-user" type="text" autocomplete="username" style="width:100%;background:var(--bg3);'
        'border:1px solid var(--ln);border-radius:4px;color:var(--t1);padding:9px 10px;font-size:.85rem;'
        'margin-bottom:14px" required>\n'
        '    <label style="display:block;font-family:var(--D);font-size:.62rem;letter-spacing:1px;'
        'text-transform:uppercase;color:var(--t2);margin-bottom:5px">' + labels['pass'] + '</label>\n'
        '    <input id="lg-pass" type="password" autocomplete="current-password" style="width:100%;'
        'background:var(--bg3);border:1px solid var(--ln);border-radius:4px;color:var(--t1);padding:9px 10px;'
        'font-size:.85rem;margin-bottom:6px" required>\n'
        '    <div id="lg-err" style="display:none;color:var(--red);font-size:.68rem;margin-bottom:10px"></div>\n'
        '    <button type="submit" style="width:100%;margin-top:10px;background:var(--gold);color:#0D1520;'
        'border:none;border-radius:4px;padding:10px;font-family:var(--D);font-weight:700;font-size:.78rem;'
        'letter-spacing:1px;text-transform:uppercase;cursor:pointer">' + labels['submit'] + '</button>\n'
        '  </form>\n'
        '</div>\n'
        '<script>\n'
        '(function(){\n'
        '  var ESN_USERS = ' + users_js + ';\n'
        '  var STORAGE_KEY = "esn_auth_v1";\n'
        '  var MSG_UNKNOWN = ' + json.dumps(labels['err_unknown']) + ';\n'
        '  var MSG_WRONG = ' + json.dumps(labels['err_wrong']) + ';\n'
        '  function hashHex(str){\n'
        '    var enc = new TextEncoder().encode(str);\n'
        '    return crypto.subtle.digest("SHA-256", enc).then(function(buf){\n'
        '      return Array.prototype.map.call(new Uint8Array(buf), function(b){return b.toString(16).padStart(2,"0");}).join("");\n'
        '    });\n'
        '  }\n'
        '  function showApp(u){\n'
        '    document.getElementById("loginGate").style.display = "none";\n'
        '    document.getElementById("app").classList.remove("esn-hidden");\n'
        '    var n = document.getElementById("nu-name-slot"); if(n) n.textContent = u.name;\n'
        '    var r = document.getElementById("nu-role-slot"); if(r) r.textContent = u.role;\n'
        '    var a = document.getElementById("nu-avatar-slot"); if(a) a.textContent = u.initials;\n'
        '  }\n'
        '  function tryStoredAuth(){\n'
        '    try{\n'
        '      var raw = localStorage.getItem(STORAGE_KEY);\n'
        '      if(!raw) return false;\n'
        '      var data = JSON.parse(raw);\n'
        '      var u = ESN_USERS[data.u];\n'
        '      if(u && data.h === u.hash){ showApp(u); return true; }\n'
        '    }catch(e){}\n'
        '    return false;\n'
        '  }\n'
        '  function doLogin(e){\n'
        '    e.preventDefault();\n'
        '    var uEl = document.getElementById("lg-user");\n'
        '    var pEl = document.getElementById("lg-pass");\n'
        '    var errEl = document.getElementById("lg-err");\n'
        '    var uname = uEl.value.trim().toLowerCase();\n'
        '    var pass = pEl.value;\n'
        '    var u = ESN_USERS[uname];\n'
        '    if(!u){ errEl.textContent = MSG_UNKNOWN; errEl.style.display = "block"; return; }\n'
        '    hashHex(pass).then(function(h){\n'
        '      if(h === u.hash){\n'
        '        localStorage.setItem(STORAGE_KEY, JSON.stringify({u:uname, h:h}));\n'
        '        errEl.style.display = "none";\n'
        '        showApp(u);\n'
        '      } else {\n'
        '        errEl.textContent = MSG_WRONG;\n'
        '        errEl.style.display = "block";\n'
        '        pEl.value = "";\n'
        '      }\n'
        '    });\n'
        '  }\n'
        '  window.esnLogout = function(){ localStorage.removeItem(STORAGE_KEY); location.reload(); };\n'
        '  document.addEventListener("DOMContentLoaded", function(){\n'
        '    var form = document.getElementById("loginForm");\n'
        '    if(form) form.addEventListener("submit", doLogin);\n'
        '    tryStoredAuth();\n'
        '  });\n'
        '})();\n'
        '</script>\n'
    )

CONFIGS = {
    'platform.html': {
        'users': {
            "laura": {"hash": HASHES["laura"], "name": "Laura Campailla", "role": "Sales", "initials": "LC"},
            "jim": {"hash": HASHES["jim"], "name": "Jim Totime", "role": "Brandsen Sports CEO", "initials": "JT"},
        },
        'labels': {
            'tagline': 'Scouting Intelligence · Sign in',
            'user': 'Username', 'pass': 'Password', 'submit': 'Sign In',
            'err_unknown': 'Unknown user.', 'err_wrong': 'Incorrect password.',
            'logout': 'Log out',
        },
    },
    'platform_es.html': {
        'users': {
            "daniel": {"hash": HASHES["daniel"], "name": "Daniel Dominguez", "role": "Ventas", "initials": "DD"},
            "jordi": {"hash": HASHES["jordi"], "name": "Jordi Tarrago", "role": "Ventas", "initials": "JTa"},
            "jim": {"hash": HASHES["jim"], "name": "Jim Totime", "role": "Brandsen Sports CEO", "initials": "JT"},
        },
        'labels': {
            'tagline': 'Inteligencia de Scouting · Iniciar sesión',
            'user': 'Usuario', 'pass': 'Contraseña', 'submit': 'Iniciar sesión',
            'err_unknown': 'Usuario desconocido.', 'err_wrong': 'Contraseña incorrecta.',
            'logout': 'Cerrar sesión',
        },
    },
}

for fname, cfg in CONFIGS.items():
    with open(fname, encoding='utf-8') as f:
        content = f.read()

    # 1. CSS: hide #app by default via a class, added just before </style>
    before_style_close = '\n</style>\n</head>'
    assert content.count(before_style_close) == 1, f'{fname}: </style></head> anchor not found once'
    content = content.replace(before_style_close, CSS_RULE + '\n</style>\n</head>', 1)

    # 2. Mark #app hidden by default + insert login gate HTML/JS right before it
    before_app = '<body>\n<div id="app">'
    assert content.count(before_app) == 1, f'{fname}: <body><div id="app"> anchor not found once'
    users_js = json.dumps(cfg['users'], ensure_ascii=False)
    gate = gate_html(users_js, cfg['labels'])
    after_app = '<body>\n' + gate + '<div id="app" class="esn-hidden">'
    content = content.replace(before_app, after_app, 1)

    # 3. Wire up nav-user block: add IDs + logout link
    before_nav = ('<div><div class="nu-name">Jim Totime</div><div class="nu-role">Brandsen Sports CEO</div></div>\n'
                  '    <div class="avatar">JT</div>')
    assert content.count(before_nav) == 1, f'{fname}: nav-user anchor not found once'
    logout_label = cfg['labels']['logout']
    after_nav = (
        '<div><div class="nu-name" id="nu-name-slot">Jim Totime</div>'
        '<div class="nu-role" id="nu-role-slot">Brandsen Sports CEO</div></div>\n'
        '    <div class="avatar" id="nu-avatar-slot">JT</div>\n'
        '    <a href="#" onclick="esnLogout();return false;" style="color:var(--t3);font-family:var(--M);'
        'font-size:.6rem;letter-spacing:1px;text-transform:uppercase;text-decoration:none;margin-left:10px" '
        'title="' + logout_label + '">' + logout_label + '</a>'
    )
    content = content.replace(before_nav, after_nav, 1)

    with open(fname, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f'{fname}: login gate installed OK ({len(cfg["users"])} users)')
