const {User, Account} = require('../models/user');
const mongoose = require("mongoose");
const {hashPassword, checkPassword} = require('../helpers/password');
const Game = require('../models/game')
const Prize = require("../models/prize");

const find = async (req,res) => {

    let loggerInfo = req.app.get("loggerInfo");
    let loggerError = req.app.get("loggerError");

    if(!mongoose.mongo.ObjectId.isValid(req.params.id)){
        loggerError.error("ERROR 400: Invalid user Id: {" + req.params.id + "}");
        res.status(400);
        return res.send({msg:"Invalid user Id: {" + req.params.id + "}"});
    }

    try {
        let prize = await User.findById(req.params.id);

        if(prize){
            loggerInfo.info("CODE 200: User with Id:{" + req.params.id + "} found successfully");
            res.status(200);
            return res.json(prize);
        }else{
            loggerError.error("ERROR 404: User with Id:{" + req.params.id + "} not found");
            res.status(404);
            return res.send({msg:"User with Id:{" + req.params.id + "} not found"});
        }
    }catch (e){
        loggerError.error("ERROR 400: There was a problem finding the user: ",e)
        res.status(400);
        return res.send({msg:"There was a problem finding the user: ",e});
    }
}

const findAll = async (req, res) => {

    let loggerInfo = req.app.get("loggerInfo");
    let loggerError = req.app.get("loggerError");

    let users = [];

    try {

        users = await User.find({})

        if (users) {
            loggerInfo.info("CODE 200: Users found successfully");
            res.status(200);
            return res.send({users});
        }

    }catch (e) {
        loggerError.error("ERROR 400: There was a problem finding the users: ", e);
        res.status(400);
        return res.send({msg:"There was a problem finding the users: ", e});
    }

}

//SIGNUP
const add = async (req, res) => {

    let loggerInfo = req.app.get("loggerInfo");
    let loggerError = req.app.get("loggerError");

    let { name, password, email, icon, role, accounts } = req.body;

    let usuario = await User.findOne({name: name});

    try {
        if (!usuario) {

            let userToAdd = new User;
            userToAdd.name = name;
            userToAdd.password = await hashPassword(password);
            userToAdd.email = email;
            userToAdd.icon = icon;
            userToAdd.role = role ? role: "USER";

            let newAccounts = undefined;

            if(accounts){

                newAccounts = [];

                for (let account of accounts) {

                    //COMPROBAMOS SI EXISTE EL GAME Y SI ES VALIDO
                    if(account.game) {
                        if (!mongoose.mongo.ObjectId.isValid(account.game)) {
                            loggerError.error("ERROR 404: Game with Id:{" + account.game + "} not found");
                            res.status(404);
                            return res.send({msg: "Game with Id:{" + account.game + "} not found"});
                        }

                        let userFound = await Game.findById(account.game);

                        if (!userFound) {
                            loggerError.error("ERROR 404: Game with Id:{" + account.game + "} not found");
                            res.status(404);
                            return res.send({msg: "Game with Id:{" + account.game + "} not found"});
                        }
                    }

                    let newAccount = new Account;
                    newAccount.game = account.game;
                    newAccount.leagueOfLegendsAccountInfo = account.leagueOfLegendsAccountInfo;
                    newAccount.valorantAccountInfo = account.valorantAccountInfo;
                    newAccount.pokemonVGCAccountInfo = account.pokemonVGCAccountInfo;

                    let err = newAccount.validateSync();

                    if(err){
                        loggerError.error("ERROR 400: There was a problem creating the user: " + err.errors['game'].message);
                        res.status(400);
                        return res.send({msg: "There was a problem creating the user: " + err.errors['game'].message});
                    }

                    newAccounts.push(newAccount);
                }
            }

            userToAdd.accounts = newAccounts;

            await User.create(userToAdd).then(result => {
                loggerInfo.info("User {" + result._id + "} created successfully");
                res.status(201);
                return res.send({
                    id: result._id
                });
            })
        }else {
            loggerError.error("ERROR 400: User with name:{ " + name + " } already exists");
            res.status(400);
            return res.send({msg: "User with name:{" + name + "} already exists"});
        }
    }catch(e){
        loggerError.error("ERROR 400: There was a problem creating the user", e);
        res.status(400);
        return res.send({msg:"There was a problem creating the user: " + e});
    }
}


const upd = async (req, res) => {

    let loggerInfo = req.app.get("loggerInfo");
    let loggerError = req.app.get("loggerError");

    let {user} = req.body;

    //COMPROBAMOS SI EL ID DEL USUARIO EXISTE

    if(!mongoose.mongo.ObjectId.isValid(req.params.id)){
        loggerError.error("ERROR 404: User with Id:{" + req.params.id + "} not found");
        res.status(404);
        return res.send({msg:"User with Id:{" + req.params.id + "} not found"});
    }

    let userFound = await User.findById(req.params.id);

    if(!userFound){
        loggerError.error("ERROR 404: User with Id:{" + req.params.id + "} not found");
        res.status(404);
        return res.send({msg:"User with Id:{" + req.params.id + "} not found"});
    }

    let usuario = await User.findOne({name: user.name});

    if(usuario) {
        loggerError.error("ERROR 400: User with name:{ " + user.name + " } already exists");
        res.status(400);
        return res.send({msg: "User with name:{" + user.name + "} already exists"});
    }

    let hasChanged = false;
    let passwordEncrypted = undefined;

    if(user.password){
        hasChanged = !(await checkPassword(user.password, userFound.password));
    }

    if(hasChanged) {
        passwordEncrypted = await hashPassword(user.password);
    }

    let newAccounts = undefined;

    if(user.accounts){

        newAccounts = [];

        for (let account of user.accounts) {

            //COMPROBAMOS SI EXISTE EL GAME Y SI ES VALIDO
            if(account.game) {
                if (!mongoose.mongo.ObjectId.isValid(account.game)) {
                    loggerError.error("ERROR 404: Game with Id:{" + account.game + "} not found");
                    res.status(404);
                    return res.send({msg: "Game with Id:{" + account.game + "} not found"});
                }

                let userFound = await Game.findById(account.game);

                if (!userFound) {
                    loggerError.error("ERROR 404: Game with Id:{" + account.game + "} not found");
                    res.status(404);
                    return res.send({msg: "Game with Id:{" + account.game + "} not found"});
                }
            }

            let newAccount = new Account;
            newAccount.game = account.game;
            newAccount.leagueOfLegendsAccountInfo = account.leagueOfLegendsAccountInfo;
            newAccount.valorantAccountInfo = account.valorantAccountInfo;
            newAccount.pokemonVGCAccountInfo = account.pokemonVGCAccountInfo;

            let err = newAccount.validateSync();

            if(err){
                loggerError.error("ERROR 400: There was a problem updating the user: " + err.errors['game'].message);
                res.status(400);
                return res.send({msg: "There was a problem updating the user: " + err.errors['game'].message});
            }

            newAccounts.push(newAccount);
        }
    }

    try {
        await User.updateOne(
            {
                _id: new mongoose.mongo.ObjectId(req.params.id)
            },
            {
                $set: {
                    name: user.name,
                    password: passwordEncrypted,
                    email: user.email,
                    role: user.role,
                    icon: user.icon,
                    accounts: newAccounts,
                }
            }).then(result => {
                loggerInfo.info("CODE 200: User {" + req.params.id + "} updated successfully");
                res.status(200);
                return res.send({msg: "User {" + req.params.id + "} updated successfully"});
            }
        );
    } catch (e) {
        loggerError.error("ERROR 400: There was a problem updating the user", e);
        res.status(400);
        return res.send({msg:"There was a problem updating the user: " + e});
    }
}

const del = async (req, res) => {

    let loggerInfo = req.app.get("loggerInfo");
    let loggerError = req.app.get("loggerError");

    if(!mongoose.mongo.ObjectId.isValid(req.params.id)){
        loggerError.error("ERROR 400: Invalid user Id: {" + req.params.id + "}");
        res.status(400);
        return res.send({msg:"Invalid user Id:{" + req.params.id + "}"});
    }

    let userFound = await User.findById(req.params.id);

    //Comprobamos si el user que se quiere borrar existe o no
    if(userFound){
        let result = await User.deleteOne({"_id": new mongoose.mongo.ObjectId(req.params.id)});
        if(result.deletedCount === 1){
            loggerInfo.info("CODE 200: User with {" + req.params.id + "} deleted successfully")
            res.status(200)
            return res.send({
                msg: "User with Id:{" + req.params.id + "} deleted successfully",
                user: userFound
            })
        }else{
            loggerError.error("ERROR 400: The user with Id:{" + req.params.id + "} could not be removed");
            res.status(400)
            return res.send({
                msg: "The user with Id:{" + req.params.id + "} could not be removed"
            });
        }
    }else{
        loggerError.error("ERROR 404: User with Id:{" + req.params.id + "} not found");
        res.status(404);
        return res.send({msg:"User with Id:{" + req.params.id + "} not found"});
    }


}

module.exports = {find, findAll, add, del, upd}