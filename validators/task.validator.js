const { body, param } = require('express-validator')
const { taskStatus } = require('../data')

const add = [
    body('title').trim().not().isEmpty(),
    body('description').optional().not().isEmpty(),
    body('status').optional().not().isIn(taskStatus),
    body('projectId').isMongoId()
]

const get = [
    param('id').isMongoId()
]

const update = [
    param('id').isMongoId(),
    body('title').trim().not().isEmpty(),
    body('description').optional().not().isEmpty(),
    body('status').optional().not().isIn(taskStatus),
    body('projectId').isMongoId()
]

const remove = [
    param('id').isMongoId()
]


module.exports = {
    add,
    get,
    update,
    remove
}