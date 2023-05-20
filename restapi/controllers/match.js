const Match = require('../models/match');

const getMatch = async (req,res) => {
    var match = await Match.findById(req.params.matchId)
    res.status(200)
    res.json(match);
}

const getMatchs = async (req,res) => {
    var matches = await Match.find({_id: {$in: req.body.ids}})
    res.status(200);
    res.json(matches);
}

const createMatch = async (req,res) => {
    var match = req.body;

    await Match.collection.insertOne(match);

    console.log(match);
}

module.exports = { getMatch, createMatch, getMatchs};