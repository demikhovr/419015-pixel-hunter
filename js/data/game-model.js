import {INITIAL_STATE} from '../data/data';
import * as game from '../game';

export default class GameModel {
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
    this._state = game.tick(this._state);
  }

  resetTimer() {
    this._state = Object.assign({}, this._state, {time: INITIAL_STATE.time});
  }

  onAnswer(answer) {
    this._state = game.addAnswer(this._state, answer);
    this._state = game.updateLives(this._state, answer);
    this._state = game.changeLevel(this._state, this._state.level + 1);
  }
}
