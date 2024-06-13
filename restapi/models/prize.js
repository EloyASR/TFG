const { Schema, model } = require('mongoose')
const mongoose = require("mongoose");

const PrizeSchema = Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: false
        },
        image: {
            type: String,
            required: false
        },
        creator:{
            type: mongoose.Types.ObjectId,
            required: true
        }
    },
    {
        timestamps: true
    }
)

PrizeSchema.methods.toJSON = function () {
    const { __v, _id, ...prize } = this.toObject()
    prize.uid = _id
    return prize
}

module.exports = model('Prize', PrizeSchema)