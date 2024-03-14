const mongoose = require('mongoose');

const matchIds = [
    "65df8098fc13ae2387cd3c5f", //MATCH 1
    "65df8098fc13ae2387cd3c63", //MATCH 2
    "65df8098fc13ae2387cd3c67", //MATCH 3
    "65df8098fc13ae2387cd3c6b", //MATCH 4
    "65df8098fc13ae2387cd3c6f", //MATCH 5
    "65df8098fc13ae2387cd3c73"  //MATCH 6
]

const matches = [
    {
        _id:new mongoose.mongo.ObjectId("65df8098fc13ae2387cd3c5f"), //MATCH 1
        type:"1VS1",
        mode:"ARAM_1VS1",
        game:new mongoose.mongo.ObjectId("65df8098fc13ae2387cd3c60"), //LEAGUE OF LEGENDS
        home_participant:new mongoose.mongo.ObjectId("65df8098fc13ae2387cd3c61"), //USER 1
        away_participant:new mongoose.mongo.ObjectId("65df8098fc13ae2387cd3c62"), //USER 2
        date:new Date("2024-03-26T10:00:00.000+00:00"),
        status:"SCHEDULED_WITH_PARTICIPANTS"
    },
    {
        _id:new mongoose.mongo.ObjectId("65df8098fc13ae2387cd3c63"), //MATCH 2
        type:"5VS5",
        mode:"TOURNAMENT",
        game:new mongoose.mongo.ObjectId("65df8098fc13ae2387cd3c60"), //LEAGUE OF LEGENDS
        home_participant:new mongoose.mongo.ObjectId("65df8098fc13ae2387cd3c65"), //TEAM 1
        away_participant:new mongoose.mongo.ObjectId("65df8098fc13ae2387cd3c66"), //TEAM 2
        winner: new mongoose.mongo.ObjectId("65df8098fc13ae2387cd3c66"), //TEAM 2
        loser: new mongoose.mongo.ObjectId("65df8098fc13ae2387cd3c65"), //TEAM 1
        date:new Date("2024-02-01T20:00:00.000+00:00"),
        status:"FINISHED"
    },
    {
        _id:new mongoose.mongo.ObjectId("65df8098fc13ae2387cd3c67"), //MATCH 3
        type:"1VS1",
        mode:"VGC",
        game:new mongoose.mongo.ObjectId("65df8098fc13ae2387cd3c68"), //POKEMON
        date:new Date("2024-04-13T15:00:00.000+00:00"),
        status:"SCHEDULED_NO_PARTICIPANTS"
    },
    {
        _id:new mongoose.mongo.ObjectId("65df8098fc13ae2387cd3c6b"), //MATCH 4
        type:"5VS5",
        mode:"TOURNAMENT",
        game:new mongoose.mongo.ObjectId("65df8098fc13ae2387cd3c60"), //LEAGUE OF LEGENDS
        home_participant:new mongoose.mongo.ObjectId("65df8098fc13ae2387cd3c6d"), //TEAM 3
        away_participant:new mongoose.mongo.ObjectId("65df8098fc13ae2387cd3c6e"), //TEAM 4
        date:new Date("2024-03-28T17:00:00.000+00:00"),
        status:"IN_GAME"
    },
    {
        _id:new mongoose.mongo.ObjectId("65df8098fc13ae2387cd3c6f"), //MATCH 5
        type:"5VS5",
        mode:"TOURNAMENT",
        game:new mongoose.mongo.ObjectId("65df8098fc13ae2387cd3c60"), //LEAGUE OF LEGENDS
        date:new Date("2024-03-19T14:00:00.000+00:00"),
        status:"SCHEDULED_NO_PARTICIPANTS"
    },
    {
        _id:new mongoose.mongo.ObjectId("65df8098fc13ae2387cd3c73"), //MATCH 6
        type:"5VS5",
        mode:"TOURNAMENT",
        game:new mongoose.mongo.ObjectId("65df8098fc13ae2387cd3c60"), //LEAGUE OF LEGENDS
        home_participant:new mongoose.mongo.ObjectId("65df8098fc13ae2387cd3c66"), //TEAM 2
        away_participant:new mongoose.mongo.ObjectId("65df8098fc13ae2387cd3c6e"), //TEAM 4
        date:new Date("2024-04-15T23:00:00.000+00:00"),
        status:"MATCH_NOT_PLAYED"
    }
]

module.exports = {matchIds,matches}