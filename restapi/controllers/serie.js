const Serie = require('../models/serie');
const Match = require('../models/match');
const {User} = require('../models/user');
const Game = require('../models/game');

const mongoose = require("mongoose");

const find = async (req, res) => {

    let loggerInfo = req.app.get("loggerInfo");
    let loggerError = req.app.get("loggerError");

    if(!mongoose.mongo.ObjectId.isValid(req.params.id)){
        loggerError.error("CODE 400: Invalid Serie Id: {" + req.params.id + "}");
        res.status(400);
        return res.send({msg:"Invalid Serie Id: {" + req.params.id + "}"});
    }

    let serie = await Serie.findById(req.params.id);

    if(serie){
        loggerInfo.info("CODE 200: Serie with Id:{" + req.params.id + "} found successfully");
        res.status(200);
        res.json(serie);
    }else{
        loggerError.error("ERROR 404: Serie with Id:{" + req.params.id + "} not found");
        res.status(404);
        res.send({msg:"Serie with Id:{" + req.params.id + "} not found"});
    }
}

const findAll = async (req, res) => {

    let loggerInfo = req.app.get("loggerInfo");
    let loggerError = req.app.get("loggerError");
    let filteredSeries;

    try {
        if((req.query.game && req.query.user) || (req.query.user && req.query.mode)){
            loggerError.error("ERROR 400: There cannot be two filters together with exception of game and mode")
            res.status(400);
            return res.send({msg:"There cannot be two filters together with exception of game and mode"});
        }

        //FIND BY GAME AND MODE

        if (req.query.game) {
            if (req.query.mode) {
                filteredSeries = await Serie.find({
                    game: req.query.game,
                    mode: req.query.mode
                })
            } else {
                filteredSeries = await Serie.find({
                    game: req.query.game
                })
            }
        }

        //FIND BY USER

        if(req.query.user){
            let filteredSeriesHome = await Serie.find({
                type: "SINGLE",
                home_participant: req.query.user
            })
            let filteredSeriesAway = await Serie.find({
                type: "SINGLE",
                away_participant: req.query.user
            })

            filteredSeries = filteredSeriesHome.concat(filteredSeriesAway);

        }

        if (filteredSeries) {
            loggerInfo.info("CODE 200: Series found successfully");
            res.status(200);
            return res.send(filteredSeries);
        }
    }catch (e) {
        loggerError.error("ERROR 400: There was a problem finding the series")
        res.status(400);
        return res.send({msg:"There was a problem finding the series"});
    }
}

const add = async (req, res) => {
    let loggerInfo = req.app.get("loggerInfo");
    let loggerError = req.app.get("loggerError");

    let { type, mode, game, bestOf, home_participant, away_participant, result, status } = req.body;

    const createSerie = async (s_type, s_mode, s_game, s_bestOf, s_home, s_away, s_result, s_status) => {
        try {
            let serie = new Serie;
            serie.type = s_type;
            serie.mode = s_mode;
            serie.game = s_game;
            serie.bestOf = s_bestOf;
            serie.home_participant = s_home;
            serie.away_participant = s_away;
            serie.result = s_result;
            serie.status = s_status;

            await Serie.create(serie).then(result => {
                    loggerInfo.info("CODE 201: Serie {" + result._id+ "} created successfully");
                    res.status(201);
                    return res.send({
                        id: result._id
                    });
                }
            );
        } catch (e) {
            loggerError.error("CODE 400: There was a problem creating the serie", e);
            res.status(400);
            return res.send({msg:"There was a problem creating the serie: " + e});
        }
    };


    //COMPROBAMOS QUE EXISTE EL JUEGO AL QUE SE VA A JUGAR EN ESTA SERIE

    if(!mongoose.mongo.ObjectId.isValid(game)){
        loggerError.error("CODE 404: Invalid Game Id: {" + game + "}");
        res.status(404);
        return res.send({msg:"Invalid Game Id: {" + game + "}"});
    }

    let found_game = await Game.findOne({"_id": new mongoose.mongo.ObjectId(game)});

    if (found_game === null) {
        loggerError.error("CODE 404: Game with Id:{" + game + "} not found");
        res.status(404);
        return res.send({msg:"Game with Id:{" + game + "} not found"});
    }

    //UNA VEZ QUE SABEMOS QUE EL JUEGO EXISTE COMPROBAMOS QUE EL MODO DE JUEGO EXISTE DENTRO DE ESTE JUEGO

    let modo = found_game.modes.find(m => m._name === mode);

    if (modo == null) {
        loggerError.error("CODE 404: Mode with Name:{" + mode + "} not found");
        res.status(404);
        return res.send({msg:"Mode with Name:{" + mode + "} not found"});
    }

    if(home_participant){
        let foundHomeParticipant = undefined;

        if (!mongoose.mongo.ObjectId.isValid(home_participant)) {
            loggerError.error("CODE 404: Invalid Participant Id:{" + home_participant + "}");
            res.status(404);
            return res.send({msg:"Invalid Participant Id:{" + home_participant + "}"});
        }

        if (modo.type === "SINGLE") {
            foundHomeParticipant = await User.findOne({ _id: new mongoose.mongo.ObjectId(home_participant) });
        }

        if (!foundHomeParticipant) {
            loggerError.error("CODE 404: Participant with Id:{" + home_participant + "} not found");
            res.status(404);
            return res.send({msg:"Participant with Id:{" + home_participant + "} not found"});
        }
    }

    if(away_participant) {
        let foundAwayParticipant = undefined;

        if (!mongoose.mongo.ObjectId.isValid(away_participant)) {
            loggerError.error("CODE 404: Invalid Participant Id:{" + away_participant + "}");
            res.status(404);
            return res.send({msg:"Invalid Participant Id:{" + away_participant + "}"});
        }

        if (modo.type === "SINGLE") {
            foundAwayParticipant = await User.findOne({ _id: new mongoose.mongo.ObjectId(away_participant) });
        }

        if (!foundAwayParticipant) {
            loggerError.error("CODE 404: Participant with Id:{" + away_participant + "} not found");
            res.status(404);
            return res.send({msg:"Participant with Id:{" + away_participant + "} not found"});
        }
    }

    if (result.winner){
        if (!home_participant && !away_participant) {
            loggerError.error("CODE 400: At least one participant should be assigned before you assign the winner or loser of the match");
            res.status(400);
            return res.send({msg:"At least one participant should be assigned before you assign the winner or loser of the match"});
        }

        if(result.winner !== home_participant && result.winner !== away_participant) {
            loggerError.error("CODE 400: Participant with Id:{" + result.winner + "} doesn't match with Id:{" + home_participant + "} or Id:{" + away_participant + "}");
            res.status(400);
            return res.send({msg:"Participant with Id:{" + result.winner + "} doesn't match with Id:{" + home_participant + "} or Id:{" + away_participant + "}"});
        }
    }

    //COMPROBAMOS QUE LOS PARTIDOS DEL RESULT SEAN VÁLIDOS Y EXISTAN EN LA BBDD
    for(let match of result.matches) {
        if (!mongoose.mongo.ObjectId.isValid(match)) {
            loggerError.error("CODE 404: Invalid Match Id:{" + match + "}");
            res.status(404);
            return res.send({msg:"Invalid Match Id:{" + match + "}"});
        }

        let match_found = await Match.findOne({ _id: new mongoose.mongo.ObjectId(match) });

        if(!match_found) {
            loggerError.error("CODE 404: Match with Id:{" + match +  "} not found");
            res.status(404);
            return res.send({msg:"Match with Id:{" + match +  "} not found"});
        }
    }

    await createSerie(type,mode,game,bestOf,home_participant,away_participant,result,status);
}

const upd = async (req, res) => {
    let loggerInfo = req.app.get("loggerInfo");
    let loggerError = req.app.get("loggerError");

    let { serie } = req.body;

    //COMPROBAMOS SI EL ID DE LA SERIE EXISTE

    if(!mongoose.mongo.ObjectId.isValid(req.params.id)){
        loggerError.error("CODE 404: Serie with Id:{" + req.params.id + "} not found");
        res.status(404);
        return res.send({msg:"Serie with Id:{" + req.params.id + "} not found"});
    }

    let matchInDatabase = await Serie.findById(req.params.id);

    if(!matchInDatabase){
        loggerError.error("CODE 404: Serie with Id:{" + req.params.id + "} not found");
        res.status(404);
        return res.send({msg:"Serie with Id:{" + req.params.id + "} not found"});
    }


    //COMPROBAMOS QUE EXISTE EL JUEGO AL QUE SE VA A JUGAR EN ESTA SERIE

    let found_game = await Game.findOne({"_id": new mongoose.mongo.ObjectId(matchInDatabase.game)});

    if(serie.game) {
        if (!mongoose.mongo.ObjectId.isValid(serie.game)) {
            loggerError.error("CODE 404: Invalid Game Id: {" + serie.game + "}");
            res.status(404);
            return res.send({msg: "Invalid Game Id: {" + serie.game + "}"});
        }

        found_game = await Game.findOne({"_id": new mongoose.mongo.ObjectId(serie.game)});

        if (found_game === null) {
            loggerError.error("CODE 404: Game with Id:{" + serie.game + "} not found");
            res.status(404);
            return res.send({msg: "Game with Id:{" + serie.game + "} not found"});
        }
    }

    //UNA VEZ QUE SABEMOS QUE EL JUEGO EXISTE COMPROBAMOS QUE EL MODO DE JUEGO EXISTE DENTRO DE ESTE JUEGO

    let modo = found_game.modes.find(m => m._name === matchInDatabase.mode);

    if(serie.mode) {
        modo = found_game.modes.find(m => m._name === serie.mode);

        if (modo == null) {
            loggerError.error("CODE 404: Mode with Name:{" + serie.mode + "} not found");
            res.status(404);
            return res.send({msg: "Mode with Name:{" + serie.mode + "} not found"});
        }
    }

    //FUNCIÓN QUE COMPRUEBA SI UN PARTICIPANTE ES VÁLIDO

    let unset = {}

    if(serie.home_participant) {
        let foundHomeParticipant = undefined;

        if (!mongoose.mongo.ObjectId.isValid(serie.home_participant)) {
            loggerError.error("CODE 404: Invalid Participant Id:{" + serie.home_participant + "}");
            res.status(404);
            return res.send({msg:"Invalid Participant Id:{" + serie.home_participant + "}"});
        }

        if (modo.type === "SINGLE") {
            foundHomeParticipant = await User.findOne({ _id: new mongoose.mongo.ObjectId(serie.home_participant) });
        }

        if (!foundHomeParticipant) {
            loggerError.error("CODE 404: Participant with Id:{" + serie.home_participant + "} not found");
            res.status(404);
            return res.send({msg:"Participant with Id:{" + serie.home_participant + "} not found"});
        }
    }else{
        unset.home_participant = "";
    }

    if(serie.away_participant) {
        let foundHomeParticipant = undefined;

        if (!mongoose.mongo.ObjectId.isValid(serie.away_participant)) {
            loggerError.error("CODE 404: Invalid Participant Id:{" + serie.away_participant + "}");
            res.status(404);
            return res.send({msg:"Invalid Participant Id:{" + serie.away_participant + "}"});
        }

        if (modo.type === "SINGLE") {
            foundHomeParticipant = await User.findOne({ _id: new mongoose.mongo.ObjectId(serie.away_participant) });
        }

        if (!foundHomeParticipant) {
            loggerError.error("CODE 404: Participant with Id:{" + serie.away_participant + "} not found");
            res.status(404);
            return res.send({msg:"Participant with Id:{" + serie.away_participant + "} not found"});
        }
    }else{
        unset.away_participant = "";
    }

    if (serie.result.winner){
        if (!serie.home_participant && !serie.away_participant) {
            loggerError.error("CODE 400: At least one participant should be assigned before you assign the winner or loser of the match");
            res.status(400);
            return res.send({msg:"At least one participant should be assigned before you assign the winner or loser of the match"});
        }

        if(serie.result.winner !== serie.home_participant && serie.result.winner !== serie.away_participant) {
            loggerError.error("CODE 400: Participant with Id:{" + serie.result.winner + "} doesn't match with Id:{" + serie.home_participant + "} or Id:{" + serie.away_participant + "}");
            res.status(400);
            return res.send({msg:"Participant with Id:{" + serie.result.winner + "} doesn't match with Id:{" + serie.home_participant + "} or Id:{" + serie.away_participant + "}"});
        }
    }

    //COMPROBAMOS QUE LOS PARTIDOS DEL RESULT SEAN VÁLIDOS Y EXISTAN EN LA BBDD
    for(let match of serie.result.matches) {
        if (!mongoose.mongo.ObjectId.isValid(match)) {
            loggerError.error("CODE 404: Invalid Match Id:{" + match + "}");
            res.status(404);
            return res.send({msg:"Invalid Match Id:{" + match + "}"});
        }

        let match_found = await Match.findOne({ _id: new mongoose.mongo.ObjectId(match) });

        if(!match_found) {
            loggerError.error("CODE 404: Match with Id:{" + match +  "} not found");
            res.status(404);
            return res.send({msg:"Match with Id:{" + match +  "} not found"});
        }
    }

    try {
        await Serie.updateOne(
            {
                _id: new mongoose.mongo.ObjectId(req.params.id)
            },
            {
                $set: {
                    home_participant: serie.home_participant,
                    away_participant: serie.away_participant,
                    tournament: serie.tournament,
                    result: serie.result,
                    status: serie.status
                },
                $unset:unset
            }).then(result => {
                loggerInfo.info("Serie {" + req.params.id + "} updated successfully");
                res.status(200);
                return res.send({msg: "Serie {" + req.params.id + "} updated successfully"});
            }
        );
    }catch(e){
        loggerError.error("There was a problem updating the serie", e);
        res.status(400);
        return res.send({msg:"There was a problem updating the serie: " + e});
    }
}

const del = async (req, res) => {

    let loggerInfo = req.app.get("loggerInfo");
    let loggerError = req.app.get("loggerError");

    if(!mongoose.mongo.ObjectId.isValid(req.params.id)){
        loggerError.error("CODE 400: Invalid Serie Id: {" + req.params.id + "}");
        res.status(400);
        return res.send({msg:"Invalid Serie Id:{" + req.params.id + "}"});
    }

    let serie_found = await Serie.findById(req.params.id);

    //Comprobamos si el partido que se quiere borrar existe o no
    if(serie_found){
        let result = await Serie.deleteOne({"_id": new mongoose.mongo.ObjectId(req.params.id)});
        if(result.deletedCount === 1){
            loggerInfo.info("CODE 200: Serie {" + req.params.id + "} deleted successfully")
            res.status(200)
            res.send({
                msg: "Serie Id:{" + req.params.id + "} deleted successfully",
                serie: serie_found
            })
        }else{
            loggerError.error("CODE 400: The serie with Id:{" + req.params.id + "} could not be removed");
            res.status(400);
            res.send({
                msg: "The serie with Id:{" + req.params.id + "} could not be removed"
            });
        }

    }else {
        loggerError.error("ERROR 404: Serie with Id:{" + req.params.id + "} not found");
        res.status(404);
        res.send({msg:"Serie with Id:{" + req.params.id + "} not found"});
    }
}

module.exports = {findAll, find, add, upd, del}