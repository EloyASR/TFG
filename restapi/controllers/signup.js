const { response, request } = require('express')
const { generateJWT } = require('../helpers/jwt')
const { hashPassword } = require('../helpers/password')

const User = require('../models/user')

const signup = async (req,res) => {
    let { name, password, email, icon } = req.body;

    const queryStatements = {name}

    var user = await User.findOne(queryStatements);
    
    if(!user){
        
        user = {
            name: name,
            password: hashPassword(password),
            email: email,
            role: "USER",
            icon: icon
        }

        User.collection.insertOne(user)

        res.status(200)
        res.send()
    }else{
        console.error("Error 400: El usuario ya existe")
        res.status(400);
        res.send({
            code: 10,
            msg: "Usuario ya existente"
        });
    }
}

module.exports = {signup}