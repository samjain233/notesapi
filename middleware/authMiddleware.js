const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    const secretKey = process.env.JWT_SECRET;
    if (!token) {
      return res
        .status(401)
        .json({ status: false, error: "Unauthorized - No token provided" });
    }

    const trimmedToken = token.substring(7);
    jwt.verify(trimmedToken, secretKey, (err, data) => {
      if (err) {
        return res
          .status(403)
          .json({ status: false, error: "Forbidden - Invalid token" });
      }
      req.userId = data._id;
      next();
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: false, error: "Internal Server Error" });
  }
};

module.exports = authMiddleware;
