const userModel = require('../../models').users;
const Joi = require('@hapi/joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
 
// require('dotenv').config();

const login = async (req,res) => {
   // res.send('dd')
    //validation 
      const Schema = {
         //username: Joi.string().min(6).required(),
         email: Joi.string().min(6).required().email(),
         password: Joi.string().min(6).required(),
         //password_verfication:Joi.string().min(6).required()
   }
   const { error } = Joi.validate(req.body, Schema);
   if(error) return res.status(400).json({
         success : false,
         error : error.details[0].message
   });
   //check if email exist
      const user =  await userModel.findOne({
         where : {
            email  : req.body.email
         }
   });
   if(!user) return res.status(400).json({
         success : false,
         message : "some thig wrong check your password or email"
   });

   //check password
   const validPass = await bcrypt.compare(req.body.password , user.password);
   if(!validPass) return res.status(400).json({ success : false,  message : "some thig wrong check your password or email"});
   //add jwt token
   let token = jwt.sign({ id : user.id , username : user.username }, process.env.TOKEN_SECRET,  {expiresInMinutes: 60*2});
   res.header('auth-token' , token).send(token);
   res.json({
       success : true,
       message : `hello mister : ${user.name}`
   })
}

const logout = async(req, res) => {

   res.send('logout')
 
}
module.exports.login = login;
module.exports.logout = logout;
