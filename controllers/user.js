const UserModel = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const createUser = async(req,res) => {
    try {
        const { email, password } = req.body
        
        const isUserExist = await UserModel.findOne({email}).lean()
        if(isUserExist) return res.status(401).json({message: 'User Already exists'})
        
        const hashedPassword = await bcrypt.hash(password,10)
        const user = await UserModel.create({ email, password: hashedPassword})
        return res.status(201).json({message:'User Registered Successfully', user })
    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong',error})
    }
}

const login = async(req,res) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email });
        if (!user) {
          return res.status(401).json({ message: 'Invalid credentials' });
        }
    
        const passwordMatch = await bcrypt.compare(req.body.password, user.password);
        if (!passwordMatch) {
          return res.status(401).json({ message: 'Invalid credentials' });
        }
    
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRY });
        user.token.push({ token });
        await user.save();
        return res.status(200).json({ message:'login Success',token });
      } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error',error });
      }
}

module.exports = {
    createUser,
    login
}