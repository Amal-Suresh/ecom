const mongoose = require('mongoose')

const orderSchema =mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    address:{
        type:Object,
        required:true
    },
    location:{
        type:String,
        // required:true
    },
    product:{
        type:Array,
        required:true
    },
    totalAmount:{
        type:Number,
        required:true
    },
    pickupDate:{
        type:String
    },
    pickupTime:{
        type:String
    },
    payment:{
        type:String,
        required:true
    },
    paymentStatus:{
        type:String,
        required:true
    },
    orderStatus:{
        type:String,
        required:true
    },
    orderDate:{
       type:Date,
       required:true
    }
})
module.exports = mongoose.model("order",orderSchema)