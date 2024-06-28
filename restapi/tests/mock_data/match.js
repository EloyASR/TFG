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
        type:"SINGLE",
        mode:"ARAM_1VS1",
        serie:new mongoose.mongo.ObjectId("65e0f577fc13ae063acd367e"), //SERIE 1
        game:new mongoose.mongo.ObjectId("65df8098fc13ae2387cd3c60"), //LEAGUE OF LEGENDS
    },
    {
        _id:new mongoose.mongo.ObjectId("65df8098fc13ae2387cd3c63"), //MATCH 2
        type:"SINGLE",
        mode:"ARAM_1VS1",
        serie:new mongoose.mongo.ObjectId("65e0f577fc13ae063acd367e"), //SERIE 1
        game:new mongoose.mongo.ObjectId("65df8098fc13ae2387cd3c60"), //LEAGUE OF LEGENDS
    },
    {
        _id:new mongoose.mongo.ObjectId("65df8098fc13ae2387cd3c67"), //MATCH 3
        type:"SINGLE",
        mode:"VGC",
        serie:new mongoose.mongo.ObjectId("666edb0dfc13ae6b2723451c"), //SERIE 2
        game:new mongoose.mongo.ObjectId("65df8098fc13ae2387cd3c68"), //POKEMON
    },
    {
        _id:new mongoose.mongo.ObjectId("65df8098fc13ae2387cd3c6b"), //MATCH 4
        type:"SINGLE",
        mode:"ARAM_1VS1",
        serie:new mongoose.mongo.ObjectId("666edb0dfc13ae6b2723451d"), //SERIE 3
        game:new mongoose.mongo.ObjectId("65df8098fc13ae2387cd3c60"), //LEAGUE OF LEGENDS
    },
    {
        _id:new mongoose.mongo.ObjectId("65df8098fc13ae2387cd3c6f"), //MATCH 5
        type:"SINGLE",
        mode:"ARAM_1VS1",
        serie:new mongoose.mongo.ObjectId("666edb0dfc13ae6b2723451d"), //SERIE 3
        game:new mongoose.mongo.ObjectId("65df8098fc13ae2387cd3c60"), //LEAGUE OF LEGENDS
    },
    {
        _id:new mongoose.mongo.ObjectId("65df8098fc13ae2387cd3c73"), //MATCH 6
        type:"SINGLE",
        mode:"ARAM_1VS1",
        serie:new mongoose.mongo.ObjectId("666edb0dfc13ae6b2723451d"), //SERIE 3
        game:new mongoose.mongo.ObjectId("65df8098fc13ae2387cd3c60"), //LEAGUE OF LEGENDS
    }
]

module.exports = {matchIds,matches}