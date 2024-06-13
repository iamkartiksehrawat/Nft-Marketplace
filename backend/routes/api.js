const express = require("express");
const router = express.Router();
const controller = require("../Controller/api");

router.post("/auth/challenge", controller.getChallenge);

router.post("/auth/verify", controller.getVerify);

module.exports = router;
