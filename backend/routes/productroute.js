const express=require("express");
const { getAllproducts, createProduct, updateProduct, deleteProduct, getproductdetails } = require("../controller/productcontroller");
const isAuthenticateduser=require("../middleware/auth");
const router=express.Router()

router.route("/products").get(getAllproducts)
router.route("/products/new").post(isAuthenticateduser,createProduct)
router.route("/products/:id").put(isAuthenticateduser,updateProduct).delete(isAuthenticateduser,deleteProduct).get(getproductdetails);

module.exports=router;