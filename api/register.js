const { MongoClient } = require("mongodb");

const uri = process.env.MONGO_URI;

let client;

async function connectDB() {
  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
  }

  return client;
}

module.exports = async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({
      message: "Method not allowed"
    });
  }

  try {

    const client = await connectDB();

    const db = client.db("eva_earning");

    const users = db.collection("users");


    const {
      name,
      phone,
      password
    } = req.body;


    if (!name || !phone || !password) {

      return res.status(400).json({
        message: "All fields required"
      });

    }


    const existingUser = await users.findOne({
      phone: phone
    });


    if (existingUser) {

      return res.status(400).json({
        message: "Account already exists"
      });

    }


    await users.insertOne({

      name,
      phone,
      password,

      wallet: 0,
      reward: 0,
      ads: 5,
      watchedAds: 0,

      plan: "FREE PLAN",

      createdAt: new Date()

    });


    return res.json({

      success: true,

      message: "Account created successfully"

    });


  } catch (error) {

    console.log(error);

    return res.status(500).json({

      success: false,

      message: error.message

    });

  }

};
