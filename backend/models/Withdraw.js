import mongoose from "mongoose";


const withdrawSchema = new mongoose.Schema({


    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },


    name:{
        type:String,
        required:true
    },


    phone:{
        type:String,
        required:true
    },


    method:{
        type:String,
        enum:[
            "EasyPaisa",
            "JazzCash"
        ],
        required:true
    },


    amount:{
        type:Number,
        required:true
    },


    status:{
        type:String,
        enum:[
            "Pending",
            "Completed",
            "Rejected"
        ],
        default:"Pending"
    },


    adminNote:{
        type:String,
        default:""
    },


    createdAt:{
        type:Date,
        default:Date.now
    },


    completedAt:{
        type:Date,
        default:null
    }


});



export default mongoose.model(
    "Withdraw",
    withdrawSchema
);
