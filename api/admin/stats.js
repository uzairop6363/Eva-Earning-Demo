const { MongoClient } = require("mongodb");

const uri = process.env.MONGO_URI;

module.exports = async function handler(req, res) {

  if (req.method !== "GET") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed"
    });
  }

  const client = new MongoClient(uri);

  try {

    await client.connect();

    const db = client.db("eva_earning");

    const users = db.collection("users");
    const withdraws = db.collection("withdraws");

    const totalUsers = await users.countDocuments();

    const pending = await withdraws.countDocuments({
      status: "Pending"
    });

    const approved = await withdraws.countDocuments({
      status: "Approved"
    });

    const rejected = await withdraws.countDocuments({
      status: "Rejected"
    });

    const approvedAmount = await withdraws.aggregate([
      {
        $match: {
          status: "Approved"
        }
      },
      {
        $group: {
          _id: null,
          total: {
            $sum: "$amount"
          }
        }
      }
    ]).toArray();

    res.json({
      success: true,
      stats: {
        totalUsers,
        pending,
        approved,
        rejected,
        totalApprovedAmount:
          approvedAmount.length
            ? approvedAmount[0].total
            : 0
      }
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message
    });

  } finally {

    await client.close();

  }

};
