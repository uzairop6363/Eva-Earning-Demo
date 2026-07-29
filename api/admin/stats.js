module.exports = function handler(req, res) {

  if (req.method !== "GET") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed"
    });
  }

  res.status(200).json({
    success: true,
    message: "Eva Earning Admin Stats API Working",
    stats: {
      totalUsers: 0,
      pendingWithdrawals: 0,
      approvedWithdrawals: 0,
      rejectedWithdrawals: 0,
      totalApprovedAmount: 0
    }
  });

};
