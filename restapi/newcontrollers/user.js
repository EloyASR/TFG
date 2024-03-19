const User = require('../models/user');
const mongoose = require("mongoose");
const {hashPassword} = require('../helpers/password');

const find = async (req,res) => {

    return res.send();
}

const findAll = async (req, res) => {

    return res.send();
}

//SIGNUP
const add = async (req, res) => {

    let loggerInfo = req.app.get("loggerInfo");
    let loggerError = req.app.get("loggerError");

    let { user } = req.body;

    let usuario = await User.findOne({username: user.username});

    //TODO Comprobar que el email es correcto (se puede hacer en el Schema)
    //TODO Comprobar que el role es correcto (se hace en el Schema)
    try {
        if (!usuario) {
            let usertoadd = new User;
            usertoadd.username = user.username;
            usertoadd.password = hashPassword(user.password);
            usertoadd.email = user.email;
            usertoadd.icon = user.icon;
            usertoadd.role = user.role;

            await User.create(usertoadd).then(result => {
                loggerInfo.info("User {" + result._id + "} created successfully");
                res.status(201);
                return res.send({
                    id: result._id
                });
            })
        }else {
            loggerError.error("User with Username:{ " + user.username + " } already exists");
            res.status(400);
            return res.send({msg: "User with Username:{" + user.username + "} already exists"});
        }
    }catch(e){
        loggerError.error("There was a problem creating the user", e);
        res.status(400);
        return res.send({msg:"There was a problem creating the user: " + e.errors.status});
    }
}

const del = async (req, res) => {

    let errors = [];
    let loggerInfo = req.app.get("loggerInfo");
    let loggerError = req.app.get("loggerError");

    if(!mongoose.mongo.ObjectId.isValid(req.params.id)){
        loggerError.error("Invalid User Id: {" + req.params.id + "}");
        errors.push("Invalid User Id:{" + req.params.id + "}");
    }

    let user_found = await User.findById(req.params.id);

    //Comprobamos si el user que se quiere borrar existe o no
    if(!user_found){
        loggerError.error("ERROR 404: User with Id:{" + req.params.id + "} not found");
        res.status(404);
        res.send({msg:"User with Id:{" + req.params.id + "} not found"});
    }


    //INTENTAMOS BORRAR EL USUARIO
    let result = await Serie.deleteOne({"_id": new mongoose.mongo.ObjectId(req.params.id)});
    if(result.deletedCount === 1){
        loggerInfo.info("User with {" + req.params.id + "} deleted successfully")
        res.status(200)
        res.send({
            msg: "User with Id:{" + req.params.id + "} deleted successfully",
            user: user_found
        })
    }else{
        loggerError.error("The User with Id:{" + req.params.id + "} could not be removed");
        res.send({
            msg: "The serie with Id:{" + req.params.id + "} could not be removed"
        });
    }


}

const upd = async (req, res) => {
    return res.send();
}

module.exports = {find, findAll, add, del, upd}