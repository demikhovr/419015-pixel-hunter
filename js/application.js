import {root, renderScreen} from './utils/util';
import IntroScreen from './views/screens/intro-view';
import GreetingScreen from './views/screens/greeting-view';
import RulesScreen from './views/screens/rules-view';
import GameModel from './data/game-model';
import GamePresenter from './game-presenter';
import StatsScreen from './views/screens/stats-view';
import ModalError from './views/modal-error-view';
import ModalConfirm from './views/modal-confirm-view';
import Loader from './data/loader';

let levelData = null;

export default class Application {
  static async showIntro() {
    const intro = new IntroScreen();
    intro.onFadeOut = () => Application.showGreeting();
    intro.onPlayGameBtnClick = () => intro.hide();
    renderScreen(intro.element);
    try {
      levelData = await Loader.loadData();
      intro.hide();
    } catch (e) {
      Application.showModalError(e);
    }
  }

  static showGreeting() {
    const greeting = new GreetingScreen();
    greeting.onShowRulesBtnClick = () => Application.showRules();
    renderScreen(greeting.element);
  }

  static showRules() {
    const rules = new RulesScreen();
    rules.onBackBtnClick = () => Application.showModalConfirm();
    rules.onFormSubmit = (playerName) => Application.showGame(levelData, playerName);
    renderScreen(rules.element);
  }

  static showGame(data, playerName) {
    const model = new GameModel(data, playerName);
    const game = new GamePresenter(model);
    game.onBackBtnClick = () => Application.showGreeting();
    game.onEndGame = async (state, player) => {
      try {
        await Loader.saveResults(state.answers, state.lives, player);
        Application.showStats(player);
      } catch (e) {
        Application.showModalError(e);
      }
    };
    renderScreen(game.element);
  }

  static async showStats(playerName) {
    try {
      const statsData = await Loader.loadResults(playerName);
      const stats = new StatsScreen(statsData);
      stats.onBackBtnClick = () => Application.showGreeting();
      renderScreen(stats.element);
    } catch (e) {
      Application.showModalError(e);
    }
  }

  static showModalError(error) {
    const modalError = new ModalError(error);
    root.appendChild(modalError.element);
  }

  static showModalConfirm() {
    const modalConfirm = new ModalConfirm();
    modalConfirm.onBtnSubmitClick = () => Application.showGreeting();
    root.appendChild(modalConfirm.element);
  }
}
