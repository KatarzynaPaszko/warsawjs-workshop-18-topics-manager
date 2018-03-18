require ('bulma');
const hello = require('hellojs');

if ( hello('github').getAuthResponse() != null ) {
  console.log("true");
  renderUser();
}

hello.init({
  github: 'b1cb70b1910ce5051fe5'
});



const $login = document.querySelector(".jslog");
const $logout = document.querySelector(".jslogout");
const $jsnav = document.querySelector(".add");

console.log( hello('github').getAuthResponse() );



$login.addEventListener("click", (e) => {
  if ( hello('github').getAuthResponse() != null ) {
    return;
  }
  e.preventDefault();
  hello('github').login()
    .then(renderUser);

});

function renderUser(){


  hello('github').api('/me')
  .then(function(userProfile){
    const Profile = {
      avatar: userProfile.avatar_url,
      login: userProfile.login
    }
    renderUserDetails(Profile);
  })
}

$logout.addEventListener("click", (e) => {
  hello.logout('github')
    .then(() => location.reload());
});


function renderUserDetails (Profile) {
  const template = `
    <div  class="navbar-item">
      <h5>${Profile.login}</h5>&nbsp;
      <img src="${Profile.avatar}" alt="user avatar"/>
    </div>
  `;
  $jsnav.innerHTML += template;
}
