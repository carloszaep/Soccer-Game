import * as module from "./module";
import searchView from "./view/searchView";
import playersCard from "./view/playersCardView";
import playerToFindImgView from "./view/playerToFindImgView";
import barContentView from "./view/barContentView";
import { changePlaceHolder } from "./view/components/inputElement";
import { handlerEventBtn } from "./view/components/restartBtn";
import { numberOfGuesses } from "./config";
import { removeAndPutBorders } from "./utility";
import {
  changeRootColor,
  changeRootModeColors,
} from "./view/components/colorsInput";
import { async } from "regenerator-runtime";

const controlSearchShowResult = function (value) {
  const players = module.getPlayersForSearch(value);
  searchView.render(players);
  if (!value) searchView.clearInput();
};

const upDownOptions = { itemSelect: 0, id: "", lastClick: "" };
const auxiliaryRestartValue = function () {
  upDownOptions.itemSelect = 0;
  upDownOptions.id = "";
  upDownOptions.lastClick = "";
};

const selectingId = function (items, down = true) {
  const lastItem = items.length - 1;
  upDownOptions.id = +items[upDownOptions.itemSelect].dataset.id;

  upDownOptions.itemSelect = down
    ? (upDownOptions.itemSelect += 1)
    : (upDownOptions.itemSelect -= 1);
  if (down) {
    upDownOptions.itemSelect =
      upDownOptions.itemSelect > lastItem ? 0 : upDownOptions.itemSelect;
    upDownOptions.lastClick = "ArrowDown";
  } else {
    upDownOptions.itemSelect =
      upDownOptions.itemSelect < 0 ? lastItem : upDownOptions.itemSelect;
    upDownOptions.lastClick = "ArrowUp";
  }
};

const controlAddPlayerCardWithUpDown = function (key, items) {
  /**
   * render border to see what element is select and renter player by id
   * @key {string | "keyPress"} get the key that is press
   * @items {Object => []}
   * @return {none} none
   */

  const lastItem = items.length - 1;
  if (key === "ArrowDown") {
    if (upDownOptions.lastClick === "ArrowUp") {
      upDownOptions.itemSelect += 2;
      upDownOptions.itemSelect =
        upDownOptions.itemSelect > lastItem ? 1 : upDownOptions.itemSelect;
    }
    removeAndPutBorders(items, upDownOptions.itemSelect);
    selectingId(items, true);
  }

  if (key === "ArrowUp") {
    if (upDownOptions.lastClick === "ArrowDown") {
      upDownOptions.itemSelect -= 2;
      upDownOptions.itemSelect =
        upDownOptions.itemSelect < 0 ? lastItem - 1 : upDownOptions.itemSelect;
    }
    // remove all borders
    removeAndPutBorders(items, upDownOptions.itemSelect);
    selectingId(items, false);
  }

  if (key === "Enter") {
    // -1 because is a array
    if (items.length === 1) {
      controlAddPlayerCard(+items[0].dataset.id);
      auxiliaryRestartValue();
      return;
    }
    controlAddPlayerCard(upDownOptions.id);
    auxiliaryRestartValue();
  }

  if (key !== "Enter" && key !== "ArrowUp" && key !== "ArrowDown") {
    auxiliaryRestartValue();
  }
};

const controlAddPlayerCard = function (id) {
  // add search player to players guessed
  module.addPlayerToGuessed(id);
  // render all playerCard and clear input
  playersCard.render(module.state.game.guessedPlayer);
  searchView.clearInput();
  // rest a guess from guesses and render in the placeholder and remove img blur
  playerToFindImgView.removeBlurImg(
    numberOfGuesses - module.state.game.guesses
  );
  module.changeGuesses(1);
  changePlaceHolder(module.state.game.guesses);
  // check for win
  if (module.checkForWinOrLose()) {
    playerToFindImgView.removeTotalBlur("Win");
    searchView.hiddenInputBox();
  }
  // check for lose
  if (module.state.game.guesses >= numberOfGuesses) {
    playerToFindImgView.removeTotalBlur("Lose");
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
  module.checkForWinOrLose(true);
  initGame();
};

const controlColorChange = function (color) {
  module.changeColors(color);
  changeRootColor(color);
};

const controlModeChange = function (mode) {
  module.changeMode(mode);
  changeRootModeColors(mode);
};

const controlBarItem = function (link) {
  barContentView.render(module.state.localUserGameData, link);
  barContentView.removeHidden();
  barContentView.inputColors(controlColorChange);
  barContentView.inputMode(controlModeChange);
};

const init = function () {
  // event listener

  handlerEventBtn(controlRestart);
  searchView.handlerEventInput(controlSearchShowResult);
  playersCard.handlerEventClick(controlAddPlayerCard);
  // for now had to remove the up and down function
  // playersCard.handlerEventUpDown(controlAddPlayerCardWithUpDown);
  barContentView.handlerEventClick(controlBarItem);

  // get random plyer if there is not
  if (Object.keys(module.state.game.playerToFind).length === 0) {
    controlRestart();
  }

  // color
  controlColorChange(module.state.localUserGameData.color);
  controlModeChange(module.state.localUserGameData.mode);
  // legal year (no for now)

  controlLegalYear();
};

const initGame = function () {
  playerToFindImgView.render(module.state.game);
  playersCard.render(module.state.game.guessedPlayer);
  changePlaceHolder(module.state.game.guesses);
};

initGame();
module.init();
init();
