const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const UserModel = require('../models/user.model')

const validate = function (req, res, next) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }
    next()
}

const isUserLoggedIn = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '')
    if (!token) return res.status(401).json({ message: 'Authentication failed. Please login again!' })

    const isDecoded = jwt.decode(token, process.env.JWT_SECRET)
    if (!isDecoded) return res.status(401).message({ message: 'Authentication failed. Please login again!' })
    
    const user = await UserModel.findById(isDecoded?.userId).lean()
    if (!user) return res.status(401).json({ message: 'Authentication failed. Please login again!' })
    req.user = user
    next()
}

module.exports = { validate, isUserLoggedIn }