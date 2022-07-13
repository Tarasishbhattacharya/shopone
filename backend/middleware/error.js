const ErrorHandler=require("../utils/errorhandler");
module.exports=(err,req,res,next)=>{
    err.statuscode=err.statuscode||500;
    err.message=messageerr.message || "Inrternal server errow"

    res.status(statuscode).json({
        success:false,
        message:err.message,
    })
}