export const checkForPlayerInput = function (stringInfo, value) {
  return stringInfo
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .includes(value);
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

export const getCountryFlags = async function (country) {
  try {
    const flags = await fetch(`https://countryflagsapi.com/png/${country}`);
    if (!flags) throw new Error("No Flag");
    return flags.url;
  } catch (err) {
    throw new Error(err);
  }
};
