const { MongoClient } = require("mongodb");

const uri = process.env.MONGO_URI;


export default async function handler(req, res) {


  if(req.method !== "POST"){

    return res.status(405).json({
      message:"Method not allowed"
    });

  }


  try{


    const client = new MongoClient(uri);

    await client.connect();


    const db = client.db("eva_earning");

    const users = db.collection("users");


    const {
      phone,
      password
    } = req.body;



    if(!phone || !password){

      return res.status(400).json({
        message:"Phone and password required"
      });

    }



    const user = await users.findOne({

      phone:phone,

      password:password

    });



    if(!user){

      return res.status(401).json({

        message:"Invalid phone or password"

      });

    }



    await client.close();



    res.json({

      success:true,

      message:"Login successful",

      user:user

    });



  }catch(error){


    res.status(500).json({

      success:false,

      message:error.message

    });


  }


}
