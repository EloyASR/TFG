const mongoose = require('mongoose');

const serieIds = [
    "65e0f577fc13ae063acd367e" //SERIE 1
]

const series = [
    {
        _id: new mongoose.mongo.ObjectId("65e0f577fc13ae063acd367e"),
        type: "5VS5",
        mode: "TOURNAMENT",
        bestOf: 1,
        game: new mongoose.mongo.ObjectId("65df8098fc13ae2387cd3c60"), //LEAGUE OF LEGENDS
        home_participant: new mongoose.mongo.ObjectId("65df8098fc13ae2387cd3c65"), //TEAM 1
        away_participant: new mongoose.mongo.ObjectId("65df8098fc13ae2387cd3c66"), //TEAM 2
        date: new Date("2024-02-01T20:00:00.000+00:00"),
        result: {
            winner: new mongoose.mongo.ObjectId("65df8098fc13ae2387cd3c65"), //TEAM 1
            loser:new mongoose.mongo.ObjectId("65df8098fc13ae2387cd3c66"), //TEAM 2
            winner_result:1,
            loser_result:0,
            matches: [
                new mongoose.mongo.ObjectId("65df8098fc13ae2387cd3c63") //MATCH 2
            ]
        }
    }
]

module.exports = {serieIds, series}
