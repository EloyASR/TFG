const {checkPassword} = require("../helpers/password");
const {generateJWT} = require("../helpers/jwt");

const {User} = require('../models/user')

const login = async (req, res) => {

    let { name, password } = req.body

    const queryStatements = {name}

    const user = await User.findOne(queryStatements)

    const isPasswordCorrect = user === null ? false : await checkPassword(password, user.password)

    if (!(user && isPasswordCorrect)) {
        return res.status(400).json({ msg: 'Wrong user or password' })
    }else{
        const token = await generateJWT(user.id)
        res.json({ user, token })
    }
}

module.exports = {login}
