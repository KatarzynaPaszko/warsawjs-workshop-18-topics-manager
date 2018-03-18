require ('bulma');

const GITHUB = require('./config').GITHUB;
const hello = require('hellojs');
const topics = new Set();
const $login = document.querySelector(".jslog");
const $logout = document.querySelector(".jslogout");
const $jsnav = document.querySelector(".add");
const $jstopics = document.querySelector(".jstopics");

if ( hello('github').getAuthResponse() != null ) {
  renderUser();
}

hello.init({
  github: 'b1cb70b1910ce5051fe5'
});

const $form = document.querySelector('.js-form-add-topic');
$form.addEventListener("submit", (e)=> {
  e.preventDefault();
  const data = new FormData($form);
  const map = new Map(data.entries());
  console.log(map);

  $form.reset();
  renderTopics(map)
})

function renderTopic(mapka) {
  const template2 = `
    <div class="column is-3">
        <div class="card">
            <header class="card-header">
                <p class="card-header-title">
                    ${mapka.get("topic")}
                </p>
            </header>
            <div class="card-content">
                <div class="content">
                  ${mapka.get("description")}
                </div>
            </div>
            <footer class="card-footer">
                <a href="#" class="card-footer-item">Zagłosuj</a>
                <a href="#" class="card-footer-item">Chcę być trenerem</a>
            </footer>
        </div>
    </div>
  `;
  $jstopics.innerHTML += template2;
}

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
