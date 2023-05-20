const jwt = require('jsonwebtoken')

const validateJWT = (token = '') => {
    
    const { SECRETORPRIVATEKEY } = process.env

    return new Promise((resolve, reject) => {

        jwt.verify(token, SECRETORPRIVATEKEY, (err, decoded) => {
            if (err) {
                console.log("JWT verification failed:", err.message);
                reject(err)
            } else {
                console.log("Decoded JWT:", decoded);
                resolve(decoded);
            }
        })
    })
}

module.exports = { validateJWT }