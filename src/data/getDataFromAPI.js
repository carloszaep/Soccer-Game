const fetch = require("node-fetch");
const fs = require("fs");

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const optionsAPI = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "your key",
    "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
  },
};

// only change the leagueID and leagueName for each league
const playerLeagueAndYear = {
  leagueID: 61,
  season: 2022,
  page: 1,
  leagueName: "premierLeague",
};

const finalData = [];

const getPlayerData = async function () {
  const { leagueName, leagueID, season, page } = playerLeagueAndYear;
  const url = `https://api-football-v1.p.rapidapi.com/v3/players?league=${leagueID}&season=${season}&page=${page}`;

  const req = await fetch(url, optionsAPI);
  const response = await req.json();

  for (const player of response.response) {
    finalData.push(player);
  }

  // see how mane page missing
  console.log(playerLeagueAndYear.page);
  console.log(response.paging.total);

  // move to next page
  playerLeagueAndYear.page++;

  // wait so no many petition for minutes
  await wait(3.5);

  //write the json file
  const jsonData = JSON.stringify(finalData);
  fs.writeFileSync(`${leagueName}.json`, jsonData);

  // if no last recurring the function
  if (playerLeagueAndYear.page !== response.paging.total) {
    getPlayerData();
  }
};

getPlayerData();
