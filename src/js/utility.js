export const checkForPlayerInput = function (stringInfo, value) {
  return stringInfo
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .includes(value);
};
export const checkForPlayerStartWith = function (stringInfo, value) {
  return stringInfo
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .startsWith(value);
};

export const getPos = function (pos) {
  if (pos === "Defender") return "DF";
  if (pos === "Midfielder") return "MD";
  if (pos === "Goalkeeper") return "GK";
  if (pos === "Attacker") return "FW";
};

export const randomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

export const getCountryFlags = function (country) {
  return `https://countryflagsapi.com/png/${country}`;
};

export const removeAndPutBorders = function (items, indexToBorder) {
  items.forEach((el) => (el.style.border = "none"));
  items[indexToBorder].style.border = "2px solid var(--color-grey-dark-3)";
};

export const upDownOptions = { itemSelect: 0, id: "", lastClick: "" };
export const auxiliaryRestartValue = function () {
  upDownOptions.itemSelect = 0;
  upDownOptions.id = "";
  upDownOptions.lastClick = "";
};

export const selectingId = function (items, down = true) {
  const lastItem = items.length - 1;
  upDownOptions.id = +items[upDownOptions.itemSelect].dataset.id;
  upDownOptions.itemSelect = down
    ? (upDownOptions.itemSelect += 1)
    : (upDownOptions.itemSelect -= 1);
  if (down) {
    upDownOptions.itemSelect =
      upDownOptions.itemSelect > lastItem ? 0 : upDownOptions.itemSelect;
    upDownOptions.lastClick = "ArrowDown";
  } else {
    upDownOptions.itemSelect =
      upDownOptions.itemSelect < 0 ? lastItem : upDownOptions.itemSelect;
    upDownOptions.lastClick = "ArrowUp";
  }
};
