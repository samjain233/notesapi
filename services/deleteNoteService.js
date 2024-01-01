const Notes = require("../models/Notes");
const User = require("../models/User");

const deleteNoteService = async (req, res) => {
  try {
    const userId = req.userId;
    const { noteId } = req.body;

    //input validation -----------------------------------------
    if (!("noteId" in req.body)) {
      return res.status(400).json({
        status: false,
        error: `Missing required fields: noteId`,
      });
    }

    // Validate data type
    if (typeof noteId !== "string") {
      return res
        .status(400)
        .json({ status: false, error: "noteId field must be of type string." });
    }

    if (noteId.length !== 24) {
      return res.status(404).json({ status: false, error: "Invalid NoteId" });
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

    //deleting the note -----------------------------------------
    const deletedNotedata = await Notes.findByIdAndDelete(notedata._id);
    //----------------------------------------------------------

    //deleting ref from the user --------------------------------
    await User.findByIdAndUpdate(deletedNotedata.user, {
      $pull: { notes: deletedNotedata._id },
    });
    //-----------------------------------------------------------

    return res.status(200).json({
      status: true,
      message: `delte note successfull - ${notedata._id}`,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: false, error: "Internal Server Error" });
  }
};

module.exports = deleteNoteService;
