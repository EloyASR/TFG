const mongoose = require('mongoose');

const prizeIds = [
    "664f530afc13ae6854c649b2", //PRIZE 1
    "664f530afc13ae6854c649b3", //PRIZE 2
    "664f530afc13ae6854c649b4", //PRIZE 3
]

const prizes = [
    {
        _id: new mongoose.mongo.ObjectId("664f530afc13ae6854c649b2"),
        name:"PRIZE 1",
        description:"Description for prize 1",
        image:"prize1Image.png",
        creator:new mongoose.mongo.ObjectId("65f25284fc13ae2dcb316ea7")
    },
    {
        _id: new mongoose.mongo.ObjectId("664f530afc13ae6854c649b3"),
        name:"PRIZE 2",
        description:"Description for prize 2",
        image:"prize2Image.png",
        creator:new mongoose.mongo.ObjectId("664f5a92fc13ae6981c6417e")

    },
    {
        _id: new mongoose.mongo.ObjectId("664f530afc13ae6854c649b4"),
        name:"PRIZE 3",
        description:"Description for prize 3",
        image:"prize3Image.png",
        creator:new mongoose.mongo.ObjectId("664f5a92fc13ae6981c6417e")
    }
]

module.exports = {prizeIds, prizes}