require('dotenv').config()
const {MongoClient} = require('mongodb')
const ObjectID = require('mongodb').ObjectID

let client

function connect(locals) {

    const uri =`mongodb+srv://NormalAccess:${process.env.DB_PASSWORD}@cluster0.hrloc.mongodb.net/demo?retryWrites=true&w=majority`

    client = new MongoClient(uri,{useUnifiedTopology: true})

    return client.connect()
    .then((connection) => {
        locals.collectionUsers = connection.db('demo').collection('users')
        locals.collectionCharacters = connection.db('demo').collection('characters')
        locals.collectionSpells = connection.db('demo').collection('spells')
    })
    .catch(err => {
        console.log(err)
        process.exit()
    })

}

function close() {
    client.close()
}

function readAll(info) {

    return info.collection.find(info.query).toArray()

}

function readOne(info) {
    
    return info.collection.findOne(info.query)

}

function readOneById(info) {

    return info.collection.findOne({_id: ObjectID(info.id)})

}

function createOne(info) {
    
    return info.collection.insertOne(info.doc)

}

function replaceOne(info) {

    return info.collection.findOneAndReplace(info.query,info.doc)

}

function changeOne(info) {
    
    return info.collection.findOneAndUpdate(info.query,{$set: info.doc})
    
}

function deleteOne(info) {
    
    return info.collection.deleteOne(info.query)
    
}

module.exports.connect = connect
module.exports.close = close
module.exports.readAll = readAll
module.exports.readOne = readOne
module.exports.readOneById = readOneById
module.exports.createOne = createOne
module.exports.replaceOne = replaceOne
module.exports.changeOne = changeOne
module.exports.deleteOne = deleteOne