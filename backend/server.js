// =================================
// EVA EARNING BACKEND SERVER
// =================================

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.js";
import withdrawRoutes from "./routes/withdraw.js";


dotenv.config();


const app = express();


// =====================
// MIDDLEWARE
// =====================

app.use(cors());

app.use(express.json());




// =====================
// TEST ROUTE
// =====================

app.get("/", (req,res)=>{

    res.json({

        message:"Eva Earning Backend Running 🚀"

    });

});




// =====================
// API ROUTES
// =====================

app.use(
    "/api/auth",
    authRoutes
);


app.use(
    "/api/withdraw",
    withdrawRoutes
);





// =====================
// MONGODB CONNECTION
// =====================

mongoose.connect(
    process.env.MONGO_URI
)

.then(()=>{

    console.log(
        "MongoDB Connected ✅"
    );

})

.catch((error)=>{

    console.log(
        "MongoDB Error:",
        error.message
    );

});





// =====================
// SERVER START
// =====================

const PORT =
process.env.PORT || 5000;


app.listen(PORT,()=>{


    console.log(

        `Eva Backend running on port ${PORT}`

    );


});
