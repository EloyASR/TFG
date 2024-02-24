const mongoose = require("mongoose");

const MatchSchema = mongoose.Schema(
    {
        type:{
            type: String,
            required: [true, "Type is required"],
            enum: {
                values: ['1VS1','2VS2','3VS3','4VS4','5VS5'],
                message: "{VALUE} is not supported. Type must be 1VS1, 2VS2, 3VS3, 4VS4 or 5VS5.",
            },
            trim: true
        },
        mode:{
            type: String,
            required: [true, "Mode is required"]
        },
        game:{
            type: mongoose.Types.ObjectId,
            required: [true, "Game is required"]
        },
        participant1: {
            type: mongoose.Types.ObjectId,
            required: false
        },
        participant2: {
            type: mongoose.Types.ObjectId,
            required: false
        },
        serie: {
            type: mongoose.Types.ObjectId,
            required: false
        },
        tournament: {
            type: mongoose.Types.ObjectId,
            required: false
        },
        win: {
            type: mongoose.Types.ObjectId,
            required: false
        },
        lose: {
            type: mongoose.Types.ObjectId,
            required: false
        },
        date: {
            type: Date,
            required: false,
        },
        matchData: {
            type: mongoose.Schema.Types.Mixed,
            required: false
        },
        status: {
            type: String,
            required: [true, "Status is required"],
            enum: {
                values: ['SCHEDULED_NO_PARTICIPANTS','SCHEDULED_WITH_PARTICIPANTS','IN_GAME','FINISHED','CANCELED'],
                message: "{VALUE} is not supported. Status must be SCHEDULED_NO_PARTICIPANTS, SCHEDULED_WITH_PARTICIPANTS, IN_GAME, FINISHED or CANCELED.",
            },
            default: 'SCHEDULED_NO_PARTICIPANTS',
            trim: true
        }
    }
)

MatchSchema.methods.toJSON = function () {
    const { __v, _id, ...match} = this.toObject()
    match.uid = _id
    return match;
}

module.exports = mongoose.model('Match', MatchSchema)