const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../errors')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const bycryptSalt = bcrypt.genSaltSync(10)
const jwtSecret = 'kjwndoifjhnemdkjenekdmdkmdoeijenmekoiejwmkwojn'

const register = async (req, res) => {
    const {name, email, password} = req.body
    const user = await User.create({
        name,
        email,
        password:bcrypt.hashSync(password, bycryptSalt)
    })
    res.status(StatusCodes.CREATED).json(user)
}

const login = async (req, res) => {
    const {email, password} = req.body

    if(!email || !password){
        throw new BadRequestError('Please provide both email and password')
    }

    const user = await User.findOne({email})

    if(!user){
        throw new UnauthenticatedError('Invalid credentials')
    }

    const isPasswordCorrect = bcrypt.compareSync(password, user.password)
    if(!isPasswordCorrect){
        throw new UnauthenticatedError('Invalid credentials')
    }

    jwt.sign({email:user.email, id:user._id}, jwtSecret, {}, (err, token) => {
        if (err) throw err;
        res.cookie('token', token ).json(user);
    })

}

const profile = (req, res) => {
    const {token} = req.cookies


    if(token) {
        jwt.verify(token, jwtSecret, {}, async (err, user) => {
        if(err) throw new Error
        const {name, email, _id} = await User.findById(user.id)
        res.json({name, email, _id})
    })
    }else{
        res.json(null)
    }
    
}


const logout = (req, res) => {
    res.cookie('token', '').json(true)
}
module.exports = {
    register, login, profile, logout
}