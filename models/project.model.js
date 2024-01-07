const mongoose = require('mongoose')
const { userDBConnect } = require('../db/index')
const { projectStatus } = require('../data')

const Project = new mongoose.Schema(
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
            enum: projectStatus,
            default: 'not-started'
        },
        createdBy: {
            type: mongoose.Types.ObjectId,
            ref: 'user',
            required: true
        }
    }
).index({ createdBy: 1 })

module.exports = userDBConnect.model('project', Project)