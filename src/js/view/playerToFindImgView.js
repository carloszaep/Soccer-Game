import View from "./view.js";
import { numberOfGuesses } from "../config.js";

class playerToFindImgView extends View {
  _parentElement = document.querySelector(".guess-player");

  _message = "No Photo";

  removeTotalBlur(winOrLose) {
    const photo = this._parentElement.querySelector(".guess-player__img");
    const name = this._parentElement.querySelector(".guess-player__name");
    const showResult = this._parentElement.querySelector(".showResult");

    name.classList.toggle("hidden");
    showResult.classList.toggle("hidden");
    photo.style.filter = "none";

    showResult.innerHTML = `You ${winOrLose}`;
  }

  removeBlurImg(value) {
    const photo = this._parentElement.querySelector(".guess-player__img");
    photo.style.filter = `blur(${value}px)`;
  }

  _generateMarkup() {
    return ` <div class="guess-player__img" style="background-image: url(${
      this._data.playerToFind.photo
    }) ; filter: blur(${numberOfGuesses + 1 - this._data.guesses}px)">
    </div>
    <div class="guess-player__name hidden">${this._data.playerToFind.name}</div>
    <div class="showResult hidden"></div>

    
    `;
  }
}

export default new playerToFindImgView();
