const commentcontroller=require('../controllers/commentcontroller')
const express=require('express')
const { protect } = require('../controllers/usercontroller')
const router=express.Router()

router
    .route('/createComment')
    .post(protect,commentcontroller.insert)
    



module.exports=router