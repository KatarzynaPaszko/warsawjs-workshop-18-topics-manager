require ('bulma');
const hello = require('hellojs');

hello.init({
  github: 'b1cb70b1910ce5051fe5'
});

const $login = document.querySelector(".jslog");
const $logout = document.querySelector(".jslogout");
const $jsnav = document.querySelector(".jsnav");


$login.addEventListener("click", (e) => {
  console.log("1");
  e.preventDefault();
  hello('github').login()
  .then(function(){
    console.log("2");
    return hello('github').api('/me');
  })
  .then(function(userProfile){
    const Profile = {
      avatar: userProfile.avatar_url,
      loginek: userProfile.login
    }
    renderUserDetails(Profile);
  })
});
function renderUserDetails (Profile) {

  const template = `
    <div  class="navbar-item">
      ${Profile.loginek}
      <img src="${Profile.avatar}" alt="user avatar"/>
    </div>
  `;
  $jsnav.innerHTML += template;

}

$logout.addEventListener("click", (e) => {
  e.preventDefault();
  hello.logout('github');
});
