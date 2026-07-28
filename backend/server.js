// =================================
// EVA EARNING BACKEND SERVER
// =================================

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";


dotenv.config();


const app = express();


// Middleware
app.use(cors());

app.use(express.json());




// Test API

app.get("/", (req,res)=>{

    res.json({
        message:"Eva Earning Backend Running 🚀"
    });

});





// MongoDB Connection

mongoose.connect(process.env.MONGO_URI)

.then(()=>{

    console.log("MongoDB Connected ✅");

})

.catch((error)=>{

    console.log(
        "MongoDB Error:",
        error.message
    );

});






// Server Start

const PORT = process.env.PORT || 5000;


app.listen(PORT,()=>{

    console.log(
        `Server running on port ${PORT}`
    );

});
