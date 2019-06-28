const User = require('../models/user');
const Joi = require('@hapi/joi');


const register = (req, res) => {
    //validation 
    const Schema = {
        username: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),
        password_verfication:Joi.string().min(6).required()
    }

    const { error } = Joi.validate(req.body, Schema);
    if(error) return res.status(400).json({
        success : false,
        error : error
    })


}

module.exports = register;