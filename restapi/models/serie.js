const mongoose = require("mongoose");

const SerieSchema = mongoose.Schema(
    {
        bestOf:{
            type: Number,
            required: true
        },
        participant1:{
            type: mongoose.Types.ObjectId,
            required: false,
        },
        participant2: {
            type: mongoose.Types.ObjectId,
            required: false
        },
        participant1Result: {
            type: Number,
            required: false
        },
        participant2Result: {
            type: Number,
            required: false
        },
        matches: {
            type: [mongoose.Types.ObjectId],
        }
    }
)

SerieSchema.methods.toJSON = function () {
    const { __v, _id, ...serie} = this.toObject()
    serie.uid = _id;
    return serie;
}

module.exports = mongoose.model('Serie', SerieSchema)