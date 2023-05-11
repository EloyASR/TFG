//Esquema que define el modelo de un torneo

const mongoose = require("mongoose");


const LeagueSchema = mongoose.Schema({
    rounds:[]
})

mongoose.Schema.Types.LeagueSchema = LeagueSchema;

const GroupsSchema = mongoose.Schema({

})

mongoose.Schema.Types.GroupsSchema = GroupsSchema;

const BracketsSchema = mongoose.Schema({

})

mongoose.Schema.Types.BracketsSchema = BracketsSchema;

const PhaseSchema = mongoose.Schema(
    {
        phaseOrder: {
            type: Number,
            min: 0,
            required: true,
        },
        formatId: {
            type: String,
            enum: ['LEAGUE_PHASE', 'GROUPS_PHASE', 'BRACKETS_PHASE'],
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
        bracketsData:{
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

        inscriptionDate: {
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
            required: false
        },
        game: {
            type: String,
            required: true
        },
        online: {
            type: Boolean,
            required: true
        },
        location: {
            type: String,
            required: false
        },
        participants: {
            type: Number,
            required: true,
            min: 2,
            max: 32
        },
        img256x256: {
            type: String,
            required: false
        },
        img1100x150: {
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