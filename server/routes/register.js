
const { register } = require('../controllers/registerController');

var router = require('express').Router();



//add register route
router.post('/register' ,  async(req, res)=>{
   
    const user = await register(req, res);
     
});
module.exports = router;