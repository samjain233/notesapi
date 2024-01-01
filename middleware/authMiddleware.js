const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    const secretKey = process.env.JWT_SECRET;

    //checking for token -------------------------------------------
    if (!token) {
      return res
        .status(401)
        .json({ status: false, error: "Unauthorized - No token provided" });
    }
    //------------------------------------------------------------

    const trimmedToken = token.substring(7);

    //token and user validation ---------------------------------------------------
    jwt.verify(trimmedToken, secretKey, async (err, data) => {
      if (err) {
        return res
          .status(403)
          .json({ status: false, error: "Forbidden - Invalid token" });
      }

      //checking existance of user in database
      const user = await User.findById(data._id);
      if (!user) {
        return res
          .status(403)
          .json({ status: false, error: "Forbidden - Invalid token" });
      }

      req.userId = user._id;
      next();
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: false, error: "Internal Server Error" });
  }
};

module.exports = authMiddleware;
