const { body, param } = require('express-validator')
const { projectStatus } = require('../data')

const add = [
    body('title').trim().not().isEmpty(),
    body('description').optional().not().isEmpty(),
    body('status').optional().not().isIn(projectStatus)
]

const get = [
    param('id').isMongoId()
]

const update = [
    param('id').isMongoId(),
    body('title').trim().not().isEmpty(),
    body('description').optional().not().isEmpty(),
    body('status').optional().not().isIn(projectStatus)
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