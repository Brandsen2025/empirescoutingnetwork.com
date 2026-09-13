
(function(){
  var ESN_USERS = {"daniel": {"hash": "afc61c5e180556c52c6f2dff27fe01e12190aabe11cbbaaef639772bba7cd122", "name": "Daniel Dominguez", "role": "Ventas", "initials": "DD"}, "jordi": {"hash": "e680c3c628134991a25ca6e5f0d076ff9aa85f63f9bc52d6fe68ad9df30219f9", "name": "Jordi Tarrago", "role": "Ventas", "initials": "JTa"}, "jim": {"hash": "489312486e39f94bc07a435c00d835f83c34222c10c051a606b1f5242294e12c", "name": "Jim Totime", "role": "Brandsen Sports CEO", "initials": "JT"}};
  var STORAGE_KEY = "esn_auth_v1";
  var MSG_UNKNOWN = "Usuario desconocido.";
  var MSG_WRONG = "Contrase\u00f1a incorrecta.";
  function hashHex(str){
    var enc = new TextEncoder().encode(str);
    return crypto.subtle.digest("SHA-256", enc).then(function(buf){
      return Array.prototype.map.call(new Uint8Array(buf), function(b){return b.toString(16).padStart(2,"0");}).join("");
    });
  }
  function showApp(u){
    document.getElementById("loginGate").style.display = "none";
    document.getElementById("app").classList.remove("esn-hidden");
    var n = document.getElementById("nu-name-slot"); if(n) n.textContent = u.name;
    var r = document.getElementById("nu-role-slot"); if(r) r.textContent = u.role;
    var a = document.getElementById("nu-avatar-slot"); if(a) a.textContent = u.initials;
  }
  function tryStoredAuth(){
    try{
      var raw = localStorage.getItem(STORAGE_KEY);
      if(!raw) return false;
      var data = JSON.parse(raw);
      var u = ESN_USERS[data.u];
      if(u && data.h === u.hash){ showApp(u); return true; }
    }catch(e){}
    return false;
  }
  function doLogin(e){
    e.preventDefault();
    var uEl = document.getElementById("lg-user");
    var pEl = document.getElementById("lg-pass");
    var errEl = document.getElementById("lg-err");
    var uname = uEl.value.trim().toLowerCase();
    var pass = pEl.value;
    var u = ESN_USERS[uname];
    if(!u){ errEl.textContent = MSG_UNKNOWN; errEl.style.display = "block"; return; }
    hashHex(pass).then(function(h){
      if(h === u.hash){
        localStorage.setItem(STORAGE_KEY, JSON.stringify({u:uname, h:h}));
        errEl.style.display = "none";
        showApp(u);
      } else {
        errEl.textContent = MSG_WRONG;
        errEl.style.display = "block";
        pEl.value = "";
      }
    });
  }
  window.esnLogout = function(){ localStorage.removeItem(STORAGE_KEY); location.reload(); };
  document.addEventListener("DOMContentLoaded", function(){
    var form = document.getElementById("loginForm");
    if(form) form.addEventListener("submit", doLogin);
    tryStoredAuth();
  });
})();
