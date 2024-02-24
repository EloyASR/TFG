const bcrypt = require('bcrypt')

const hashPassword = async (password) => {
    const rounds = 10
    const salt = await bcrypt.genSalt(rounds)
    return await bcrypt.hash(password, salt);
}

const checkPassword = async (password, hash) => {
    return await bcrypt.compare(password, hash);
}

module.exports = {
    hashPassword,
    checkPassword
}