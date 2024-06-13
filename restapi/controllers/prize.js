const Prize = require("../models/prize")
const {User} = require("../models/user");

const mongoose = require("mongoose");
const Tournament = require("../models/tournament");

const find = async (req,res) => {

    let loggerInfo = req.app.get("loggerInfo");
    let loggerError = req.app.get("loggerError");

    if(!mongoose.mongo.ObjectId.isValid(req.params.id)){
        loggerError.error("CODE 400: Invalid prize Id: {" + req.params.id + "}");
        res.status(400);
        return res.send({msg:"Invalid prize Id: {" + req.params.id + "}"});
    }
    try {
        let prize = await Prize.findById(req.params.id);

        if (prize) {
            loggerInfo.info("CODE 200: Prize with Id:{" + req.params.id + "} found successfully");
            res.status(200);
            return res.json(prize);
        } else {
            loggerError.error("ERROR 404: Prize with Id:{" + req.params.id + "} not found");
            res.status(404);
            return res.send({msg: "Prize with Id:{" + req.params.id + "} not found"});
        }
    }catch (e){
        loggerError.error("ERROR 400: There was a problem finding the prize: ",e)
        res.status(400);
        return res.send({msg:"There was a problem finding the prize: ",e});
    }
}

const findAll = async (req,res) => {

    let loggerInfo = req.app.get("loggerInfo");
    let loggerError = req.app.get("loggerError");

    let prizes = [];
    let count = 0;

    const {page = 1, limit = 5, creator} = req.query;

    console.log(req.query.page);

    try {

        //FIND BY CREATOR
        if (creator) {
            prizes = await Prize.find({
                creator: creator
            })
                .limit(limit*1)
                .skip((page-1) * limit)
                .exec();
            count = await Prize.countDocuments({
                creator: creator
            });
        }else{
            prizes = await Prize.find({})
                .limit(limit*1)
                .skip((page-1) * limit)
                .exec();
            count = await Prize.countDocuments({});
        }

        if (prizes) {
            loggerInfo.info("CODE 200: Prizes found successfully");
            res.status(200);
            return res.send({
                prizes,
                totalPages: Math.ceil(count / limit),
                currentPage: page
            });
        }

    }catch (e) {
        loggerError.error("ERROR 400: There was a problem finding the prizes: ",e)
        res.status(400);
        return res.send({msg:"There was a problem finding the prizes: ",e});
    }
}

const add = async (req,res) => {

    let loggerInfo = req.app.get("loggerInfo");
    let loggerError = req.app.get("loggerError");

    let { name, description, image, creator} = req.body;

    const createPrize = async (p_name, p_description, p_image, p_creator) => {
        try {

            let prizeToAdd = new Prize;
            prizeToAdd.name = name;
            prizeToAdd.description = description;
            prizeToAdd.image = image;
            prizeToAdd.creator = creator

            await Prize.create(prizeToAdd).then(result => {
                loggerInfo.info("CODE 201: Prize {" + result._id + "} created successfully");
                res.status(201);
                return res.send({
                    id: result._id
                });
            })

        }catch(e){
            loggerError.error("ERROR 400: There was a problem creating the prize", e);
            res.status(400);
            return res.send({msg:"There was a problem creating the prize: " + e});
        }
    }

    if(!mongoose.mongo.ObjectId.isValid(creator)){
        loggerError.error("ERROR 400: Invalid user Id: {" + creator + "}");
        res.status(400);
        return res.send({msg:"Invalid user Id: {" + creator + "}"});
    }

    let foundCreator = await User.findById(creator);

    if(!foundCreator){
        loggerError.error("ERROR 404: User with Id:{" + creator + "} not found");
        res.status(404);
        return res.send({msg:"User with Id:{" + creator + "} not found"});
    }else{
        if(foundCreator.role !== "ADMIN" && foundCreator.role !== "COMPANY"){
            loggerError.error("ERROR 400: User creator must have role ADMIN or COMPANY");
            res.status(400);
            return res.send({msg:"User creator must have role ADMIN or COMPANY"});
        }
    }

    await createPrize(name, description, image, creator);
}

const upd = async (req,res) => {

    let loggerInfo = req.app.get("loggerInfo");
    let loggerError = req.app.get("loggerError");

    let {prize} = req.body;

    //COMPROBAMOS SI EL ID DE PREMIO EXISTE

    if(!mongoose.mongo.ObjectId.isValid(req.params.id)){
        loggerError.error("ERROR 404: Prize with Id:{" + req.params.id + "} not found");
        res.status(404);
        return res.send({msg:"Prize with Id:{" + req.params.id + "} not found"});
    }

    let prizeFound = await Prize.findById(req.params.id);

    if(!prizeFound){
        loggerError.error("ERROR 404: Prize with Id:{" + req.params.id + "} not found");
        res.status(404);
        return res.send({msg:"Prize with Id:{" + req.params.id + "} not found"});
    }

    try {
        await Prize.updateOne(
            {
                _id: new mongoose.mongo.ObjectId(req.params.id)
            },
            {
                $set: {
                    name: prize.name,
                    description: prize.description,
                    image: prize.image
                }
            }).then(result => {
                loggerInfo.info("CODE 200: Prize {" + req.params.id + "} updated successfully");
                res.status(200);
                return res.send({msg: "Prize {" + req.params.id + "} updated successfully"});
            }
        );
    } catch (e) {
        loggerError.error("ERROR 400: There was a problem updating the prize", e);
        res.status(400);
        return res.send({msg:"There was a problem updating the prize: " + e});
    }

}

const del = async (req, res) => {

    let loggerInfo = req.app.get("loggerInfo");
    let loggerError = req.app.get("loggerError");

    if(!mongoose.mongo.ObjectId.isValid(req.params.id)){
        loggerError.error("ERROR 400: Invalid prize Id: {" + req.params.id + "}");
        res.status(400);
        return res.send({msg:"Invalid prize Id:{" + req.params.id + "}"});
    }

    let prizeFound = await Prize.findById(req.params.id);

    //Comprobamos si el premio que se quiere borrar existe o no
    if(prizeFound){
        let result = await Prize.deleteOne({"_id": new mongoose.mongo.ObjectId(req.params.id)});
        if(result.deletedCount === 1){
            loggerInfo.info("CODE 200: Prize with Id:{" + req.params.id + "} deleted successfully")
            res.status(200)
            return res.send({
                msg: "Prize with Id:{" + req.params.id + "} deleted successfully",
                prize: prizeFound
            })
        }else{
            loggerError.error("ERROR 400: The prize with Id:{" + req.params.id + "} could not be removed");
            res.status(400);
            return res.send({
                msg: "The prize with Id:{" + req.params.id + "} could not be removed"
            });
        }
    }else {
        loggerError.error("ERROR 404: Prize with Id:{" + req.params.id + "} not found");
        res.status(404);
        return res.send({msg:"Prize with Id:{" + req.params.id + "} not found"});
    }
}

module.exports = {findAll, find, add, upd, del}