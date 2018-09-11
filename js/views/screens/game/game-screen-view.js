import HeaderView from '../../header-view';
import GameCommonView from './game-common-view';
import GameWideView from './game-wide-view';
import GameTripleView from './game-triple-view';
import {levels} from '../../../data/data';
import * as game from '../../../game';

export default class GameScreenView {
  constructor(state) {
    this.state = state;
    this._header = new HeaderView(this.state);
    this._header.onBackBtnClick = () => this.onBackBtnClick();
    this.root = document.createElement(`div`);
    this.root.appendChild(this._header.element);
    this.root.appendChild(this.gameLevel.element);
  }

  get element() {
    return this.root;
  }

  get gameLevel() {
    const isLastLevel = this.state.level === game.MAX_QUESTIONS;

    if (!this.state.lives || isLastLevel) {
      this.onEndGame(this.state);
    }

    switch (levels[this.state.level].type) {
      case `common`:
        this.game = new GameCommonView(levels[this.state.level], this.state.answers);
        break;
      case `wide`:
        this.game = new GameWideView(levels[this.state.level], this.state.answers);
        break;
      case `triple`:
        this.game = new GameTripleView(levels[this.state.level], this.state.answers);
        break;
    }

    this.game.onAnswer = (answer) => this._onAnswer(answer);

    return this.game;
  }

  updateGame() {
    this.root.innerHTML = ``;
    const newHeader = new HeaderView(this.state);
    newHeader.onBackBtnClick = () => this.onBackBtnClick();
    const newGame = this.gameLevel;
    this.root.appendChild(newHeader.element);
    this.root.appendChild(newGame.element);
  }

  _onAnswer(answer) {
    this.state.answers.push(answer);
    this.state = game.getUpdatedState(this.state, ++this.state.level, answer);
    this.updateGame();
  }

  onEndGame() {

  }

  onBackBtnClick() {

  }
}

