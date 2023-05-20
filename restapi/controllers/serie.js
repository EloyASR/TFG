const Serie = require('../models/serie');

const getSerie = async (req,res) => {
    var serie = await Serie.findById(req.params.serieId)
    res.status(200)
    res.json(serie);
}

const createSerie = async (req,res) => {
    var serie = req.body;

    await Match.collection.insertOne(serie);

    console.log(serie);
}

module.exports = { getSerie, createSerie};