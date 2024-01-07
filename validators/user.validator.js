const {body} = require('express-validator')

const register = [
    body('email').isEmail(),
    body('password').not().isEmpty()
]

const login = [
    body('email').isEmail(),
    body('password').not().isEmpty()
]

module.exports = {
    register,
    login
}