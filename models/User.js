require("../db/conn");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: false,
  },
  hash: {
    type: String,
    required: true,
  },
  notes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Note" }],
});

const User = mongoose.model("User", userSchema);
module.exports = User;
