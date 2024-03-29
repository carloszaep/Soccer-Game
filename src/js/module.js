import { async } from "regenerator-runtime";
import { numberOfSearch } from "./config";
import { checkForPlayerInput, randomNumber, getCountryFlags } from "./utility";
import { numberOfGuesses } from "./config";

// this import is because i dont have a API yet had to use data from json module
import data from "../data/data.json";
import dataFavoritesPlayers from "../data/favoritesPlayers.json";

export const state = {
  players: {},
  game: { guessedPlayer: [], guesses: 1, playerToFind: {}, easy: true },
  favoritesPlayers: [],
  localUserGameData: {
    attempts: 1,
    success: 0,
    superHit: 0,
    average: 0,
    losses: 0,
    modeNormal: true,
    modeDark: false,
    modeBlack: false,
    colorPurple: true,
    colorBlue: false,
    colorGreen: false,
  },
};

//  is because i dont have a API yet had to use data from json module
const localStorageData = function (data, dataName) {
  localStorage.setItem(dataName, JSON.stringify(data));
};

export const init = function () {
  const players = localStorage.getItem("players");
  const game = localStorage.getItem("game");
  const favoritesPlayers = localStorage.getItem("favoritesPlayers");
  const localUserGameData = localStorage.getItem("localUserGameData");

  if (game) {
    state.game = JSON.parse(game);
  } else localStorageData(state.game, "game");
  if (favoritesPlayers) {
    state.favoritesPlayers = JSON.parse(favoritesPlayers);
  } else localStorageData(dataFavoritesPlayers, "favoritesPlayers");

  if (localUserGameData) {
    state.localUserGameData = JSON.parse(localUserGameData);
  }

  if (players) {
    state.players = JSON.parse(players);
    return;
  }
  localStorageData(data, "players");
};

init();

export const getPlayersForSearch = function (value) {
  const matchingPlayer = [];
  state.players.forEach((player) => {
    if (
      (checkForPlayerInput(player.name, value) ||
        checkForPlayerInput(player.firstname, value) ||
        checkForPlayerInput(player.team, value) ||
        checkForPlayerInput(player.lastname, value)) &&
      matchingPlayer.length < numberOfSearch
    ) {
      matchingPlayer.push(player);
    }
  });

  return matchingPlayer;
};

export const addPlayerToGuessed = function (id) {
  const playerGuessed = state.players.find((p) => p.id === id);
  const areTheSame = {
    team: state.game.playerToFind.team === playerGuessed.team ? true : false,
    league:
      state.game.playerToFind.league === playerGuessed.league ? true : false,
    country:
      state.game.playerToFind.country === playerGuessed.country ? true : false,
    age: state.game.playerToFind.age === playerGuessed.age ? true : false,
    position:
      state.game.playerToFind.position === playerGuessed.position
        ? true
        : false,
  };

  playerGuessed.countryFlag = getCountryFlags(playerGuessed.country);

  state.game.guessedPlayer.push({ playerGuessed, areTheSame });

  localStorageData(state.game, "game");
};

export const changeColors = function (color) {
  state.localUserGameData.colorBlue = false;
  state.localUserGameData.colorPurple = false;
  state.localUserGameData.colorGreen = false;
  if (color === "blue-color") {
    state.localUserGameData.colorBlue = true;
  }
  if (color === "green-color") {
    state.localUserGameData.colorGreen = true;
  }
  if (color === "purple-color") {
    state.localUserGameData.colorPurple = true;
  }
  state.localUserGameData.color = color;

  localStorageData(state.localUserGameData, "localUserGameData");
};
export const changeMode = function (mode) {
  state.localUserGameData.modeNormal = false;
  state.localUserGameData.modeBlack = false;
  state.localUserGameData.modeDark = false;
  if (mode === "normal-mode") {
    state.localUserGameData.modeNormal = true;
  }
  if (mode === "dark-mode") {
    state.localUserGameData.modeDark = true;
  }
  if (mode === "black-mode") {
    state.localUserGameData.modeBlack = true;
  }
  state.localUserGameData.mode = mode;
  localStorageData(state.localUserGameData, "localUserGameData");
};

export const checkForWinOrLose = function (btnNewGame) {
  const win = state.game.guessedPlayer.some((p) => {
    return p.playerGuessed.id === state.game.playerToFind.id;
  });

  if (win && state.game.guesses < numberOfGuesses) {
    if (state.game.guesses === 2) {
      state.localUserGameData.superHit += 1;
    }
    state.localUserGameData.success += 1;
    state.localUserGameData.average = (
      (state.localUserGameData.success / state.localUserGameData.attempts) *
      100
    ).toFixed(2);
    state.game.guessedPlayer = [];
    localStorageData(state.game, "game");
  }

  if ((!win && state.game.guesses >= numberOfGuesses) || btnNewGame) {
    state.localUserGameData.losses += 1;
    state.localUserGameData.attempts += 1;
    state.game.guessedPlayer = [];
    state.localUserGameData.average = (
      (state.localUserGameData.success / state.localUserGameData.attempts) *
      100
    ).toFixed(2);
    localStorageData(state.game, "game");
  }

  localStorageData(state.localUserGameData, "localUserGameData");

  return win;
};

export const changeGuesses = function (nGuesses) {
  state.game.guesses += nGuesses;
  localStorageData(state.game, "game");
};

export const restartGame = function () {
  state.game.guessedPlayer = [];
  state.game.guesses = 1;
  localStorageData(state.game, "game");
};

export const getRandomPlayerToFind = function () {
  if (state.game.easy) {
    // get a random index from favorites player
    const randomIndex = randomNumber(0, state.favoritesPlayers.length - 1);
    // get player to find  from ids favorites plyers
    const randomPlayerID = state.favoritesPlayers[randomIndex];

    // set player to find by same name
    state.game.playerToFind = state.players.find(
      (p) => p.id === randomPlayerID
    );
  } else {
    const randomIndex = randomNumber(0, state.players.length - 1);
    state.game.playerToFind = state.players[randomIndex];
  }

  state.game.easy = state.game.easy ? false : true;
  localStorageData(state.game, "game");
};
