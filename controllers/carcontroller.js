const car = require('../models/carmodel')


exports.insert = async (req, res) => {
    const userid=req.user
    // console.log(userid)
    const cars = await car.create({
        bikename: req.body.bikename,
        bikemodal: req.body.bikemodal,
        price: req.body.price, 
        biketype: req.body.biketype,
        userid:userid._id
    })
    res.status(200).json({ cars })
}

exports.getall = async (req, res) => {
    const cars = await car.find()
    res.status(200).json({ cars })
}
exports.getbyid = async (req, res) => {
    const cars = await car.findById(req.params.id)
    res.status(200).json({ cars })
}

exports.update = async (req, res) => {
    const cars = await car.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(200).json(cars)
}
exports.delete = async (req, res) => {
    const cars = await car.findByIdAndDelete(req.params.id)
    res.status(200).json({ message: "deleted successfully" })
}
exports.getbikebybiketypes = async (req, res) => {
    const getbiketype = await car.find({ biketype: req.params.id })
    res.status(200).json({ getbiketype })
}
exports.recentbikes = async (req, res) => {
    try {
        const mostrecentbike = await car.aggregate([{ $sort: { createdAt: -1 } }, { $limit: Number(req.params.id) }])
        res.status(200).json({ mostrecentbike })
    }

 catch (error) {
    res.status(400).json( {message:"doesnot showing error"})
}}


