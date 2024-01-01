const Notes = require("../models/Notes");
const User = require("../models/User");

// Validation function for note creation
const validateNoteCreation = (title, content) => {
  const errors = [];

  if (!title || title.trim().length === 0) {
    errors.push("Title is required");
  }

  if (title.length < 6) {
    errors.push("Title must be atleast 6 characters long");
  }

  if (!content || content.trim().length === 0) {
    errors.push("Content is required");
  }

  if (content.length < 6) {
    errors.push("Content must be atleast 6 characters long");
  }

  return errors;
};

const createNoteService = async (req, res) => {
  try {
    const { title, content } = req.body;

    //input validation ----------------------------------------
    const requiredFields = ["title", "content"];

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
    if (typeof title !== "string" || typeof content !== "string") {
      return res
        .status(400)
        .json({ status: false, error: "All fields must be of type string." });
    }

    //validation for only space input
    const validationErrors = validateNoteCreation(title, content);
    if (validationErrors.length > 0) {
      return res.status(400).json({ status: false, errors: validationErrors });
    }
    //------------------------------------------------------------

    //creating note ------------------------------------------
    const userId = req.userId;
    const newNote = new Notes({
      title,
      content,
      user: userId,
    });
    const noteData = await newNote.save();
    //---------------------------------------------------------

    //saving noteid in userNoteArray--------------------------------
    await User.findByIdAndUpdate(userId, {
      $push: { notes: noteData._id },
    });
    //-----------------------------------------------------------

    return res.status(201).json({
      status: true,
      message: `note created successfully :- ${newNote._id}.`,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: false, error: "Internal Server Error" });
  }
};

module.exports = createNoteService;
