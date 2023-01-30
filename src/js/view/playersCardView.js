import View from "./view.js";
import { getPos } from "../utility.js";
import country from "../../data/countryCode.json";

class playerCard extends View {
  _parentElement = document.querySelector(".guess-player__guesses-box");
  _searchForm = document.querySelector(".search-result");
  _inputSearch = document.querySelector(".search-input");

  _message = "";

  handlerEventClick(handler) {
    this._searchForm.addEventListener("click", function (e) {
      const itemResult = e.target.closest(".search-result__item");
      if (!itemResult) return;
      const id = +itemResult.dataset.id;
      handler(id);
    });
  }

  handlerEventUpDown(handler) {
    this._inputSearch.addEventListener("keyup", function (e) {
      const itemResults = document.querySelectorAll(".search-result__item");
      if (itemResults.length === 0) return;
      let key = "";

      if (e.key === "ArrowDown") key = "ArrowDown";
      if (e.key === "ArrowUp") key = "ArrowUp";
      if (e.key === "Enter") key = "Enter";

      handler(key, itemResults);
    });
  }

  _generateMarkup() {
    return this._data
      .reverse()
      .map((player) => {
        const backgroundColor = `style='background-color: var(--color-green)'`;
        let countryCode = country[player.playerGuessed.country];
        if (!countryCode) countryCode = player.playerGuessed.country;

        return `
        <div class="player-card">
        <h2 class="player-card__name">${player.playerGuessed.name}</h2>
        <div class="player-card__stat">

          <div class="player-card__stat--box" ${
            player.areTheSame.country ? backgroundColor : ""
          }>
          <img class="nat" src="https://flagicons.lipis.dev/flags/1x1/${countryCode.toLowerCase()}.svg" alt=${
          player.playerGuessed.country
        }>
            
          </div>
          <div class="player-card__stat--box" ${
            player.areTheSame.league ? backgroundColor : ""
          }>
            <span class="league" style="background-image: url(${
              player.playerGuessed.leagueLogo
            })"></span>
          </div>
          <div class="player-card__stat--box" ${
            player.areTheSame.team ? backgroundColor : ""
          }>
            <span class="team" style="background-image: url(${
              player.playerGuessed.teamLogo
            })"></span>
          </div>
          <div class="player-card__stat--box" ${
            player.areTheSame.position ? backgroundColor : ""
          }>
            <span class="position">${getPos(
              player.playerGuessed.position
            )}</span>
          </div>
          <div class="player-card__stat--box" ${
            player.areTheSame.age ? backgroundColor : ""
          }>
            <span class="age">${player.playerGuessed.age}</span>
          </div>
        </div>
      </div>
      `;
      })
      .join("");
  }
}

export default new playerCard();
