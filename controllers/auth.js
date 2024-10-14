const express = require('express');
const User = require('../models/User');
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../errors')

const register = async function (req, res) {
    console.log(req.body);
    if(req.body.password == req.body.confirmPassword){
            const user = await User.create({ ...req.body })
        const token = user.createJWT()
        console.log(token);
        res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token })
    }else {
        res.status(StatusCodes.BAD_REQUEST).json({ msg: "The password and confirm password didn't match, please try again" })
    }
    
}



const login = async function (req, res) {
    const { email, password } = req.body

    if (!email || !password) {
        throw new BadRequestError('Please provide email and password')
    }
    const user = await User.findOne({ email })
    if (!user) {
        throw new UnauthenticatedError('Invalid Credentials')
    }
    const isPasswordCorrect = await user.comparePassword(password)
    if (!isPasswordCorrect) {
        throw new UnauthenticatedError('Invalid Credentials')
    }
    // compare password
    const token = user.createJWT()
    res.status(StatusCodes.OK).json({ user: { name: user.name }, token })
}


module.exports = {
    register, 
    login
}