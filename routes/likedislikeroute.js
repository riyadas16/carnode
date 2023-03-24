const express = require('express')
const likedislikecontroller = require('../controllers/likedislikecontroller.js')
const { protect } = require('../controllers/usercontroller.js')

const router=express.Router()

router.route('/like')
.post(protect,likedislikecontroller.like)

router.route('/dislike')
.post(protect, likedislikecontroller.dislike)

module.exports=router
