import express from "express";
import Withdraw from "../models/Withdraw.js";

const router = express.Router();


// ============================
// GET ALL WITHDRAW REQUESTS
// ============================

router.get("/withdraws", async(req,res)=>{

try{

const requests = await Withdraw
.find()
.sort({
createdAt:-1
});


res.json(requests);


}catch(error){

res.status(500).json({

message:error.message

});

}

});





// ============================
// UPDATE WITHDRAW STATUS
// ============================

router.put(
"/withdraw/:id",
async(req,res)=>{

try{


const {
status
}=req.body;



const withdraw =
await Withdraw.findById(
req.params.id
);



if(!withdraw){

return res.status(404).json({

message:"Withdraw not found"

});

}




withdraw.status=status;



if(status==="Completed"){

withdraw.completedAt =
new Date();

}



await withdraw.save();



res.json({

message:
"Withdraw status updated",

withdraw

});



}catch(error){


res.status(500).json({

message:error.message

});


}


});



export default router;
