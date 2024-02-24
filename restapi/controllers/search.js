const Tournament = require('../models/tournament');

const getTournaments = async (req, res) => {
    var tournaments = await Tournament.find({})
    res.status(200)
    res.json(tournaments)
}

module.exports = { getTournaments };