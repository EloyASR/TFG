const { response, request } = require('express')
const { generateJWT } = require('../helpers/jwt')
const { checkPassword } = require('../helpers/password')

const User = require('../models/user')

const login = async (req, res) => {
    console.log(req.body)

    let { name, password } = req.body

    name = name.toUpperCase()

    const queryStatements = {name}

    const user = await User.findOne(queryStatements)

    console.log(user)

    //const isPasswordCorrect = user === null ? false : checkPassword(password, user.password)
    const isPasswordCorrect = true;
    console.log(isPasswordCorrect)

    if (!(user && isPasswordCorrect)) {
        return (res.status(400).json({ msg: 'Wrong user or password' }))
    }

    console.log(user.id)

    const token = await generateJWT(user.id)

    res.json({ user, token })
}

module.exports = login