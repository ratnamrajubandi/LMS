const express = require("express");
const router = express.Router();
const userController = require("./user.controller");

router.post("/forgotpassword", userController.forgotPassword);
router.post("/resetpassword", userController.resetPassword);

module.exports = router;
