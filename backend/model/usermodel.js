const mongoose=require("mongoose");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const crypto=require("crypto")

const userschema=new mongoose.Schema({
    name:{type:String,
        required:[true,"Please enter your name"],
        maxLength:[30,"name cannot exceed 30 character"],
        minLength:[4,"name should have 4 character"],
    },
    email:{
        type:String,
        required:[true,"Please enter your email"],
        unique:true,
    },
    password:{
        type:String,
        required:[true,"Please enter your password"],
        minLength:[8,"password shold be greater than 8 character"],
        select:false
    },
    avatar:{

            public_id:{
                type:String,
                required:true,
            },
            url:{
                type:String,
                required:true,
            }
    },
    role:{
        type:String,
        default:"user"
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date,

})
userschema.pre("save",async function(next){
    if(!this.isModified()){
        next()
    }
    this.password= await bcrypt.hash(this.password,10)
})

// jwt token
userschema.methods.JWTtoken=function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET_KEY,{
        expiresIn:process.env.JWT_EXPIRE
    })
}
// compare password
userschema.methods.comparePassword=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}
// Generating password to reset token
userschema.methods.getResetPasswordToken=function(){
// generating token
const resettoken=crypto.randomBytes(20).toString("hex");
// hashing and adding to user schema
this.resetPasswordToken=crypto.createHash("sha256").update(resettoken).digest("hex");
this.resetPasswordExpire=Date.now()+15*60*1000;
return resettoken
}
const User=mongoose.model("user",userschema)
module.exports=User;