const { register } = require('../controllers/registerController');
const { login } = require('../controllers/loginController');
var router = require('express').Router();
//add register route
router.post('/register' ,  async(req, res)=>{
   try{
         const user = await register(req, res);
   }catch(err){
        res.status(400).json({
            succss : false
        })
   }
  
});

//login
router.post('/login' , async(req, res)=>{
        try {
            const user =  await login(req, res);
        }catch(err){
            res.status(400).json({
                succss : false
            })
        }
       
})

module.exports = router;