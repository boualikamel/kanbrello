const userModel = require('../../models').users;
const Joi = require('@hapi/joi');
const bcrypt = require('bcrypt');


const login = async (req,res) => {

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
   if(!emailExist) return res.status(400).json({
         success : false,
         message : "some thig wrong check your password or email"
   });

   //check password
   const validPass = await bcrypt.compare(req.body.password , user.password);
   if(!validPass) return res.status(400).json({ success : false,  message : "some thig wrong check your password or email"});

   res.status(200).json({
      success : true,
      message : "hello sir!!"
   })
   res.send('sss')
}
module.exports.login = login;
