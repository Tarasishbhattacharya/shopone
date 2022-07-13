
const Products=require("../model/productmodel");
const ErrorHandler = require("../utils/errorhandler");
const catchasyncerror=require("../middleware/catchasyncerror");
const ApiFeature = require("../utils/apifeature");

// create product
exports.createProduct=catchasyncerror(async(req,res,next)=>{
    const product=await Products.create(req.body);
    res.status(201).json({
        success:true,
        product
    })
})



// get all
exports.getAllproducts=catchasyncerror(async(req,res)=>{
    // const products=await Products.find();
    const resultperpage=5;
   const apiFeature=new  ApiFeature(Products.find(),req.query.keyword).search().filter().pagination(resultperpage);
   const products=await apiFeature.query;
    res.status(200).json({ success:true,
        products})
})


// get single product

exports.getproductdetails=catchasyncerror(async(req,res,next)=>{
    const product=await Products.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler("product not found",404))
    }
    res.status(200).json({
        success:true,
        product
    })

})

// updat product....Admin
exports.updateProduct=catchasyncerror(async(req,res,next)=>{
    let product=Products.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler("product not found",404))
    }
    product=await Products.findByIdAndUpdate(req.params.id,req.body,{new:true})
    res.status(200).json({
        success:true,
        product
    })
})

// delete
exports.deleteProduct=catchasyncerror(async(req,res)=>{
    const product=await Products.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler("product not found",404))
    }
    await product.remove()
    res.status(200).json({
        success:true,
        message:"product deleted successfully"
    })
})
