const btn = document.querySelector(".nav__btn");

export const handlerEventBtn = function (handler) {
  btn.addEventListener("click", function () {
    handler();
  });
};
