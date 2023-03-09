const mongoose = require('mongoose')

const { MONGODB_ATLAS, MONGODB_ATLAS_TEST, NODE_ENV } = process.env

//const connectionString = NODE_ENV === 'test' ? MONGODB_ATLAS_TEST : MONGODB_ATLAS

const connectionString = MONGODB_ATLAS

if (!connectionString) {
    console.error('Yoy must define your connection string')
}

const dbConnection = async () => {
    try {
        mongoose.set("strictQuery", false)
        await mongoose.connect(connectionString), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        }
        console.log('database online')
    } catch (err) {
        console.log(err)
        throw new Error('Cannot connect to the database ')
    }

    process.on('uncaughtException', error => {
        console.error(error)
        mongoose.disconnect()
    })
}
module.exports = { dbConnection }