import View from "./view.js";

class searchView extends View {
  _parentElement = document.querySelector(".search-result");
  _inputSearch = document.querySelector(".search-input");

  _message = "No Matching";

  clearInput() {
    this._parentElement.innerHTML = "";
    this._inputSearch.value = "";
  }

  hiddenInputBox() {
    const inputBox = document.querySelector(".search");
    inputBox.classList.toggle("hidden");
  }

  handlerEventInput(handler) {
    this._inputSearch.addEventListener("input", function () {
      const value = this.value.toLowerCase();
      handler(value);
    });
  }

  _generateMarkup() {
    return this._data
      .map((player) => {
        return `<li class="search-result__item" data-id="${player.id}">
        <span class="search-result__name">${player.name}</span>
        <span class="search-result__team" style="background-image: url(${player.teamLogo})"></span>
      </li>
      `;
      })
      .join("");
  }
}

export default new searchView();
