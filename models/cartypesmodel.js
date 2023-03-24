const mongoose = require('mongoose');


const cartypesSchema = new mongoose.Schema({

    cartypes: {
        type: "string",
        required: true,
    }
})
const cartypes=mongoose.model('Cartype',cartypesSchema)
module.exports=cartypes