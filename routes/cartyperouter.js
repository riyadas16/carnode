const cartypescontroller=require('../controllers/cartypescontroller')
const express=require('express')
const router=express.Router()

router
    .route('/create')
    .post(cartypescontroller.insert)
    
router
    .route('/getall')
    .get(cartypescontroller.getalltype)


module.exports=router