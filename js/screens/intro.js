import {createElement, renderScreen} from './../util';
import greeting from './greeting';

const template = `
  <section class="intro">
    <button class="intro__asterisk asterisk" type="button"><span class="visually-hidden">Продолжить</span>*</button>
    <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
  </section>`;

const intro = createElement(template);

const playGameBtn = intro.querySelector(`.intro__asterisk`);

const playGameBtnClickHandler = () => renderScreen(greeting);

playGameBtn.addEventListener(`click`, playGameBtnClickHandler);

export default intro;
