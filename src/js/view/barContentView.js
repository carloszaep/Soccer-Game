import View from "./view.js";
import { getPos } from "../utility.js";

class barContentView extends View {
  _parentElement = document.querySelector(".bar-content");
  _barLinks = document.querySelector(".bar");
  _rendered = false;

  _message = "";

  render(data, link) {
    this._data = data;
    this._rendered = this._rendered ? false : true;

    let markup = "";
    if (link === "stats") {
      markup = this._renderStats();
    }
    if (link === "rule") {
      markup = this._renderRule();
    }
    if (link === "config") {
      markup = this._renderConfig();
    }

    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  removeHidden() {
    const element = this._parentElement;
    if (!this._rendered) {
      element.classList.add("noVisibleContent");
      element.classList.remove("visibleContent");
      this._clear();
    } else {
      element.classList.remove("noVisibleContent");
      element.classList.add("visibleContent");
    }
  }

  handlerEventClick(handler) {
    this._barLinks.addEventListener("click", function (e) {
      const barLink = e.target.closest(".bar__link");
      if (!barLink) return;
      const dataLink = barLink.dataset.link;
      handler(dataLink);
    });
  }

  _renderStats() {
    return `
    <h2 class="bar-content__text">Stats</h2>
    <div class="bar-content__stats">
    <div class="bar-content__stats--1">
      <h3>Attempts</h3>
      <span>${this._data.attempts}</span>
    </div>
    <div class="bar-content__stats--2">
      <h3>Success</h3>
      <span>${this._data.success}</span>
    </div>
    <div class="bar-content__stats--3">
      <h3>Average</h3>
      <span>${this._data.average}%</span>
    </div>
    <div class="bar-content__stats--4">
      <h3>SuperHit</h3>
      <span>${this._data.superHit}</span>
    </div>
  </div>`;
  }

  _renderRule() {
    return `
    <h2 class="bar-content__text">Rule</h2>
    <div class="bar-content__rule">
    <p class="bar-content__rule-text">
      Of the 5 major leagues in europe guess who is the soccer player by
      giving only a blur photo, don't worry if you don't do it on the
      first try, for every try if the player you thought have something in common, the aspect
      that they share will come out in <span class="bar-content__rule-green">green</span>, you have a limit of
      opportunities, do not waste them.
    </p>
  </div>`;
  }

  _renderConfig() {
    return `
    <h2 class="bar-content__text">Config</h2>
          <div class="bar-content__config">
            <div class="bar-content__config__mode">
              <h3>Mode</h3>
              <fieldset class="bar-content__config-inputs input-mode">
                <div>
                  <input
                    type="radio"
                    id="normal-mode"
                    name="mode-input"
                    value="normal-mode"
                    ${this._data.modeNormal ? "checked" : ""}
                   
                  />
                  <label for="normal-mode">Normal</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="dark-mode"
                    name="mode-input"
                    value="dark-mode"
                    ${this._data.modeDark ? "checked" : ""}
                  />
                  <label for="dark-mode">Dark</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="black-mode"
                    name="mode-input"
                    value="black-mode"
                    ${this._data.modeBlack ? "checked" : ""}
                  />
                  <label for="black-mode">Black</label>
                </div>
              </fieldset>
            </div>
            <div class="bar-content__config__colors">
              <h3>Colors</h3>

              <fieldset class="bar-content__config-inputs input-colors">
                <div>
                  <input
                  
                    type="radio"
                    id="purple-color"
                    name="color-input"
                    value="purple-color"
                    ${this._data.colorPurple ? "checked" : ""}
                  />
                  <label for="purple-color">Purple</label>
                </div>

                <div>
                  <input
                  
                    type="radio"
                    id="blue-color"
                    name="color-input"
                    value="blue-color"
                    ${this._data.colorBlue ? "checked" : ""}
                  />
                  <label for="blue-color">Blue</label>
                </div>

                <div>
                  <input
                  
                    type="radio"
                    id="green-color"
                    name="color-input"
                    value="green-color"
                    ${this._data.colorGreen ? "checked" : ""}
                  />
                  <label for="green-color">Green</label>
                </div>
              </fieldset>
            </div>
          </div>
    
    `;
  }

  inputColors(handler) {
    const radio = document.querySelector(".input-colors");
    if (!radio) return;

    radio.addEventListener("change", function (a) {
      const input = a.target.closest("input[type=radio]");

      handler(input.value);
    });
  }
  inputMode(handler) {
    const radio = document.querySelector(".input-mode");
    if (!radio) return;

    radio.addEventListener("change", function (a) {
      const input = a.target.closest("input[type=radio]");
      console.log(input.value);
      handler(input.value);
    });
  }

  // _generateMarkup() {
  //   return ``;
  // }
}

export default new barContentView();
