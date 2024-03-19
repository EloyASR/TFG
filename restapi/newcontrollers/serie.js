const Serie = require('../models/serie');
const Match = require('../models/match');
const User = require('../models/user');
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

        //TODO: Comprobar que el id del game sea un id válido de mongoDB y que ademas exista en la BBDD
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

        //TODO: Comprobar que el usuario existe y que es un id valido de mongodb
        //TODO: Mejora: Buscar los equipos a los que pertenece el usuario
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

        //TODO: Comprobar que el equipo existe dentro y que el id es valido de mongodb
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

//TODO Actualizar correctamente el add SERIE
const add = async (req, res) => {
    let errors = [];
    let loggerInfo = req.app.get("loggerInfo");
    let loggerError = req.app.get("loggerError");

    let { mode, game, home_participant, away_participant, tournament, date, result, status } = req.body;

    const createSerie = async (s_mode, s_game, s_type, s_home, s_away, s_tournament, s_date, s_result, s_status) => {
        try {
            let serie = new Serie;
            serie.mode = s_mode;
            serie.game = s_game;
            serie.type = s_type;
            serie.home_participant = s_home;
            serie.away_participant = s_away;
            serie.tournament = s_tournament;
            serie.result = s_result;
            serie.date = s_date;
            serie.status = s_status;

            await Serie.create(serie).then(result => {
                    loggerInfo.info("Serie {" + result._id+ "} created successfully");
                    res.status(201);
                    return res.send({
                        id: result._id
                    });
                }
            );
        } catch (e) {
            loggerError.error("There was a problem creating the match", e);
            res.status(400);
            return res.send({msg:"There was a problem creating the match: " + e.errors.status});
        }
    };


    //COMPROBAMOS QUE EXISTE EL JUEGO AL QUE SE VA A JUGAR EN ESTA SERIE

    if(!mongoose.mongo.ObjectId.isValid(game)){
        loggerError.error("Invalid Game Id: {" + game + "}");
        errors.push("Invalid Game Id: {" + game + "}");
    }

    let found_game = await Game.findOne({"_id": new mongoose.mongo.ObjectId(game)});

    if (found_game === null) {
        loggerError.error("Game with Id:{" + game + "} not found");
        errors.push("Game with Id:{" + game + "} not found");
    }

    //UNA VEZ QUE SABEMOS QUE EL JUEGO EXISTE COMPROBAMOS QUE EL MODO DE JUEGO EXISTE DENTRO DE ESTE JUEGO

    let modo = found_game.modes.find(m => m._name === mode);

    if (modo == null) {
        loggerError.error("Mode with Name:{" + mode + "} not found");
        errors.push("Mode with Name:{" + mode + "} not found");
    }

    //COMPROBAMOS SI SE HA PASADO UN TORNEO AL QUE PERTENEZCA EL PARTIDO Y SI EXISTE ESE TORNEO

    if(tournament) {
        if(!mongoose.mongo.ObjectId.isValid(tournament)){
            loggerError.error("Invalid Tournament Id: {" + tournament + "}");
            errors.push("Invalid Tournament Id: {" + tournament + "}");
        }

        let found_tournament = await Tournament.findOne({"_id": new mongoose.mongo.ObjectId(tournament)});

        if (found_tournament === null) {
            loggerError.error("Tournament with Id:{" + tournament + "} not found");
            errors.push("Tournament with Id:{" + tournament + "} not found");
        }
    }

    //FUNCIÓN QUE COMPRUEBA SI UN PARTICIPANTE ES VÁLIDO

    async function findParticipant(participant, modoType) {
        if (!mongoose.mongo.ObjectId.isValid(participant)) {
            loggerError.error("Invalid Participant Id:{" + participant + "}");
            errors.push("Invalid Participant Id:{" + participant + "}" );
        }

        if (modoType === "1VS1") {
            return await User.findOne({ _id: new mongoose.mongo.ObjectId(participant) });
        } else {
            return await Team.findOne({ _id: new mongoose.mongo.ObjectId(participant) });
        }
    }

    //FUNCIÓN QUE COMPRUEBA SI UN PARTICIPANTE EXISTE

    async function validateParticipants(participant, modoType) {
        if (participant) {
            let foundParticipant = await findParticipant(participant, modoType);
            if (!foundParticipant) {
                loggerError.error("Participant with Id:{" + participant + "} not found");
                errors.push("Participant with Id:{" + participant + "} not found" );
            }
        }
    }

    //FUNCIÓN QUE COMPRUEBA SI SE HAN ASIGNADO ALGUNO DE LOS DOS IDS (WINNER OR LOSER)
    function validateParticipantsAssigned(home, away) {
        if (!home && !away) {
            loggerError.error("At least one participant should be assigned before you assign the winner or loser of the match");
            errors.push("At least one participant should be assigned before you assign the winner or loser of the match");
        }
    }

    await validateParticipants(home_participant, modo.type);
    await validateParticipants(away_participant, modo.type);

    if (result.winner){
        validateParticipantsAssigned(home_participant, away_participant);
        if(result.winner !== home_participant && result.winner !== away_participant) {
            loggerError.error("Participant with Id:{" + result.winner + "} doesn't match with Id:{" + home_participant + "} or Id:{" + away_participant + "}");
            errors.push("Participant with Id:{" + result.winner + "} doesn't match with Id:{" + home_participant + "} or Id:{" + away_participant + "}");
        }
    }

    if (result.loser){
        validateParticipantsAssigned(home_participant, away_participant);
        if(result.loser !== home_participant && result.loser !== away_participant) {
            loggerError.error("Participant with Id:{" + result.loser + "} doesn't match with Id:{" + home_participant + "} or Id:{" + away_participant + "}");
            errors.push("Participant with Id:{" + result.loser + "} doesn't match with Id:{" + home_participant + "} or Id:{" + away_participant + "}");
        }
    }

    async function findMatch(match){
        if (!mongoose.mongo.ObjectId.isValid(match)) {
            loggerError.error("Invalid Match Id:{" + match + "}");
            errors.push("Invalid Match Id:{" + match + "}" );
        }

        return await Match.findOne({ _id: new mongoose.mongo.ObjectId(match) });
    }

    //COMPROBAMOS QUE LOS PARTIDOS DEL RESULT SEAN VÁLIDOS Y EXISTAN EN LA BBDD
    result.matches.forEach(async (m)=>{
        //PARA REDUCIR TIEMPOS SE PODRÍAN LANZAR TODAS LAS CONSULTAS ASINCRONAMENTE Y AÑADIRLAS A UN ARRAY Y QUE CUANDO TERMINE LA ÚLTIMA CONTINUE EL PROGRAMA
        let foundMatch = await findMatch(m);
    })

    if(errors.length > 0) {
        res.status(400);
        return res.send(errors);
    }

    await createSerie(mode,game,modo.type,home_participant,away_participant,tournament,date,result,status);
}

//TODO: update
const upd = async (req, res) => {
    let errors = [];
    let loggerInfo = req.app.get("loggerInfo");
    let loggerError = req.app.get("loggerError");

    let { serie } = req.body;


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

    //COMPROBAMOS SI SE HA PASADO UN TORNEO AL QUE PERTENEZCA EL PARTIDO Y SI EXISTE ESE TORNEO

    if(serie.tournament) {
        if(!mongoose.mongo.ObjectId.isValid(serie.tournament)){
            loggerError.error("Invalid Tournament Id: {" + serie.tournament + "}");
            errors.push("Invalid Tournament Id: {" + serie.tournament + "}");
        }

        let found_tournament = await Tournament.findOne({"_id": new mongoose.mongo.ObjectId(serie.tournament)});

        if (found_tournament === null) {
            loggerError.error("Tournament with Id:{" + serie.tournament + "} not found");
            errors.push("Tournament with Id:{" + serie.tournament + "} not found");
        }
    }

    //FUNCIÓN QUE COMPRUEBA SI UN PARTICIPANTE ES VÁLIDO

    async function findParticipant(participant, modoType, errors) {
        if (!mongoose.mongo.ObjectId.isValid(participant)) {
            loggerError.error("Invalid Participant Id:{" + participant + "}");
            errors.push("Invalid Participant Id:{" + participant + "}" );
        }

        if (modoType === "1VS1") {
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

    await validateParticipants(serie.home_participant, modo.type, errors);
    await validateParticipants(serie.away_participant, modo.type, errors);

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
                }
            }).then(result => {
                loggerInfo.info("Match {" + req.params.id + "} updated successfully");
                res.status(200);
                return res.send({msg: "Match {" + req.params.id + "} updated successfully"});
            }
        );
    }catch(e){
        loggerError.error("There was a problem updating the serie", e);
        res.status(400);
        return res.send({msg:"There was a problem updating the serie: " + e.errors.status});
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