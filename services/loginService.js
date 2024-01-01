const { verifyPassword } = require("../lib/hash");
const { createToken } = require("../lib/token");
const User = require("../models/User");

const loginService = async (req, res) => {
  try {
    const { email, password } = req.body;

    //input validation ----------------------------------------
    const requiredFields = ["email", "password"];

    //missing field check
    const missingFields = requiredFields.filter(
      (field) => !(field in req.body)
    );
    if (missingFields.length > 0) {
      return res.status(400).json({
        status: false,
        error: `Missing required fields: ${missingFields.join(", ")}`,
      });
    }

    // Validate data types
    if (typeof email !== "string" || typeof password !== "string") {
      return res
        .status(400)
        .json({ status: false, error: "All fields must be of type string." });
    }

    //check for email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ status: false, error: "Invalid email format." });
    }
    //----------------------------------------------------------

    //check if user exists ----------------------------------------
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ status: false, error: "User doesn't exists." });
    }
    //---------------------------------------------------------------

    //verifying password ------------------------------------------------
    const hash = user.hash;
    const verified = await verifyPassword(password, hash);
    if (!verified) {
      return res
        .status(401)
        .json({ status: false, error: "Invalid email or password." });
    }
    //---------------------------------------------------------------

    //getting auth token --------------------------------------------
    const userId = user._id;
    const token = await createToken(userId);
    //---------------------------------------------------------------

    return res.status(201).json({
      status: true,
      message: `logged in successfull :- ${email}.`,
      token: token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: false, error: "Internal Server Error" });
  }
};

module.exports = loginService;
