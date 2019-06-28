var router = require('express').Router();
import { register } from '../controllers/registerController';


//add register route
router.post('/register' , async (req, res)=>{
    try {
         const user = await register();
         res.json({
             success : true            
         });
    }catch(err){
        res.status(400).json({
                success : false            
            });
    }
});
module.exports = router;