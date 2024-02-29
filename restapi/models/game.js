const mongoose = require("mongoose");


const ModeSchema = mongoose.Schema({
    _name: {
        type:String,
        required: true,
    },
    name: {
        type:String,
        required: true,
    },
    type: {
        type:String,
        enum: ['1VS1', '2VS2', '3VS3', '4VS4', '5VS5'],
        required: true,
    }
});

const GameSchema = mongoose.Schema({
    _name: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    modes: {
        type: [ModeSchema]
    }
});

GameSchema.methods.toJSON = function () {
    const { __v, _id, ...match} = this.toObject()
    game.uid = _id
    return game;
}

module.exports = mongoose.model('Game', GameSchema)