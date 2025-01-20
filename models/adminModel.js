const mongoose = require('mongoose')


const adminSchema = new  mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:'admin',
        required:false
    },
    password:{
        type:String,
        required:true,

    }},
    {timestamps:true}
)

const adminModel = mongoose.model('admin', adminSchema)
module.exports = adminModel