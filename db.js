const mongoose = require('mongoose')

module.exports = async function connection() {
    try {
        const connectionParams = {
            useNewUrlParser: true
        }

        await mongoose.connect(process.env.DB_CONNECT, connectionParams)
        console.log('Connected to DB.')
        
    } catch (error) {
        console.log('Could not connect to DB: ' + error)
    }
}