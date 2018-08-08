'use strict';

const KeyCodes = {
  LEFT_ARROW: 37,
  RIGHT_ARROW: 39
};

const SCREENS = [
  `intro`,
  `greeting`,
  `rules`,
  `game-1`,
  `game-2`,
  `game-3`,
  `stats`
];

const controlsTemplate = `
  <div class="arrows__wrap">
    <style>
      .arrows__wrap {
        position: absolute;
        top: 95px;
        left: 50%;
        margin-left: -56px;
      }
      
      .arrows__btn {
        background: none;
        border: 2px solid black;
        padding: 5px 20px;
      }
    </style>
    <button class="arrows__btn"><-</button>
    <button class="arrows__btn">-></button>
  </div>`;

document.body.insertAdjacentHTML(`beforeend`, controlsTemplate);

const mainScreen = document.querySelector(`#main`);
let currentScreenIndex = 0;
const arrowBtns = document.querySelectorAll(`.arrows__btn`);

const screens = SCREENS.map((screen) => document.querySelector(`#${screen}`).content);

const clearScreen = () => {
  mainScreen.innerHTML = ``;
};

const renderScreen = (screen) => {
  clearScreen();

  mainScreen.appendChild(screen.cloneNode(true));
};

const selectScreen = (currentIndex) => {
  if (currentIndex < 0) {
    currentIndex = 0;
  } else if (currentIndex >= screens.length) {
    currentIndex = screens.length - 1;
  }

  currentScreenIndex = currentIndex;

  renderScreen(screens[currentScreenIndex]);
};

const switchScreenHandler = (evt) => {
  switch (evt.keyCode) {
    case KeyCodes.LEFT_ARROW:
      selectScreen(currentScreenIndex - 1);
      break;
    case KeyCodes.RIGHT_ARROW:
      selectScreen(currentScreenIndex + 1);
      break;
  }
};

document.addEventListener(`keydown`, switchScreenHandler);

arrowBtns[0].addEventListener(`click`, () => {
  selectScreen(currentScreenIndex - 1);
});

arrowBtns[1].addEventListener(`click`, () => {
  selectScreen(currentScreenIndex + 1);
});

renderScreen(screens[currentScreenIndex]);
