const router = require('express').Router()
const {register, login} = require('../validators/user.validator')
const {validate} = require('../middleware/index')
const controller = require('../controllers/user')


// route for register user 
router.post('/register', register,validate,controller.createUser)

// route for login user
router.get('/login', login,validate,controller.login)


module.exports = router