//Esquema que define el modelo de un torneo

const mongoose = require("mongoose");


const ParticipantSchema = mongoose.Schema(
    {
        identifier: {
            type: mongoose.Types.ObjectId,
            required: true
        },
        type: {
            type: String,
            enum: ["SINGLE","TEAM"],
            required: true
        }
    }
)

const LeagueSchema = mongoose.Schema(
    {
        size: {
            type: Number,
            required: true
        }
    }
)

const GroupsSchema = mongoose.Schema({

})



const BracketRoundSchema = mongoose.Schema(
    {
        roundNumber: {
            type: Number,
            required: true
        },
        series: {
            type: [mongoose.Types.ObjectId]
        }
    }
)

const BracketsSchema = mongoose.Schema(
    {
        size: {
            type: Number,
            enum: [2, 4, 8, 16, 32],
            required: true
        },
        tieBreaker: {
            type: Boolean,
            required: true
        },
        bestOf: {
            type: Number,
            enum: [1, 3, 5],
            required: true
        },
        rounds: {
            type: [BracketRoundSchema]
        }
    }
)

const PhaseSchema = mongoose.Schema(
    {
        phaseOrder: {
            type: Number,
            min: 0,
            required: true,
        },
        formatType: {
            type: String,
            enum: ['LEAGUE_PHASE', 'GROUPS_PHASE', 'BRACKET_PHASE'],
            required: true
        },
        phaseName: {
            type: String,
            required: true
        },
        leagueData: {
            type: LeagueSchema,
            required: false
        },
        groupsData: {
            type: GroupsSchema,
            required: false
        },
        bracketData: {
            type: BracketsSchema,
            required: false
        },
    }
)

const TournamentSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        game: {
            type: String,
            required: true
        },
        size: {
            type: Number,
            required: true,
            min: 2,
            max: 32
        },
        participants: {
            type: [ParticipantSchema]                                        //HAY QUE CAMBIAR ESTE CAMPO PARA QUE SEA UN ARRAY
        },
        description: {
            type: String,
            required: false
        },
        rules: {
            type: String,
            required: false
        },
        playersType: {
            type: String,
            enum: ["Jugadores", "Equipos"]
        },
        phases: {
            type: [PhaseSchema]
        },
        online: {
            type: Boolean,
            required: false
        },
        location: {
            type: String,
            required: false
        },
        inscription: {
            type: Boolean,
            required: true
        },
        inscriptionDateInit: {
            type: Date,
            min: '2000-01-01',
            required: false
        },
        inscriptionDateEnd: {
            type: Date,
            min: '2000-01-01',
            required: false
        },
        initDate: {
            type: Date,
            min: '2000-01-01',
            required: false
        },
        endDate: {
            type: Date,
            min: '2000-01-01',
            required: false
        },
        img256x256: {
            type: String,
            required: false
        },
        img1300x150: {
            type: String,
            required: false
        }
    },
    {
        timestamps: true
    }
)

TournamentSchema.methods.toJSON = function () {
    const { __v, _id, ...tournament } = this.toObject()
    tournament.uid = _id
    return tournament;
}

module.exports = mongoose.model('Tournament', TournamentSchema)