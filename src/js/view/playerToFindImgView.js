import View from "./view.js";

class playerToFindImgView extends View {
  _parentElement = document.querySelector(".guess-player");

  _message = "";

  _generateMarkup() {
    return ` <div class="guess-player__img" style="background-image: url(${this._data.photo})"></div>

    
    `;
  }
}

export default new playerToFindImgView();
