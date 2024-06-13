const mongoose = require("mongoose");

const ResultSchema = mongoose.Schema(
    {
        winner: {
            type: mongoose.Types.ObjectId,
            required: false
        },
        home_result: {
            type: Number,
            required: false,
        },
        away_result: {
            type: Number,
            required: false,
        },
        matches: {
            type:[mongoose.Types.ObjectId],
        }
    }
)

const SerieSchema = mongoose.Schema(
    {
        type: {
            type: String,
            enum: ['SINGLE','TEAM'],
            required: true
        },
        mode: {
            type: String,
            required: true
        },
        game: {
            type: mongoose.Types.ObjectId,
            required: true
        },
        bestOf:{
            type: Number,
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
        result:{
            type: ResultSchema,
            required: true
        },
        status: {
            type: String,
            required: [true, "Status is required"],
            enum: {
                values: ['SCHEDULED','IN_GAME','FINISHED'],
                message: "{VALUE} is not supported. Status must be SCHEDULED, IN_GAME, FINISHED",
            },
            default: 'SCHEDULED',
            trim: true
        }
    }
)

SerieSchema.methods.toJSON = function () {
    const { __v, _id, ...serie} = this.toObject()
    serie.uid = _id;
    return serie;
}

module.exports = mongoose.model('Serie', SerieSchema)