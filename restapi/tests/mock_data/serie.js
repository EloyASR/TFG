const mongoose = require('mongoose');

const serieIds = [
    "65e0f577fc13ae063acd367e", //SERIE 1
    "666edb0dfc13ae6b2723451c", //SERIE 2
    "666edb0dfc13ae6b2723451d", //SERIE 3
    "666edb0dfc13ae6b2723451e", //SERIE 4
]

const series = [
    {
        _id: new mongoose.mongo.ObjectId("65e0f577fc13ae063acd367e"),
        type: "SINGLE",
        mode: "ARAM_1VS1",
        bestOf: 3,
        game: new mongoose.mongo.ObjectId("65df8098fc13ae2387cd3c60"), //LEAGUE OF LEGENDS
        home_participant: new mongoose.mongo.ObjectId("65df8098fc13ae2387cd3c61"), //USER 1
        away_participant: new mongoose.mongo.ObjectId("65df8098fc13ae2387cd3c62"), //USER 2
        date: new Date("2024-02-01T20:00:00.000+00:00"),
        result: {
            winner: new mongoose.mongo.ObjectId("65df8098fc13ae2387cd3c61"), //USER 1
            home_result:2,
            away_result:0,
            matches: [
                new mongoose.mongo.ObjectId("65df8098fc13ae2387cd3c5f"), //MATCH 1
                new mongoose.mongo.ObjectId("65df8098fc13ae2387cd3c63"), //MATCH 2
            ]
        },
        status: "FINISHED"
    },
    {
        _id: new mongoose.mongo.ObjectId("666edb0dfc13ae6b2723451c"), //SERIE 2
        type: "SINGLE",
        mode: "VGC",
        bestOf: 1,
        game: new mongoose.mongo.ObjectId("65df8098fc13ae2387cd3c68"), //POKEMON
        home_participant: new mongoose.mongo.ObjectId("65df8098fc13ae2387cd3c61"), //USER 1
        away_participant: new mongoose.mongo.ObjectId("65df8098fc13ae2387cd3c62"), //USER 2
        date: new Date("2024-02-01T20:00:00.000+00:00"),
        result: {
            winner: new mongoose.mongo.ObjectId("65df8098fc13ae2387cd3c62"), //USER 2
            home_result:0,
            away_result:1,
            matches: [
                new mongoose.mongo.ObjectId("65df8098fc13ae2387cd3c67"), //MATCH 3
            ]
        },
        status: "FINISHED"
    },
    {
        _id: new mongoose.mongo.ObjectId("666edb0dfc13ae6b2723451d"), //SERIE 3
        type: "SINGLE",
        mode: "ARAM_1VS1",
        bestOf: 5,
        game: new mongoose.mongo.ObjectId("65df8098fc13ae2387cd3c60"), //LEAGUE OF LEGENDS
        home_participant: new mongoose.mongo.ObjectId("65df8098fc13ae2387cd3c61"), //USER 1
        away_participant: new mongoose.mongo.ObjectId("65df8098fc13ae2387cd3c62"), //USER 2
        date: new Date("2024-02-01T20:00:00.000+00:00"),
        result: {
            winner: new mongoose.mongo.ObjectId("65df8098fc13ae2387cd3c61"), //USER 1
            home_result:2,
            away_result:1,
            matches: [
                new mongoose.mongo.ObjectId("65df8098fc13ae2387cd3c6b"), //MATCH 4
                new mongoose.mongo.ObjectId("65df8098fc13ae2387cd3c6f"), //MATCH 5
                new mongoose.mongo.ObjectId("65df8098fc13ae2387cd3c73"), //MATCH 6
            ]
        },
        status: "FINISHED"
    },
    {
        _id: new mongoose.mongo.ObjectId("666edb0dfc13ae6b2723451e"), //SERIE 4
        type: "SINGLE",
        mode: "ARAM_1VS1",
        bestOf: 5,
        game: new mongoose.mongo.ObjectId("65df8098fc13ae2387cd3c60"), //LEAGUE OF LEGENDS
        home_participant: new mongoose.mongo.ObjectId("65df8098fc13ae2387cd3c61"), //USER 1
        away_participant: new mongoose.mongo.ObjectId("65df8098fc13ae2387cd3c62"), //USER 2
        date: new Date("2024-02-01T20:00:00.000+00:00"),
        result: {

        },
        status: "FINISHED"
    }
]

module.exports = {serieIds, series}
