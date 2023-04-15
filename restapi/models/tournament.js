const {Schema, model} = require("mongoose");

const TournamentSchema = Schema(
    {
        name: {
            type: String,
            required: true
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
        game: {
            type:String,
            required: true
        },
        online: {
            type: Boolean,
            required: true
        },
        location: {
            type: String
        },
        participants:{
            type: Number,
            required:true,
            min: 0,
            max: 32
        },
        img256x256:{
            type: String
        },
        img1100x150:{
            type: String
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

module.exports = model('Tournament', TournamentSchema)