const Tournament = require('../models/tournament');

const getTournament = async (req,res) => {
    var tournaments = await Tournament.findById(req.params.tournamentId)
    res.status(200)
    res.json(tournaments)
}

module.exports = { getTournament };