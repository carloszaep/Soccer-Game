import View from "./view.js";

class playerToFindImgView extends View {
  _parentElement = document.querySelector(".guess-player");

  _message = "No Photo";

  removePhotoBurAndName() {
    const photo = this._parentElement.querySelector(".guess-player__img");
    const name = this._parentElement.querySelector(".guess-player__name");

    name.classList.toggle("hidden");
    photo.style.filter = "none";
  }

  _generateMarkup() {
    return ` <div class="guess-player__img" style="background-image: url(${this._data.photo})">
    </div>
    <div class="guess-player__name hidden">${this._data.name}</div>

    
    `;
  }
}

export default new playerToFindImgView();
