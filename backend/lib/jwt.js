require('dotenv').config()
const jwt = require("jsonwebtoken")

/********************************
 * jwt wrapper functions
 ********************************/
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

function verifyP(token, options) {

    return new Promise((resolve, reject) => {

        jwt.verify(token, process.env.JWT_KEY, options, (err, payload) => {

            if (err !== null) {
                reject(err)
            } else {
                resolve(payload)
            }
        })
    })

}

/*********************************
 * helper functions
 ********************************/
function validateJWT(req, res, next) {

    // get value for authorization header
    const auth = req.get("authorization")

    // check to see if we have authorization header
    if (auth != undefined) {

        // split the header into "bearer" and the token
        // at the space
        let [, token] = auth.split(" ")

        verifyP(token)
            .then(payload => {

                req.jwtPayload = payload
                next()

            })
            .catch(err => {
                res.status(400).send(`Error at validateJWT ${err.message}`)
            })

    } else {
        res.status(400).send("No Authorization Header")
    }


}

module.exports.signP = signP
module.exports.verifyP = verifyP
module.exports.validateJWT = validateJWT