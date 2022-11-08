import { async } from "regenerator-runtime";
import { numberOfSearch } from "./config";
import { checkForPlayerInput, randomNumber, getCountryFlags } from "./utility";

// this import is because i dont have a API yet had to use data from json module
import data from "../data/data.json";

export const state = {
  players: {},
  game: { guessedPlayer: [], guesses: 1, playerToFind: {} },
};

//  is because i dont have a API yet had to use data from json module
const localStorageData = function (data, dataName) {
  localStorage.setItem(dataName, JSON.stringify(data));
};

const init = function () {
  const players = localStorage.getItem("players");
  const game = localStorage.getItem("game");

  if (game) {
    state.game = JSON.parse(game);
  }

  if (players) {
    state.players = JSON.parse(players);
    return;
  }
  localStorageData(data, "players");
  localStorageData(state.game, "game");
};

init();

export const getPlayersForSearch = function (value) {
  const matchingPlayer = [];
  state.players.forEach((player) => {
    if (
      (checkForPlayerInput(player.name, value) ||
        checkForPlayerInput(player.firstname, value) ||
        checkForPlayerInput(player.lastname, value)) &&
      matchingPlayer.length < numberOfSearch
    ) {
      matchingPlayer.push(player);
    }
  });

  return matchingPlayer;
};

export const addPlayerToGuessed = async function (id) {
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

  playerGuessed.countryFlag = await getCountryFlags(playerGuessed.country);

  state.game.guessedPlayer.push({ playerGuessed, areTheSame });

  localStorageData(state.game, "game");
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
  const randomIndex = randomNumber(0, state.players.length - 1);
  state.game.playerToFind = state.players[randomIndex];
  localStorageData(state.game, "game");
};
