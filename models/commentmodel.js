const mongoose = require('mongoose');


const commentSchema = new mongoose.Schema({
    userid:{
        type:mongoose.Schema.ObjectId,
        ref:"userid",
        required:true
    },
    bikeid:{
        type:mongoose.Schema.ObjectId,
        ref:"bikeid",
        required:true},

    comment: {
        type: "string",
        required: true,
    }
})
const commentuser=mongoose.model('Comment',commentSchema)
module.exports=commentuser