require('dotenv').config()
const jwt = require("jsonwebtoken")

function signP(payload, options) {

    return new Promise((resolve, reject) => {

        jwt.sign(payload, process.env.JWT_KEY, options, (err, token) => {

            if (err !== null) {
                reject(err)
            } else {
                resolve(token)
            }
        })

    })
}

module.exports.signP = signP