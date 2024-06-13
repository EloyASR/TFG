const fetch = require('node-fetch');

const APIKEY = process.env.RIOT_APIKEY;
const RIOT_ACCOUNT_QUERY = process.env.RIOT_ACCOUNT_QUERY;
const SUMMONER_ACCOUNT_QUERY = process.env.SUMMONER_ACCOUNT_QUERY;
const MASTERY_QUERY = process.env.MASTERY_QUERY;
const RANKEDS_QUERY = process.env.RANKEDS_QUERY;
const CHAMPIONS_QUERY = process.env.CHAMPIONS_QUERY;
const GAMES_QUERY = process.env.GAMES_QUERY;
const GAME_QUERY = process.env.GAME_QUERY;

const getAccountData = async (req, res) => {

    let userid = encodeURIComponent(req.body.userid);
    let tag = encodeURIComponent(req.body.tagline);

    console.log(userid, tag);

    try{
        let result01 = await fetch(RIOT_ACCOUNT_QUERY + userid + "/" + tag + "?api_key=" + APIKEY);
        let accountData = await result01.json();

        let puuid = encodeURIComponent(accountData.puuid);

        let result02 = await fetch(SUMMONER_ACCOUNT_QUERY + puuid + "?api_key=" + APIKEY)
        let summonerData = await result02.json();

        let dataToSend = {
            puuid: accountData.puuid,
            gameName: accountData.gameName,
            tagLine: accountData.tagLine,
            summonerId:summonerData.id,
            accountId: summonerData.accountId
        }

        console.log(dataToSend);

        res.status(200);
        return res.send(dataToSend);
    }catch(e){
        res.status(400);
        return res.send({msg:"Error al encontrar info de la cuenta"});
    }
}

const getProfileData = async (req, res) => {

    let puuid = encodeURIComponent(req.body.puuid);
    let summonerId = encodeURIComponent(req.body.summonerId);

    let profileData = {}

    let result = await fetch(SUMMONER_ACCOUNT_QUERY + puuid + "?api_key=" + APIKEY)
    let summonerData = await result.json();

    profileData.name = summonerData.name;
    profileData.id = summonerData.id;
    profileData.profileIconId = summonerData.profileIconId;
    profileData.summonerLevel = summonerData.summonerLevel;

    let masteryData = await getMastery(puuid,3);
    let championsData = await getChampions();

    let maestrias = [];

    masteryData.forEach(element => {

        let championFound = null;

        for (let champion in championsData.data) {
            if (championsData.data[champion].key == element.championId) {
                championFound= championsData.data[champion];
            }
        }

        if (championFound) {
            let mastery = {
                name: championFound.id,
                key: championFound.key,
                masteryLevel: element.championLevel,
                masteryPoints: element.championPoints
            }

            maestrias.push(mastery);
        }
    });

    profileData.masteries = maestrias;

    let rankedData = await getRankedValues(summonerId);

    let clasificatorias = [{}, {}];
    clasificatorias[0].queueType = "RANKED_SOLO_5x5";
    clasificatorias[0].ranked = false;
    clasificatorias[1].queueType = "RANKED_FLEX_SR";
    clasificatorias[1].ranked = false;

    for (let i = 0; i < 2; i++) {
        if (rankedData[i]) {
            let clasificatoria = {};

            clasificatoria.queueType = rankedData[i].queueType;
            clasificatoria.ranked = true;
            clasificatoria.tier = rankedData[i].tier;
            clasificatoria.rank = rankedData[i].rank;
            clasificatoria.points = rankedData[i].leaguePoints;
            clasificatoria.losses = rankedData[i].losses;
            clasificatoria.wins = rankedData[i].wins;
            clasificatoria.rate = Math.round(rankedData[i].wins / (rankedData[i].wins + rankedData[i].losses) * 100);
            if (rankedData[i].miniSeries) {
                clasificatoria.miniSeries = rankedData[i].miniSeries;
            }

            if (rankedData[i].queueType === "RANKED_SOLO_5x5") {
                clasificatorias[0] = clasificatoria;
            } else if (rankedData[i].queueType === "RANKED_FLEX_SR") {
                clasificatorias[1] = clasificatoria;
            }

        }
    }

    profileData.rankeds = clasificatorias;

    res.status(200);
    return res.send(profileData);
}

const getGamesData = async (req, res) => {

    try {
        let puuid = encodeURIComponent(req.body.puuid);

        let gamesData = {};

        let gameIds = await getGamesIds(puuid, 0, 5);

        let partidas = [];

        let partidasPromises = await gameIds.map((src) => {
            return new Promise(function (resolve, reject) {
                getGameData(src)
                    .then(
                        (value) => {
                            partidas.push(value);
                            resolve(200);
                        })
                    .catch((error)=>reject(400));
            });
        });

        await Promise.all(partidasPromises);

        gamesData.games = [];

        for (let i = 0; i < gameIds.length; i++) {
            for(let j = 0; j < partidas.length; j++){
                if(partidas[j].metadata.matchId === gameIds[i]){
                    gamesData.games.push(partidas[j]);
                }
            }
        }

        res.status(200);
        return res.send(gamesData);
    }catch(e){
        res.status(400);
        return res.send("Demasiadas peticiones a la API de RIOT")
    }
}

async function getMastery(puuid, top) {
    try {
        let res = await fetch(MASTERY_QUERY + puuid + '/top?count=' + top + '&api_key=' + APIKEY);

        if (res.status >= 400) {
            throw new Error("Bad response from server");
        }

        let data = await res.json();
        return data;

    } catch (err) {
        throw err;
    }
}

async function getChampions() {
    try {
        let res = await fetch(CHAMPIONS_QUERY);

        if (res.status >= 400) {
            throw new Error("Bad response from server");
        }

        let data = await res.json();
        return data;

    } catch (err) {
        throw err;
    }
}

async function getRankedValues(summonerId) {
    try {
        let res = await fetch(RANKEDS_QUERY + summonerId + '?api_key=' + APIKEY);

        if (res.status >= 400) {
            throw new Error("Bad response from server");
        }

        let data = await res.json();
        return data;

    } catch (err) {
        throw err;
    }
}

async function getGamesIds(puuid, numeroPartidaInit, numeroPartidaEnd) {
    try {
        let res = await fetch(GAMES_QUERY + puuid + '/ids?start=' + numeroPartidaInit + '&count=' + numeroPartidaEnd + '&api_key=' + APIKEY);

        if (res.status >= 400) {
            throw new Error("Bad response from server");
        }

        let data = await res.json();
        console.log(data);
        return data;

    } catch (err) {
        throw err;
    }
}

async function getGameData(matchId) {
    try {
        let res = await fetch(GAME_QUERY + matchId + '?api_key=' + APIKEY);

        if (res.status >= 400) {
            throw new Error("Bad response from server");
        }

        let data = await res.json();
        return data;

    } catch (err) {
        throw err;
    }
}

module.exports = {getAccountData, getProfileData, getGamesData}