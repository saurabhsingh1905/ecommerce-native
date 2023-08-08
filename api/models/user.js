const mongoose = require ("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    // as soon AS user register we will send verification email to user then we will make is verified to be true 
    verified:{
        type:Boolean,
        required:true
    },
    verificationToken:String,
    addresses:[
        {
            name:String,
            mobileNo:String,
            houseNo:String,
            street:String,
            landmark:String,
            city:String,
            country:String,
            postalCode:String 

        }
    ],
    orders:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Order"
        }
    ],
    createdAt:{
        type:Date,
        default:Date.now,
    }
})

const User = mongoose.model("User",userSchema);
module.exports = User