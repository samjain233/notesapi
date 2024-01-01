const Notes = require("../models/Notes");
const User = require("../models/User");

const createNoteService = async (req, res) => {
  try {
    const { title, content } = req.body;
    console.log(title, content);
    return res.send("hello");
  } catch (err) {}
};

module.exports = createNoteService;
