const Serie = require('../models/serie');
const Match = require('../models/match');
const {User} = require('../models/user');
const Game = require('../models/game');
const Team = require('../models/team');
const Tournament = require('../models/tournament');

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
        if((req.query.game && req.query.user) || (req.query.user && req.query.team) || (req.query.game && req.query.team)){
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
                type: "1VS1",
                home_participant: req.query.user
            })
            let filteredSeriesAway = await Serie.find({
                type: "1VS1",
                away_participant: req.query.user
            })

            filteredSeries = filteredSeriesHome.concat(filteredSeriesAway);

        }

        //FIND BY TEAM

        if(req.query.team){
            let filteredSeriesHome = await Serie.find({
                type: { $in: ["2VS2", "3VS3", "4VS4", "5VS5"]},
                home_participant: req.query.user
            })
            let filteredSeriesAway = await Serie.find({
                type: { $in: ["2VS2", "3VS3", "4VS4", "5VS5"]},
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
        loggerError.error("CODE 400: Invalid Game Id: {" + game + "}");
        res.status(400);
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

    //FUNCIÓN QUE COMPRUEBA SI UN PARTICIPANTE ES VÁLIDO

    async function findParticipant(participant, modoType) {
        if (!mongoose.mongo.ObjectId.isValid(participant)) {
            loggerError.error("CODE 400: Invalid Participant Id:{" + participant + "}");
            throw { status: 400, msg: "Invalid Participant Id:{" + participant + "}" };
        }

        if (modoType === "SINGLE") {
            return await User.find({ _id: new mongoose.mongo.ObjectId(participant) });
        } else {
            return await Team.find({ _id: new mongoose.mongo.ObjectId(participant) });
        }
    }

    //FUNCIÓN QUE COMPRUEBA SI UN PARTICIPANTE EXISTE

    async function validateParticipants(participant, modoType) {
        if (participant) {
            let foundParticipant = await findParticipant(participant, modoType);
            if (!foundParticipant) {
                loggerError.error("CODE 404: Participant with Id:{" + participant + "} not found");
                throw {status: 404, msg: "Participant with Id:{" + participant + "} not found"};
            }
        }
    }

    //FUNCIÓN QUE COMPRUEBA SI SE HAN ASIGNADO ALGUNO DE LOS DOS IDS (WINNER OR LOSER)
    function validateParticipantsAssigned(home, away) {
        if (!home && !away) {
            loggerError.error("CODE 400: At least one participant should be assigned before you assign the winner or loser of the match");
            throw {status: 400, msg:"At least one participant should be assigned before you assign the winner or loser of the match"};
        }
    }
    try{
        if(home_participant){
            await validateParticipants(home_participant, modo.type);
        }

        if(away_participant) {
            await validateParticipants(away_participant, modo.type);
        }

        if (result.winner){
            validateParticipantsAssigned(home_participant, away_participant);
            if(result.winner !== home_participant && result.winner !== away_participant) {
                loggerError.error("CODE 400: Participant with Id:{" + result.winner + "} doesn't match with Id:{" + home_participant + "} or Id:{" + away_participant + "}");
                throw { status: 400, msg: "Participant with Id:{" + result.winner + "} doesn't match with Id:{" + home_participant + "} or Id:{" + away_participant + "}"};
            }
        }

        if (result.loser){
            validateParticipantsAssigned(home_participant, away_participant);
            if(result.loser !== home_participant && result.loser !== away_participant) {
                loggerError.error("CODE 400: Participant with Id:{" + result.loser + "} doesn't match with Id:{" + home_participant + "} or Id:{" + away_participant + "}");
                throw { status: 400, msg: "Participant with Id:{" + result.loser + "} doesn't match with Id:{" + home_participant + "} or Id:{" + away_participant + "}"};
            }
        }

        async function findMatch(match){
            if (!mongoose.mongo.ObjectId.isValid(match)) {
                loggerError.error("CODE 400: Invalid Match Id:{" + match + "}");
                throw { status: 400, msg: "Invalid Match Id:{" + match + "}" };
            }

            let match_found = await Match.findOne({ _id: new mongoose.mongo.ObjectId(match) });

            if(!match_found) {
                throw { status: 404, msg: "Match with Id:{" + match +  "} not found"};
            }else{
                return match_found;
            }
        }

        //COMPROBAMOS QUE LOS PARTIDOS DEL RESULT SEAN VÁLIDOS Y EXISTAN EN LA BBDD
        result.matches.forEach(async (m)=>{
            //PARA REDUCIR TIEMPOS SE PODRÍAN LANZAR TODAS LAS CONSULTAS ASINCRONAMENTE Y AÑADIRLAS A UN ARRAY Y QUE CUANDO TERMINE LA ÚLTIMA CONTINUE EL PROGRAMA
            await findMatch(m).then(()=>{});
        })

    }catch (error) {
        console.log(error)
        res.status(error.status || 500);
        return res.send({ msg: error.msg || "Internal Server Error" });
    }

    await createSerie(type,mode,game,bestOf,home_participant,away_participant,result,status);
}

const upd = async (req, res) => {
    let errors = [];
    let loggerInfo = req.app.get("loggerInfo");
    let loggerError = req.app.get("loggerError");

    let { serie } = req.body;

    console.log(serie);

    //COMPROBAMOS QUE EXISTE EL JUEGO AL QUE SE VA A JUGAR EN ESTA SERIE

    if(!mongoose.mongo.ObjectId.isValid(serie.game)){
        loggerError.error("Invalid Game Id: {" + serie.game + "}");
        errors.push("Invalid Game Id: {" + serie.game + "}");
    }

    let found_game = await Game.findOne({"_id": new mongoose.mongo.ObjectId(serie.game)});

    if (found_game === null) {
        loggerError.error("Game with Id:{" + serie.game + "} not found");
        errors.push("Game with Id:{" + serie.game + "} not found");
    }

    //UNA VEZ QUE SABEMOS QUE EL JUEGO EXISTE COMPROBAMOS QUE EL MODO DE JUEGO EXISTE DENTRO DE ESTE JUEGO

    let modo = found_game.modes.find(m => m._name === serie.mode);

    if (modo == null) {
        loggerError.error("Mode with Name:{" + serie.mode + "} not found");
        errors.push("Mode with Name:{" + serie.mode + "} not found");
    }

    //FUNCIÓN QUE COMPRUEBA SI UN PARTICIPANTE ES VÁLIDO

    async function findParticipant(participant, modoType, errors) {
        if (!mongoose.mongo.ObjectId.isValid(participant)) {
            loggerError.error("Invalid Participant Id:{" + participant + "}");
            errors.push("Invalid Participant Id:{" + participant + "}" );
        }

        console.log(modoType);

        if (modoType === "SINGLE") {
            return await User.findOne({ _id: new mongoose.mongo.ObjectId(participant) });
        } else {
            return await Team.findOne({ _id: new mongoose.mongo.ObjectId(participant) });
        }
    }

    //FUNCIÓN QUE COMPRUEBA SI UN PARTICIPANTE EXISTE

    async function validateParticipants(participant, modoType, errors) {
        if (participant) {
            let foundParticipant = await findParticipant(participant, modoType, errors);
            if (!foundParticipant) {
                loggerError.error("Participant with Id:{" + participant + "} not found");
                errors.push("Participant with Id:{" + participant + "} not found" );
            }
        }
    }

    //FUNCIÓN QUE COMPRUEBA SI SE HAN ASIGNADO ALGUNO DE LOS DOS IDS (WINNER OR LOSER)
    function validateParticipantsAssigned(home, away, errors) {
        if (!home && !away) {
            loggerError.error("At least one participant should be assigned before you assign the winner or loser of the match");
            errors.push("At least one participant should be assigned before you assign the winner or loser of the match");
        }
    }

    let unset = {}

    if(serie.home_participant) {
        await validateParticipants(serie.home_participant, modo.type, errors);
    }else{
        unset.home_participant = "";
    }

    if(serie.away_participant) {
        await validateParticipants(serie.away_participant, modo.type, errors);
    }else{
        unset.away_participant = "";
    }

    if (serie.result.winner){
        validateParticipantsAssigned(serie.home_participant, serie.away_participant, errors);
        if(serie.result.winner !== serie.home_participant && serie.result.winner !== serie.away_participant) {
            loggerError.error("Participant with Id:{" + serie.result.winner + "} doesn't match with Id:{" + serie.home_participant + "} or Id:{" + serie.away_participant + "}");
            errors.push("Participant with Id:{" + serie.result.winner + "} doesn't match with Id:{" + serie.home_participant + "} or Id:{" + serie.away_participant + "}");
        }
    }

    if (serie.result.loser){
        validateParticipantsAssigned(serie.home_participant, serie.away_participant, errors);
        if(serie.result.loser !== serie.home_participant && serie.result.loser !== serie.away_participant) {
            loggerError.error("Participant with Id:{" + serie.result.loser + "} doesn't match with Id:{" + serie.home_participant + "} or Id:{" + serie.away_participant + "}");
            errors.push("Participant with Id:{" + serie.result.loser + "} doesn't match with Id:{" + serie.home_participant + "} or Id:{" + serie.away_participant + "}");
        }
    }

    async function findMatch(match, errors){
        if (!mongoose.mongo.ObjectId.isValid(match)) {
            loggerError.error("Invalid Match Id:{" + match + "}");
            errors.push("Invalid Match Id:{" + match + "}" );
        }

        return await Match.findOne({ _id: new mongoose.mongo.ObjectId(match) });
    }

    //COMPROBAMOS QUE LOS PARTIDOS DEL RESULT SEAN VÁLIDOS Y EXISTAN EN LA BBDD
    serie.result.matches.forEach(async (m)=>{
        //PARA REDUCIR TIEMPOS SE PODRÍAN LANZAR TODAS LAS CONSULTAS ASINCRONAMENTE Y AÑADIRLAS A UN ARRAY Y QUE CUANDO TERMINE LA ÚLTIMA CONTINUE EL PROGRAMA
        let foundMatch = await findMatch(m, errors);
    })

    if(errors.length > 0) {
        res.status(400);
        return res.send(errors);
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
                    date: new Date(serie.date),
                    status: serie.status
                },
                $unset:unset
            }).then(result => {
                loggerInfo.info("Match {" + req.params.id + "} updated successfully");
                res.status(200);
                return res.send({msg: "Match {" + req.params.id + "} updated successfully"});
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