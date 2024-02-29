const mongoose = require('mongoose');

const gameIds = [
    "65df8098fc13ae2387cd3c60", //LEAGUE OF LEGENDS
    "65df8098fc13ae2387cd3c68", //POKEMON
]

const games = [
    {
        _id: new mongoose.mongo.ObjectId("65df8098fc13ae2387cd3c60"), //LEAGUE OF LEGENDS
        _name: "LEAGUE_OF_LEGENDS",
        name: "League of Legends",
        modes: [
            {
                _name: "TOURNAMENT",
                name: "Tournament",
                type: "5VS5"
            },
            {
                _name: "ARAM_1VS1",
                name: "Aram 1vs1",
                type: "1VS1"
            },
            {
                _name: "ARAM_5VS5",
                name: "Aram 5vs5",
                type: "5VS5"
            }
        ]
    },
    {
        _id: new mongoose.mongo.ObjectId("65df8098fc13ae2387cd3c68"), //POKEMON
        _name: "POKEMON",
        name: "Pokemon",
        modes: [
            {
                _name: "VGC",
                name: "VGC",
                type: "1VS1"
            }
        ]
    }
]

module.exports = {gameIds, games}