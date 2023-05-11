const fetch = require('node-fetch');
const { response, request } = require('express')
const { APIKEY } = process.env

const lolinfo = async (req, res) => {
    console.log(encodeURIComponent(req.body.user));
    console.log(req.body);
    var datos = await obtenerDatosLoL(encodeURIComponent(req.body.user));
    res.send(datos);
}

async function obtenerDatosLoL(criterio) {
    try {
        const res = await fetch('https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/' + criterio + '?api_key=' + APIKEY);

        if (res.status >= 400) {
            throw new Error("Bad response from server");
        }

        response_data = {};

        init_data = await res.json();
        console.log(init_data);

        response_data.name = init_data.name;
        response_data.id = init_data.id;
        response_data.profileIconId = init_data.profileIconId;
        response_data.summonerLevel = init_data.summonerLevel;

        mastery_data = await obtenerDatosLoLMaestrias(init_data.id);
        champions = await obtenerCampeones();

        masteries = [];

        mastery_data.forEach(element => {
            campeon_encontrado = null;
            for (var campeon in champions.data) {
                if (champions.data[campeon].key == element.championId) {
                    campeon_encontrado = champions.data[campeon];
                }
            }

            if (campeon_encontrado) {
                maestria = {
                    name: campeon_encontrado.id,
                    key: campeon_encontrado.key,
                    masteryLevel: element.championLevel,
                    masteryPoints: element.championPoints
                }

                masteries.push(maestria);
            }
        });

        response_data.masteries = masteries;

        ranked_data = await obtenerRankedValues(init_data.id);

        rankeds = [{}, {}];
        rankeds[0].queueType = "RANKED_SOLO_5x5";
        rankeds[0].ranked = false;
        rankeds[1].queueType = "RANKED_FLEX_SR";
        rankeds[1].ranked = false;

        for (var i = 0; i < 2; i++) {
            if (ranked_data[i]) {
                ranked = {};

                ranked.queueType = ranked_data[i].queueType;
                ranked.ranked = true;
                ranked.tier = ranked_data[i].tier;
                ranked.rank = ranked_data[i].rank;
                ranked.points = ranked_data[i].leaguePoints;
                ranked.losses = ranked_data[i].losses;
                ranked.wins = ranked_data[i].wins;
                ranked.rate = Math.round(ranked_data[i].wins / (ranked_data[i].wins + ranked_data[i].losses) * 100);
                if (ranked_data[i].miniSeries) {
                    ranked.miniSeries = ranked_data[i].miniSeries;
                }

                if (ranked_data[i].queueType === "RANKED_SOLO_5x5") {
                    rankeds[0] = ranked;
                } else if (ranked_data[i].queueType === "RANKED_FLEX_SR") {
                    rankeds[1] = ranked;
                }

            }
        }

        response_data.rankeds = rankeds;

        game_ids = await obtenerPartidasPorJugador(init_data.puuid, 0, 10);

        
        var partidas = [];

        var partidasPromises = await game_ids.map((src) => {
            return new Promise(function (resolve, reject) {
                obtenerDatosDePartida(src)
                    .then(
                        (value) => {
                            partidas.push(value);
                            resolve(200);
                        })
                    .catch((error)=>reject(400));
            });
        });

        

        await Promise.all(partidasPromises);

        response_data.games = [];

        for (var i = 0; i < game_ids.length; i++) {
            for(var j = 0; j < partidas.length; j++){
                if(partidas[j].metadata.matchId === game_ids[i]){
                    response_data.games.push(partidas[j]);
                }
            }
        }

        return response_data;

    } catch (err) {
        console.error(err);
    }
}

async function obtenerDatosLoLMaestrias(criterio) {
    try {
        const res = await fetch('https://euw1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/' + criterio + '/top?count=3&api_key=' + APIKEY);

        if (res.status >= 400) {
            throw new Error("Bad response from server");
        }

        data = await res.json();
        console.log(data);
        return data;

    } catch (err) {
        console.error(err);
    }
}

async function obtenerCampeones() {
    try {
        const res = await fetch('http://ddragon.leagueoflegends.com/cdn/13.6.1/data/en_US/champion.json');

        if (res.status >= 400) {
            throw new Error("Bad response from server");
        }

        data = await res.json();
        return data;

    } catch (err) {
        console.error(err);
    }
}

async function obtenerRankedValues(criterio) {
    try {
        const res = await fetch('https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/' + criterio + '?api_key=' + APIKEY);

        if (res.status >= 400) {
            throw new Error("Bad response from server");
        }

        data = await res.json();
        console.log(data);
        return data;

    } catch (err) {
        console.error(err);
    }
}

async function obtenerPartidasPorJugador(puuid, numeroPartidaInit, numeroPartidaEnd) {
    try {
        const res = await fetch('https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/' + puuid + '/ids?start=' + numeroPartidaInit + '&count=' + numeroPartidaEnd + '&api_key=' + APIKEY);

        if (res.status >= 400) {
            throw new Error("Bad response from server");
        }

        data = await res.json();
        console.log(data);
        return data;

    } catch (err) {
        console.error(err);
    }
}

async function obtenerDatosDePartida(matchId) {
    try {
        const res = await fetch('https://europe.api.riotgames.com/lol/match/v5/matches/' + matchId + '?api_key=' + APIKEY);

        if (res.status >= 400) {
            throw new Error("Bad response from server");
        }

        data = await res.json();
        return data;

    } catch (err) {
        console.error(err);
    }
}

module.exports = { lolinfo }