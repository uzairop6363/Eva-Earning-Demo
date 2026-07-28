const { MongoClient } = require("mongodb");

const uri = process.env.MONGO_URI;


export default async function handler(req, res) {


  if(req.method !== "GET"){

    return res.status(405).json({

      message:"Method not allowed"

    });

  }



  try{


    const client =
    new MongoClient(uri);


    await client.connect();



    const db =
    client.db("eva_earning");



    const withdraws =
    db.collection("withdraws");



    const phone =
    req.query.phone;



    if(!phone){


      return res.status(400).json({

        message:"Phone required"

      });


    }




    const history =
    await withdraws
    .find({

      userPhone: phone

    })
    .sort({

      createdAt:-1

    })
    .toArray();





    await client.close();




    res.json({

      success:true,

      withdraws:history

    });




  }catch(error){



    res.status(500).json({

      success:false,

      message:error.message

    });



  }



}
