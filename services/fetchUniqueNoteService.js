const Notes = require("../models/Notes");
const mongoose = require("mongoose");

const fetchUniqueNoteService = async (req, res) => {
  try {
    const userId = req.userId;
    const { noteId } = req.params;
    //input validation -----------------------------------------
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
    const { _id, title, content, createdAt, updatedAt } = notedata;
    return res.status(200).json({
      status: true,
      message: "note fetch successfull",
      data: { _id, title, content, createdAt, updatedAt },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: false, error: "Internal Server Error" });
  }
};

module.exports = fetchUniqueNoteService;
