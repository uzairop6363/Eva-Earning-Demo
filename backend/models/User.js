import mongoose from "mongoose";


const userSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },


    phone:{
        type:String,
        required:true,
        unique:true
    },


    password:{
        type:String,
        required:true
    },


    wallet:{
        type:Number,
        default:0
    },


    reward:{
        type:Number,
        default:0
    },


    adsWatched:{
        type:Number,
        default:0
    },


    plan:{
        type:String,
        default:"FREE PLAN"
    },


    lastWithdraw:{
        type:Date,
        default:null
    },


    createdAt:{
        type:Date,
        default:Date.now
    }


});


export default mongoose.model(
    "User",
    userSchema
);
