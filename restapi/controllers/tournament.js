const Tournament = require('../models/tournament');
const Match = require('../models/match');
const Serie = require('../models/serie');

const getTournament = async (req, res) => {
    var tournaments = await Tournament.findById(req.params.tournamentId)
    res.status(200)
    res.json(tournaments)
}

const createTournament = async (req, res) => {
    var tournament = req.body;

    var tournamentWithSeriesAndMatches = {
        name: tournament.name,
        game: tournament.game,
        size: tournament.size,
        description: tournament.description,
        rules: tournament.rules,
        playersType: tournament.playersType,
        phases: [],
        online: tournament.online,
        inscription: tournament.inscription
    }

    for (var phase of tournament.phases) {
        var phaseWithSeriesAndMatches = {
            phaseOrder: phase.phaseOrder,
            formatType: phase.formatType,
            phaseName: phase.phaseName
        };

        switch (phase.formatType) {
            case "BRACKET_PHASE":
                var newBracketData = {
                    bestOf: phase.bracketData.bestOf,
                    size: phase.bracketData.size,
                    tieBreaker: phase.bracketData.tieBreaker,
                    rounds: []
                }

                for (var round of phase.bracketData.rounds) {

                    var newRound = {
                        roundNumber: round.roundNumber,
                        series: []
                    }

                    //CREAMOS LAS SERIES PARA CADA RONDA
                    for (var serie of round.series) {

                        var newSerie = {
                            bestOf: phase.bracketData.bestOf,
                            matches: []
                        }

                        await Serie.collection.insertOne(newSerie).then(result=> {
                            console.log(result.insertedId);
                            newRound.series.push(result.insertedId);
                        })
                    }

                    newBracketData.rounds.push(newRound);
                }
                phaseWithSeriesAndMatches.bracketData = newBracketData;
        }
        tournamentWithSeriesAndMatches.phases.push(phaseWithSeriesAndMatches);
    }


    await Tournament.collection.insertOne(tournamentWithSeriesAndMatches);

    console.log(tournamentWithSeriesAndMatches);
}

module.exports = { getTournament, createTournament };