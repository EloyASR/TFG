const mongoose = require('mongoose');

const userIds = [
    "65df8098fc13ae2387cd3c61", //USER 1
    "65df8098fc13ae2387cd3c62", //USER 2
    "65f25284fc13ae2dcb316ea7", //USER 3
    "664f5a92fc13ae6981c6417e", //USER 4
]

const users = [
    {
        _id:new mongoose.mongo.ObjectId("65df8098fc13ae2387cd3c61"), //USER 1
        name: "USER 1",
        password: "password1",
        email: "user1@gmail.com",
        role: "USER",
        accounts: [
            {
                game: "65df8098fc13ae2387cd3c60"
            }
        ]
    },
    {
        _id:new mongoose.mongo.ObjectId("65df8098fc13ae2387cd3c62"), //USER 2
        name: "USER 2",
        password: "password2",
        email: "user2@gmail.com",
        role: "USER"
    },
    {
        _id:new mongoose.mongo.ObjectId("65f25284fc13ae2dcb316ea7"), //USER 3
        name: "USER 3",
        password: "password3",
        email: "user3@gmail.com",
        role: "ADMIN"
    },
    {
        _id:new mongoose.mongo.ObjectId("664f5a92fc13ae6981c6417e"), //USER 4
        name: "USER 4",
        password: "password4",
        email: "user4@gmail.com",
        role: "COMPANY"
    }

]

module.exports = {userIds, users}