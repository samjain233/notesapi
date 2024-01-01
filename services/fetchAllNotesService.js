const User = require("../models/User");

const fetchAllNotesService = async (req, res) => {
  try {
    const userId = req.userId;
    const userData = await User.findById(userId)
      .populate({
        path: "notes",
        select: "title content createdAt updatedAt",
      })
      .select({
        email: 1,
        username: 1,
        notes: 1,
      });
    const { username, email, notes } = userData;
    return res.status(200).json({
      status: true,
      message: `fetch notes sucessfull`,
      data: { username, email, notes },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: false, error: "Internal Server Error" });
  }
};

module.exports = fetchAllNotesService;
