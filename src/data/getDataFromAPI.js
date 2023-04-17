const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const optionsAPI = {
  method: "GET",
  headers: {},
};

// only change the league number
let optionToPlayer = { league: 61, season: 2022, page: 1 };

const leagueData = { data: [] };

const getPlayerData = async function () {
  const url = `https://api-football-v1.p.rapidapi.com/v3/players?league=${optionToPlayer.league}&season=${optionToPlayer.season}&page=${optionToPlayer.page}`;
  let res = await fetch(url, optionsAPI);
  let response = await res.json();

  for (let player of response.response) {
    leagueData.data.push(player);
  }

  console.log(optionToPlayer.page);
  console.log(response.paging.total);

  optionToPlayer.page = response.paging.current + 1;

  await wait(3);
  if (optionToPlayer.page !== response.paging.total) {
    getPlayerData();
  } else {
    const myJSON = JSON.stringify(leagueData);
    console.log(myJSON);
  }
};

//getPlayerData();
