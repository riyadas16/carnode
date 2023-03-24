const commentuser = require('../models/commentmodel')
const car = require('../models/carmodel');
const { default: mongoose } = require('mongoose');
const ObjectId = require('mongoose').Types.ObjectId;

exports.insert = async (req, res) => {
    if (!mongoose.isValidObjectId(req.body.bikeid)) {
        return res.status(400).json({
            message: 'provide valid mongodb id'
        })
    }

    const userid = req.user
    const data = await car.findById(req.body.bikeid)
    // console.log(data)
    if (data) {
        // console.log(data)
        const createcomment = await commentuser.create({
            userid: userid._id,
            bikeid: req.body.bikeid,
            comment: req.body.comment


        })
        res.json({ createcomment })
    }
    else {
        return res.status(400).send("not found")
        // console.log("not found")
    }



}
