const mongoose = require('mongoose')
require('dotenv').config()
const dbUrl = process.env.DB_URL
const poolSize = process.env.POOL_SIZE

function connection(DB_URL, maxPoolSize = 5, DB) {
    try {
        const conn = mongoose.createConnection(DB_URL)
        conn.on('connected', () => console.log(`Connected to ${DB} database.`))
        conn.syncIndexes({ background: true })
        return conn
    } catch (error) {
        handleCatchError(error)
    }
}

const userDBConnect = connection(dbUrl, parseInt(poolSize), 'PROJECT_MANAGEMENT')
module.exports = {
    userDBConnect
}
