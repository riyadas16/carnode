const carcontroller=require('../controllers/carcontroller')
const usercontroller=require('../controllers/usercontroller')
const express=require('express')
const router=express.Router()

router
    .route('/create')
    .post(usercontroller.protect,carcontroller.insert)

router
    .route('/update/:id')
    .patch(carcontroller.update)

router
    .route('/delete/:id')
    .delete(carcontroller.delete)

router
    .route('/getall')
    .get(carcontroller.getall)

router
    .route('/getbyid/:id')
    .get(carcontroller.getbyid)

router
    .route('/getbikebybiketypes/:id')
    .get(carcontroller.getbikebybiketypes)

router
    .route('/recentbikes/:id')
    .get(carcontroller.recentbikes)

module.exports=router