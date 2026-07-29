import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI;

export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed"
    });
  }

  try {

    const {
      phone,
      wallet,
      reward,
      ads,
      watchedAds,
      plan
    } = req.body;

    const client = new MongoClient(uri);

    await client.connect();

    const db = client.db("eva_earning");

    await db.collection("users").updateOne(
      { phone: phone },
      {
        $set: {
          wallet,
          reward,
          ads,
          watchedAds,
          plan
        }
      }
    );

    await client.close();

    res.json({
      success: true
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

}
