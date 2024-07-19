const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        // required:[true,'user name is required']
    },
    email:{
        type:String,
        required:[true,'email is required'],
        unique:true
    },
    password:{
        type:String,
        required:[true,'Password is required'],
        length:10
    },
    address:{
        type:Array,
    },
    phone:{
        type:String,
        required:[true,'Ph.no. is required']
    },
    usertype:{
        type:String,
        // required:[true,'usertype is required'],/
        enum:['client','admin','vendor','driver']
    },
    profile:{
        type:String,
        default:'https://www.pngwing.com/en/search?q=user'
    }

},{timestamps:true});

module.exports = mongoose.model('User',userSchema);
