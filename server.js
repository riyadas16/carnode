const mongoose=require('mongoose')

const connect=async ()=>{
try {
    mongoose.connect(process.env.DATABASE_CONN)
    console.log("connted")
} catch (error) {
    console.log("not connected");
}}

module.exports=connect