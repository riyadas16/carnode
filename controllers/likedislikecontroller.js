const likedislike = require('../models/likedislikemodel')
const carmodel = require('../models/carmodel')

exports.like = async (req, res) => {

    const userid = req.user._id

    const data = await likedislike.findOne({
        userid: userid,
        bikeid: req.body.bikeid,

    })

    const carexists = await carmodel.findById(req.body.bikeid)
    if (!carexists) return res.status(400).json({ message: 'car does not exist Please Check your Bike Id' })

    if (data) {
        if (data.like) {
            return res.status(400).json({
                message: "already liked"
            })
        }

        const like = await likedislike.findByIdAndUpdate(data._id, {
            userid: userid,
            bikeid: req.body.bikeid,
            like: true,
            dislike: false
        }, { new: true })

        const newLikecounter = carexists.liked + 1
        const newDislikecounter = carexists.disliked - 1

        await carmodel.findByIdAndUpdate(req.body.bikeid, { liked: newLikecounter, disliked: newDislikecounter }, { new: true })

        return res.status(201).json({
            message: "liked"
        })
    }

    const like = await likedislike.create({
        userid: userid,
        bikeid: req.body.bikeid,
        like: true
    })

    const newLikecounter = carexists.liked + 1
    await carmodel.findByIdAndUpdate(req.body.bikeid, { liked: newLikecounter }, { new: true })

    return res.status(201).json({
        message: "liked"
    })
}

exports.dislike = async (req, res) => {
    const userid = req.user._id

    const data = await likedislike.findOne({
        userid: userid,
        bikeid: req.body.bikeid,

    })

    const carexists = await carmodel.findById(req.body.bikeid)
    if (!carexists) return res.status(400).json({ message: 'car does not exist Please Check your Bike Id' })

    if (data) {
        if (data.dislike) {
            return res.status(400).json({
                message: "already disliked"
            })
        }

        const like = await likedislike.findByIdAndUpdate(data._id, {
            userid: userid,
            bikeid: req.body.bikeid,
            like: false,
            dislike: true
        }, { new: true })

        const newLikecounter = carexists.liked - 1
        const newDislikecounter = carexists.disliked + 1

        await carmodel.findByIdAndUpdate(req.body.bikeid, { liked: newLikecounter, disliked: newDislikecounter }, { new: true })

        return res.status(201).json({
            message: "disliked"
        })
    }

    const like = await likedislike.create({
        userid: userid,
        bikeid: req.body.bikeid,
        dislike: true
    })

    const newDislikecounter = carexists.liked + 1
    await carmodel.findByIdAndUpdate(req.body.bikeid, { disliked: newDislikecounter }, { new: true })

    return res.status(201).json({
        message: "disliked"
    })
}