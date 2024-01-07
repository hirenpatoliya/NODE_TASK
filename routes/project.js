const router = require('express').Router()
const { add, get, update, remove } = require('../validators/project.validator')
const { validate,isUserLoggedIn } = require('../middleware')
const controller = require('../controllers/project')

// routes for project crud operations
router.post('/create', add, validate,isUserLoggedIn, controller.create)

// dashboard for user's project
router.get('/:id', get, validate,isUserLoggedIn, controller.get)

router.put('/update/:id', update, validate,isUserLoggedIn, controller.update)
router.delete('/delete/:id', remove, validate,isUserLoggedIn, controller.deleteProject)

module.exports = router