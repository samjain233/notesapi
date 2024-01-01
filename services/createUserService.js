const hashPassword = require("../lib/hash");
const { createToken } = require("../lib/token");
const User = require("../models/User");

const createUserService = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    //input validation-------------------------------------------
    const requiredFields = ["username", "email", "password"];
    const missingFields = requiredFields.filter(
      (field) => !(field in req.body)
    );
    //check for missing field
    if (missingFields.length > 0) {
      return res.status(400).json({
        status: false,
        error: `Missing required fields: ${missingFields.join(", ")}`,
      });
    }

    // Validate data types
    if (
      typeof username !== "string" ||
      typeof email !== "string" ||
      typeof password !== "string"
    ) {
      return res
        .status(400)
        .json({ status: false, error: "All fields must be of type string." });
    }

    //check for userName
    if (username.length < 6) {
      return res.status(400).json({
        status: false,
        error: "Username must have at least 6 characters.",
      });
    }

    //check for email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ status: false, error: "Invalid email format." });
    }

    // Password complexity validation
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!password.match(passwordRegex)) {
      return res.status(400).json({
        status: false,
        error:
          "Password must be at inimum eight characters, at least one letter and one number.",
      });
    }
    //--------------------------------------------------------------

    //existing user check------------------------------------------
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({
        status: false,
        error: "email already in use, try using login.",
      });
    }

    //-------------------------------------------------------------

    //hashing password -----------------------------------------
    const hashedPassword = await hashPassword(password);

    //--------------------------------------------------------------

    //creating new user ---------------------------------------------
    const newUser = new User({
      username,
      email: email.toLowerCase(),
      hash: hashedPassword,
      notes: [],
    });
    const createdUser = await newUser.save();
    //--------------------------------------------------------------

    //getting auth token --------------------------------------------
    const userId = createdUser._id;
    const token = await createToken(userId);
    //---------------------------------------------------------------

    return res.status(201).json({
      status: true,
      message: `User created successfully :- ${email}.`,
      token: token,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, error: "Internal Server Error" });
  }
};

module.exports = createUserService;
