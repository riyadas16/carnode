const mongoose=require('mongoose');


const likedislikeschema= new mongoose.Schema({
    userid:{
        type:mongoose.Schema.ObjectId,
        ref:"userid",
        required:true
    },
    bikeid:{
        type:mongoose.Schema.ObjectId,
        ref:"bikeid",
        required:true
    },
    like:{
        type:Boolean
    },
    dislike:{
        type:Boolean
    }
})

const likedislike=mongoose.model('LikeDislike',likedislikeschema)

module.exports=likedislike