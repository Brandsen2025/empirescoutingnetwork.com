# -*- coding: utf-8 -*-
import re

CSS_BLOCK = '#app.esn-hidden{display:none!important}\n#loginGate a:hover{color:var(--t1)!important}\n\n'

# whole loginGate div + its script, right up to (not including) the <div id="app" ...> line
LOGIN_BLOCK_RE = re.compile(
    r'<div id="loginGate".*?</script>\n',
    re.DOTALL
)

for fname in ('platform.html', 'platform_es.html'):
    with open(fname, encoding='utf-8') as f:
        content = f.read()
    orig_len = len(content)

    assert content.count(CSS_BLOCK) == 1, f'{fname}: CSS block not found exactly once'
    content = content.replace(CSS_BLOCK, '', 1)

    matches = LOGIN_BLOCK_RE.findall(content)
    assert len(matches) == 1, f'{fname}: login block regex matched {len(matches)} times, expected 1'
    content = LOGIN_BLOCK_RE.sub('', content, count=1)

    assert content.count('<div id="app" class="esn-hidden">') == 1, f'{fname}: app div marker not found'
    content = content.replace('<div id="app" class="esn-hidden">', '<div id="app">', 1)

    # restore static nav-user block: capture current dynamic block and rebuild without ids/logout link
    nav_re = re.compile(
        r'    <div><div class="nu-name" id="nu-name-slot">(.*?)</div><div class="nu-role" id="nu-role-slot">(.*?)</div></div>\n'
        r'    <div class="avatar" id="nu-avatar-slot">(.*?)</div>\n'
        r'    <a href="#" onclick="esnLogout\(\);return false;"[^>]*>.*?</a>\n'
    )
    nav_matches = nav_re.findall(content)
    assert len(nav_matches) == 1, f'{fname}: nav-user block matched {len(nav_matches)} times, expected 1'
    name, role, initials = nav_matches[0]
    static_block = (
        f'    <div><div class="nu-name">{name}</div><div class="nu-role">{role}</div></div>\n'
        f'    <div class="avatar">{initials}</div>\n'
    )
    content = nav_re.sub(static_block, content, count=1)

    # sanity: no leftover markers
    for marker in ('loginGate', 'esn-hidden', 'nu-name-slot', 'nu-role-slot', 'nu-avatar-slot', 'esnLogout', 'ESN_USERS', 'esn_auth_v1'):
        assert marker not in content, f'{fname}: leftover marker {marker!r} still present'

    with open(fname, 'w', encoding='utf-8') as f:
        f.write(content)

    print(f'{fname}: removed login gate. {orig_len} -> {len(content)} chars. restored nav user: {name} / {role} / {initials}')

print('DONE')
