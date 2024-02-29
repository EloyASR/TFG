const mongoose = require('mongoose');

const userIds = [
    "65df8098fc13ae2387cd3c61", //USER 1
    "65df8098fc13ae2387cd3c62", //USER 2
]

const users = [
    {
        _id:new mongoose.mongo.ObjectId("65df8098fc13ae2387cd3c61"), //USER 1
        name: "USER 1",
        password: "password 1",
        email: "user1@gmail.com",
        role: "USER"
    },
    {
        _id:new mongoose.mongo.ObjectId("65df8098fc13ae2387cd3c62"), //USER 2
        name: "USER 2",
        password: "password 2",
        email: "user2@gmail.com",
        role: "USER"
    }
]

module.exports = {userIds, users}