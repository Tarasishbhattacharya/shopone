const express=require("express");
 const app=express();
 const errorMiddleware=require("./middleware/error");
app.use(express.json())
// route import 
const product=require("./routes/productroute");
const user=require("./routes/userroutes")
app.use("/api/v1",product);
app.use("/api/v1",user)
// middleware for error
app.use(errorMiddleware)

 module.exports=app;
