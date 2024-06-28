const Game = require("../models/game")

const mongoose = require("mongoose");

const find = async (req,res) => {

    let loggerInfo = req.app.get("loggerInfo");
    let loggerError = req.app.get("loggerError");

    if(!mongoose.mongo.ObjectId.isValid(req.params.id)){
        loggerError.error("CODE 400: Invalid game Id: {" + req.params.id + "}");
        res.status(400);
        return res.send({msg:"Invalid game Id: {" + req.params.id + "}"});
    }
    try {
        let game = await Game.findById(req.params.id);

        if (game) {
            loggerInfo.info("CODE 200: Game with Id:{" + req.params.id + "} found successfully");
            res.status(200);
            return res.json(game);
        } else {
            loggerError.error("ERROR 404: Game with Id:{" + req.params.id + "} not found");
            res.status(404);
            return res.send({msg: "Game with Id:{" + req.params.id + "} not found"});
        }
    }catch (e){
        loggerError.error("ERROR 400: There was a problem finding the game: ",e)
        res.status(400);
        return res.send({msg:"There was a problem finding the game: ",e});
    }
}

const findAll = async (req,res) => {

    let loggerInfo = req.app.get("loggerInfo");
    let loggerError = req.app.get("loggerError");

    let games = [];

    try {

        games = await Game.find({})

        if (games) {
            loggerInfo.info("CODE 200: Games found successfully");
            res.status(200);
            return res.send({games});
        }

    }catch (e) {
        loggerError.error("ERROR 400: There was a problem finding the games: ",e)
        res.status(400);
        return res.send({msg:"There was a problem finding the games: ",e});
    }
}

const add = async (req,res) => {

    let loggerInfo = req.app.get("loggerInfo");
    let loggerError = req.app.get("loggerError");

    let { _name, name, modes} = req.body;

    const createGame = async (g_private_name, g_name, g_modes) => {
        try {

            let gameToAdd = new Game;
            gameToAdd._name = g_private_name;
            gameToAdd.name = g_name;
            gameToAdd.modes = g_modes;

            await Game.create(gameToAdd).then(result => {
                loggerInfo.info("CODE 201: Game {" + result._id + "} created successfully");
                res.status(201);
                return res.send({
                    id: result._id
                });
            })

        }catch(e){
            loggerError.error("ERROR 400: There was a problem creating the game", e);
            res.status(400);
            return res.send({msg:"There was a problem creating the game: " + e});
        }
    }

    //Se debe comprobar la validez de los modes con el Schema

    await createGame(_name,name,modes);
}

const upd = async (req,res) => {

    let loggerInfo = req.app.get("loggerInfo");
    let loggerError = req.app.get("loggerError");

    let {game} = req.body;

    //COMPROBAMOS SI EL ID DEL GAME EXISTE

    if(!mongoose.mongo.ObjectId.isValid(req.params.id)){
        loggerError.error("ERROR 404: Game with Id:{" + req.params.id + "} not found");
        res.status(404);
        return res.send({msg:"Game with Id:{" + req.params.id + "} not found"});
    }

    let gameFound = await Game.findById(req.params.id);

    if(!gameFound){
        loggerError.error("ERROR 404: Game with Id:{" + req.params.id + "} not found");
        res.status(404);
        return res.send({msg:"Game with Id:{" + req.params.id + "} not found"});
    }

    //Comprobar que los nuevos modes son válidos con el esquema

    try {
        await Game.updateOne(
            {
                _id: new mongoose.mongo.ObjectId(req.params.id)
            },
            {
                $set: {
                    _name: game._name,
                    name: game.name,
                    modes: game.modes
                }
            }).then(result => {
                loggerInfo.info("CODE 200: Game {" + req.params.id + "} updated successfully");
                res.status(200);
                return res.send({msg: "Game {" + req.params.id + "} updated successfully"});
            }
        );
    } catch (e) {
        loggerError.error("ERROR 400: There was a problem updating the game", e);
        res.status(400);
        return res.send({msg:"There was a problem updating the game: " + e});
    }

}

const del = async (req, res) => {

    let loggerInfo = req.app.get("loggerInfo");
    let loggerError = req.app.get("loggerError");

    if(!mongoose.mongo.ObjectId.isValid(req.params.id)){
        loggerError.error("ERROR 400: Invalid game Id: {" + req.params.id + "}");
        res.status(400);
        return res.send({msg:"Invalid game Id:{" + req.params.id + "}"});
    }

    let gameFound = await Game.findById(req.params.id);

    //Comprobamos si el juego que se quiere borrar existe o no
    if(gameFound){
        let result = await Game.deleteOne({"_id": new mongoose.mongo.ObjectId(req.params.id)});
        if(result.deletedCount === 1){
            loggerInfo.info("CODE 200: Game with Id:{" + req.params.id + "} deleted successfully")
            res.status(200)
            return res.send({
                msg: "Game with Id:{" + req.params.id + "} deleted successfully",
                game: gameFound
            })
        }else{
            loggerError.error("ERROR 400: The game with Id:{" + req.params.id + "} could not be removed");
            res.status(400);
            return res.send({
                msg: "The game with Id:{" + req.params.id + "} could not be removed"
            });
        }
    }else {
        loggerError.error("ERROR 404: Game with Id:{" + req.params.id + "} not found");
        res.status(404);
        return res.send({msg:"Game with Id:{" + req.params.id + "} not found"});
    }
}

module.exports = {findAll, find, add, upd, del}