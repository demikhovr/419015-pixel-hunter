'use strict';

const keyCodes = {
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

const mainScreen = document.querySelector(`#main`);
const arrowBtns = document.querySelectorAll(`.arrows__btn`);
let currentScreenIndex = 0;

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
    case keyCodes.LEFT_ARROW:
      selectScreen(currentScreenIndex - 1);
      break;
    case keyCodes.RIGHT_ARROW:
      selectScreen(currentScreenIndex + 1);
      break;
  }
};

document.addEventListener(`keydown`, switchScreenHandler);

arrowBtns.forEach((btn, i) => {
  btn.addEventListener(`click`, () => {
    switch (i) {
      case 0:
        selectScreen(currentScreenIndex - 1);
        break;
      case 1:
        selectScreen(currentScreenIndex + 1);
        break;
    }
  });
});

renderScreen(screens[currentScreenIndex]);
