const Match = require('../models/match');
const User = require('../models/user');
const Game = require('../models/game');
const Team = require('../models/team');
const Serie = require('../models/serie');
const Tournament = require('../models/tournament');

const mongoose = require("mongoose");
const {findById} = require("./user");

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
        if((req.query.game && req.query.user) || (req.query.user && req.query.team) || (req.query.game && req.query.team)){
            loggerError.error("ERROR 400: There cannot be two filters together with exception of game and mode")
            res.status(400);
            return res.send({msg:"There cannot be two filters together with exception of game and mode"});
        }

        //FIND BY GAME AND MODE

        //TODO: Comprobar que el id del game sea un id válido de mongoDB y que ademas exista en la BBDD
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

        //FIND BY USER

        //TODO: Comprobar que el usuario existe y que es un id valido de mongodb
        //TODO: Mejora: Buscar los equipos a los que pertenece el usuario
        if(req.query.user){
            let filteredMatchesHome = await Match.find({
                type: "1VS1",
                home_participant: req.query.user
            })
            let filteredMatchesAway = await Match.find({
                type: "1VS1",
                away_participant: req.query.user
            })

            filteredMatches = filteredMatchesHome.concat(filteredMatchesAway);

        }

        //FIND BY TEAM

        //TODO: Comprobar que el equipo existe dentro y que el id es valido de mongodb
        if(req.query.team){
            let filteredMatchesHome = await Match.find({
                type: { $in: ["2VS2", "3VS3", "4VS4", "5VS5"]},
                home_participant: req.query.user
            })
            let filteredMatchesAway = await Match.find({
                type: { $in: ["2VS2", "3VS3", "4VS4", "5VS5"]},
                away_participant: req.query.user
            })
            filteredMatches = filteredMatchesHome.concat(filteredMatchesAway);
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

    let { mode, game, home_participant, away_participant, tournament, serie, winner, loser, date, matchData, status } = req.body;

    const createMatch = async (m_mode, m_game, m_type, m_home, m_away, m_tournament, m_serie, m_winner, m_loser, m_date, m_data, m_status) => {
        try {
            let match = new Match;
            match.mode = m_mode;
            match.game = m_game;
            match.type = m_type;
            match.home_participant = m_home;
            match.away_participant = m_away;
            match.tournament = m_tournament;
            match.serie = m_serie;
            match.winner = m_winner;
            match.loser = m_loser;
            match.date = m_date;
            match.matchData = m_data;
            match.status = m_status;

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

    //COMPROBAMOS SI SE HA PASADO UNA SERIE A LA QUE PERTENEZCA EL PARTIDO Y SI EXISTE ESA SERIE

    if(serie) {
        if(!mongoose.mongo.ObjectId.isValid(serie)){
            loggerError.error("CODE 400: Invalid Serie Id: {" + serie + "}");
            res.status(400);
            return res.send({msg:"Invalid Serie Id: {" + serie + "}"});
        }

        let found_serie = await Serie.findOne({"_id": new mongoose.mongo.ObjectId(serie)});

        if (found_serie === null) {
            loggerError.error("CODE 404: Serie with Id:{" + serie + "} not found");
            res.status(404);
            return res.send({msg:"Serie with Id:{" + serie + "} not found"});
        }
    }

    //COMPROBAMOS SI SE HA PASADO UN TORNEO AL QUE PERTENEZCA EL PARTIDO Y SI EXISTE ESE TORNEO

    if(tournament) {
        if(!mongoose.mongo.ObjectId.isValid(tournament)){
            loggerError.error("CODE 400: Invalid Tournament Id: {" + tournament + "}");
            res.status(400);
            return res.send({msg:"Invalid Tournament Id: {" + tournament + "}"});
        }

        let found_tournament = await Tournament.findOne({"_id": new mongoose.mongo.ObjectId(tournament)});

        if (found_tournament === null) {
            loggerError.error("CODE 404: Tournament with Id:{" + tournament + "} not found");
            res.status(404);
            return res.send({msg:"Tournament with Id:{" + tournament + "} not found"});
        }
    }

    //FUNCIÓN QUE COMPRUEBA SI UN PARTICIPANTE ES VÁLIDO

    async function findParticipant(participant, modoType) {
        if (!mongoose.mongo.ObjectId.isValid(participant)) {
            loggerError.error("CODE 400: Invalid Participant Id:{" + participant + "}");
            throw { status: 400, msg: "Invalid Participant Id:{" + participant + "}" };
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
                loggerError.error("CODE 404: Participant with Id:{" + participant + "} not found");
                throw { status: 404, msg: "Participant with Id:{" + participant + "} not found" };
            }
        }
    }

    //FUNCIÓN QUE COMPRUEBA SI SE HAN ASIGNADO ALGUNO DE LOS DOS IDS (WINNER OR LOSER)
    function validateParticipantsAssigned(home, away) {
        if (!home && !away) {
            loggerError.error("CODE 400: At least one participant should be assigned before you assign the winner or loser of the match");
            throw { status: 400, msg: "At least one participant should be assigned before you assign the winner or loser of the match" };
        }
    }


    try {
        await validateParticipants(home_participant, modo.type);
        await validateParticipants(away_participant, modo.type);

        if (winner){
            validateParticipantsAssigned(home_participant, away_participant);
            if(winner !== home_participant && winner !== away_participant) {
                loggerError.error("CODE 400: Participant with Id:{" + winner + "} doesn't match with Id:{" + home_participant + "} or Id:{" + away_participant + "}");
                throw { status: 400, msg: "Participant with Id:{" + winner + "} doesn't match with Id:{" + home_participant + "} or Id:{" + away_participant + "}"};
            }
        }

        if (loser){
            validateParticipantsAssigned(home_participant, away_participant);
            if(loser !== home_participant && loser !== away_participant) {
                loggerError.error("CODE 400: Participant with Id:{" + loser + "} doesn't match with Id:{" + home_participant + "} or Id:{" + away_participant + "}");
                throw { status: 400, msg: "Participant with Id:{" + loser + "} doesn't match with Id:{" + home_participant + "} or Id:{" + away_participant + "}"};
            }
        }
    } catch (error) {
        res.status(error.status || 500);
        return res.send({ msg: error.msg || "Internal Server Error" });
    }

    await createMatch(mode,game,modo.type,home_participant,away_participant,tournament,serie,winner,loser,date,matchData,status);
}

//TODO: update
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

    //COMPROBAMOS QUE SE HAN PASADO TODOS LOS DATOS CORRECTAMENTE

    //COMPROBAMOS SI SE HA PASADO UNA SERIE A LA QUE PERTENEZCA EL PARTIDO Y SI EXISTE ESA SERIE

    if(match.serie) {
        if(!mongoose.mongo.ObjectId.isValid(match.serie)){
            loggerError.error("CODE 404: Serie with Id:{" + match.serie + "} not found");
            res.status(404);
            return res.send({msg:"Serie with Id:{" + match.serie + "} not found"});
        }

        let found_serie = await Serie.findOne({"_id": new mongoose.mongo.ObjectId(match.serie)});

        if (found_serie === null) {
            loggerError.error("CODE 404: Serie with Id:{" + match.serie + "} not found");
            res.status(404);
            return res.send({msg:"Serie with Id:{" + match.serie + "} not found"});
        }
    }

    //COMPROBAMOS SI SE HA PASADO UN TORNEO AL QUE PERTENEZCA EL PARTIDO Y SI EXISTE ESE TORNEO

    if(match.tournament) {
        if(!mongoose.mongo.ObjectId.isValid(match.tournament)){
            loggerError.error("CODE 404: Tournament with Id:{" + match.tournament + "} not found");
            res.status(404);
            return res.send({msg:"Tournament with Id:{" + match.tournament + "} not found"});
        }

        let found_tournament = await Tournament.findOne({"_id": new mongoose.mongo.ObjectId(match.tournament)});

        if (found_tournament === null) {
            loggerError.error("CODE 404: Tournament with Id:{" + match.tournament + "} not found");
            res.status(404);
            return res.send({msg:"Tournament with Id:{" + match.tournament + "} not found"});
        }
    }

    //FUNCIÓN QUE COMPRUEBA SI UN PARTICIPANTE ES VÁLIDO

    async function findParticipant(participant, modoType) {
        if (!mongoose.mongo.ObjectId.isValid(participant)) {
            loggerError.error("CODE 400: Invalid Participant Id:{" + participant + "}");
            throw { status: 400, msg: "Invalid Participant Id:{" + participant + "}" };
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
                loggerError.error("CODE 404: Participant with Id:{" + participant + "} not found");
                throw { status: 404, msg: "Participant with Id:{" + participant + "} not found" };
            }
        }
    }

    //FUNCIÓN QUE COMPRUEBA SI SE HAN ASIGNADO ALGUNO DE LOS DOS IDS (WINNER OR LOSER)

    function validateParticipantsAssigned(home, away) {
        if (!home && !away) {
            loggerError.error("CODE 400: At least one participant should be assigned before you assign the winner or loser of the match");
            throw { status: 400, msg: "At least one participant should be assigned before you assign the winner or loser of the match" };
        }
    }

    try {
        await validateParticipants(match.home_participant, matchInDatabase.type);
        await validateParticipants(match.away_participant, matchInDatabase.type);

        if (match.winner){
            validateParticipantsAssigned(match.home_participant, match.away_participant);
            if(match.winner !== match.home_participant && match.winner !== match.away_participant) {
                loggerError.error("CODE 400: Participant with Id:{" + match.winner + "} doesn't match with Id:{" + match.home_participant + "} or Id:{" + away_participant + "}");
                throw { status: 400, msg: "Participant with Id:{" + match.winner + "} doesn't match with Id:{" + match.home_participant + "} or Id:{" + away_participant + "}"};
            }
        }

        if (match.loser){
            validateParticipantsAssigned(match.home_participant, match.away_participant);
            if(match.loser !== match.home_participant && match.loser !== match.away_participant) {
                loggerError.error("CODE 400: Participant with Id:{" + match.loser + "} doesn't match with Id:{" + match.home_participant + "} or Id:{" + match.away_participant + "}");
                throw { status: 400, msg: "Participant with Id:{" + match.loser + "} doesn't match with Id:{" + match.home_participant + "} or Id:{" + match.away_participant + "}"};
            }
        }
    } catch (error) {
        res.status(error.status || 500);
        return res.send({ msg: error.msg || "Internal Server Error" });
    }

    try {
        await Match.updateOne(
            {
                _id: new mongoose.mongo.ObjectId(req.params.id)
            },
            {
                $set: {
                    home_participant: match.home_participant,
                    away_participant: match.away_participant,
                    tournament: match.tournament,
                    serie: match.serie,
                    winner: match.winner,
                    loser: match.loser,
                    date: new Date(match.date),
                    matchData: match.matchData,
                    status: match.status
                }
            }).then(result => {
                loggerInfo.info("CODE 201: Match {" + req.params.id + "} updated successfully");
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