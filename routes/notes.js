const express = require("express");
const createNoteService = require("../services/createNoteService");
const router = express.Router();

router.use(express.json());

router.get("/", createNoteService);

module.exports = router;
