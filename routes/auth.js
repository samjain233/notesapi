const express = require("express");
const loginService = require("../services/loginService");
const createUserService = require("../services/createUserService");

const router = express.Router();

router.use(express.json());

router.post("/login", loginService);
router.post("/signup", createUserService);

module.exports = router;
