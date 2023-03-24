const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    userid: {
        type: mongoose.Schema.ObjectId,
        ref: "userid",
        required: true
    },
    bikename: {
        type: "string",
        required: [true, "please add bikename"],
        unique: true
    },
    bikemodal: {
        type: "string",
        required: true,
        unique: true
    },
    price: {
        type: "string",
        required: true
    },
    biketype: {
        type: mongoose.Schema.ObjectId,
        ref: "biketype",
        required: true
    },
    liked: {
        type: Number,
        default: 0
    },
    disliked: {
        type: Number,
        default: 0
    }
},
    { timestamps: true }
)

const car = mongoose.model('Car', carSchema)

module.exports = car