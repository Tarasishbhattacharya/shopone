const express=require("express");
const { registerUser, loginUser, forgotPassword } = require("../controller/usercontroller");
const router=express.Router()
const {body}=require("express-validator")


router.route("/register").post(body("email").isEmail(),registerUser);
router.route("/login").post(loginUser)
router.route("/password/forgot").post(forgotPassword)

module.exports=router