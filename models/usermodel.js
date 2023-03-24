const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt=require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: 'string',
        required: [true, "please tell your name here"]

    },
    email:
    {
        type: 'string',
        required: [true, "please tell your email here"],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, "please tell your email here"]
    },
    photo: String,
    password: {
        select:false,
        minlength: 8,
        type: 'string',
        required: [true, "please tell your password here"]
    },
    confirmpassword: {
        type: 'string',
        required: true,
        validate: {
            validator: function (el) {
                return el === this.password;
            },
            message:'Password are not same'
        }
    },
    passwordChangeAt:Date

    


})

userSchema.pre('save', async function (next){

    if(!this.isModified('password'))return next()

    this.password = await bcrypt.hash(this.password,12)
    this.confirmpassword=undefined

})

userSchema.methods.correctPassword=async function (candidatePassword,userpassword) {
    return await bcrypt.compare(candidatePassword,userpassword)
}

userSchema.methods.changedPasswordAfter=async function (JWTTimestamps) {
if(this.passwordChangeAt)
{
    const changeTimestamp=parseInt(this.passwordChangeAt.getTime()/1000,10)
   return JWTTimestamps < changeTimestamp;
}
//false means not changed
return false;
}


const user = mongoose.model('User', userSchema)
module.exports = user