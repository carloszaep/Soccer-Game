import View from "./view.js";
import { getPos } from "../utility.js";

class playerCard extends View {
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
    return this._data
      .reverse()
      .map((player) => {
        const backgroundColor = `style='background-color: var(--color-green)'`;
        return `
      <div class="player-card">
        <h2 class="player-card__name">${player.playerGuessed.name}</h2>
        <div class="player-card__stat">

          <div class="player-card__stat--box" ${
            player.areTheSame.country ? backgroundColor : ""
          }>
            <span class="nat" style="background-image: url(${
              player.playerGuessed.countryFlag
            })"></span>
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
