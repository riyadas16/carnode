const express=require('express');
const userrouter=require('./routes/userrouter')
const carrouter=require('./routes/carrouter')
const cartyperouter=require('./routes/cartyperouter')
const likedislikeroute = require('./routes/likedislikeroute');
const commentrouter = require('./routes/commentrouter');
const connect=require('./server.js')
const app=express()
const dotenv = require("dotenv");

dotenv.config({path:'./config.env'})
connect()



app.use(express.json())
app.use('/api/v1/user',userrouter)
app.use('/',carrouter)
app.use('/cartype',cartyperouter)
app.use('/likedislike',likedislikeroute)
app.use('/comment',commentrouter)

PORT=process.env.PORT || 3001
app.listen(PORT, ()=>{
    console.log('Listening',PORT)
})