const userModel = require('../../models').users;
const Joi = require('@hapi/joi');
const bcrypt = require('bcrypt');

const register = async(req, res) => {
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
        error : error.details[0].message
    });

    //check if email exist
    const emailExist =  await userModel.findOne({
        where : {
            email  : req.body.email
        }
    });
    if(emailExist) return res.status(400).json({
        success : false,
        message : "email exists"
    });
    //check if password ==  password 2 
    if(req.body.password !== req.body.password_verfication) return res.status(400).json({
        success : false,
        message : "password are not the same"
    })
    //hash password 
    const saltRounds = 10;
    const myPlaintextPassword = req.body.password;
    const salt = await bcrypt.genSalt(10);
    let passwordToSave =  await bcrypt.hash(req.body.password , salt);

    //save the user
    userModel.create({
        username : req.body.username,
        email    : req.body.email,
        password : passwordToSave
    }).then(user=>{
        res.status(200).json({
            success : true,
        })
    }).catch(err=>{
        res.status(400).json({
            success : false,
            message : err
        })
    })
}

module.exports.register = register;