const jwt = require('jsonwebtoken')

const validateJWT = (token = '') => {
    
    const { SECRETORPRIVATEKEY } = process.env

    console.log(jwt.decode(token, SECRETORPRIVATEKEY));
}

module.exports = { validateJWT }