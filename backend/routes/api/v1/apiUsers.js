const express = require('express');
const router = express.Router();
const db = require('../../../database/mongo');
const bcrypt = require('bcrypt')

const bcryptSalt = 8

// makes sure user doc has a userName property
// forces userName to be lower case.
async function formatUser(user) {

    let rtnValue = null
    // check for userName property
    if (!user.hasOwnProperty("userName")) {

        throw new Error("No userName Property")

    } else {

        // copy user object
        rtnValue = { ...user }

        // force userName to be lower case
        rtnValue.userName = rtnValue.userName.toLowerCase()

        // encrypt password
        if (user.hasOwnProperty("password")) {

            try {
                rtnValue.password = await bcrypt.hash(user.password, bcryptSalt)
            }
            catch (err) {
                console.log("BCRYPT", err.message)
                throw err
            }
        }
    }

    return rtnValue
}

/* GET users listing. */
router.get('/', function (req, res, next) {

    console.log("GET USERS")
    let info = {
        query: {},
        collection: req.app.locals.collectionUsers
    }

    db.readAll(info)
        .then(users => {
            res.json(users)
        })
        .catch(err => {
            res.status(500).send("Unable to Get Document ", err.message)
        })

}) // end of Get users

// localhost:3000/api/v1/users/Jo
router.get('/:userName', function (req, res, next) {

    if (req.params.userName !== undefined) {

        const userName = req.params.userName.toLowerCase()

        const info = {
            query: {
                fName: userName
            },
            collection: req.app.locals.collectionUsers
        }

        db.readOne(info)
            .then(user => {
                res.json(user)
            })
            .catch(err => {
                res.status(500).send(err.message)
            })
    } else {
        res.status(400).send("Username is undefined")
    }
})  // endo of get a user

// Insert a new document
router.post('/', function (req, res, next) {

    //const authHeader = req.headers['authorization']

    formatUser(req.body)

        .then(user => {

            // handle user object
            const info = {
                doc: user,
                collection: req.app.locals.collectionUsers
            }

            db.readOne({
                query: { userName: user.userName },
                collection: req.app.locals.collectionUsers
            })
                .then(foundUser => {

                    if (foundUser !== null) {
                        throw new Error(`User ${user.userName} Already Exists`)
                    }

                    // this shouldn't execute if user is found
                    return db.createOne(info)

                })
                .then(resDoc => {

                    if (resDoc.insertedCount === 1) {

                        // ops is an array of all inserted documents
                        // http://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#~insertOneWriteOpCallback
                        res.json(resDoc.ops[0])
                    }

                })
                .catch(err => {
                    res.status(500).send(err.message)
                })

        }, err => {
            console.log(err.message)
            res.status(400).send(err.message)
        })

})

router.put('/:userName', function (req, res, next) {

    if (req.params.userName !== undefined) {

        const userName = req.params.userName.toLowerCase()

        const info = {
            query: {
                userName: userName
            },
            doc: req.body,
            collection: req.app.locals.collectionUsers
        }

        db.replaceOne(info)
            .then(response => {

                if (response.value === null) {
                    // replacement failed so create
                    return db.createOne(info)
                }
                res.json(response)
            })
            .catch(err => {
                res.status(500).send("Failed to Replace", err.message)
            })

    } else {

        res.status(400).send("Username is undefined")

    }

})

router.patch('/:userName', function (req, res, next) {

    if (req.params.userName !== undefined) {

        const userName = req.params.userName.toLowerCase()

        let user = req.body

        const info = {
            query: {
                userName: userName
            },
            doc: user,
            collection: req.app.locals.collectionUsers
        }

        db.changeOne(info)

            .then(response => {

                if (response.ok !== 1) {
                    // update failed
                    throw new Error(`Username ${req.params.userName} Not Found`)
                }

                return db.readOneById({
                    id: response.value._id,
                    collection: req.app.locals.collectionUsers
                })

            })
            .then(resDoc => {
                res.json(resDoc)
            })
            .catch(err => {
                res.status(500).send("Failed to Update", err.message)
            })

    } else {

        res.status(400).send("Username is undefined")

    }

}) // end of patch

router.delete('/:userName', function (req, res, next) {

    if (req.params.userName !== undefined) {

        const userName = req.params.userName.toLowerCase()

        const info = {
            query: {
                userName: userName
            },
            collection: req.app.locals.collectionUsers
        }

        db.deleteOne(info)
            .then(response => {
                if (response.deletedCount === 1) {
                    res.json({})
                } else {
                    // ToDo develop a proper error handler
                    res.json(req.params.userName)
                }
            })
            .catch(err => {
                res.status(500).send(err.message)
            })

    } else {

        res.status(400).send("Username is undefined")

    }
})

module.exports = router;
