const { response, request } = require('express')
const { generateJWT } = require('../helpers/jwt')
const { checkPassword } = require('../helpers/password')

const User = require('../models/user')

const login = async (req, res) => {

    let { name, password } = req.body

    const queryStatements = {name}

    const user = await User.findOne(queryStatements)

    const isPasswordCorrect = user === null ? false : checkPassword(password, user.password)
    
    console.log(isPasswordCorrect)

    if (!(user && isPasswordCorrect)) {
        return res.status(400).json({ msg: 'Wrong user or password' })
    }else{
        const token = await generateJWT(user.id)
        res.json({ user, token })
    }

    
}

module.exports = {login}