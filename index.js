const TRENDING_URL = 'https://github-trending-api.now.sh/repositories';
const LOADER = document.getElementById("loader");
const ERROR = document.getElementById("error");
const REPOSITORIES = document.getElementById("repositories");

document.addEventListener('DOMContentLoaded', () => {
  fetch(TRENDING_URL).then(data => data.json())
    .then((data) => {
      createRepositories(data);
      hideLoader();
      showRepositories();
    })
    .catch((error) => {
      hideLoader();
      showError(error);
    });
});

function createRepositories(data) {
  const list = document.createElement('ul');
  list.classList.add('repositories__list');
  list.setAttribute('id', 'repositories-list');

  let item;
  data.forEach(({ author, name, description, url, language, languageColor, stars, forks, currentPeriodStars, builtBy }) => {
    let developers = '';
    builtBy.forEach(({ avatar, username }) => {
      developers = `${developers}<img class="developers__image" src="${avatar}" alt="${username}" />`;
    });

    item = `
      <li class="repository">
        <a href="${url}" target="_blank">
          <div class="repository__row">
            <span class="text text_large text_blue">
                ${author} / <span class="text text_large text_bold text_blue">${name}</span>
            </span>
          </div>

          <div class="repository__row">
            <span class="text">${description}</span>
          </div>

          <div class="repository__row">
            ${
              language !== undefined
                ?
                  `<div class="repository__item language">
                      <span class="language__color" style="background-color: ${languageColor}"></span>
                      <span class="language__text text text__small">${language}</span>
                    </div>
                  `
                :
                  ""
            }

            <div class="repository__item stats">
              <img class="stats__icon" src="icons/star.svg" alt="stars" />
              <span class="stats__text text text_small">${stars}</span>
            </div>

            <div class="repository__item stats">
              <img class="stats__icon" src="icons/code-fork-symbol.svg" alt="" />
              <span class="stats__text text text_small">${forks}</span>
            </div>

            <div class="repository__item developers">
              <span class="developers__text text text_small">Built by: </span>
              ${developers}
            </div>

            <div class="repository__item stats stats_shifted_right">
              <img class="stats__icon" src="icons/star.svg" alt="current period stars" />
              <span class="stats__text text text_small">${currentPeriodStars} stars today</span>
            </div>
          </div>
        </a>
      </li>
    `;

    list.insertAdjacentHTML('beforeend', item);
    REPOSITORIES.appendChild(list);
  });
}

function showRepositories() {
  REPOSITORIES.hidden = false;
}

function showError(error) {
  console.error(error);
  ERROR.hidden = false;
}

function hideLoader() {
  LOADER.hidden = true;
}
