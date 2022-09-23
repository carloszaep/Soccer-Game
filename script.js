//html element
const playerContainer = document.querySelector(".player-container");

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

// get allPlayer data
const getData = await fetch("plyaerPremier.json");
const players = await getData.json();

// render players
const renderPlayerInfo = async function (playerNumber, lookingPlayer) {
  // get player country flag
  const flag = await getCountryFlags(
    players.data[playerNumber].player.nationality
  );

  // getting player info

  const playerName = players.data[playerNumber].player.name;

  const playerImg = players.data[playerNumber].player.photo;

  const playerAge = {
    age: players.data[playerNumber].player.age,
    equal:
      players.data[playerNumber].player.age ===
      players.data[lookingPlayer].player.age,
  };

  const playerPos = {
    pos: players.data[playerNumber].statistics[0].games.position,
    equal:
      players.data[playerNumber].statistics[0].games.position ===
      players.data[lookingPlayer].statistics[0].games.position,
    getPos: function () {
      if (this.pos === "Defender") return "DF";
      if (this.pos === "Midfielder") return "MD";
      if (this.pos === "Goalkeeper") return "GK";
      if (this.pos === "Attacker") return "FW";
    },
  };
  const playerNat = {
    nat: players.data[playerNumber].player.nationality,
    equal:
      players.data[playerNumber].player.nationality ===
      players.data[lookingPlayer].player.nationality,
  };

  const playerTeam = {
    team: players.data[playerNumber].statistics[0].team.name,
    equal:
      players.data[playerNumber].statistics[0].team.name ===
      players.data[lookingPlayer].statistics[0].team.name,
    logo: players.data[playerNumber].statistics[0].team.logo,
  };
  const playerLeague = {
    league: players.data[playerNumber].statistics[0].league.name,
    equal:
      players.data[playerNumber].statistics[0].league.name ===
      players.data[lookingPlayer].statistics[0].league.name,
    logo: players.data[playerNumber].statistics[0].league.logo,
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
};

let findPlayer = 5;

// html element
const inputGuess = document.querySelector(".input-guess");
const lookingPlayerContainer = document.querySelector(".search-container");

inputGuess.addEventListener("input", (e) => {
  lookingPlayerContainer.innerHTML = "";
  const value = e.target.value.toLowerCase();
  const playersToHtml = [];

  players.data.forEach((p, index) => {
    if (
      p.player.name.toLowerCase().includes(value) ||
      p.statistics[0].team.name.toLowerCase().includes(value) ||
      p.player.firstname.toLowerCase().includes(value) ||
      p.player.lastname.toLowerCase().includes(value)
    ) {
      const playerRender = {
        playerNumber: index,
        html: `<div class="search-card">
      <span class="search-name">${p.player.name}</span>
      <div class="search-team" style="background-image: url(${p.statistics[0].team.logo});"></div>
    </div>`,
      };

      playersToHtml.push(playerRender);
    }
  });

  if (playersToHtml.length > 20) {
    for (let card = 0; card < 19; card++) {
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

  // when click render player
  const card = document.querySelectorAll(".search-card");
  card.forEach((element, index) => {
    element.addEventListener("click", function () {
      renderPlayerInfo(playersToHtml[index].playerNumber, findPlayer);
      lookingPlayerContainer.innerHTML = "";
      e.target.value = "";
    });
  });

  if (!value) lookingPlayerContainer.innerHTML = "";
});
