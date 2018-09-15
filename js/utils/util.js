export const mainScreen = document.querySelector(`#main`);

const clearScreen = () => {
  mainScreen.innerHTML = ``;
};

export const renderScreen = (screen) => {
  clearScreen();
  mainScreen.appendChild(screen);
};

export const createElement = (template) => {
  const wrapper = document.createElement(`div`);
  wrapper.innerHTML = template.trim();

  return wrapper;
};
