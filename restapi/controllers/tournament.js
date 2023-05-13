const Tournament = require('../models/tournament');

const getTournament = async (req,res) => {
    var tournaments = await Tournament.findById(req.params.tournamentId)
    res.status(200)
    res.json(tournaments)
}

const createTournament = async (req,res) => {
    var tournamentData = req.body;

    torneo = {
        name: tournamentData.baseInfo.name,
        inscription: tournamentData.register.value,
        game: tournamentData.baseInfo.game,
        participants: tournamentData.baseInfo.size,
    }

    Tournament.collection.insertOne(torneo);

    console.log(torneo);
}

module.exports = { getTournament, createTournament };