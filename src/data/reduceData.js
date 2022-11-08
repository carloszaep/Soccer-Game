import { async } from "regenerator-runtime";

const getCountryFlags = async function (country) {
  try {
    const flags = await fetch(`https://countryflagsapi.com/png/${country}`);
    if (!flags) throw new Error("can get this flag");
    return flags.url;
  } catch (err) {
    throw new Error(err);
  }
};

const getData = async function () {
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

  const newData = players.map(async (p) => {
    const flags = await fetch(
      `https://countryflagsapi.com/png/${p.player.nationality}`
    );

    return {
      id: p.player.id,
      name: p.player.name,
      firstname: p.player.firstname,
      lastname: p.player.lastname,
      age: p.player.age,
      country: p.player.nationality,
      photo: p.player.photo,
      team: p.statistics[0].team.name,
      teamLogo: p.statistics[0].team.logo,
      league: p.statistics[0].league.name,
      leagueLogo: p.statistics[0].league.logo,
      position: p.statistics[0].games.position,
      countryFlag: flags.url,
    };
  });

  // show data and tehn copy
  // console.log(newData);

  // get favorite players
};

getData();
