const mongoose = require('mongoose')
const {userDBConnect} = require('../db/index')

const User = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique:true
        },
        password: {
            type: String,
            required: true
        },
        token:[
            { token:String }
        ]
    }
).index({ email: 1 })

module.exports = userDBConnect.model('user', User)