const mongoose = require("mongoose");

const ResultSchema = mongoose.Schema(
    {
        winner: {
            type: mongoose.Types.ObjectId,
            required: false
        },
        loser: {
            type: mongoose.Types.ObjectId,
            required: false
        },
        winner_result: {
            type: Number,
            required: false,
        },
        loser_result: {
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
        date: {
            type: Date,
        },
        result:{
            type: ResultSchema,
            required: true
        },
        status: {
            type: String,
            required: [true, "Status is required"],
            enum: {
                values: ['SCHEDULED_NO_PARTICIPANTS','SCHEDULED_WITH_PARTICIPANTS','IN_GAME','FINISHED','CANCELED','MATCH_NOT_PLAYED'],
                message: "{VALUE} is not supported. Status must be SCHEDULED_NO_PARTICIPANTS, SCHEDULED_WITH_PARTICIPANTS, IN_GAME, FINISHED, CANCELED or MATCH_NOT_PLAYED",
            },
            default: 'SCHEDULED_NO_PARTICIPANTS',
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