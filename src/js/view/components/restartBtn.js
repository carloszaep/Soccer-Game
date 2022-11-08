const btn = document.querySelector(".nav__btn");

export const handlerEventBtn = function (handler) {
  btn.addEventListener("click", function () {
    const inputBox = document.querySelector(".search");
    if (inputBox.classList.contains("hidden")) {
      inputBox.classList.remove("hidden");
    }
    handler();
  });
};
