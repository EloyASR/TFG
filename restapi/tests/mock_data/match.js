import mongoose from "mongoose";

const matches = [
    {
        _id:new mongoose.mongo.ObjectId("65df8098fc13ae2387cd3c5f"), //MATCH 1
        type:"1VS1",
        mode:"Aram 1vs1",
        game:new mongoose.mongo.ObjectId("65df8098fc13ae2387cd3c60"), //LEAGUE OF LEGENDS
        participant1:new mongoose.mongo.ObjectId("65df8098fc13ae2387cd3c61"), //USUARIO 1
        participant2:new mongoose.mongo.ObjectId("65df8098fc13ae2387cd3c62"), //USUARIO 2
        date:new Date("2024-03-26T04:47:34.000+00:00"),
        status:"SCHEDULED_WITH_PARTICIPANTS"
    },
    {
        _id:new mongoose.mongo.ObjectId("65df8098fc13ae2387cd3c63"), //MATCH 2
        type:"5VS5",
        mode:"Tournament 5vs5",
        game:new mongoose.mongo.ObjectId("65df8098fc13ae2387cd3c60"), //LEAGUE OF LEGENDS
        participant1:new mongoose.mongo.ObjectId("65df8098fc13ae2387cd3c65"), //EQUIPO 1
        participant2:new mongoose.mongo.ObjectId("65df8098fc13ae2387cd3c66"), //EQUIPO 2
        win: new mongoose.mongo.ObjectId("65df8098fc13ae2387cd3c66"), //EQUIPO 2
        lose: new mongoose.mongo.ObjectId("65df8098fc13ae2387cd3c65"), //EQUIPO 1
        date:new Date("2024-04-04T20:27:40.000+00:00"),
        status:"FINISHED"
    },
    {
        _id:new mongoose.mongo.ObjectId("65df8098fc13ae2387cd3c67"), //MATCH 3
        type:"1VS1",
        mode:"VGC",
        game:new mongoose.mongo.ObjectId("65df8098fc13ae2387cd3c68"), //POKEMON
        date:new Date("2024-04-13T15:50:53"),
        status:"SCHEDULED_NO_PARTICIPANTS"
    },
    {
        _id:{"$oid":"65df8098fc13ae2387cd3c6b"},
        type:"Burty",
        mode:"Beddis",
        game:{"$oid":"65df8098fc13ae2387cd3c6c"},
        participant1:{"$oid":"65df8098fc13ae2387cd3c6d"},
        participant2:{"$oid":"65df8098fc13ae2387cd3c6e"},
        date:"2024-03-28 07:20:14",
        status:"IN_GAME"
    },
    {
        _id:{"$oid":"65df8098fc13ae2387cd3c6f"},
        type:"Oby",
        mode:"Traut",
        game:{"$oid":"65df8098fc13ae2387cd3c70"},
        participant1:{"$oid":"65df8098fc13ae2387cd3c71"},
        participant2:{"$oid":"65df8098fc13ae2387cd3c72"},
        date:"2024-03-19 14:42:01",
        status:"IN_GAME"
    },
    {
        _id:{"$oid":"65df8098fc13ae2387cd3c73"},
        type:"Hannis",
        mode:"Pristnor",
        game:{"$oid":"65df8098fc13ae2387cd3c74"},
        participant1:{"$oid":"65df8098fc13ae2387cd3c75"},
        participant2:{"$oid":"65df8098fc13ae2387cd3c76"},
        date:"2024-03-13 23:21:51",
        status:"SCHEDULED_NO_PARTICIPANTS"
    },
    {
        _id:{"$oid":"65df8098fc13ae2387cd3c77"},
        type:"Stearne",
        mode:"Elgood",
        game:{"$oid":"65df8098fc13ae2387cd3c78"},
        participant1:{"$oid":"65df8098fc13ae2387cd3c79"},
        participant2:{"$oid":"65df8098fc13ae2387cd3c7a"},
        date:"2024-03-10 03:33:19",
        status:"FINISHED"
    },
    {
        _id:{"$oid":"65df8098fc13ae2387cd3c7b"},
        type:"Andres",
        mode:"McDougle",
        game:{"$oid":"65df8098fc13ae2387cd3c7c"},
        participant1:{"$oid":"65df8098fc13ae2387cd3c7d"},
        participant2:{"$oid":"65df8098fc13ae2387cd3c7e"},
        date:"2024-04-08 00:59:46",
        status:"SCHEDULED_NO_PARTICIPANTS"
    },
    {
        _id:{"$oid":"65df8098fc13ae2387cd3c7f"},
        type:"Tarah",
        mode:"Eborall",
        game:{"$oid":"65df8098fc13ae2387cd3c80"},
        participant1:{"$oid":"65df8098fc13ae2387cd3c81"},
        participant2:{"$oid":"65df8098fc13ae2387cd3c82"},
        date:"2024-04-06 10:59:38",
        status:"FINISHED"},
    {
        _id:{"$oid":"65df8098fc13ae2387cd3c83"},
        type:"Jimmy",
        mode:"Yokley",
        game:{"$oid":"65df8098fc13ae2387cd3c84"},
        participant1:{"$oid":"65df8098fc13ae2387cd3c85"},
        participant2:{"$oid":"65df8098fc13ae2387cd3c86"},
        date:"2024-04-24 03:30:28",
        status:"FINISHED"},
    {
        _id:{"$oid":"65df8098fc13ae2387cd3c87"},
        type:"Jarrett",
        mode:"Alphonso",
        game:{"$oid":"65df8098fc13ae2387cd3c88"},
        participant1:{"$oid":"65df8098fc13ae2387cd3c89"},
        participant2:{"$oid":"65df8098fc13ae2387cd3c8a"},
        date:"2024-04-23 13:49:14",
        status:"SCHEDULED_WITH_PARTICIPANTS"},
    {
        _id:{"$oid":"65df8098fc13ae2387cd3c8b"},
        type:"Viola",
        mode:"Beslier",
        game:{"$oid":"65df8098fc13ae2387cd3c8c"},
        participant1:{"$oid":"65df8098fc13ae2387cd3c8d"},
        participant2:{"$oid":"65df8098fc13ae2387cd3c8e"},
        date:"2024-03-10 04:45:22",
        status:"CANCELED"},
    {
        _id:{"$oid":"65df8098fc13ae2387cd3c8f"},
        type:"Clareta",
        mode:"Kristoffersson",
        game:{"$oid":"65df8098fc13ae2387cd3c90"},
        participant1:{"$oid":"65df8098fc13ae2387cd3c91"},
        participant2:{"$oid":"65df8098fc13ae2387cd3c92"},
        date:"2024-04-16 20:48:00",
        status:"IN_GAME"},
    {
        _id:{"$oid":"65df8098fc13ae2387cd3c93"},
        type:"Nevile",
        mode:"Cathcart",
        game:{"$oid":"65df8098fc13ae2387cd3c94"},
        participant1:{"$oid":"65df8098fc13ae2387cd3c95"},
        participant2:{"$oid":"65df8098fc13ae2387cd3c96"},
        date:"2024-04-18 21:32:38",
        status:"SCHEDULED_WITH_PARTICIPANTS"},
    {
        _id:{"$oid":"65df8098fc13ae2387cd3c97"},
        type:"Eustace",
        mode:"Alyokhin",
        game:{"$oid":"65df8098fc13ae2387cd3c98"},
        participant1:{"$oid":"65df8098fc13ae2387cd3c99"},
        participant2:{"$oid":"65df8098fc13ae2387cd3c9a"},
        date:"2024-04-16 22:22:09",
        status:"SCHEDULED_WITH_PARTICIPANTS"},
    {
        _id:{"$oid":"65df8098fc13ae2387cd3c9b"},
        type:"Natalya",
        mode:"Paget",
        game:{"$oid":"65df8098fc13ae2387cd3c9c"},
        participant1:{"$oid":"65df8098fc13ae2387cd3c9d"},
        participant2:{"$oid":"65df8098fc13ae2387cd3c9e"},
        date:"2024-03-29 15:58:35",
        status:"SCHEDULED_NO_PARTICIPANTS"},
    {
        _id:{"$oid":"65df8098fc13ae2387cd3c9f"},
        type:"Martino",
        mode:"Rankcom",
        game:{"$oid":"65df8098fc13ae2387cd3ca0"},
        participant1:{"$oid":"65df8098fc13ae2387cd3ca1"},
        participant2:{"$oid":"65df8098fc13ae2387cd3ca2"},
        date:"2024-03-23 11:10:28",
        status:"IN_GAME"},
    {
        _id:{"$oid":"65df8098fc13ae2387cd3ca3"},
        type:"Sofie",
        mode:"Lamey",
        game:{"$oid":"65df8098fc13ae2387cd3ca4"},
        participant1:{"$oid":"65df8098fc13ae2387cd3ca5"},
        participant2:{"$oid":"65df8098fc13ae2387cd3ca6"},
        date:"2024-04-16 00:49:36",
        status:"SCHEDULED_NO_PARTICIPANTS"},
    {
        _id:{"$oid":"65df8098fc13ae2387cd3ca7"},
        type:"Fransisco",
        mode:"Vayne",
        game:{"$oid":"65df8098fc13ae2387cd3ca8"},
        participant1:{"$oid":"65df8098fc13ae2387cd3ca9"},
        participant2:{"$oid":"65df8098fc13ae2387cd3caa"},
        date:"2024-04-10 03:11:02",
        status:"FINISHED"},
    {
        _id:{"$oid":"65df8098fc13ae2387cd3cab"},
        type:"Gage",
        mode:"Scoines",
        game:{"$oid":"65df8098fc13ae2387cd3cac"},
        participant1:{"$oid":"65df8098fc13ae2387cd3cad"},
        participant2:{"$oid":"65df8098fc13ae2387cd3cae"},
        date:"2024-04-29 12:21:16",
        status:"FINISHED"
    }
]

module.exports = {matches}