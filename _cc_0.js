
(function(){
  try{
    if(localStorage.getItem('esn_fga_auth') !== '1'){
      window.location.replace('login.html');
    }
  }catch(e){
    window.location.replace('login.html');
  }
})();
