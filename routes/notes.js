const express = require("express");
const createNoteService = require("../services/createNoteService");
const fetchAllNotesService = require("../services/fetchAllNotesService");
const fetchUniqueNoteService = require("../services/fetchUniqueNoteService");
const updateNoteService = require("../services/updateNoteService");
const deleteNoteService = require("../services/deleteNoteService");
const router = express.Router();

router.use(express.json());

router.get("/",fetchAllNotesService);
router.get("/:noteId",fetchUniqueNoteService);
router.post("/", createNoteService);
router.patch("/:noteId",updateNoteService);
router.delete("/:noteId",deleteNoteService);

module.exports = router;
