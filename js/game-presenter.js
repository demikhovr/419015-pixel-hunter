import HeaderView from './views/header-view';
import GameCommonView from './views/game/game-common-view';
import GameWideView from './views/game/game-wide-view';
import GameTripleView from './views/game/game-triple-view';
const ONE_SECOND = 1000;
const BLINK_TIME = 5;

export default class GamePresenter {
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

