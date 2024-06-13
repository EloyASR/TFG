const mongoose = require("mongoose");
const Team = require("../models/team");
const {User} = require("../models/user");

const find = async (req, res) => {
    let loggerInfo = req.app.get("loggerInfo");
    let loggerError = req.app.get("loggerError");

    if(!mongoose.mongo.ObjectId.isValid(req.params.id)){
        loggerError.error("ERROR 400: Invalid team Id: {" + req.params.id + "}");
        res.status(400);
        return res.send({msg:"Invalid team Id: {" + req.params.id + "}"});
    }

    try {
        let team = await Team.findById(req.params.id);

        if(team){
            loggerInfo.info("CODE 200: Team with Id:{" + req.params.id + "} found successfully");
            res.status(200);
            return res.json(team);
        }else{
            loggerError.error("ERROR 404: Team with Id:{" + req.params.id + "} not found");
            res.status(404);
            return res.send({msg:"Team with Id:{" + req.params.id + "} not found"});
        }
    }catch (e){
        loggerError.error("ERROR 400: There was a problem finding the team: ",e)
        res.status(400);
        return res.send({msg:"There was a problem finding the team: ",e});
    }
}

const findAll = async (req, res) => {
    let loggerInfo = req.app.get("loggerInfo");
    let loggerError = req.app.get("loggerError");

    let teams = [];

    try {

        teams = await Team.find({})

        if (teams) {
            loggerInfo.info("CODE 200: Teams found successfully");
            res.status(200);
            return res.send({teams});
        }

    }catch (e) {
        loggerError.error("ERROR 400: There was a problem finding the teams: ", e);
        res.status(400);
        return res.send({msg:"There was a problem finding the teams: ", e});
    }
}

const add = async (req, res) => {
    let loggerInfo = req.app.get("loggerInfo");
    let loggerError = req.app.get("loggerError");

    let { name, type, image, main, substitutes} = req.body;

    let team = await Team.findOne({name: name});

    try {
        if(!team){
            let teamToAdd = new Team;
            teamToAdd.name = name;
            teamToAdd.type = type;
            teamToAdd.image = image;

            if(main && substitutes){
                for(let user of main) {
                    if (substitutes.includes(user)){
                        loggerError.error("ERROR 400: A user cannot be both Main and Substitute");
                        res.status(400);
                        return res.send({msg: "A user cannot be both Main and Substitute"});
                    }
                }
            }

            if(main) {

                if(new Set(main).size !== main.length){
                    loggerError.error("ERROR 400: A user cannot duplicated");
                    res.status(400);
                    return res.send({msg: "A user cannot be duplicated"});
                }

                let listIds = main.map((userId) => new mongoose.Types.ObjectId(userId));
                let users = await User.find({'_id': { $in: listIds}})
                if(main.length === users.length){
                    teamToAdd.main = main;
                }else{
                    loggerError.error("ERROR 404: User not found");
                    res.status(404);
                    return res.send({msg: "User not found"});
                }
            }

            if(substitutes) {

                if(new Set(substitutes).size !== substitutes.length){
                    loggerError.error("ERROR 400: A user cannot duplicated");
                    res.status(400);
                    return res.send({msg: "A user cannot be duplicated"});
                }

                let listIds = substitutes.map((userId) => new mongoose.Types.ObjectId(userId));
                let users = await User.find({'_id': { $in: listIds}})
                if(substitutes.length === users.length){
                    teamToAdd.substitutes = substitutes;
                }else{
                    loggerError.error("ERROR 404: User not found");
                    res.status(404);
                    return res.send({msg: "User not found"});
                }
            }

            await Team.create(teamToAdd).then(result => {
                loggerInfo.info("Team {" + result._id + "} created successfully");
                res.status(201);
                return res.send({
                    id: result._id
                });
            })

        }else{
            loggerError.error("ERROR 400: Team with name:{ " + name + " } already exists");
            res.status(400);
            return res.send({msg: "Team with name:{" + name + "} already exists"});
        }
    }catch(e) {
        loggerError.error("ERROR 400: There was a problem creating the team", e);
        res.status(400);
        return res.send({msg:"There was a problem creating the team: " + e});
    }
}

const upd = async (req, res) => {
    let loggerInfo = req.app.get("loggerInfo");
    let loggerError = req.app.get("loggerError");

    let { team } = req.body;

    if(!mongoose.mongo.ObjectId.isValid(req.params.id)){
        loggerError.error("ERROR 404: Team with Id:{" + req.params.id + "} not found");
        res.status(404);
        return res.send({msg:"Team with Id:{" + req.params.id + "} not found"});
    }

    let teamFound = await Team.findById(req.params.id);

    if(!teamFound){
        loggerError.error("ERROR 404: Team with Id:{" + req.params.id + "} not found");
        res.status(404);
        return res.send({msg:"Team with Id:{" + req.params.id + "} not found"});
    }

    let equipo = await Team.findOne({name: team.name});

    if(equipo) {
        loggerError.error("ERROR 400: Team with name:{ " + team.name + " } already exists");
        res.status(400);
        return res.send({msg: "Team with name:{" + team.name + "} already exists"});
    }

    try{

        if(team.main && team.substitutes){
            for(let user of team.main) {
                if (team.substitutes.includes(user)){
                    loggerError.error("ERROR 400: A user cannot be both Main and Substitute");
                    res.status(400);
                    return res.send({msg: "A user cannot be both Main and Substitute"});
                }
            }
        }

        if(team.main) {

            if(new Set(team.main).size !== team.main.length){
                loggerError.error("ERROR 400: A user cannot duplicated");
                res.status(400);
                return res.send({msg: "A user cannot be duplicated"});
            }

            let listIds = team.main.map((userId) => new mongoose.Types.ObjectId(userId));
            let users = await User.find({'_id': { $in: listIds}})
            if(team.main.length !== users.length){
                loggerError.error("ERROR 404: User not found");
                res.status(404);
                return res.send({msg: "User not found"});
            }
        }

        if(team.substitutes) {

            if(new Set(team.substitutes).size !== team.substitutes.length){
                loggerError.error("ERROR 400: A user cannot duplicated");
                res.status(400);
                return res.send({msg: "A user cannot be duplicated"});
            }

            let listIds = team.substitutes.map((userId) => new mongoose.Types.ObjectId(userId));
            let users = await User.find({'_id': { $in: listIds}})
            if(team.substitutes.length !== users.length){
                loggerError.error("ERROR 404: User not found");
                res.status(404);
                return res.send({msg: "User not found"});
            }
        }

        await Team.updateOne(
            {
                _id: new mongoose.mongo.ObjectId(req.params.id)
            },
            {
                $set: {
                    name: team.name,
                    type: team.type,
                    main: team.main,
                    substitutes: team.substitutes,
                    image: team.image
                }
            }).then(result => {
                loggerInfo.info("CODE 200: Team {" + req.params.id + "} updated successfully");
                res.status(200);
                return res.send({msg: "Team {" + req.params.id + "} updated successfully"});
            }
        );
    }catch(e) {
        loggerError.error("ERROR 400: There was a problem updating the team", e);
        res.status(400);
        return res.send({msg:"There was a problem updating the team: " + e});
    }
}

const del = async (req, res) => {
    let loggerInfo = req.app.get("loggerInfo");
    let loggerError = req.app.get("loggerError");

    if(!mongoose.mongo.ObjectId.isValid(req.params.id)){
        loggerError.error("ERROR 400: Invalid team Id: {" + req.params.id + "}");
        res.status(400);
        return res.send({msg:"Invalid team Id:{" + req.params.id + "}"});
    }

    let teamFound = await Team.findById(req.params.id);

    //Comprobamos si el equipo que se quiere borrar existe o no
    if(teamFound){
        let result = await Team.deleteOne({"_id": new mongoose.mongo.ObjectId(req.params.id)});
        if(result.deletedCount === 1){
            loggerInfo.info("CODE 200: Team with {" + req.params.id + "} deleted successfully")
            res.status(200)
            return res.send({
                msg: "Team with Id:{" + req.params.id + "} deleted successfully",
                team: teamFound
            })
        }else{
            loggerError.error("ERROR 400: The team with Id:{" + req.params.id + "} could not be removed");
            res.status(400)
            return res.send({
                msg: "The team with Id:{" + req.params.id + "} could not be removed"
            });
        }
    }else{
        loggerError.error("ERROR 404: Team with Id:{" + req.params.id + "} not found");
        res.status(404);
        return res.send({msg:"Team with Id:{" + req.params.id + "} not found"});
    }
}

module.exports = {find, findAll, add, upd, del}