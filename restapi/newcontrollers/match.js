const Match = require('../models/match');
const User = require('../models/user');
const Game = require('../models/game');
const Team = require('../models/team');
const Serie = require('../models/serie');
const Tournament = require('../models/tournament');

const mongoose = require("mongoose");

const find = async (req, res) => {

    let loggerInfo = req.app.get("loggerInfo");
    let loggerError = req.app.get("loggerError");

    if(!mongoose.mongo.ObjectId.isValid(req.params.id)){
        console.log("CODE 400: Invalid Match Id: {" + req.params.id + "}");
        loggerError.error("CODE 400: Invalid Match Id: {" + req.params.id + "}");
        res.status(400);
        return res.send({msg:"Invalid Match Id: {" + req.params.id + "}"});
    }

    let match = await Match.findById(req.params.id);

    if(match){
        console.log(match);
        console.log("CODE 200: Match with Id:{" + req.params.id + "} found successfully");
        loggerInfo.info("CODE 200: Match with Id:{" + req.params.id + "} found successfully");
        res.status(200);
        res.json(match);
    }else{
        console.log("ERROR 404: Match with Id:{" + req.params.id + "} not found");
        loggerError.error("ERROR 404: Match with Id:{" + req.params.id + "} not found");
        res.status(404);
        res.send({msg:"Match with Id:{" + req.params.id + "} not found"});
    }
}

//TODO: findAll with filters
const findAll = async (req, res) => {
    let matches = await Match.find({_id:{$in: req.body.ids}})

    if(matches){
        logger.info("CODE 200: Matches with Ids:{" + req.params.ids + "} found successfully")
        console.log("CODE 200: Matches with Ids:{" + req.params.ids + "} found successfully")
        res.status(200);
        res.json(matches);
    }else{
        logger.error("ERROR 404: There was a problem finding the matches")
        console.log("ERROR 404: There was a problem finding the matches");
        res.status(404);
        res.send("There was a problem finding the matches");
    }
}

const add = async (req, res) => {

    let loggerInfo = req.app.get("loggerInfo");
    let loggerError = req.app.get("loggerError");

    let { mode, game, participant1, participant2, tournament, serie, win, lose, date, matchData, status } = req.body;

    const createMatch = async (type) => {
        try {
            let match = new Match;
            match.mode = mode;
            match.game = new mongoose.mongo.ObjectId(game);
            match.type = type;
            match.participant1 = participant1;
            match.participant2 = participant2;
            match.tournament = tournament;
            match.serie = serie;
            match.win = win;
            match.lose = lose;
            match.date = new Date(date);
            match.matchData = matchData;
            if(status){
                match.status = status;
            }

            await Match.create(match).then(result => {
                    console.log("CODE 201: Match {" + result._id + "} created successfully");
                    loggerInfo.info("CODE 201: Match {" + result._id+ "} created successfully");
                    res.status(201);
                    return res.send({
                        id: result._id
                    });
                }
            );
        } catch (e) {
            console.log("CODE 400: There was a problem creating the match", e);
            loggerError.error("CODE 400: There was a problem creating the match", e);
            res.status(400);
            return res.send({msg:"There was a problem creating the match: " + e.errors.status});
        }
    };


    //COMPROBAMOS QUE EXISTE EL JUEGO AL QUE SE VA A JUGAR EN ESTE PARTIDO

    if(!mongoose.mongo.ObjectId.isValid(game)){
        console.log("CODE 400: Invalid Game Id: {" + game + "}");
        loggerError.error("CODE 400: Invalid Game Id: {" + game + "}");
        res.status(400);
        return res.send({msg:"Invalid Game Id: {" + game + "}"});
    }

    let found_game = await Game.findOne({"_id": new mongoose.mongo.ObjectId(game)});

    if (found_game === null) {
        console.log("CODE 404: Game with Id:{" + game + "} not found");
        loggerError.error("CODE 404: Game with Id:{" + game + "} not found");
        res.status(404);
        return res.send({msg:"Game with Id:{" + game + "} not found"});
    }

    //UNA VEZ QUE SABEMOS QUE EL JUEGO EXISTE COMPROBAMOS QUE EL MODO DE JUEGO EXISTE DENTRO DE ESTE JUEGO

    let modo = found_game.modes.find(m => m.name === mode);

    if (modo == null) {
        console.log("CODE 404: Mode with Name:{" + mode + "} not found");
        loggerError.error("CODE 404: Mode with Name:{" + mode + "} not found");
        res.status(404);
        return res.send({msg:"Mode with Name:{" + mode + "} not found"});
    }

    //COMPROBAMOS SI SE HA PASADO UNA SERIE A LA QUE PERTENEZCA EL PARTIDO Y SI EXISTE ESA SERIE

    if(serie) {
        if(!mongoose.mongo.ObjectId.isValid(serie)){
            console.log("CODE 400: Invalid Serie Id: {" + serie + "}");
            loggerError.error("CODE 400: Invalid Serie Id: {" + serie + "}");
            res.status(400);
            return res.send({msg:"Invalid Serie Id: {" + serie + "}"});
        }

        let found_serie = await Serie.findOne({"_id": new mongoose.mongo.ObjectId(serie)});

        if (found_serie === null) {
            console.log("CODE 404: Serie with Id:{" + serie + "} not found");
            loggerError.error("CODE 404: Serie with Id:{" + serie + "} not found");
            res.status(404);
            return res.send({msg:"Serie with Id:{" + serie + "} not found"});
        }
    }

    //COMPROBAMOS SI SE HA PASADO UN TORNEO AL QUE PERTENEZCA EL PARTIDO Y SI EXISTE ESE TORNEO

    if(tournament) {
        if(!mongoose.mongo.ObjectId.isValid(tournament)){
            console.log("CODE 400: Invalid Tournament Id: {" + tournament + "}");
            loggerError.error("CODE 400: Invalid Tournament Id: {" + tournament + "}");
            res.status(400);
            return res.send({msg:"Invalid Tournament Id: {" + tournament + "}"});
        }

        let found_tournament = await Tournament.findOne({"_id": new mongoose.mongo.ObjectId(tournament)});

        if (found_tournament === null) {
            console.log("CODE 404: Tournament with Id:{" + tournament + "} not found");
            loggerError.error("CODE 404: Tournament with Id:{" + tournament + "} not found");
            res.status(404);
            return res.send({msg:"Tournament with Id:{" + tournament + "} not found"});
        }
    }

    //COMPROBAMOS SI SOLO SE HA MANDADO UN PARTICIPANTE

    if((participant1 && !participant2) || (!participant1 && participant2)){
        console.log("CODE 400: Both participants should be assigned");
        loggerError.error("CODE 400: Both participants should be assigned");
        res.status(400);
        return res.send({msg:"Both participants should be assigned"});
    }

    //COMPROBAMOS SI NOS HAN PASADO LOS DOS PARTICIPANTES AL CREAR EL PARTIDO

    if (participant1 && participant2) {
        if(!mongoose.mongo.ObjectId.isValid(participant1)) {
            console.log("CODE 400: Invalid Game Id: {" + participant1 + "}");
            loggerError.error("CODE 400: Invalid Game Id: {" + participant1 + "}");
            res.status(400);
            return res.send({msg:"Invalid Participant Id: {" + participant1 + "}"});
        }

        if(!mongoose.mongo.ObjectId.isValid(participant2)) {
            console.log("CODE 400: Invalid Participant Id: {" + participant2 + "}");
            loggerError.error("CODE 400: Invalid Game Id: {" + participant2 + "}");
            res.status(400);
            return res.send({msg:"Invalid Participant Id: {" + participant2 + "}"});
        }

        //COMPROBAMOS EL TIPO DE PARTIDO

        let participante1, participante2;

        if(modo.type === "1VS1") {

            //SI EL TYPE ES 1VS1 ES DECIR JUGADOR VS JUGADOR BUSCAMOS EN LA TABLA DE USUARIOS

            participante1 = await User.findOne({"_id": new mongoose.mongo.ObjectId(participant1)});
            participante2 = await User.findOne({"_id": new mongoose.mongo.ObjectId(participant2)});
        } else {

            //SI EL TYPE ES EQUIPO CONTRA EQUIPO (2VS2, 3VS3, 4VS4, 5VS5) BUSCAMOS EN LA TABLA DE TEAMS

            participante1 = await Team.findOne({"_id": new mongoose.mongo.ObjectId(participant1)});
            participante2 = await Team.findOne({"_id": new mongoose.mongo.ObjectId(participant2)});
        }

        if (!participante1 || !participante2) {
            console.log("CODE 404: User with Id:{" + participant1 + "} or Id:{" + participant2 + "} not found");
            loggerError.error("CODE 404: User with Id:{" + participant1 + "} or Id:{" + participant2 + "} not found");
            res.status(404);
            return res.send({msg:"User with Id:{" + participant1 + "} or Id:{" + participant2 + "} not found"});
        }

        if (win && lose) {
            if(!(participant1 == win || participant1 == lose) || !(participant2 == win || participant2 == lose)) {
                console.log("CODE 400: User with Id:{" + win + "} or Id:{" + lose + "} dont match with Id:{" + participant1 + "} or Id:{" + participant2 + "}");
                loggerError.error("CODE 400: User with Id:{" + win + "} or Id:{" + lose + "} dont match with Id:{" + participant1 + "} or Id:{" + participant2 + "}");
                res.status(400);
                return res.send({msg: "User with Id:{" + win + "} or Id:{" + lose + "} don't match with Id:{" + participant1 + "} or Id:{" + participant2 + "}"});
            }
        }
    }else{
        if (win && lose) {
            console.log("CODE 400: Both participants should be assigned befare u assign the winner or loser of the match");
            loggerError.error("CODE 400: Both participants should be assigned befare u assign the winner or loser of the match");
            res.status(400);
            return res.send({msg: "Both participants should be assigned befare u assign the winner or loser of the match"});
        }
    }
    await createMatch(modo.type);
}

//TODO: update
const upd = async (req, res) => {
    //TODO Añadir resto de campos que serán la fecha y hora del partido si las tiene
    let {id,participant1, participant2, win, lose, matchData} = req.body;
    //Buscamos si existe el match que se solicita

    let searchmatch = Match.findById(id);

    if(searchmatch) {
        //El match existe en la bbdd
        //Comprobamos si hay nuevos participantes
        if (participant1 != null && participant2 != null) {

            //Comprobamos si los usuarios han jugado ya
            if (win != null && lose != null) {
                if ((participant1 == win || participant1 == lose) && (participant2 == win || participant2 == lose)) {
                    //Comprobamos que los participantes existen
                    let usuario1 = User.findOne(participant1);
                    let usuario2 = User.findOne(participant2);

                    if (usuario1 && usuario2) {
                        let match = {
                            "bestOf": bestOf,
                            "mode": modo,
                            "game": game,
                            "participant1":participant1,
                            "participant2":participant2,
                            "win": win,
                            "lose": lose,
                            "date": date,
                            "matchData": matchData,
                        }
                        try {
                            let createdMatch = await Match.collection.insertOne(match);
                            if (createdMatch.acknowledged) {
                                logger.info("CODE 201: Match {" + createdMatch.insertedId + "} updated successfully")
                                console.log("CODE 201: Match {" + createdMatch.insertedId + "} updated successfully")
                                res.status(201)
                                res.send({
                                    msg: "Match {" + createdMatch.insertedId + "} updated successfully"
                                })
                            } else {
                                console.log("CODE 400: There was a problem updating the match");
                                logger.error("CODE 400: There was a problem updating the match");
                                res.status(400);
                                res.send({
                                    msg: "There was a problem updating the match"
                                });
                            }
                        } catch (e) {
                            console.log("CODE 400: There was a problem updating the match", e);
                            logger.error("CODE 400: There was a problem updating the match", e);
                            res.status(400);
                            res.send({
                                msg: "There was a problem updating the match"
                            });
                        }
                    } else {
                        res.status(404);
                        res.send("User with Id:{" + participant1 + "} or Id:{" + participant2 + "} not found");
                    }
                } else {
                    res.status(412);
                    res.send("User with Id:{" + win + "} or Id:{" + lose + "} dont match with Id:{" + participant1 + "} or Id:{" + participant2 + "}")
                }
            } else {
                let usuario1 = User.findOne(participant1);
                let usuario2 = User.findOne(participant2);

                if (usuario1 && usuario2) {
                    let match = {
                        "bestOf": bestOf,
                        "mode": modo,
                        "game": game,
                        "participant1":participant1,
                        "participant2":participant2,
                        "win": win,
                        "lose": lose,
                        "date": date,
                        "matchData": matchData,
                    }
                    try {
                        let createdMatch = await Match.collection.insertOne(match);
                        if (createdMatch.acknowledged) {
                            logger.info("CODE 201: Match {" + createdMatch.insertedId + "} updated successfully")
                            console.log("CODE 201: Match {" + createdMatch.insertedId + "} updated successfully")
                            res.status(201)
                            res.send({
                                msg: "Match {" + createdMatch.insertedId + "} updated successfully"
                            })
                        } else {
                            console.log("CODE 400: There was a problem updating the match");
                            logger.error("CODE 400: There was a problem updating the match");
                            res.status(400);
                            res.send({
                                msg: "There was a problem updating the match"
                            });
                        }
                    } catch (e) {
                        console.log("CODE 400: There was a problemupdatting the match", e);
                        logger.error("CODE 400: There was a problem updating the match", e);
                        res.status(400);
                        res.send({
                            msg: "There was a problem updating the match"
                        });
                    }
                } else {
                    res.status(412);
                    res.send("User with Id:{" + participant1 + "} or Id:{" + participant2 + "} doesnt exist");
                }
            }
        } else {
            let match = {
                "bestOf": bestOf,
                "mode": modo,
                "game": game,
                "participant1":participant1,
                "participant2":participant2,
                "win": win,
                "lose": lose,
                "date": date,
                "matchData": matchData,
            }
            try {
                let createdMatch = await Match.collection.insertOne(match);
                if (createdMatch.acknowledged) {
                    logger.info("CODE 201: Match {" + createdMatch.insertedId + "} updated successfully")
                    console.log("CODE 201: Match {" + createdMatch.insertedId + "} updated successfully")
                    res.status(201)
                    res.send({
                        msg: "Match {" + createdMatch.insertedId + "} updated successfully"
                    })
                } else {
                    console.log("CODE 400: There was a problem updating the match");
                    logger.error("CODE 400: There was a problem updating the match");
                    res.status(400);
                    res.send({
                        msg: "There was a problem updating the match"
                    });
                }
            } catch (e) {
                console.log("CODE 400: There was a problem updating the match", e);
                logger.error("CODE 400: There was a problem updating the match", e);
                res.status(400);
                res.send({
                    msg: "There was a problem updating the match"
                });
            }
        }
    }else{
        //El match no existe en la bbdd
        console.log("CODE 404: The match with Id:{" + req.params.id + "} doesn't exist");
        logger.error("CODE 404: The match with Id:{" + req.params.id + "} doesn't exist");
        res.status(404);
        res.send({
            msg: "The match with Id:{" + req.params.id + "} doesn't exist"
        });
    }
}

const del = async (req, res) => {

    let loggerInfo = req.app.get("loggerInfo");
    let loggerError = req.app.get("loggerError");

    if(!mongoose.mongo.ObjectId.isValid(req.params.id)){
        console.log("CODE 400: Invalid Match Id: {" + req.params.id + "}");
        loggerError.error("CODE 400: Invalid Match Id: {" + req.params.id + "}");
        res.status(400);
        return res.send("Invalid Match Id: {" + req.params.id + "}");
    }

    let match_found = await Match.findById(req.params.id);

    //Comprobamos si el partido que se quiere borrar existe o no
    if(match_found){
        let result = await Match.deleteOne({"_id": new mongoose.mongo.ObjectId(req.params.id)});
        console.log(result);
        if(result.deletedCount === 1){
            loggerInfo.info("CODE 200: Match {" + req.params.id + "} deleted successfully")
            console.log("CODE 200: Match {" + req.params.id + "} deleted successfully")
            res.status(200)
            res.send({
                msg: "Match {" + req.params.id + "} deleted successfully",
                match: match_found
            })
        }else{
            console.log("CODE 400: The match with Id:{" + req.params.id + "} could not be removed");
            loggerError.error("CODE 400: The match with Id:{" + req.params.id + "} could not be removed");
            res.status(400);
            res.send({
                msg: "The match with Id:{" + req.params.id + "} could not be removed"
            });
        }

    }else {
        console.log("ERROR 404: Match with Id:{" + req.params.id + "} not found");
        loggerError.error("ERROR 404: Match with Id:{" + req.params.id + "} not found");
        res.status(404);
        res.send("Match with Id:{" + req.params.id + "} not found");
    }
}

module.exports = {findAll, find, add, upd, del}