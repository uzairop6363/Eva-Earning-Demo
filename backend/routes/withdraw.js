import express from "express";
import User from "../models/User.js";
import Withdraw from "../models/Withdraw.js";


const router = express.Router();


// =======================
// CREATE WITHDRAW REQUEST
// =======================

router.post("/", async(req,res)=>{

try{


const {
userId,
name,
phone,
method,
amount
}=req.body;



const user = await User.findById(userId);


if(!user){

return res.status(404).json({
message:"User not found"
});

}



// Free Plan Limit

if(user.plan==="FREE PLAN" && amount > 50){

return res.status(400).json({

message:
"Free Plan me daily withdrawal limit PKR 50 hai"

});

}



// Balance Check

if(user.wallet < amount){

return res.status(400).json({

message:
"Insufficient wallet balance"

});

}



// 24 Hour Check

if(user.lastWithdraw){


const difference =
Date.now() - new Date(user.lastWithdraw).getTime();


const hours =
difference / (1000*60*60);



if(hours < 24){

return res.status(400).json({

message:
"Next withdrawal 24 hours ke baad allowed hai"

});

}


}




// Save Withdraw

const withdraw =
await Withdraw.create({

userId:user._id,
name,
phone,
method,
amount

});




// Deduct Balance

user.wallet -= amount;

user.lastWithdraw = new Date();

await user.save();





res.json({

message:
"Withdraw request submitted",

withdraw

});



}catch(error){


res.status(500).json({

message:error.message

});


}


});



export default router;
