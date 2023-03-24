const car = require('../models/carmodel')
const cartypes = require('../models/cartypesmodel')

exports.insert = async(req,res) => {

    const createtype = await cartypes.create(req.body)
    res.status(200).json( {createtype} )
}

exports.getalltype = async(req, res) => {
    const gettype = await cartypes.find()
    res.status(200).json({gettype})
}

