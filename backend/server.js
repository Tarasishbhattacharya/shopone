const app=require("./app");
const dotenv=require("dotenv")
const connectdatabase=require("./config/database")

dotenv.config({path:"backend/config/config.env"})
// connect to database
connectdatabase()

const server=app.listen(process.env.PORT,()=>{
    console.log(`server is working on http://localhost:${process.env.PORT}`)
})

// unhandled promise rehection
process.on("unhandledRejection",err=>{
    console.log(`Error:${err.message}`);
    console.log("shutting down the server")
    server.close(()=>{
        process.exit(1)
    })
})