const mongoose=require("mongoose");

const productschema= new mongoose.Schema({
    name:{type:String,
       required:[true,"please enter product name"],
       trim:true
    },
    description:{
        type:String,
       required:[true,"please enter product description"]
    },
    price:{
        type:Number,
        required:[true,"please enter product price"],
        maxLength:[8,"price cannot exceed 8 figure"]
    },
    rating:{
        type:Number,
        default:0
    },
    images:[
        {
            public_id:{
                type:String,
                required:true,
            },
            url:{
                type:String,
                required:true,
            }
        }
    ],
    category:{
        type:String,
        required:[true,"please enter product category"],
    },
    stock:{
        type:String,
        required:[true,"please enter product stock"],
        maxLength:[4,"stock cannot excxeed 4 figure"],
        default:1
    },
    numofReview:{
        type:Number,
        default:0
    },
    reviews:[

        {
            name:{
                type:String,
                required:true
            },
            rating:{
                type:Number,
                required:true,
            },
            comment:{
                type:String,
                required:true
            }
        }
    ],
    createdAt:{
        type:Date,
        default:Date.now()
    }
})
const Products=mongoose.model("product",productschema)
module.exports=Products