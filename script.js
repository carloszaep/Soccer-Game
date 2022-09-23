//html element
const playerContainer = document.querySelector(".player-container");
const lookingImg = document.querySelector(".looking-img");
const lookingName = document.querySelector(".looking-name");
const playerToFindPos = document.querySelector("#player-toFind-pos");
const playerToFindAge = document.querySelector("#player-toFind-age");
const playerToFindNat = document.querySelector("#player-toFind-nat");
const playerToFindTeam = document.querySelector("#player-toFind-team");
const playerToFindLeague = document.querySelector("#player-toFind-league");
const inputGuess = document.querySelector(".input-guess");
const lookingPlayerContainer = document.querySelector(".search-container");

// auxiliary functions
const getCountryFlags = async function (country) {
  try {
    const flags = await fetch(`https://countryflagsapi.com/png/${country}`);
    if (!flags) throw new Error("can get this flag");
    return flags.url;
  } catch (err) {
    console.error(err.message);
  }
};

// prettier-ignore
const addRemToFindPlayer = function (
  toEqual,
  toChange,
  ChangeTo,
  background = false
) {
  if (
    !(
      toEqual &&
      toChange.textContent === "" &&
      toChange.style.backgroundImage === ""
    )
  )
    return;
  if (!background) {
    toChange.textContent = ChangeTo;
    
    
  } else {toChange.style.backgroundImage = `url(${String(ChangeTo)})`
  }
  
  

  toChange.classList.remove("incorrect");
};

const getRandomNum = function (min, max) {
  return Math.floor(Math.random() * max) + min;
};
const checkForPlayerInput = function (stringInfo, value) {
  return stringInfo
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .includes(value);
};

// get allPlayer data
const PremierData = await fetch("plyaerPremier.json");
const LaLigaData = await fetch("playerSpain.json");
const SerieAData = await fetch("playerSerieA.json");
const BundesData = await fetch("plyerBundes.json");
const League1Data = await fetch("playerLeague1.json");
const a = await PremierData.json();
const b = await LaLigaData.json();
const c = await SerieAData.json();
const d = await BundesData.json();
const e = await League1Data.json();

const players = [...a.data, ...b.data, ...c.data, ...d.data, ...e.data];

// local variables
let findPlayer = getRandomNum(0, players.length);
let guessNumber = 1;
let playersToHtml = [];

// init function
const renderLookingP = function () {
  lookingImg.style.backgroundImage = `url(${players[findPlayer].player.photo})`;
};
renderLookingP();

// render players
const renderPlayerInfo = async function (playerNumber, lookingPlayer) {
  // get player country flag
  const flag = await getCountryFlags(players[playerNumber].player.nationality);

  // getting player info

  const playerName = players[playerNumber].player.name;

  const playerImg = players[playerNumber].player.photo;

  const playerAge = {
    age: players[playerNumber].player.age,
    equal:
      players[playerNumber].player.age === players[lookingPlayer].player.age,
  };

  const playerPos = {
    pos: players[playerNumber].statistics[0].games.position,
    equal:
      players[playerNumber].statistics[0].games.position ===
      players[lookingPlayer].statistics[0].games.position,
    getPos: function () {
      if (this.pos === "Defender") return "DF";
      if (this.pos === "Midfielder") return "MD";
      if (this.pos === "Goalkeeper") return "GK";
      if (this.pos === "Attacker") return "FW";
    },
  };
  const playerNat = {
    nat: players[playerNumber].player.nationality,
    equal:
      players[playerNumber].player.nationality ===
      players[lookingPlayer].player.nationality,
  };

  const playerTeam = {
    team: players[playerNumber].statistics[0].team.name,
    equal:
      players[playerNumber].statistics[0].team.name ===
      players[lookingPlayer].statistics[0].team.name,
    logo: players[playerNumber].statistics[0].team.logo,
  };
  const playerLeague = {
    league: players[playerNumber].statistics[0].league.name,
    equal:
      players[playerNumber].statistics[0].league.name ===
      players[lookingPlayer].statistics[0].league.name,
    logo: players[playerNumber].statistics[0].league.logo,
  };
  // create the html

  const html = `<div class="player">
    <div class="player-id">
      <div class="player-name">${playerName}</div>
      <div class="player-img ${
        playerNumber === lookingPlayer ? "" : "incorrect"
      }" style="background-image: url(${playerImg});"></div>
    </div>

    <div class="player-age">
      <div class="age">Age</div>
      <div class="age-logo ${playerAge.equal ? "" : "incorrect"}">${
    playerAge.age
  }</div>

    </div>
    <div class="player-pos">
          <div class="pos-text">${playerPos.pos}</div>
          <div class="pos-logo ${
            playerPos.equal ? "" : "incorrect"
          }">${playerPos.getPos()}</div>
    </div>

    <div class="player-nationality">
      <div class="country">${playerNat.nat}</div>
      <div class="country-flag ${
        playerNat.equal ? "" : "incorrect"
      }" style="background-image: url(${flag});"></div>
    </div>

    <div class="player-team">
      <div class="team-text">${playerTeam.team}</div>
      <div class="team-logo ${
        playerTeam.equal ? "" : "incorrect"
      }" style="background-image: url(${playerTeam.logo});"></div>
    </div>
    
    <div class="player-league">
      <div class="league-text">${playerLeague.league}</div>
      <div class="league-logo ${
        playerLeague.equal ? "" : "incorrect"
      }" style="background-image: url(${playerLeague.logo});"></div>
    </div>
  </div>`;
  // append to the document
  playerContainer.insertAdjacentHTML("afterend", html);
  // change player to find info
  if (guessNumber <= 10) {
    if (playerNumber === lookingPlayer) {
      lookingImg.classList.remove("blur");
      lookingName.textContent = playerName;
      alert("nice done you get it");
    }
    addRemToFindPlayer(playerAge.equal, playerToFindAge, playerAge.age);
    addRemToFindPlayer(playerPos.equal, playerToFindPos, playerPos.getPos());
    addRemToFindPlayer(playerNat.equal, playerToFindNat, flag, true);
    addRemToFindPlayer(
      playerTeam.equal,
      playerToFindTeam,
      playerTeam.logo,
      true
    );
    addRemToFindPlayer(
      playerLeague.equal,
      playerToFindLeague,
      playerLeague.logo,
      true
    );
  } else {
    lookingImg.classList.remove("blur");
    lookingName.textContent = playerName;
    alert("you lose");
  }
};

inputGuess.addEventListener("input", (e) => {
  lookingPlayerContainer.innerHTML = "";
  playersToHtml = [];
  const value = e.target.value.toLowerCase();

  // add object to playerHTML with all info and html
  players.forEach((p, index) => {
    if (
      checkForPlayerInput(p.player.name, value) ||
      checkForPlayerInput(p.statistics[0].team.name, value) ||
      checkForPlayerInput(p.player.firstname, value) ||
      checkForPlayerInput(p.player.lastname, value)
    ) {
      const playerRender = {
        html: `<div class="search-card search-name" data-id="${index}">
      <span class="search-name" data-id="${index}">${p.player.name}</span>
      <div class="search-team" style="background-image: url(${p.statistics[0].team.logo});"></div>
    </div>`,
      };
      playersToHtml.push(playerRender);
    }
  });

  // add the html card to container if has less that 20 then only render what it have
  if (playersToHtml.length > 34) {
    for (let card = 0; card < 34; card++) {
      lookingPlayerContainer.insertAdjacentHTML(
        "beforeend",
        playersToHtml[card].html
      );
    }
  } else {
    for (let c of playersToHtml) {
      lookingPlayerContainer.insertAdjacentHTML("beforeend", c.html);
    }
  }

  if (!value) lookingPlayerContainer.innerHTML = "";
});

lookingPlayerContainer.addEventListener("click", (e) => {
  if (!e.target.classList.contains("search-name")) return;
  const clicked = e.target.closest(".search-name");
  renderPlayerInfo(+clicked.getAttribute("data-id"), findPlayer);
  guessNumber++;
  inputGuess.placeholder = `GUESS ${guessNumber}-10`;
  lookingPlayerContainer.innerHTML = "";
  inputGuess.value = "";
});
