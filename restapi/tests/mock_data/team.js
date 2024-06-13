const mongoose = require('mongoose');

const teamIds = [
    "65df8098fc13ae2387cd3c65", //TEAM 1
    "65df8098fc13ae2387cd3c66", //TEAM 2
    "65df8098fc13ae2387cd3c6d", //TEAM 3
    "65df8098fc13ae2387cd3c6e"  //TEAM 4
]

const teams = [
    {
        _id:new mongoose.mongo.ObjectId("65df8098fc13ae2387cd3c65"), //TEAM 1
        name: "TEAM 1",
        type: "5_0"
    },
    {
        _id:new mongoose.mongo.ObjectId("65df8098fc13ae2387cd3c66"), //TEAM 2
        name: "TEAM 2",
        type: "5_1"
    },
    {
        _id:new mongoose.mongo.ObjectId("65df8098fc13ae2387cd3c6d"), //TEAM 3
        name: "TEAM 3",
        type: "5_0"
    },
    {
        _id:new mongoose.mongo.ObjectId("65df8098fc13ae2387cd3c6e"), //TEAM 4
        name: "TEAM 4",
        type: "5_1"
    },
]

module.exports = {teamIds, teams}