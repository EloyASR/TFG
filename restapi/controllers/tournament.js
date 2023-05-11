const Tournament = require('../models/tournament');

const getTournament = async (req,res) => {
    var tournaments = await Tournament.findById(req.params.tournamentId)
    res.status(200)
    res.json(tournaments)
}

const createTournament = async (req,res) => {
    var torneo = req.body;
    
}

module.exports = { getTournament };