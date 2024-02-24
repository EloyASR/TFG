const express = require("express");
const app = express();
const logger = app.get("logger");

const User = require('../models/user');
const {hashPassword} = require("../helpers/password");


//TODO Todos los mensajes enviados a pantalla guardar en un fichero de LOG
//Creation of a new user
const add = async (req, res) => {
    //Obtenemos los datos de la request
    //name, password, email, country, role, icon
    let { name, password, email, country, role, icon } = req.body;

    let user = await User.findOne({name});

    //Check if the user exists
    if(!user){
        //If the user don't exist

        //Check for problems with the data we receive from the request
        if(!name || name === "") {
            res.status(400);
            res.send({
                msg: "Invalid name"
            });
        }

        //TODO Crear una regex para las contraseñas que obligue a que tengan números, letras, y caracteres especiales y al menos 8 caracteres (Fichero aparte)
        //TODO Comprobar que la contraseña se adecua a la regex
        //TODO Crear regex para el email (Fichero aparte)
        //TODO Comprobar que el email cumple con la regex es obligatorio el email

        //We create a new user with the data we get from the request
        user = {
            name: name,
            password: await hashPassword(password),
            email: email,
            country: country,
            role: role,
            icon: icon
        }

        try{
            //We insert the user on the database
            //TODO Recoger el Id del usuario y mostrarlo por pantalla y en el LOG
            await User.collection.insertOne(user);
            console.log("CODE 201: User {" + name + "} created successfully")
            res.status(201)
            res.send({
                msg: "User {" + name + "} created successfully"
            })
        }catch(e){
            console.log(e);
            res.status(400);
            res.send({
                msg: "There was a problem creating the user {" + name + "}"
            });
        }
    }else{
        console.error("ERROR 400: User {" + name + "} already exist");
        res.status(400);
        res.send({
            msg: "User {" + name + "} already exist"
        });
    }
}

//Find a user by its Id
const findById = async (req,res) => {

    //Search for a user with the specified Id
    let user = await User.findById(req.params.id);

    if(user) {
        console.log("CODE 200: User with Id:{" + req.params.id + "} found successfully")
        res.status(200)
        res.json(user);
    }else {
        console.log("ERROR 404: User with Id:{" + req.params.id + "} not found");
        res.status(404);
        res.send("User with Id:{" + req.params.id + "} not found");
    }
}

//Find a user by its Name
const findByName = async (req,res) => {

    //Search for a user with the specified name
    let user = await User.findOne({name: req.params.name})

    if(user) {
        console.log("CODE 200: User with Name:{" + req.params.name + "} find successfully")
        res.status(200)
        res.json(user);
    }else {
        console.log("ERROR 404: User with Name:{" + req.params.name + "} not found");
        res.status(404);
        res.send("User with Name:{" + req.params.id + "} not found");
    }
}

//Update of a user
const upd = async (req,res) => {

    let { name, password, email, country, role, icon } = req.body;

    //Search if a user with the specified name
    let user = await User.findById(req.params.id)

    //Check if the user exists
    if(user != null){
        //If it exists
        //We try to modify the user with the new data
        try{
            await User.updateOne(
                {name: name},
                {$set: {
                        password: password,
                        email: email,
                        country: country,
                        role: role,
                        icon: icon
                    }}
            )

            console.log("CODE 201: User {" + name + "} created successfully")
            res.status(201)
            res.send({
                msg: "User {" + name + "} created successfully"
            })

        }catch(e){
            console.log(e);
            res.status(400);
            res.send({
                msg: "There was a problem updating the user {" + name + "}"
            });
        }

    }else{
        //If it doesn't exist
        console.log("ERROR 404: User with Name:{" + req.params.name + "} not found");
        res.status(404);
        res.send("User with Name:{" + req.params.id + "} not found");
    }
}

const del = async (req, res) => {

    let user = User.findById(req.params.id);

    //Comprobamos si el partido que se quiere borrar existe o no
    if(user){
        let result = User.deleteOne({"_id": req.params.id});
        if(result.deletedCount == 1){
            logger.info("CODE 200: user {" + req.params.id + "} deleted successfully")
            console.log("CODE 200: user {" + req.params.id + "} deleted successfully")
            res.status(200)
            res.send({
                msg: "Match {" + req.params.id + "} deleted successfully"
            })
        }else{
            console.log("CODE 400: The user with Id:{" + req.params.id + "} could not be removed");
            logger.error("CODE 400: The user with Id:{" + req.params.id + "} could not be removed");
            res.status(400);
            res.send({
                msg: "The user with Id:{" + req.params.id + "} could not be removed"
            });
        }

    }else {
        console.log("CODE 404: The user with Id:{" + req.params.id + "} doesn't exist");
        logger.error("CODE 404: The user with Id:{" + req.params.id + "} doesn't exist");
        res.status(404);
        res.send({
            msg: "The user with Id:{" + req.params.id + "} doesn't exist"
        });
    }
}

module.exports = { findById,findByName,add,upd,del };