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
        enum: ["SINGLE","TEAM"],
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
    const { __v, _id, ...game} = this.toObject()
    game.uid = _id
    return game;
}

module.exports = mongoose.model('Game', GameSchema)