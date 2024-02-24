const mongoose = require("mongoose");


const ModeSchema = mongoose.Schema({
    name: {
        type:String,
        required: true,
    },
    type: {
        type:String,
        enum: ['1vs1', '2vs2', '3vs3', '4vs4', '5vs5'],
        required: true,
    }
});

const GameSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
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