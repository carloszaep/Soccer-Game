import * as module from "./module";
import searchView from "./view/searchView";
import playersCard from "./view/playersCardView";
import playerToFindImgView from "./view/playerToFindImgView";
import { changePlaceHolder } from "./view/components/inputElement";
import { handlerEventBtn } from "./view/components/restartBtn";
import { numberOfGuesses } from "./config";
import { async } from "regenerator-runtime";

// document.querySelector("#search-input").addEventListener("input", function (e) {
//   console.log(e);
// });

const controlSearchShowResult = function (value) {
  const players = module.getPlayersForSearch(value);
  searchView.render(players);
  if (!value) searchView.clearInput();
};

const controlAddPlayerCard = async function (id) {
  // add search player to players guessed
  await module.addPlayerToGuessed(id);
  // render all playerCard and clear input
  playersCard.render(module.state.game.guessedPlayer);
  searchView.clearInput();
  // rest a guess from guesses and render in the placeholder
  module.changeGuesses(1);
  changePlaceHolder(module.state.game.guesses);
  // check for win
  if (module.checkForWinOrLose()) {
    playerToFindImgView.removePhotoBurAndName();
    searchView.hiddenInputBox();
  }
  // check for lose
  if (module.state.game.guesses >= numberOfGuesses) {
    playerToFindImgView.removePhotoBurAndName();
    searchView.hiddenInputBox();
  }
};

const controlLegalYear = function () {
  const el = document.querySelector(".leagl__year");
  const dateYear = new Date().getFullYear();
  el.innerHTML = dateYear;
};

const controlRestart = function () {
  module.getRandomPlayerToFind();
  module.restartGame();
  initGame();
};

const init = function () {
  // event listener
  handlerEventBtn(controlRestart);
  searchView.handlerEventInput(controlSearchShowResult);
  playersCard.handlerEventClick(controlAddPlayerCard);
  // get random plyer if there is not
  if (Object.keys(module.state.game.playerToFind).length === 0) {
    controlRestart();
  }

  // legal year
  controlLegalYear();
};

const initGame = function () {
  playerToFindImgView.render(module.state.game.playerToFind);
  playersCard.render(module.state.game.guessedPlayer);
  changePlaceHolder(module.state.game.guesses);
};

initGame();
module.init();
init();
