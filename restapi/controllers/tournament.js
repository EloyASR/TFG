const Tournament = require("../models/tournament");
const mongoose = require("mongoose");
const Prize = require("../models/prize");
const Game = require("../models/game");
const {User} = require("../models/user");

const find = async (req,res) => {
    let loggerInfo = req.app.get("loggerInfo");
    let loggerError = req.app.get("loggerError");

    if(!mongoose.mongo.ObjectId.isValid(req.params.id)){
        loggerError.error("ERROR 400: Invalid tournament Id: {" + req.params.id + "}");
        res.status(400);
        return res.send({msg:"Invalid tournament Id: {" + req.params.id + "}"});
    }

    try {
        let tournament = await Tournament.findById(req.params.id);

        if(tournament){
            loggerInfo.info("CODE 200: Tournament with Id:{" + req.params.id + "} found successfully");
            res.status(200);
            return res.json(tournament);
        }else{
            loggerError.error("ERROR 404: Tournament with Id:{" + req.params.id + "} not found");
            res.status(404);
            return res.send({msg:"Tournament with Id:{" + req.params.id + "} not found"});
        }
    }catch (e){
        loggerError.error("ERROR 400: There was a problem finding the tournament: ",e)
        res.status(400);
        return res.send({msg:"There was a problem finding the tournament: ",e});
    }
}

const findAll = async (req,res) => {
    let loggerInfo = req.app.get("loggerInfo");
    let loggerError = req.app.get("loggerError");

    let tournaments = [];
    let count = 0;

    const {page = 1, limit = 5, creator, sponsor, status, game, sponsorStatus} = req.query;

    let query = {}

    if(status){
        if(status !== "ALL"){
            query.status = status;
        }
    }

    if(game) {
        if(game !== "ALL"){
            if (mongoose.mongo.ObjectId.isValid(game)) {
                query.game = game;
            }
        }
    }

    if(creator) {
        if (mongoose.mongo.ObjectId.isValid(creator)) {
            query.creator = creator;
        }
    }

    if(sponsor) {
        if (mongoose.mongo.ObjectId.isValid(sponsor)) {
            query["sponsoredBy.id"] = sponsor;
        }
        if (sponsorStatus && sponsorStatus !== "ALL"){
            query["sponsoredBy.status"] = sponsorStatus;
        }
    }

    try {
        tournaments = await Tournament.find(query).sort({createdAt: -1})
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();
        count = await Tournament.countDocuments(query);

        if (tournaments) {
            loggerInfo.info("CODE 200: Tournament found successfully");
            res.status(200);
            return res.send({
                tournaments,
                totalPages: Math.ceil(count / limit),
                currentPage: page
            });
        }

    }catch (e) {
        loggerError.error("ERROR 400: There was a problem finding the tournaments: ", e);
        res.status(400);
        return res.send({msg:"There was a problem finding the tournaments: ", e});
    }
}

const add = async (req,res) => {

    let loggerInfo = req.app.get("loggerInfo");
    let loggerError = req.app.get("loggerError");

    let {
        name, game, mode, size, participants, description, rules,
        participantsType, phases, online, location, inscription,
        inscriptionInitDate, inscriptionEndDate, initDate,
        endDate, prize, creator
    } = req.body;

    try {
        let tournamentToAdd = new Tournament;

        //COMPROBAMOS QUE EXISTE EL CREADOR

        if (!mongoose.mongo.ObjectId.isValid(creator)) {
            loggerError.error("ERROR 404: User with Id:{" + creator + "} not found");
            res.status(404);
            return res.send({msg: "User with Id:{" + creator + "} not found"});
        }

        let creatorFound = await User.findById(creator);

        if (!creatorFound) {
            loggerError.error("ERROR 404: User with Id:{" + creator + "} not found");
            res.status(404);
            return res.send({msg: "User with Id:{" + creator + "} not found"});
        }

        tournamentToAdd.creator = creator;

        //AÑADIMOS CAMPOS QUE NO NECESITAN COMPROBACIÓN

        tournamentToAdd.name = name;
        tournamentToAdd.size = size;
        tournamentToAdd.description = description;
        tournamentToAdd.rules = rules;
        tournamentToAdd.currentPhase = 0;
        tournamentToAdd.status = "CLOSED";

        //COMPROBAMOS QUE EL GAME EXISTE Y TAMBIÉN QUE TIENE EL MODO QUE SE INDICA

        if (!mongoose.mongo.ObjectId.isValid(game)) {
            loggerError.error("ERROR 404: Game with Id:{" + game + "} not found");
            res.status(404);
            return res.send({msg: "Game with Id:{" + game + "} not found"});
        }

        let gameFound = await Game.findById(game);

        if (!gameFound) {
            loggerError.error("ERROR 404: Game with Id:{" + game + "} not found");
            res.status(404);
            return res.send({msg: "Game with Id:{" + game + "} not found"});
        }

        if(mode) {
            if (!gameFound.modes.find((m) => m._name === mode )){
                loggerError.error("ERROR 404: Mode {" + mode + "} not found");
                res.status(404);
                return res.send({msg: "Mode {" + mode + "} not found"});
            }
        }

        tournamentToAdd.game = game;
        tournamentToAdd.mode = mode;

        //COMPROBAMOS PARTICIPANTES

        if (participantsType) {
            if (participantsType === "SINGLE") {
                tournamentToAdd.participantsType = "SINGLE";
                if (participants) {
                    let usersIds = participants.map((user) => new mongoose.Types.ObjectId(user.id));
                    let users = await User.find({'_id': {$in: usersIds}})
                    if (participants.length !== users.length) {
                        loggerError.error("ERROR 404: User not found");
                        res.status(404);
                        return res.send({msg: "User not found"});
                    }
                }
            }
        } else {
            loggerError.error("ERROR 400: Participants type must be settled");
            res.status(400);
            return res.send({msg: 'Participants type must be settled'});
        }

        tournamentToAdd.participants = participants;

        //COMPROBAMOS LOCALIZACIÓN

        tournamentToAdd.online = online;

        if (!online) {
            //SE PODRÍA LANZAR UN ERROR SI NO EXISTE LOCALIZACIÓN PERO NO LO VAMOS A HACER POR AHORA
            tournamentToAdd.location = location;
        }

        //COMPROBAR FECHAS
        let now = new Date();

        let start = new Date(initDate);
        let end = new Date(endDate);

        if (isNaN(start.getTime()) || isNaN(end.getTime())) {
            loggerError.error("ERROR 400: Invalid date format");
            res.status(400);
            return res.send({msg: 'Invalid date format'});
        }

        if (start <= now || end <= now) {
            loggerError.error("ERROR 400: Dates must be in the future");
            res.status(400);
            return res.send({msg: 'Dates must be in the future'});
        }

        if (start >= end) {
            loggerError.error("ERROR 400: Start date must be before end date");
            res.status(400)
            return res.send({msg: 'Start date must be before end date'});
        }

        tournamentToAdd.initDate = start;
        tournamentToAdd.endDate = end;

        //COMPROBAR FECHAS

        tournamentToAdd.inscription = inscription;

        if (inscription ) {
            if (inscriptionInitDate && inscriptionEndDate){
                let insStart = new Date(inscriptionInitDate);
                let insEnd = new Date(inscriptionEndDate);

                if (isNaN(insStart.getTime()) || isNaN(insEnd.getTime())) {
                    loggerError.error("ERROR 400: Invalid date format");
                    res.status(400);
                    return res.send({msg: 'Invalid date format'});
                }

                if (insStart <= now || insEnd <= now) {
                    loggerError.error("ERROR 400: Dates must be in the future");
                    res.status(400);
                    return res.send({msg: 'Dates must be in the future'});
                }

                if (insStart >= start || insEnd >= start) {
                    loggerError.error("ERROR 400: Inscription dates must be before start date");
                    res.status(400);
                    return res.send({msg: 'Inscription dates must be before start date'});
                }

                if (insStart >= insEnd) {
                    loggerError.error("ERROR 400: Inscription start date must be before inscription end date");
                    res.status(400)
                    return res.send({msg: 'Inscription start date must be before inscription end date'});
                }

                tournamentToAdd.inscriptionInitDate = inscriptionInitDate;
                tournamentToAdd.inscriptionEndDate = inscriptionEndDate;

            } else {
                loggerError.error("ERROR 400: Inscription start date and inscription end date must be settled both");
                res.status(400)
                return res.send({msg: 'Inscription start date and inscription end date must be settled both'});
            }
        }

        //COMPROBAR VALIDEZ DE LAS FASES NO SE VA A HACER PERO SE ENTIENDE QUE SON CORRECTAS

        if (phases && phases.length > 0) {
            tournamentToAdd.phases = phases;
        } else {
            loggerError.error("ERROR 400: At least one phase must be defined");
            res.status(400)
            return res.send({msg: 'At least one phase must be defined'});
        }

        //COMPROBAMOS EL PREMIO

        if(prize) {
            if (!mongoose.mongo.ObjectId.isValid(prize)) {
                loggerError.error("ERROR 404: Prize with Id:{" + prize + "} not found");
                res.status(404);
                return res.send({msg: "Prize with Id:{" + prize + "} not found"});
            }

            let prizeFound = await Prize.findById(prize);

            if (!prizeFound) {
                loggerError.error("ERROR 404: Prize with Id:{" + prize + "} not found");
                res.status(404);
                return res.send({msg: "Prize with Id:{" + prize + "} not found"});
            }
            tournamentToAdd.prize = prize;
        }

        await Tournament.create(tournamentToAdd).then(result => {
            loggerInfo.info("Tournament {" + result._id + "} created successfully");
            res.status(201);
            return res.send({
                id: result._id
            });
        })

    }catch (e){
        loggerError.error("ERROR 400: There was a problem creating the tournament", e);
        res.status(400);
        return res.send({msg:"There was a problem creating the tournament: " + e});
    }

}

const upd = async (req,res) => {
    let loggerInfo = req.app.get("loggerInfo");
    let loggerError = req.app.get("loggerError");

    let {tournament} = req.body;

    //COMPROBAMOS SI EL ID DEL TORNEO EXISTE

    if(!mongoose.mongo.ObjectId.isValid(req.params.id)){
        loggerError.error("ERROR 404: Tournament with Id:{" + req.params.id + "} not found");
        res.status(404);
        return res.send({msg:"Tournament with Id:{" + req.params.id + "} not found"});
    }

    let tournamentFound = await Tournament.findById(req.params.id);

    if(!tournamentFound){
        loggerError.error("ERROR 404: Tournament with Id:{" + req.params.id + "} not found");
        res.status(404);
        return res.send({msg:"Tournament with Id:{" + req.params.id + "} not found"});
    }

    //ACTUALIZAMOS EL TORNEO
    try {

        let dataToUpdate = {}
        let dataToUnset = {}

        dataToUpdate.name = tournament.name;
        dataToUpdate.description = tournament.description;
        dataToUpdate.rules = tournament.rules;
        dataToUpdate.currentPhase = tournament.currentPhase;

        //COMPROBAR QUE EL STATUS ES UNO DE LOS ESPECIFICADOS
        let statusTypes = ["CLOSED", "INSCRIPTIONS_OPEN", "INSCRIPTIONS_CLOSED", "PREPARING", "ON_COURSE", "FINISHED"];
        if(tournament.status){
            if(statusTypes.includes(tournament.status)) {
                dataToUpdate.status = tournament.status;
            }else{
                loggerError.error("ERROR 400: Status {" + tournament.status + "} not valid");
                res.status(400);
                return res.send({msg: "Status {" + tournament.status + "} not valid"});
            }
        }

        //COMPROBAMOS QUE EL GAME EXISTE Y TAMBIÉN QUE TIENE EL MODO QUE SE INDICA

        let game = tournamentFound.game;
        let mode = tournamentFound.mode;

        if (tournament.game) {
            game = tournament.game;
        }

        if(tournament.mode) {
            mode = tournament.mode;
        }

        if (!mongoose.mongo.ObjectId.isValid(game)) {
            loggerError.error("ERROR 404: Game with Id:{" + game + "} not found");
            res.status(404);
            return res.send({msg: "Game with Id:{" + game + "} not found"});
        }

        let gameFound = await Game.findById(game);

        if (!gameFound) {
            loggerError.error("ERROR 404: Game with Id:{" + game + "} not found");
            res.status(404);
            return res.send({msg: "Game with Id:{" + game + "} not found"});
        }

        if (!gameFound.modes.find((m) => m._name === mode)) {
            loggerError.error("ERROR 404: Mode {" + mode + "} not found");
            res.status(404);
            return res.send({msg: "Mode {" + mode + "} not found"});
        }

        dataToUpdate.game = game;
        dataToUpdate.mode = mode;

        //COMPROBAMOS PARTICIPANTES (AUNQUE SOLO SE DEBE DEJAR CAMBIAR CUANDO EL STATUS ES CLOSED SE COMPRUEBA POR SI ACASO)

        let participantsType = tournamentFound.participantsType;

        if(tournament.participantsType){
            participantsType = tournament.participantsType;
            dataToUpdate.participantsType = participantsType;
        }

        if (participantsType === "SINGLE") {
            if (tournament.participants) {
                let usersIds = tournament.participants.map((participant) => new mongoose.Types.ObjectId(participant.id));
                let users = await User.find({'_id': {$in: usersIds}})
                if (tournament.participants.length < users.length) {
                    loggerError.error("ERROR 404: User not found");
                    res.status(404);
                    return res.send({msg: "User not found"});
                } else {
                    dataToUpdate.participants = tournament.participants;
                }
            }
        } else {
            loggerError.error("ERROR 400: ParticipantsType {" + tournament.participantsType + "} not valid");
            res.status(400);
            return res.send({msg: "ParticipantsType {" + tournament.participantsType + "} not valid"});
        }

        //COMPROBAMOS LOCALIZACIÓN

        dataToUpdate.online = tournament.online;

        if (!tournament.online) {
            //SE PODRÍA LANZAR UN ERROR SI NO EXISTE LOCALIZACIÓN PERO NO LO VAMOS A HACER POR AHORA
            dataToUpdate.location = tournament.location;
        }

        let now = new Date();
        let start = new Date(tournamentFound.initDate);
        let end = new Date(tournamentFound.endDate);

        //COMPROBAR FECHAS
        if(tournament.endDate || tournament.startDate) {

            if (tournament.initDate) {
                start = new Date(tournament.initDate);
            }

            if (tournament.endDate) {
                end = new Date(tournament.endDate);
            }

            if (isNaN(start.getTime()) || isNaN(end.getTime())) {
                loggerError.error("ERROR 400: Invalid date format");
                res.status(400);
                return res.send({msg: 'Invalid date format'});
            }

            if (start <= now || end <= now) {
                loggerError.error("ERROR 400: Dates must be in the future");
                res.status(400);
                return res.send({msg: 'Dates must be in the future'});
            }

            if (start >= end) {
                loggerError.error("ERROR 400: Start date must be before end date");
                res.status(400)
                return res.send({msg: 'Start date must be before end date'});
            }

            dataToUpdate.initDate = start;
            dataToUpdate.endDate = end;
        }


        //COMPROBAR FECHAS

        dataToUpdate.inscription = tournament.inscription;

        let inscription = tournamentFound.inscription;
        let insStart = new Date(tournamentFound.inscriptionInitDate);
        let insEnd = new Date(tournamentFound.inscriptionEndDate);

        if (tournament.inscriptionInitDate) {
            insStart = new Date(tournament.inscriptionInitDate);
        }

        if (tournament.inscriptionInitDate) {
            insEnd = new Date(tournament.inscriptionEndDate);
        }

        if(tournament.inscription !== undefined){
            inscription = tournament.inscription;
        }

        if (inscription === true) {
            if(insStart && insEnd) {

                if (isNaN(insStart.getTime()) || isNaN(insEnd.getTime())) {
                    loggerError.error("ERROR 400: Invalid date format");
                    res.status(400);
                    return res.send({msg: 'Invalid date format'});
                }

                if (insStart <= now || insEnd <= now) {
                    loggerError.error("ERROR 400: Dates must be in the future");
                    res.status(400);
                    return res.send({msg: 'Dates must be in the future'});
                }

                if (insStart >= start || insEnd >= start) {
                    loggerError.error("ERROR 400: Inscription dates must be before start date");
                    res.status(400);
                    return res.send({msg: 'Inscription dates must be before start date'});
                }

                if (insStart >= insEnd) {
                    loggerError.error("ERROR 400: Inscription start date must be before inscription end date");
                    res.status(400)
                    return res.send({msg: 'Inscription start date must be before inscription end date'});
                }
                dataToUpdate.inscriptionInitDate = insStart;
                dataToUpdate.inscriptionEndDate = insEnd;
            }else {
                loggerError.error("ERROR 400: Inscription start date and inscription end date must be settled both");
                res.status(400)
                return res.send({msg: 'Inscription start date and inscription end date must be settled both'});
            }
        }

        //HABRÍA QUE COMPROBAR QUE LAS FASES SON CORRECTAS PERO NO SE VA A HACER POR AHORA
        //COMPROBAMOS QUE AL MENOS HAY UNA FASE EN LA LISTA DE NUEVAS FASES

        if (tournament.phases) {
            if (tournament.phases.length > 0) {
                dataToUpdate.phases = tournament.phases;
            } else {
                loggerError.error("ERROR 400: At least one phase must be defined");
                res.status(400)
                return res.send({msg: 'At least one phase must be defined'});
            }
        }

        //COMPROBAR SPONSORED BY
        if(tournament.sponsoredBy){

            for(let sponsor of tournament.sponsoredBy){
                if (!mongoose.mongo.ObjectId.isValid(sponsor.id)) {
                    loggerError.error("ERROR 404: User with Id:{" + sponsor.id + "} not found");
                    res.status(404);
                    return res.send({msg: "User with Id:{" + sponsor.id + "} not found"});
                }

                let userFound = await User.findById(sponsor.id);

                if (!userFound) {
                    loggerError.error("ERROR 404: User with Id:{" + sponsor.id + "} not found");
                    res.status(404);
                    return res.send({msg: "User with Id:{" + sponsor.id + "} not found"});
                }

                if(sponsor.prize && sponsor.prize !== "") {
                    if (!mongoose.mongo.ObjectId.isValid(sponsor.prize)) {
                        loggerError.error("ERROR 404: Prize with Id:{" + sponsor.prize + "} not found");
                        res.status(404);
                        return res.send({msg: "Prize with Id:{" + sponsor.prize + "} not found"});
                    }

                    let prizeFound = await Prize.findById(sponsor.prize);

                    if (!prizeFound) {
                        loggerError.error("ERROR 404: Prize with Id:{" + sponsor.prize + "} not found");
                        res.status(404);
                        return res.send({msg: "Prize with Id:{" + sponsor.prize + "} not found"});
                    }
                }else{
                    sponsor.prize = undefined;
                }
            }

            dataToUpdate.sponsoredBy = tournament.sponsoredBy;
        }


        //COMPROBAR PRIZE
        if(tournament.prize && tournament.prize !== "") {

            if (!mongoose.mongo.ObjectId.isValid(tournament.prize)) {
                loggerError.error("ERROR 404: Prize with Id:{" + tournament.prize + "} not found");
                res.status(404);
                return res.send({msg: "Prize with Id:{" + tournament.prize + "} not found"});
            }

            let prizeFound = await Prize.findById(tournament.prize);

            if (!prizeFound) {
                loggerError.error("ERROR 404: Prize with Id:{" + tournament.prize + "} not found");
                res.status(404);
                return res.send({msg: "Prize with Id:{" + tournament.prize + "} not found"});
            }
            dataToUpdate.prize = tournament.prize;
        }else{
            dataToUnset.prize = "";
        }

        await Tournament.updateOne(
            {
                _id: new mongoose.mongo.ObjectId(req.params.id)
            },
            {
                $set: dataToUpdate,
                $unset: dataToUnset,
            }).then(result => {
                loggerInfo.info("CODE 200: Tournament {" + req.params.id + "} updated successfully");
                res.status(200);
                return res.send({msg: "Tournament {" + req.params.id + "} updated successfully"});
            }
        );
    } catch (e) {
        loggerError.error("ERROR 400: There was a problem updating the tournament", e);
        res.status(400);
        return res.send({msg:"There was a problem updating the tournament: " + e});
    }

}

const del = async (req,res) => {
    let loggerInfo = req.app.get("loggerInfo");
    let loggerError = req.app.get("loggerError");

    if(!mongoose.mongo.ObjectId.isValid(req.params.id)){
        loggerError.error("ERROR 400: Invalid tournament Id: {" + req.params.id + "}");
        res.status(400);
        return res.send({msg:"Invalid tournament Id:{" + req.params.id + "}"});
    }

    let tournamentFound = await Tournament.findById(req.params.id);

    //Comprobamos si el torneo que se quiere borrar existe o no
    if(tournamentFound){
        let result = await Tournament.deleteOne({"_id": new mongoose.mongo.ObjectId(req.params.id)});
        if(result.deletedCount === 1){
            loggerInfo.info("CODE 200: Tournament with {" + req.params.id + "} deleted successfully")
            res.status(200)
            return res.send({
                msg: "Tournament with Id:{" + req.params.id + "} deleted successfully",
                tournament: tournamentFound
            })
        }else{
            loggerError.error("ERROR 400: The tournament with Id:{" + req.params.id + "} could not be removed");
            res.status(400)
            return res.send({
                msg: "The tournament with Id:{" + req.params.id + "} could not be removed"
            });
        }
    }else{
        loggerError.error("ERROR 404: Tournament with Id:{" + req.params.id + "} not found");
        res.status(404);
        return res.send({msg:"Tournament with Id:{" + req.params.id + "} not found"});
    }
}

module.exports = {find, findAll, add, upd, del}