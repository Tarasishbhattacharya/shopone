const jwt=require("jsonwebtoken")
const User=require("../model/usermodel")


const isAuthenticateduser=async(req,res,next)=>{
    if(!req.headers.authorization){
        return res.send(400).send("Token is not valid")
    }
    
    if(!req.headers.authorization.startsWith("Bearer ")){
        return res.send(400).send("Token is not valid") 
    }
    const token=req.headers.authorization.split(" ")[1];
    if(!token){
        return res.status(400).send({message : "Authorization token not found or incorrect"})
    }
    const decodedata= await jwt.verify(token,process.env.JWT_SECRET_KEY);
    req.user=await User.findById(decodedata.id)
   next()
}
module.exports=isAuthenticateduser
// exports.authorizeRole=(...roles)=>{
//    return (req,res,next)=>{
//        if(!roles.includes(req.user.role)){
//         //    return res.status(400).json({
//         //        message:"Not allowed to access"
//         //    })
//         return 
//        }
//        next()
//    }
   
// }