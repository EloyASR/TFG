const mongoose = require("mongoose");

const MatchSchema = mongoose.Schema(
    {
        type:{
            type: String,
            required: [true, "Type is required"],
            enum: {
                values: ['SINGLE','TEAM'],
                message: "{VALUE} is not supported. Type must be SINGLE or TEAM",
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
        matchData: {
            type: mongoose.Schema.Types.Mixed,
            required: false
        }
    }
)

MatchSchema.methods.toJSON = function () {
    const { __v, _id, ...match} = this.toObject()
    match.uid = _id
    return match;
}

module.exports = mongoose.model('Match', MatchSchema)