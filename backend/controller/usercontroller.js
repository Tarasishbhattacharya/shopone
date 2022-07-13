// const ErrorHandler = require("../utils/errorhandler");
// const catchasyncerror=require("../middleware/catchasyncerror");
const User=require("../model/usermodel");
const {validationResult}=require("express-validator");
const sendemail = require("../utils/sendEmail");

exports.registerUser=async(req,res,next)=>{
    const errors = validationResult(req.body);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const{name,email,password}=req.body;
    const user=await User.create({
        name,email,password,
        avatar:{
            public_id:"this is a simple id",
            url:"profilepicurl"
        }
    })
    const token =user.JWTtoken()
    res.status(201).json({
        success:true,
        token
    })
}
// login
exports.loginUser=async(req,res,next)=>{
    const{email,password}=req.body;
    if(!email || !password){
        res.status(404).json({
            message:"please enter email and password"
        })
    }
    const user= await User.findOne({email}).select("+password");
    if(!user){
        res.status(401).json({
            message:"Invalid email and password"
        })
    }
    const isPasswordmatch= await user.comparePassword(password)
    if(!isPasswordmatch){
        res.status(401).json({
            message:"Invalid email and password"
        })
    }
    const token =user.JWTtoken()
    res.status(200).json({
        success:true,
        token
    })
}
// forgot password
exports.forgotPassword=async(req,res,next)=>{
   const user=User.findOne({email:req.body.email});
   if(!user){
       res.status(404).json({
           message:"user not found"
       })
   }
//    get reset password token
const resetToken=user.getResetPasswordToken();
await  user.save({validateBeforeSave:false})

const resetPasswordurl=`${req.protocol}//${req.get("host")}/password/reset/${resetToken}`;
const message=`your password reset token is -\n\n ${resetPasswordurl} `

try {
    await sendemail({
       email: user.email,
       subject:"Ecommerce ",
       message:message
    })
    res.status(200).json({
        success:true,
        message:`Email sent to ${ user.email}`
    })

} catch (error) {
     user.resetPasswordToken=undefined;
      user.resetPasswordExpire=undefined;
      await  user.save({validateBeforeSave:false})
     return res.json({
         message:error.message
     })
}
}