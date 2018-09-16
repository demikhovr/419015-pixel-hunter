(function () {
  'use strict';

  const mainScreen = document.querySelector(`#main`);

  const clearScreen = () => {
    mainScreen.innerHTML = ``;
  };

  const renderScreen = (screen) => {
    clearScreen();
    mainScreen.appendChild(screen);
  };

  const createElement = (template) => {
    const wrapper = document.createElement(`div`);
    wrapper.innerHTML = template.trim();

    return wrapper.firstElementChild;
  };

  class AbstractView {
    constructor() {
      if (new.target === AbstractView) {
        throw new Error(`Can't instantiate AbstractView, only concrete one`);
      }
    }

    get template() {
      throw new Error(`Template is required`);
    }

    get element() {
      if (this._element) {
        return this._element;
      }

      this._element = this.render();
      this.bind(this._element);

      return this._element;
    }

    render() {
      return createElement(this.template);
    }

    bind() {

    }
  }

  class IntroView extends AbstractView {
    constructor() {
      super();
    }

    get template() {
      return `
      <section class="intro">
        <button class="intro__asterisk asterisk" type="button"><span class="visually-hidden">Продолжить</span>*</button>
        <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
      </section>`;
    }

    hide() {
      this._element.classList.add(`intro--fade-out`);
    }

    bind(element) {
      const playGameBtn = element.querySelector(`.intro__asterisk`);

      const introTransitionEndHandler = (evt) => {
        if (evt.propertyName === `opacity`) {
          this.onFadeOut();
        }
      };

      element.addEventListener(`transitionend`, introTransitionEndHandler);
      playGameBtn.addEventListener(`click`, this.onPlayGameBtnClick);
    }

    onFadeOut() {

    }

    onPlayGameBtnClick() {

    }
  }

  class GreetingView extends AbstractView {
    constructor() {
      super();
    }

    get template() {
      return `
      <section class="greeting  greeting--fade-in">
        <img class="greeting__logo" src="img/logo_ph-big.svg" width="201" height="89" alt="Pixel Hunter">
        <div class="greeting__asterisk asterisk"><span class="visually-hidden">Я просто красивая звёздочка</span>*</div>
        <div class="greeting__challenge">
          <h3 class="greeting__challenge-title">Лучшие художники-фотореалисты бросают тебе вызов!</h3>
          <p class="greeting__challenge-text">Правила игры просты:</p>
          <ul class="greeting__challenge-list">
            <li>Нужно отличить рисунок от фотографии и сделать выбор.</li>
            <li>Задача кажется тривиальной, но не думай, что все так просто.</li>
            <li>Фотореализм обманчив и коварен.</li>
            <li>Помни, главное — смотреть очень внимательно.</li>
          </ul>
        </div>
        <button class="greeting__continue" type="button">
          <span class="visually-hidden">Продолжить</span>
          <svg class="icon" width="64" height="64" viewBox="0 0 64 64" fill="#000000">
            <use xlink:href="img/sprite.svg#arrow-right"></use>
          </svg>
        </button>
      </section>`;
    }

    bind(element) {
      const showRulesBtn = element.querySelector(`.greeting__continue`);
      showRulesBtn.addEventListener(`click`, this.onShowRulesBtnClick);
    }

    onShowRulesBtnClick() {

    }
  }

  const INITIAL_STATE = Object.freeze({
    level: 0,
    lives: 3,
    time: 30,
    answers: []
  });

  const EMPTY_HEART_ICON = `<img src="img/heart__empty.svg" class="game__heart" alt="Life" width="31" height="27">`;
  const FULL_HEART_ICON = `<img src="img/heart__full.svg" class="game__heart" alt="Life" width="31" height="27">`;

  class HeaderView extends AbstractView {
    constructor(state) {
      super();
      this.state = state;
    }

    get template() {
      return `
      <header class="header">
        <button class="back">
          <span class="visually-hidden">Вернуться к началу</span>
          <svg class="icon" width="45" height="45" viewBox="0 0 45 45" fill="#000000">
            <use xlink:href="img/sprite.svg#arrow-left"></use>
          </svg>
          <svg class="icon" width="101" height="44" viewBox="0 0 101 44" fill="#000000">
            <use xlink:href="img/sprite.svg#logo-small"></use>
          </svg>
        </button>
        ${this.state ? `<div class="game__timer">${this.state.time}</div>
                        <div class="game__lives">
                          ${new Array(INITIAL_STATE.lives - this.state.lives).fill(EMPTY_HEART_ICON).join(``)}
                          ${new Array(this.state.lives).fill(FULL_HEART_ICON).join(``)}
                        </div>` : ``}
      </header>`;
    }

    toggleBlinkMode(isBlink) {
      this._timer.classList[isBlink ? `add` : `remove`](`game__timer--blink`);
    }

    bind(element) {
      const backBtn = element.querySelector(`.back`);
      this._timer = element.querySelector(`.game__timer`);
      backBtn.addEventListener(`click`, this.onBackBtnClick);
    }

    onBackBtnClick() {

    }
  }

  const MAX_QUESTIONS = 10;
  const ANSWER_POINT = 50;

  const AnswerType = {
    WRONG: 0,
    SLOW: 1,
    CORRECT: 2,
    FAST: 3
  };

  const AnswerTime = {
    MIN: 10,
    MAX: 20
  };

  const AnswerTypeMultiplier = {
    WRONG: 0,
    SLOW: 1,
    CORRECT: 2,
    FAST: 3
  };

  const countPoints = (answers, lives) => {
    if (lives < 0) {
      return 0;
    }

    return (answers.reduce((prev, item) => prev + item) + lives) * ANSWER_POINT;
  };

  const updateLives = (state, isCorrect) => {
    let {lives} = state;

    if (!isCorrect) {
      lives--;
    }

    return Object.assign({}, state, {lives});
  };

  const changeLevel = (state, level) => {
    if (typeof level !== `number`) {
      throw new Error(`Level should be of type number`);
    }

    if (level < INITIAL_STATE.level) {
      throw new Error(`Level should not be negative value`);
    }

    if (level > MAX_QUESTIONS) {
      throw new Error(`There should not be more than 10 levels`);
    }

    return Object.assign({}, state, {level});
  };

  const tick = (state) => {
    if (!state.time) {
      return state;
    }

    return Object.assign({}, state, {time: state.time - 1});
  };

  const getAnswerType = (time) => {
    if (time <= AnswerTime.MIN) {
      return AnswerType.FAST;
    }

    if (time > AnswerTime.MAX) {
      return AnswerType.SLOW;
    }

    if (AnswerTime.MIN < time && time < AnswerTime.MAX) {
      return AnswerType.CORRECT;
    }

    return AnswerType.WRONG;
  };

  const addAnswer = (state, isCorrect) => {
    const time = INITIAL_STATE.time - state.time;
    const answer = !isCorrect ? AnswerType.WRONG : getAnswerType(time);
    return Object.assign({}, state, {answers: [...state.answers, answer]});
  };

  class RulesView extends AbstractView {
    constructor() {
      super();
      this._header = new HeaderView();
      this._header.onBackBtnClick = () => this.onBackBtnClick();
    }

    get template() {
      return `
      <section class="rules">
        <h2 class="rules__title">Правила</h2>
        <ul class="rules__description">
          <li>Угадай ${MAX_QUESTIONS} раз для каждого изображения фото
            <img class="rules__icon" src="img/icon-photo.png" width="32" height="31" alt="Фото"> или рисунок
            <img class="rules__icon" src="img/icon-paint.png" width="32" height="31" alt="Рисунок"></li>
          <li>Фотографиями или рисунками могут быть оба изображения.</li>
          <li>На каждую попытку отводится ${INITIAL_STATE.time} секунд.</li>
          <li>Ошибиться можно не более ${INITIAL_STATE.lives} раз.</li>
        </ul>
        <p class="rules__ready">Готовы?</p>
        <form class="rules__form">
          <input class="rules__input" type="text" placeholder="Ваше Имя">
          <button class="rules__button  continue" type="submit" disabled>Go!</button>
        </form>
      </section>`;
    }

    get element() {
      if (this._element) {
        return this._element;
      }

      const elementFragment = document.createDocumentFragment();
      elementFragment.append(this._header.element, this.render());
      this._element = elementFragment;
      this.bind(this._element);

      return this._element;
    }

    bind(element) {
      const form = element.querySelector(`.rules__form`);
      const nameInput = element.querySelector(`.rules__input`);
      const submitBtn = element.querySelector(`.rules__button`);

      const nameInputHandler = ({target}) => {
        submitBtn.disabled = !target.value.length;
      };

      const formSubmitHandler = (evt) => {
        evt.preventDefault();
        this.onFormSubmit(nameInput.value);
      };

      nameInput.addEventListener(`input`, nameInputHandler);
      form.addEventListener(`submit`, formSubmitHandler);
    }

    onFormSubmit() {

    }

    onBackBtnClick() {

    }
  }

  class GameModel {
    constructor(data, playerName) {
      this.restart();
      this.data = data;
      this.playerName = playerName;
    }

    get state() {
      return this._state;
    }

    get currentLevel() {
      return this.data[this._state.level];
    }

    restart() {
      this._state = INITIAL_STATE;
    }

    isDead() {
      return this._state.lives <= 0;
    }

    tick() {
      this._state = tick(this._state);
    }

    resetTimer() {
      this._state = Object.assign({}, this._state, {time: INITIAL_STATE.time});
    }

    onAnswer(answer) {
      this._state = addAnswer(this._state, answer);
      this._state = updateLives(this._state, answer);
      this._state = changeLevel(this._state, this._state.level + 1);
    }
  }

  const StatsResultTemplates = {
    CORRECT: `<li class="stats__result stats__result--correct"></li>`,
    WRONG: `<li class="stats__result stats__result--wrong"></li>`,
    FAST: `<li class="stats__result stats__result--fast"></li>`,
    SLOW: `<li class="stats__result stats__result--slow"></li>`,
    UNKNOWN: `<li class="stats__result stats__result--unknown"></li>`,
  };

  var getGameStats = (answers) => {
    const getResultTemplate = (answer) => {
      let template = ``;

      switch (answer) {
        case (AnswerType.FAST):
          template = StatsResultTemplates.FAST;
          break;
        case (AnswerType.SLOW):
          template = StatsResultTemplates.SLOW;
          break;
        case (AnswerType.CORRECT):
          template = StatsResultTemplates.CORRECT;
          break;
        default:
          template = StatsResultTemplates.WRONG;
          break;
      }

      return template;
    };

    return `
    <ul class="stats">
      ${Array.from({length: MAX_QUESTIONS}, (value, key) => answers[key] !== undefined ? getResultTemplate(answers[key]) : StatsResultTemplates.UNKNOWN).join(``)}
    </ul>
  `;
  };

  var resize = (frame, image) => {
    const obj = {};
    const widthRatio = frame.width / image.width;
    const heightRatio = frame.height / image.height;

    if (frame.width === frame.height) {
      if (image.width === image.height) {
        obj.width = frame.width;
        obj.height = frame.height;
      }

      if (image.width > image.height) {
        obj.width = frame.width;
        obj.height = image.height * widthRatio;
      }

      if (image.width < image.height) {
        obj.width = image.width * heightRatio;
        obj.height = frame.height;
      }
    }

    if (frame.width > frame.height) {
      if (image.width === image.height) {
        obj.width = image.width * heightRatio;
        obj.height = frame.height;
      }

      if (image.width > image.height) {
        obj.width = image.width * (widthRatio < heightRatio ? widthRatio : heightRatio);
        obj.height = image.height * (widthRatio < heightRatio ? widthRatio : heightRatio);
      }

      if (image.width < image.height) {
        obj.width = image.width * heightRatio;
        obj.height = frame.height;
      }
    }

    if (frame.width < frame.height) {
      if (image.width === image.height) {
        obj.width = frame.width;
        obj.height = image.height * widthRatio;
      }

      if (image.width > image.height) {
        obj.width = frame.width;
        obj.height = image.height * widthRatio;
      }

      if (image.width < image.height) {
        obj.width = image.width * (widthRatio < heightRatio ? widthRatio : heightRatio);
        obj.height = image.height * (widthRatio < heightRatio ? widthRatio : heightRatio);
      }
    }

    return obj;
  };

  const FRAME = {
    width: 468,
    height: 458
  };
  const MAX_ANSWERS = 2;

  class GameCommonView extends AbstractView {
    constructor(level, answers) {
      super();
      this.level = level;
      this.answers = answers;
    }

    get template() {
      return `
      <section class="game">
        <p class="game__task">${this.level.task}</p>
        <form class="game__content">
          ${this.level.options.map((option, i) => `
            <div class="game__option">
              <img src="${option.src}" alt="Option ${i + 1}" width="${resize(FRAME, option).width}" height="${resize(FRAME, option).height}">
              <label class="game__answer game__answer--photo">
                <input class="visually-hidden" name="question${i + 1}" type="radio" value="photo">
                <span>Фото</span>
              </label>
              <label class="game__answer game__answer--paint">
                <input class="visually-hidden" name="question${i + 1}" type="radio" value="paint">
                <span>Рисунок</span>
              </label>
            </div>`).join(``)}
        </form>
        ${getGameStats(this.answers)}
      </section>`;
    }

    bind(element) {
      const form = element.querySelector(`.game__content`);
      const gameAnswers = form.querySelectorAll(`.game__answer input[type="radio"]`);

      const formChangeHandler = () => {
        const checkedAnswers = Array.from(gameAnswers).filter(({checked}) => checked);
        const areAllAnswered = checkedAnswers.length === MAX_ANSWERS;

        if (areAllAnswered) {
          const isCorrect = checkedAnswers
            .reduce((prev, curr, i) => {
              if (curr.value === this.level.options[i].type) {
                prev++;
              }
              return prev;
            }, 0) === MAX_ANSWERS;

          this.onAnswer(isCorrect);
        }
      };

      form.addEventListener(`change`, formChangeHandler);
    }

    onAnswer() {

    }
  }

  const FRAME$1 = {
    width: 705,
    height: 455
  };

  class GameWideView extends AbstractView {
    constructor(level, answers) {
      super();
      this.level = level;
      this.answers = answers;
    }

    get template() {
      return `
      <section class="game">
        <p class="game__task">${this.level.task}</p>
        <form class="game__content  game__content--wide">
          ${`<div class="game__option">
              <img src="${this.level.options[0].src}" alt="Option 1" width="${resize(FRAME$1, this.level.options[0]).width}" height="${resize(FRAME$1, this.level.options[0]).height}">
              <label class="game__answer  game__answer--photo">
                <input class="visually-hidden" name="question1" type="radio" value="photo">
                <span>Фото</span>
              </label>
              <label class="game__answer  game__answer--paint">
                <input class="visually-hidden" name="question1" type="radio" value="paint">
                <span>Рисунок</span>
              </label>
            </div>`}
        </form>
        ${getGameStats(this.answers)}
      </section>`;
    }

    bind(element) {
      const form = element.querySelector(`.game__content`);

      const formChangeHandler = ({target}) => {
        const checkedAnswer = target.checked;

        if (checkedAnswer) {
          const isCorrect = checkedAnswer && target.value === this.level.options[0].type;
          this.onAnswer(isCorrect);
        }
      };

      form.addEventListener(`change`, formChangeHandler);
    }

    onAnswer() {

    }
  }

  const FRAME$2 = {
    width: 304,
    height: 455
  };

  class GameTripleView extends AbstractView {
    constructor(level, answers) {
      super();
      this.level = level;
      this.answers = answers;
    }

    get template() {
      return `
      <section class="game">
        <p class="game__task">${this.level.task}</p>
        <form class="game__content  game__content--triple">
          ${this.level.options.map((option, i) => `
            <div class="game__option">
              <img src="${option.src}" alt="Option ${i + 1}" width="${resize(FRAME$2, option).width}" height="${resize(FRAME$2, option).height}">
            </div>
          `).join(``)}
        </form>
        ${getGameStats(this.answers)}
      </section>`;
    }

    _getUniqueAnswerIndex(answers) {
      const counts = {};
      const types = answers.map((answer) => answer.type);

      types.forEach((type) => {
        counts[type] = (counts[type] || 0) + 1;
      });

      const result = types.filter((type) => counts[type] <= 1)[0];
      return types.indexOf(result);
    }

    bind(element) {
      const gameOptions = element.querySelectorAll(`.game__option`);

      const optionClickHandler = ({target}) => {
        const option = target.closest(`.game__option`);
        const optionIndex = Array.from(gameOptions).indexOf(option);

        if (option) {
          const answerIndex = this._getUniqueAnswerIndex(this.level.options);
          const isCorrect = answerIndex === optionIndex;
          this.onAnswer(isCorrect);
        }
      };

      gameOptions.forEach((option) => option.addEventListener(`click`, optionClickHandler));
    }

    onAnswer() {

    }
  }

  const ONE_SECOND = 1000;
  const BLINK_TIME = 5;

  class GamePresenter {
    constructor(model) {
      this.model = model;
      this._header = new HeaderView(this.model.state);
      this._header.onBackBtnClick = () => this.onBackBtnClick();
      this.content = this.gameLevel;

      this.root = document.createElement(`div`);
      this.root.appendChild(this._header.element);
      this.root.appendChild(this.content.element);

      this._interval = null;
      this.game = null;
      this.startTimer();
    }

    get element() {
      return this.root;
    }

    get gameLevel() {
      if (!this.model.currentLevel || this.model.isDead()) {
        this.onEndGame(this.model.state, this.model.playerName);
        return false;
      }

      switch (this.model.data[this.model.state.level].type) {
        case `common`:
          this.game = new GameCommonView(this.model.data[this.model.state.level], this.model.state.answers);
          break;
        case `wide`:
          this.game = new GameWideView(this.model.data[this.model.state.level], this.model.state.answers);
          break;
        case `triple`:
          this.game = new GameTripleView(this.model.data[this.model.state.level], this.model.state.answers);
          break;
      }

      this.game.onAnswer = (answer) => this._onAnswer(answer);

      return this.game;
    }

    restart(continueGame) {
      if (continueGame) {
        this.model.restart();
      }
    }

    updateHeader() {
      const header = new HeaderView(this.model.state);
      header.onBackBtnClick = () => this.onBackBtnClick();
      this.root.replaceChild(header.element, this._header.element);
      this._header = header;
      if (this.model.state.time <= BLINK_TIME) {
        this._header.toggleBlinkMode(true);
      }
    }

    updateGame() {
      const level = this.gameLevel;
      if (level) {
        this.root.replaceChild(level.element, this.content.element);
        this.content = level;
        this.startTimer();
      }
    }

    startTimer() {
      this._interval = setInterval(() => {
        this.model.tick();
        if (!this.model.state.time) {
          this._onAnswer({isCorrect: false});
        } else {
          this.updateHeader();
        }
      }, ONE_SECOND);
    }

    stopTimer() {
      clearInterval(this._interval);
      this._header.toggleBlinkMode(false);
      this.model.resetTimer();
    }

    _onAnswer(answer) {
      this.model.onAnswer(answer);
      this.stopTimer();
      this.updateHeader();
      this.updateGame();
    }

    onEndGame() {

    }

    onBackBtnClick() {

    }
  }

  const LAST_GAME = 0;
  const Titles = {
    WIN: `Победа!`,
    FAIL: `Поражение!`
  };

  const getResultsTemplate = (results) => {
    const resultsTemplate = [];
    results.reverse().forEach((state, index) => {
      resultsTemplate.push(`<table class="result__table">
    <tr>
      <td class="result__number">${index + 1}.</td>
      <td colspan="2">
        ${state.answerList}
      </td>
      ${state.type.total ? `<td class="result__points">× ${state.type.correct.price}` : `<td class="result__total">`}</td>
      <td class="result__total ${state.type.total ? `">${state.type.correct.total}` : `result__total--final">FAIL`}</td>
    </tr>
  ${state.type.total ? `
    ${state.type.fast.count ?
    `<tr>
      <td></td>
      <td class="result__extra">Бонус за скорость:</td>
      <td class="result__extra">${state.type.fast.count} <span class="stats__result stats__result--fast"></span></td>
      <td class="result__points">× ${state.type.fast.price}</td>
      <td class="result__total">${state.type.fast.total}</td>
    </tr>` : ``}
    ${state.type.lives.count ?
    `<tr>
      <td></td>
      <td class="result__extra">Бонус за жизни:</td>
      <td class="result__extra">${state.type.lives.count} <span class="stats__result stats__result--alive"></span></td>
      <td class="result__points">× ${state.type.lives.price}</td>
      <td class="result__total">${state.type.lives.total}</td>
    </tr>` : ``}
    ${state.type.slow.count ?
    `<tr>
      <td></td>
      <td class="result__extra">Штраф за медлительность:</td>
      <td class="result__extra">${state.type.slow.count} <span class="stats__result stats__result--slow"></span></td>
      <td class="result__points">× ${state.type.slow.price}</td>
      <td class="result__total">${state.type.slow.total}</td>
    </tr>` : ``}
    <tr>
      <td colspan="5" class="result__total  result__total--final">${state.type.total}</td>
    </tr>` : ``}
  </table>`);
    });

    return `
  <section class="result">
    <h2 class="result__title">${results.length ? results[LAST_GAME].title : ``}</h2>
    ${resultsTemplate.join(``)}
  </section>`;
  };

  const getStatsObj = ({answers, lives}) => {
    const scores = countPoints(answers, lives);

    return Object.assign({}, {
      title: scores ? Titles.WIN : Titles.FAIL,
      answerList: getGameStats(answers),
      type: {
        correct: {
          count: answers.reduce((total, item) => total + (item !== AnswerTypeMultiplier.WRONG), 0),
          price: AnswerTypeMultiplier.CORRECT * ANSWER_POINT,
          total: answers.reduce((total, item) => total + (item !== AnswerTypeMultiplier.WRONG), 0) * AnswerTypeMultiplier.CORRECT * ANSWER_POINT
        },
        fast: {
          count: answers.reduce((total, item) => total + (item === AnswerTypeMultiplier.FAST), 0),
          price: ANSWER_POINT,
          total: answers.reduce((total, item) => total + (item === AnswerTypeMultiplier.FAST), 0) * ANSWER_POINT
        },
        lives: {
          count: lives,
          price: ANSWER_POINT,
          total: lives * ANSWER_POINT
        },
        slow: {
          count: answers.reduce((total, item) => total + (item === AnswerTypeMultiplier.SLOW), 0),
          price: ANSWER_POINT,
          total: answers.reduce((total, item) => total + (item === AnswerTypeMultiplier.SLOW), 0) * -ANSWER_POINT
        },
        total: scores
      }
    });
  };

  class StatsView extends AbstractView {
    constructor(results) {
      super();
      this._header = new HeaderView();
      this._header.onBackBtnClick = () => this.onBackBtnClick();
      this.results = results.map((result) => getStatsObj(result));
    }

    get template() {
      return getResultsTemplate(this.results);
    }

    get element() {
      if (this._element) {
        return this._element;
      }

      const elementFragment = document.createDocumentFragment();
      elementFragment.append(this._header.element, this.render());
      this._element = elementFragment;
      this.bind(this._element);

      return this._element;
    }

    onBackBtnClick() {

    }
  }

  class ModalErrorView extends AbstractView {
    constructor(error = `:(`) {
      super();
      this.error = error;
    }

    get template() {
      return `
      <section class="modal">
        <div class="modal__inner">
          <h2 class="modal__title">Произошла ошибка!</h2>
          <p class="modal__text modal__text--error">${this.error}</p>
        </div>
      </section>`;
    }
  }

  class ModalConfirmView extends AbstractView {
    constructor() {
      super();
    }

    get template() {
      return `
      <section class="modal">
        <form class="modal__inner">
          <button class="modal__close" type="button">
            <span class="visually-hidden">Закрыть</span>
          </button>
          <h2 class="modal__title">Подтверждение</h2>
          <p class="modal__text">Вы уверены что хотите начать игру заново?</p>
          <div class="modal__button-wrapper">
            <button class="modal__btn  modal__btn--submit">Ок</button>
            <button class="modal__btn  modal__btn--cancel">Отмена</button>
          </div>
        </form>
      </section>`;
    }

    remove() {
      this._element.remove();
    }

    bind(element) {
      const closeBtn = element.querySelector(`.modal__close`);
      const btnSubmit = element.querySelector(`.modal__btn--submit`);
      const btnCancel = element.querySelector(`.modal__btn--cancel`);
      closeBtn.addEventListener(`click`, () => this.remove());
      btnSubmit.addEventListener(`click`, () => this.onBtnSubmitClick());
      btnCancel.addEventListener(`click`, () => this.remove());
    }

    onBtnSubmitClick() {

    }
  }

  const Server2TypeMapper = {
    'two-of-two': `common`,
    'tinder-like': `wide`,
    'one-of-three': `triple`,
  };

  const Server2AnswerTypeMapper = {
    'painting': `paint`,
    'photo': `photo`,
  };

  const adaptServerData = (data) => {
    return data.map((level) => {
      return {
        type: Server2TypeMapper[level.type],
        task: level.question,
        options: level.answers.map((answer) => {
          return {
            src: answer.image.url,
            width: answer.image.width,
            height: answer.image.height,
            type: Server2AnswerTypeMapper[answer.type]
          };
        })
      };
    });
  };

  const Api = {
    QUESTIONS: `https://es.dump.academy/pixel-hunter/questions`,
    STATS: `https://es.dump.academy/pixel-hunter/stats/`
  };
  const DEFAULT_NAME = `Username`;
  const APP_ID = 419015;

  const checkStatus = (response) => {
    if (response.ok) {
      return response;
    }

    throw new Error(`${response.status}: ${response.statusText}`);
  };

  const loadImage = (url) => {
    return new Promise((onLoad, onError) => {
      const image = new Image();
      image.src = url;
      image.addEventListener(`load`, () => {
        onLoad(image);
      });
      image.addEventListener(`error`, () => {
        onError(`Не удалось загрузить картнку: ${url}`);
      });
    });
  };

  const preloadImages = (data) => {
    const imagePromises = [];

    data.forEach((level) => {
      level.options.forEach((option) => {
        const preloadedImage = loadImage(option.src);

        preloadedImage
          .then((image) => {
            option.width = image.width;
            option.height = image.height;
          });

        imagePromises.push(preloadedImage);
      });
    });

    return Promise.all(imagePromises)
      .then(() => data);
  };

  const toJSON = (res) => res.json();

  class Loader {
    static loadData() {
      return fetch(`${Api.QUESTIONS}`)
        .then(checkStatus)
        .then(toJSON)
        .then(adaptServerData)
        .then(preloadImages);
    }

    static loadResults(name = DEFAULT_NAME) {
      return fetch(`${Api.STATS}${APP_ID}-${name}`)
        .then(checkStatus)
        .then(toJSON);
    }

    static saveResults(answers, lives, name = DEFAULT_NAME) {
      const data = Object.assign({}, {answers}, {lives});
      const requestSettings = {
        body: JSON.stringify(data),
        headers: {
          'Content-Type': `application/json`
        },
        method: `POST`
      };

      return fetch(`${Api.STATS}${APP_ID}-${name}`, requestSettings)
        .then(checkStatus);
    }
  }

  let levelData = null;

  class Application {
    static showIntro() {
      const intro = new IntroView();
      intro.onFadeOut = () => Application.showGreeting();
      intro.onPlayGameBtnClick = () => intro.hide();

      renderScreen(intro.element);
      Loader.loadData()
        .then((data) => {
          levelData = data;
        })
        .then(() => intro.hide())
        .catch(Application.showModalError);

    }

    static showGreeting() {
      const greeting = new GreetingView();
      greeting.onShowRulesBtnClick = () => Application.showRules();
      renderScreen(greeting.element);
    }

    static showRules() {
      const rules = new RulesView();
      rules.onBackBtnClick = () => Application.showModalConfirm();
      rules.onFormSubmit = (playerName) => Application.showGame(levelData, playerName);
      renderScreen(rules.element);
    }

    static showGame(data, playerName) {
      const model = new GameModel(data, playerName);
      const game = new GamePresenter(model);
      game.onBackBtnClick = () => Application.showGreeting();
      game.onEndGame = (state, player) => {
        Loader.saveResults(state.answers, state.lives, player)
          .then(() => Application.showStats(player))
          .catch(Application.showModalError);
      };
      renderScreen(game.element);
    }

    static showStats(playerName) {
      Loader.loadResults(playerName)
        .then((data) => {
          const stats = new StatsView(data);
          stats.onBackBtnClick = () => Application.showGreeting();
          renderScreen(stats.element);
        })
        .catch(Application.showModalError);
    }

    static showModalError(error) {
      const modalError = new ModalErrorView(error);
      mainScreen.appendChild(modalError.element);
    }

    static showModalConfirm() {
      const modalConfirm = new ModalConfirmView();
      modalConfirm.onBtnSubmitClick = () => Application.showGreeting();
      mainScreen.appendChild(modalConfirm.element);
    }
  }

  Application.showIntro();

}());

//# sourceMappingURL=main.js.map
