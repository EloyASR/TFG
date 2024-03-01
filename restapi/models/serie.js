const mongoose = require("mongoose");

const SerieSchema = mongoose.Schema(
    {
        type: {
            type: String,
            required: true
        },
        mode: {
            type: String,
            required: true
        },
        bestOf:{
            type: Number,
            required: true
        },
        game: {
            type: mongoose.Types.ObjectId,
            required: true
        },
        home_participant:{
            type: mongoose.Types.ObjectId,
            required: false
        },
        away_participant: {
            type: mongoose.Types.ObjectId,
            required: false
        },
        date: {
            type: Date,
        },
        result:{
            type: mongoose.Schema.Types.Mixed, //TODO: Modificar con un Schema de result
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