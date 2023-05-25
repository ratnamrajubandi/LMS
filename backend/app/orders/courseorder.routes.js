const express = require("express");
const router = express.Router();
const { courseorderByEmail } = require("./courseorder.controller");

// API endpoint to get items by email
router.get("/:email", courseorderByEmail);

module.exports = router;
