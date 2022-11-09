import View from "./view.js";
import { getPos } from "../utility.js";

class barContentView extends View {
  _parentElement = document.querySelector(".guess-player__guesses-box");
  _searchForm = document.querySelector(".search-result");

  _message = "";

  handlerEventClick(handler) {
    this._searchForm.addEventListener("click", function (e) {
      const itemResult = e.target.closest(".search-result__item");
      if (!itemResult) return;
      const id = +itemResult.dataset.id;
      handler(id);
    });
  }

  _generateMarkup() {
    return;
  }
}

export default new barContentView();
