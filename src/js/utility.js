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
