//Esquema que define el modelo de un torneo

const mongoose = require("mongoose");


const SponsorSchema = mongoose.Schema(
    {
        id:  {
            type: mongoose.Types.ObjectId,
            required: true
        },
        prize: {
            type: mongoose.Types.ObjectId,
            required: false
        },
        banners300x600:{
            type: [String]
        },
        banners1100x300:{
            type: [String]
        },
        status:{
            type: String,
            enum:["ACCEPTED", "PENDING"],
            default: "PENDING",
            required: true
        }
    }
)

const ParticipantSchema = mongoose.Schema(
    {
        id: {
            type: mongoose.Types.ObjectId,
            required: true
        },
        participantType: {
            type: String,
            enum: ["SINGLE","TEAM"],
            required: true
        },
        status: {
            type: String,
            enum: ["DISQUALIFIED", "SELECTED", "NOT_SELECTED", "ELIMINATED", "WINNER"],
        }
    }
)

const LeagueSerieSchema = mongoose.Schema(
    {
        roundNumber: {
            type: Number,
            required: true,
        },
        serieNumber: {
            type: Number,
            required: true,
        },
        identifier:{
            type: mongoose.Types.ObjectId,
            required:false,
        }
    }
)

const LeagueRoundSchema = mongoose.Schema(
    {
        roundNumber: {
            type: Number,
            required: true
        },
        series: {
            type: [LeagueSerieSchema]
        }
    }
)

const LeagueSchema = mongoose.Schema(
    {
        size: {
            type: Number,
            enum: [4, 6, 8, 10, 12, 14, 16],
            required: true
        },
        bestOf: {
            type: Number,
            enum: [1, 3, 5],
            required: true
        },
        winPoints: {
            type: Number,
        },
        tiePoints: {
            type: Number,
        },
        losePoints: {
            type: Number,
        },
        rounds: {
            type: [LeagueRoundSchema]
        },
        topParticipants: {
            type: [mongoose.Types.ObjectId]
        }
    }
)

const BracketSerieSchema = mongoose.Schema(
    {
        serieNumber: {
            type: Number,
            required: true,
        },
        roundNumber: {
            type: Number,
            required: true,
        },
        home_participant_parent_round: {
            type: Number,
            required: true,
        },
        home_participant_parent_serie: {
            type: Number,
            required: true
        },
        away_participant_parent_round: {
            type: Number,
            required: true,
        },
        away_participant_parent_serie: {
            type: Number,
            required: true
        },
        next_round: {
            type: Number,
            required: true,
        },
        next_serie: {
            type: Number,
            required: true,
        },
        identifier:{
            type: mongoose.Types.ObjectId,
            required:false,
        }
    }
)

const BracketRoundSchema = mongoose.Schema(
    {
        roundNumber: {
            type: Number,
            required: true
        },
        series: {
            type: [BracketSerieSchema]
        }
    }
)

const BracketsSchema = mongoose.Schema(
    {
        size: {
            type: Number,
            enum: [2, 4, 8, 16],
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
            enum: ['LEAGUE_PHASE', 'BRACKET_PHASE'],
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
        bracketData: {
            type: BracketsSchema,
            required: false
        },
        phaseStatus: {
            type: String,
            enum: ["EDITABLE", "CLOSED", "ON_COURSE", "FINISHED"]
        }
    }
)

const TournamentSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        game: {
            type: mongoose.Types.ObjectId,
            required: true,
        },
        mode: {
            type: String,
            required: true,
        },
        size: {
            type: Number,
            required: true,
            min: 2,
            max: 32
        },
        participants: {
            type: [ParticipantSchema]
        },
        description: {
            type: String,
            required: false
        },
        rules: {
            type: String,
            required: false
        },
        participantsType: {
            type: String,
            enum: ["SINGLE", "TEAM"],
            default: ["SINGLE"],
            required: true,
        },
        phases: {
            type: [PhaseSchema]
        },
        online: {
            type: Boolean,
            required: true
        },
        location: {
            type: String,
            required: false
        },
        inscription: {
            type: Boolean,
            required: true
        },
        inscriptionInitDate: {
            type: Date,
            min: '2000-01-01',
            required: false
        },
        inscriptionEndDate: {
            type: Date,
            min: '2000-01-01',
            required: false
        },
        initDate: {
            type: Date,
            min: '2000-01-01',
            required: true
        },
        endDate: {
            type: Date,
            min: '2000-01-01',
            required: true
        },
        sponsoredBy: {
            type: [SponsorSchema],
        },
        prize: {
            type: mongoose.Types.ObjectId,
        },
        creator: {
            type: mongoose.Types.ObjectId,
            required: true
        },
        currentPhase: {
            type: Number,
            required: true,
            min: 0,
            default: 0
        },
        status: {
            type: String,
            enum: ["CLOSED", "INSCRIPTIONS_OPEN", "INSCRIPTIONS_CLOSED", "ON_COURSE", "FINISHED"],
            default: "CLOSED"
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