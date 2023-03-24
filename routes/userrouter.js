const express = require('express')
const usercontroller = require('../controllers/usercontroller.js')

const router = express.Router()

router.post('/register',usercontroller.signup)
router.post('/login',usercontroller.signin)
   



module.exports = router