const bcrypt = require('bcrypt')

const hashPassword = (password) => {
    const rounds = 10
    const salt = bcrypt.genSaltSync(rounds)
    const hash = bcrypt.hashSync(password, salt)
    return hash
}

const checkPassword = (password, hash) => {
    return bcrypt.compareSync(password, hash)
}

module.exports = {
    hashPassword,
    checkPassword
}