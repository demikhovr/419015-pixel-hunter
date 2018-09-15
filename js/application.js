import {mainScreen, renderScreen} from './utils/util';
import IntroScreen from './views/screens/intro-view';
import GreetingScreen from './views/screens/greeting-view';
import RulesScreen from './views/screens/rules-view';
import GameModel from './data/game-model';
import GamePresenter from './game-presenter';
import StatsScreen from './views/screens/stats-view';
import ModalError from './views/modal-error-view';
import Loader from './data/loader';

let levelData = null;



export default class Application {
  static showIntro() {
    const intro = new IntroScreen();
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
    const greeting = new GreetingScreen();
    greeting.onShowRulesBtnClick = () => Application.showRules();
    renderScreen(greeting.element);
  }

  static showRules() {
    const rules = new RulesScreen();
    rules.onBackBtnClick = () => Application.showGreeting();
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
        const stats = new StatsScreen(data);
        stats.onBackBtnClick = () => Application.showGreeting();
        renderScreen(stats.element);
      })
      .catch(Application.showModalError);
  }

  static showModalError(error) {
    const modalError = new ModalError(error);
    mainScreen.appendChild(modalError.element);
  }
}
