import icons from "url:../../img/app-svg.svg";

export default class View {
  _data;

  /**
   * Render the received object to the DOM
   * @param {Object | Object[]} data the data to be render (e.g recipe)
   * @returns {undefined}
   * @this {Object} view instance
   */

  render(data) {
    /**
     * _parentElement  is always the element where we want to insert the html
     */

    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderMessage();
    this._data = data;

    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  _clear() {
    this._parentElement.innerHTML = "";
  }

  renderSpinner = function () {
    const markup = `  
      <div class="spinner">
      <svg>
      <use href="${icons}.svg#icon-loader"></use>
      </svg>
      </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  };

  renderError(errorMessage) {
    const markup = `
        <div class="error">
          <div>
            error 
          </div>
          <p>${errorMessage}</p>
        </div> `;

    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
  renderMessage(message = this._message) {
    const markup = `
        <div class="message">
          <div>            
          </div>
          <p>${message}</p>
        </div> `;

    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
}
