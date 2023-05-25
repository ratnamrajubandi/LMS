const express = require("express");
const router = express.Router();

router.post("/user/toggleRole", (req, res) => {
  // const userEmail = req.body.userId;

  console.log("req.body: ", req.body);
  //   role === "user" ? (role = "admin") : (role = "user");
  ////////
  return res.json({ success: true, message: "Toggle successful" });
});

module.exports = router;
