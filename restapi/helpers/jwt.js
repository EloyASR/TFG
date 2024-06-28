const jwt = require('jsonwebtoken')

const generateJWT = (uid = '') => {

    const { SECRETORPRIVATEKEY } = process.env

    return new Promise((resolve, reject) => {
        const payload = { uid }

        jwt.sign(payload, SECRETORPRIVATEKEY, {
            expiresIn:'24h'
        },(err, token) => {
            if (err) {
                reject(err)
            } else {
                //jwt.verify(token, SECRETORPRIVATEKEY, function (err, decoded) {
                //    console.log(decoded) // bar
                //});
                resolve(token)
            }
        })
    })
}

module.exports = { generateJWT }