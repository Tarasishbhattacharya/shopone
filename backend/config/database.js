const mongoose=require("mongoose");
const connectdatabase=()=>{
 return mongoose.connect(`${process.env.DB_URI}`).then(()=>{
     console.log("connected")
 })
}
module.exports=connectdatabase