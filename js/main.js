import {renderScreen} from './utils/util';
import IntroView from './views/screens/intro-view';
import GreetingView from './views/screens/greeting-view';
import RulesView from './views/screens/rules-view';
import GameScreenView from './views/screens/game/game-screen-view';
import StatsView from './views/screens/stats-view';
import {INITIAL_STATE} from "./data/data";

const intro = new IntroView();
intro.onPlayGameBtnClick = () => renderScreen(greeting.element);
renderScreen(intro.element);

const greeting = new GreetingView();
greeting.onShowRulesBtnClick = () => renderScreen(rules.element);

const rules = new RulesView();
rules.onBackBtnClick = () => renderScreen(greeting.element);
rules.onFormSubmit = () => renderScreen(game.element);

const game = new GameScreenView(Object.assign({}, INITIAL_STATE));
game.onBackBtnClick = () => renderScreen(greeting.element);
game.onEndGame = (state) => {
  const stats = new StatsView(state);
  stats.onBackBtnClick = () => renderScreen(greeting.element);
  renderScreen(stats.element);
};
