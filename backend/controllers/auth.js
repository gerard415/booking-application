const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../errors')

const register = async (req, res) => {

}

const login = (req, res) => {
    console.log('login')
}

module.exports = {
    register, login
}