const mongoose = require('mongoose')
const { userDBConnect } = require('../db/index')
const { taskStatus } = require('../data')

const Task = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String
        },
        status: {
            type: String,
            enum: taskStatus,
            default: 'to-do'
        },
        projectId: {
            type: mongoose.Types.ObjectId,
            ref: 'project',
            required: true
        }
    }
).index({ projectId: 1 })

module.exports = userDBConnect.model('task', Task)