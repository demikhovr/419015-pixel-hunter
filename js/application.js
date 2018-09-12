import {renderScreen} from './utils/util';
import IntroScreen from './views/screens/intro-view';
import GreetingScreen from './views/screens/greeting-view';
import RulesScreen from './views/screens/rules-view';
import GameModel from './data/game-model';
import GamePresenter from './game-presenter';
import StatsScreen from './views/screens/stats-view';

export default class Application {
  static showIntro() {
    const intro = new IntroScreen();
    intro.onPlayGameBtnClick = () => Application.showGreeting();
    renderScreen(intro.element);
  }

  static showGreeting() {
    const greeting = new GreetingScreen();
    greeting.onShowRulesBtnClick = () => Application.showRules();
    renderScreen(greeting.element);
  }

  static showRules() {
    const rules = new RulesScreen();
    rules.onFormSubmit = (playerName) => Application.showGame(playerName);
    renderScreen(rules.element);
  }

  static showGame(playerName) {
    const model = new GameModel(playerName);
    const game = new GamePresenter(model);
    game.onBackBtnClick = () => Application.showGreeting();
    game.onEndGame = (state) => Application.showStats(state);
    renderScreen(game.element);
  }

  static showStats(state) {
    const stats = new StatsScreen(state);
    stats.onBackBtnClick = () => Application.showGreeting();
    renderScreen(stats.element);
  }
}
