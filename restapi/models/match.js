const mongoose = require("mongoose");

const MatchSchema = mongoose.Schema(
    {
        participant1: {
            type: mongoose.Types.ObjectId,
            required: false
        },
        participant2: {
            type: mongoose.Types.ObjectId,
            required: false
        },
        win:{
            type: mongoose.Types.ObjectId,
            required: false
        },
        lose:{
            type: mongoose.Types.ObjectId,
            required: false
        },
        matchData:{
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