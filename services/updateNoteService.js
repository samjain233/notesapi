const mongoose = require("mongoose");
const Notes = require("../models/Notes");

// Validation function for note creation
const validateNoteCreation = (title, content) => {
  const errors = [];

  if (
    typeof title === "string" &&
    (title.trim().length === 0 || title.length < 6)
  ) {
    errors.push("Title must be atleast 6 characters long");
  }

  if (
    typeof content === "string" &&
    (content.trim().length === 0 || content.length < 6)
  ) {
    errors.push("Content must be atleast 6 characters long");
  }

  return errors;
};

const updateNoteService = async (req, res) => {
  try {
    const userId = req.userId;
    const { noteId, title, content } = req.body;
    //input validation -----------------------------------------
    if (!("noteId" in req.body)) {
      return res.status(400).json({
        status: false,
        error: `Missing required fields: noteId`,
      });
    }

    // Validate data type
    if (
      typeof noteId !== "string" ||
      (title && typeof title !== "string") ||
      (content && typeof content !== "string")
    ) {
      return res
        .status(400)
        .json({ status: false, error: "All fields must be of type string." });
    }

    const validationErrors = validateNoteCreation(title, content);
    if (validationErrors.length > 0) {
      return res.status(400).json({ status: false, errors: validationErrors });
    }

    if (!mongoose.Types.ObjectId.isValid(noteId)) {
      return res.status(400).json({ status: false, error: "Invalid noteId" });
    }
    //-----------------------------------------------------------

    //checking for valid noteId --------------------------------------
    const notedata = await Notes.findOne({ _id: noteId });
    if (!notedata) {
      return res.status(404).json({ status: false, error: "Invalid NoteId" });
    }
    //--------------------------------------------------------------
    //check for correct user -----------------------------------
    if (!userId.equals(notedata.user)) {
      return res
        .status(403)
        .json({ status: false, error: "Unauthorized Access" });
    }
    //--------------------------------------------------------------

    //changing content -----------------------------------------------
    if (title) {
      notedata.title = title;
    }
    if (content) {
      notedata.content = content;
    }
    //----------------------------------------------------------------

    //updating fields------------------------------------------------
    const data = await Notes.findByIdAndUpdate(noteId, notedata, { new: true });
    //--------------------------------------------------------------

    return res.status(200).json({
      status: true,
      message: `note updated successfully :- ${data._id}.`,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: false, error: "Internal Server Error" });
  }
};

module.exports = updateNoteService;
