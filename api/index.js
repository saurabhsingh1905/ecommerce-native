const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

const jwt = require("jsonwebtoken");

const app = express();
const port = 8000;

const cors = require("cors");
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect(
  "mongodb+srv://singhsaurabh1905:MkXllMq7lwNPXwSw@cluster0.2imwdtq.mongodb.net/",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
).then(()=>{
    console.log("Connected to MongoDB")
}).catch((err)=> {
    console.log("Error connecting to MongoDB",err)
})

app.listen(port,()=> {
    console.log("Server is running in port 8000")
})
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

//ENDPOINT TO REGISTER IN THE APP=====================================================
const User = require("./models/user")
const Order = require("./models/order")

//Function to send verification email to the user
const sendVerificationEmail = async (email,verificationToken)=> {

  //create a nodemailer transport 
  const transporter = nodemailer.createTransport({
    //configure the email service
    service:"gmail",
    auth:{
      user:"singhsaurabh1905@gmail.com",
      pass:"lxlwflfbuzmwngzi"
    }
  })

  //compose the email message 
const mailOptions = {
  from:"amazon.com",
  to:email,
  subject:"Email Verification for Amazon Registration",
  text:`Please click the following link to verify your email : http://localhost:8000/verify/${verificationToken}`
};

   //SEND THE EMAIL
   try {
    await transporter.sendMail(mailOptions)
        } catch (error) {
          console.log("Error sending verification Email",error)
        }
}

app.post("/register",async(req,res)=>{
  try {
    const {name,email,password} = req.body;
    // console.log(req.body)

    //check if the email already exist or not
    const existingUser = await User.findOne({email});
    if(existingUser){
      return res.status(400).json({message:"Email already exists"})
    }
    //create new user
    const newUser = new User({name,email,password});

    //generate & store the verification token
    newUser.verificationToken = crypto.randomBytes(20).toString("hex");

    //save the user to the database
    await newUser.save()

    //send verification email to the user
    sendVerificationEmail(newUser.email,newUser.verificationToken)
  } catch (error) {
    console.log("error registering the user",error)
    res.status(500).json({message: "Registration failed"})
  }
})

//ENDPOINT TO VERIFY THE EMAIL=====================================================
app.get("/verify/:token",async(req,res)=>{
  try {
    const token = req.params.token ;

    //Find the user  with the given verification token
    const user = await User.findOne({verificationToken:token});
    if(!user){
      return res.status(404).json({message:"Invalid verification token"})
    }
    
    //Mark the user as verified
    user.verified = true;
    user.verificationToken= undefined;

    await user.save()

    res.status(200).json({message:"Email verified successfully"})
  } catch (error) {
    res.status(500).json({message:"Email verification failed"})
  }
})
