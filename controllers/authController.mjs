

import express, { request } from 'express'
import nodemailer from 'nodemailer'
import bodyParser from 'body-parser'
import User from '../models/User.mjs'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export  const registerController=async(req,res)=>{
    const {name,email,password}=req.body
    try{
    const alreadyexists=await User.findOne({email})
    if(alreadyexists){
        return res.status(200).send({
            success:false,
            message:'Already Regitered with this mail'

        })}
    const userexists=await User.findOne({name}) 
    if (userexists){
      return res.status(200).send({
        success:false,
        message:'User name Already exists!'

    })
    }   
    const hashedpassword=await bcrypt.hash(password,10)
    const user=await new User({
                name,
                email,
                password:hashedpassword
            }).save();
res.status(201).send({
    success:true,
    message:'user registered Successfully!',
    user
})
    }
    catch(e){
        console.log(e)
        res.status(500).send({
            success:false,
            message:'error in registration',
            error
        })
    }
}
export const loginController=async(req,res)=>{
  const {email,password}=req.body
  const user=await User.findOne({email})
  if(!user){
    return res.status(409).send({
        success:false,
        message:"No user Exists with this mail!"
    })
  }
  const match=await bcrypt.compare(password,user.password)
  if(match){
   const token= await jwt.sign({name:user.name},"secretkey",{expiresIn:'7d'})
   res.status(201).send({
    success:true,
    message:"Login Successfull!",
    user:{
        name:user.name
    },
    jwtToken:token

   })
}
else{
    res.status(409).send({
        success:false,
        message:"Invalid Password!"
    })
} 

}
//MIDDLE WARE
export const middleware=async(req,res,next)=>{
let jwtToken;
const authHeader=req.headers['authorization']
if (authHeader!==undefined){
  jwtToken=authHeader.split(" ")[1];
  if(jwtToken===undefined){
    res.status(401);
    res.send({success:false,message:"invalid jwt"})
}
else{
  jwt.verify(jwtToken,"secretkey",async(error,payload)=>{
    if(error){
      res.status(401).send({success:false,message:"wrong token"})
    }
    else{
      req.name=payload.name;
      next();
    }
  })
}

}
else{
  res.status(401).send({success:false,message:"No Token"})
}

}
//GET SCORE CONTROLLER
export const getScoreController=async(req,res)=>{
const {name}=req
const result=await User.findOne({name})
const max=await User.find().sort({topScore:-1}).limit(1)
console.log(max[0].name);
if(!result){
return res.status(200).send({success:false,message:"no user find"})
}
if(!max){
  return res.status(200).send({success:false,message:"no max find"})
}

res.status(200).send({success:true,message:result.topScore,leader:max[0].name})


}
export const scoreController = async (req, res) => {
  try {
    const { topScore } = req.body;
    const {name}=req
    console.log(req.body);

    const result = await User.updateOne(
      {  name:name },
      { $set: {topScore:topScore } }
    );

    if (result) {
      return res.status(201).send({
        success: true,
        message: "Updated Successfully!",
      });
    } else {
      return res.status(500).send({
        success: false,
        message: "Not updated!",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};



const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'gvtejeshreddy111@gmail.com',
    pass: 'dnjy uubm kynd dxbj ', 
  },
});

export const otp=(req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ success: false, message: 'Email is required' });
  }

  const otp = generateOTP();

  const mailOptions = {
    from: 'gvtejeshreddy111@gmail.com', // Sender email address
    to: email,
    subject: 'OTP Verification',
    text: `Your OTP is: ${otp}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).json({ success: false, message: 'Error sending OTP' });
    }

    console.log('Email sent:', info.response);

    // You may want to store the OTP in a database or in-memory store for verification on the frontend
    res.status(200).json({ success: true, message: 'OTP sent successfully', otp });
  });
};

