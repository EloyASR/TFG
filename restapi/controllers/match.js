const Match = require('../models/match');
const Game = require('../models/game');
const Serie = require('../models/serie');

const mongoose = require("mongoose");

const find = async (req, res) => {

    let loggerInfo = req.app.get("loggerInfo");
    let loggerError = req.app.get("loggerError");

    if(!mongoose.mongo.ObjectId.isValid(req.params.id)){
        loggerError.error("CODE 400: Invalid Match Id: {" + req.params.id + "}");
        res.status(400);
        return res.send({msg:"Invalid Match Id: {" + req.params.id + "}"});
    }

    let match = await Match.findById(req.params.id);

    if(match){
        loggerInfo.info("CODE 200: Match with Id:{" + req.params.id + "} found successfully");
        res.status(200);
        res.json(match);
    }else{
        loggerError.error("ERROR 404: Match with Id:{" + req.params.id + "} not found");
        res.status(404);
        res.send({msg:"Match with Id:{" + req.params.id + "} not found"});
    }
}

const findAll = async (req, res) => {

    let loggerInfo = req.app.get("loggerInfo");
    let loggerError = req.app.get("loggerError");
    let filteredMatches;

    try {
        if((req.query.game && req.query.user) || (req.query.game && req.query.user)){
            loggerError.error("ERROR 400: There cannot be two filters together with exception of game and mode")
            res.status(400);
            return res.send({msg:"There cannot be two filters together with exception of game and mode"});
        }

        //FIND BY GAME AND MODE

        if (req.query.game) {
            if (req.query.mode) {
                filteredMatches = await Match.find({
                    game: req.query.game,
                    mode: req.query.mode
                })
            } else {
                filteredMatches = await Match.find({
                    game: req.query.game
                })
            }
        }

        //FIND BY SERIE

        if(req.query.serie){
            filteredMatches = await Match.find({
                serie: req.query.serie
            })
        }

        if (filteredMatches) {
            loggerInfo.info("CODE 200: Matches found successfully");
            res.status(200);
            return res.send(filteredMatches);
        }
    }catch (e) {
        loggerError.error("ERROR 400: There was a problem finding the matches")
        res.status(400);
        return res.send({msg:"There was a problem finding the matches"});
    }
}

const add = async (req, res) => {
    let loggerInfo = req.app.get("loggerInfo");
    let loggerError = req.app.get("loggerError");

    let { mode, game, type, serie, matchData } = req.body;

    const createMatch = async (m_mode, m_game, m_type, m_serie, m_data) => {
        try {
            let match = new Match;
            match.mode = m_mode;
            match.game = m_game;
            match.type = m_type;
            match.serie = m_serie;
            match.matchData = m_data;

            await Match.create(match).then(result => {
                    loggerInfo.info("CODE 201: Match {" + result._id+ "} created successfully");
                    res.status(201);
                    return res.send({
                        id: result._id
                    });
                }
            );
        } catch (e) {
            loggerError.error("CODE 400: There was a problem creating the match", e);
            res.status(400);
            return res.send({msg:"There was a problem creating the match: " + e.errors.status});
        }
    };

    //COMPROBAMOS QUE EXISTE EL JUEGO AL QUE SE VA A JUGAR EN ESTE PARTIDO

    if(!mongoose.mongo.ObjectId.isValid(game)){
        loggerError.error("CODE 404: Game with Id:{" + game + "} not found");
        res.status(404);
        return res.send({msg:"Game with Id:{" + game + "} not found"});
    }

    let found_game = await Game.findOne({"_id": new mongoose.mongo.ObjectId(game)});

    if (!found_game) {
        loggerError.error("CODE 404: Game with Id:{" + game + "} not found");
        res.status(404);
        return res.send({msg:"Game with Id:{" + game + "} not found"});
    }

    //UNA VEZ QUE SABEMOS QUE EL JUEGO EXISTE COMPROBAMOS QUE EL MODO DE JUEGO EXISTE DENTRO DE ESTE JUEGO

    let modo = found_game.modes.find(m => m._name === mode);

    if (!modo) {
        loggerError.error("CODE 404: Mode with Name:{" + mode + "} not found");
        res.status(404);
        return res.send({msg:"Mode with Name:{" + mode + "} not found"});
    }

    //COMPROBAMOS QUE EXISTE LA SERIE

    if(!mongoose.mongo.ObjectId.isValid(serie)){
        loggerError.error("CODE 404: Serie with Id:{" + serie + "} not found");
        res.status(404);
        return res.send({msg:"Serie with Id:{" + serie + "} not found"});
    }

    let found_serie = await Serie.findOne({"_id": new mongoose.mongo.ObjectId(serie)});

    if (!found_serie) {
        loggerError.error("CODE 404: Serie with Id:{" + serie + "} not found");
        res.status(404);
        return res.send({msg:"Serie with Id:{" + serie + "} not found"});
    }


    await createMatch(mode,game, type, serie, matchData);
}


const upd = async (req, res) => {
    let loggerInfo = req.app.get("loggerInfo");
    let loggerError = req.app.get("loggerError");

    let {match} = req.body;

    //COMPROBAMOS SI EL ID DE MATCH EXISTE

    if(!mongoose.mongo.ObjectId.isValid(req.params.id)){
        loggerError.error("CODE 404: Match with Id:{" + req.params.id + "} not found");
        res.status(404);
        return res.send({msg:"Match with Id:{" + req.params.id + "} not found"});
    }

    let matchInDatabase = await Match.findById(req.params.id);

    if(!matchInDatabase){
        loggerError.error("CODE 404: Match with Id:{" + req.params.id + "} not found");
        res.status(404);
        return res.send({msg:"Match with Id:{" + req.params.id + "} not found"});
    }

    //COMPROBAMOS QUE EXISTE EL JUEGO AL QUE SE VA A JUGAR EN ESTE PARTIDO

    let found_game = await Game.findOne({"_id": new mongoose.mongo.ObjectId(matchInDatabase.game)});

    if(match.game) {
        if (!mongoose.mongo.ObjectId.isValid(match.game)) {
            loggerError.error("CODE 404: Game with Id:{" + match.game + "} not found");
            res.status(404);
            return res.send({msg: "Game with Id:{" + match.game + "} not found"});
        }

        found_game = await Game.findOne({"_id": new mongoose.mongo.ObjectId(match.game)});

        if (!found_game) {
            loggerError.error("CODE 404: Game with Id:{" + match.game + "} not found");
            res.status(404);
            return res.send({msg: "Game with Id:{" + match.game + "} not found"});
        }
    }

    //UNA VEZ QUE SABEMOS QUE EL JUEGO EXISTE COMPROBAMOS QUE EL MODO DE JUEGO EXISTE DENTRO DE ESTE JUEGO

    if(match.mode) {
        let modo = found_game.modes.find(m => m._name === match.mode);

        if (!modo) {
            loggerError.error("CODE 404: Mode with Name:{" + match.mode + "} not found");
            res.status(404);
            return res.send({msg:"Mode with Name:{" + match.mode + "} not found"});
        }
    }

    //COMPROBAMOS QUE EXISTE LA SERIE

    if(match.serie) {
        if(!mongoose.mongo.ObjectId.isValid(match.serie)){
            loggerError.error("CODE 404: Serie with Id:{" + match.serie + "} not found");
            res.status(404);
            return res.send({msg:"Serie with Id:{" + match.serie + "} not found"});
        }

        let found_serie = await Serie.findOne({"_id": new mongoose.mongo.ObjectId(match.serie)});

        if (!found_serie) {
            loggerError.error("CODE 404: Serie with Id:{" + match.serie + "} not found");
            res.status(404);
            return res.send({msg:"Serie with Id:{" + match.serie + "} not found"});
        }
    }

    try {
        await Match.updateOne(
            {
                _id: new mongoose.mongo.ObjectId(req.params.id)
            },
            {
                $set: {
                    matchData: match.matchData,
                }
            }).then(result => {
                loggerInfo.info("CODE 200: Match {" + req.params.id + "} updated successfully");
                res.status(200);
                return res.send({msg: "Match {" + req.params.id + "} updated successfully"});
            }
        );
    } catch (e) {
        loggerError.error("CODE 400: There was a problem updating the match", e);
        res.status(400);
        return res.send({msg:"There was a problem updating the match: " + e.errors.status});
    }
}

const del = async (req, res) => {

    let loggerInfo = req.app.get("loggerInfo");
    let loggerError = req.app.get("loggerError");

    if(!mongoose.mongo.ObjectId.isValid(req.params.id)){
        loggerError.error("CODE 400: Invalid Match Id: {" + req.params.id + "}");
        res.status(400);
        return res.send({msg:"Invalid Match Id:{" + req.params.id + "}"});
    }

    let match_found = await Match.findById(req.params.id);

    //Comprobamos si el partido que se quiere borrar existe o no
    if(match_found){
        let result = await Match.deleteOne({"_id": new mongoose.mongo.ObjectId(req.params.id)});
        if(result.deletedCount === 1){
            loggerInfo.info("CODE 200: Match {" + req.params.id + "} deleted successfully")
            res.status(200)
            res.send({
                msg: "Match Id:{" + req.params.id + "} deleted successfully",
                match: match_found
            })
        }else{
            loggerError.error("CODE 400: The match with Id:{" + req.params.id + "} could not be removed");
            res.status(400);
            res.send({
                msg: "The match with Id:{" + req.params.id + "} could not be removed"
            });
        }

    }else {
        loggerError.error("ERROR 404: Match with Id:{" + req.params.id + "} not found");
        res.status(404);
        res.send({msg:"Match with Id:{" + req.params.id + "} not found"});
    }
}

module.exports = {findAll, find, add, upd, del}