import { numberOfGuesses } from "../../config";

const input = document.querySelector(".search-input");

export const changePlaceHolder = function (value) {
  input.placeholder = `guesses ${value}-${numberOfGuesses}`;
};
