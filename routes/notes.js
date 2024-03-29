const express = require("express");
const createNoteService = require("../services/createNoteService");
const fetchAllNotesService = require("../services/fetchAllNotesService");
const fetchUniqueNoteService = require("../services/fetchUniqueNoteService");
const updateNoteService = require("../services/updateNoteService");
const deleteNoteService = require("../services/deleteNoteService");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.use(express.json());

router.use(authMiddleware);

router.get("/", fetchAllNotesService);
router.get("/:noteId", fetchUniqueNoteService);
router.post("/", createNoteService);
router.patch("/", updateNoteService);
router.delete("/", deleteNoteService);

module.exports = router;
