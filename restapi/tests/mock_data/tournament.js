const mongoose = require('mongoose');

const tournamentIds = [
    "666edb0dfc13ae6b27234520", //TOURNAMENT 1
    "666edb0dfc13ae6b27234521", //TOURNAMENT 2
    "666edb0dfc13ae6b27234522", //TOURNAMENT 3
]

const tournaments = [
    {
        _id:new mongoose.mongo.ObjectId("666edb0dfc13ae6b27234520"),
        currentPhase: 0,
        status: "CLOSED",
        participants:[],
        phases: [],
        sponsoredBy: [
            {
                id: new mongoose.mongo.ObjectId("664f5a92fc13ae6981c6417e"), //USER 4
                status: "ACCEPTED"
            }
        ],
        creator:new mongoose.mongo.ObjectId("65f25284fc13ae2dcb316ea7"), //USER 3
        name:"TOURNAMENT 1",
        size:8,
        description:"Descripción TOURNAMENT 1",
        rules:"Reglas TOURNAMENT 1",
        game:new mongoose.mongo.ObjectId("65df8098fc13ae2387cd3c60"), //LEAGUE OF LEGENDS
        mode:"ARAM_1VS1",
        participantsType:"SINGLE",
        online:true,
        initDate:"2024-06-16T22:00:00.000+00:00",
        endDate: "2024-06-17T22:00:00.000+00:00",
        inscription:false,
    },
    {
        _id:new mongoose.mongo.ObjectId("666edb0dfc13ae6b27234521"),
        currentPhase: 0,
        status: "INSCRIPTIONS_CLOSED",
        participants:[],
        phases: [
            {
                phaseOrder:1,
                formatType:"BRACKET_PHASE",
                phaseName:"FASE_1_TORNEO",
                bracketData: {
                    size:2,
                    tieBreaker: false,
                    bestOf:1,
                    rounds:[
                        {
                            roundNumber: 0,
                            series: [
                                {
                                    serieNumber: 0,
                                    roundNumber: 0,
                                    home_participant_parent_round:-1,
                                    home_participant_parent_serie:0,
                                    away_participant_parent_round:-1,
                                    away_participant_parent_serie:1,
                                    next_round: 1,
                                    next_serie: 0,
                                }
                            ]
                        }
                    ]
                }
            }
        ],
        sponsoredBy: [],
        creator:new mongoose.mongo.ObjectId("65f25284fc13ae2dcb316ea7"), //USER 3
        name:"TOURNAMENT 2",
        size:8,
        description:"Descripción TOURNAMENT 2",
        rules:"Reglas TOURNAMENT 2",
        game:new mongoose.mongo.ObjectId("65df8098fc13ae2387cd3c60"), //LEAGUE OF LEGENDS
        mode:"ARAM_1VS1",
        participantsType:"SINGLE",
        online:true,
        initDate:"2024-06-16T22:00:00.000+00:00",
        endDate: "2024-06-17T22:00:00.000+00:00",
        inscription:false,
    },
    {
        _id:new mongoose.mongo.ObjectId("666edb0dfc13ae6b27234522"),
        currentPhase: 0,
        status: "CLOSED",
        participants:[],
        phases: [],
        sponsoredBy: [],
        creator:new mongoose.mongo.ObjectId("666edb0dfc13ae6b27234525"), //USER 5
        name:"TOURNAMENT 3",
        size:8,
        description:"Descripción TOURNAMENT 3",
        rules:"Reglas TOURNAMENT 3",
        game:new mongoose.mongo.ObjectId("65df8098fc13ae2387cd3c68"), //POKEMON
        mode:"VGC",
        participantsType:"SINGLE",
        online:true,
        initDate:"2024-06-16T22:00:00.000+00:00",
        endDate: "2024-06-17T22:00:00.000+00:00",
        inscription:false,
    }
]

module.exports = {tournamentIds, tournaments}
