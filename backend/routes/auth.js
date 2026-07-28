import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";


const router = express.Router();


// =====================
// REGISTER
// =====================

router.post("/register", async(req,res)=>{

try{

const {
name,
phone,
password
}=req.body;



const existUser = await User.findOne({
phone
});


if(existUser){

return res.status(400).json({
message:"Phone number already registered"
});

}



const hashedPassword =
await bcrypt.hash(password,10);



const user = await User.create({

name,
phone,
password:hashedPassword

});



res.json({

message:"Account Created Successfully",
userId:user._id

});



}catch(error){

res.status(500).json({
message:error.message
});

}

});





// =====================
// LOGIN
// =====================

router.post("/login", async(req,res)=>{


try{


const {
phone,
password
}=req.body;



const user =
await User.findOne({phone});



if(!user){

return res.status(400).json({
message:"Account not found"
});

}



const match =
await bcrypt.compare(
password,
user.password
);



if(!match){

return res.status(400).json({
message:"Wrong password"
});

}



const token =
jwt.sign(
{
id:user._id
},
process.env.JWT_SECRET,
{
expiresIn:"7d"
}
);



res.json({

message:"Login Successful",

token,

user:{
id:user._id,
name:user.name,
phone:user.phone,
wallet:user.wallet,
plan:user.plan
}

});


}catch(error){

res.status(500).json({
message:error.message
});

}


});


export default router;
