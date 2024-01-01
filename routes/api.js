const express = require("express");
const router = express.Router();

const notes = require("./notes");
const auth = require("./auth");

router.use("/notes", notes);
router.use("/auth", auth);

module.exports = router;
