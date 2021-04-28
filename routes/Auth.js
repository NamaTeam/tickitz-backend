const express = require("express");
const router = express.Router();
const authController = require("../controllers/Auth");

router.post("/Login", authController.login);

router.post("/register", authController.register);

router.post("/email-verify", authController.verifyEmail);

module.exports = router;
