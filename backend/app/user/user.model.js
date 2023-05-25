const mongoose = require("mongoose");
const Course = require("../course/course.model");

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: { type: String },
  role: {
    type: String,
    default: "user",
  },
  token: { type: String },
  resettoken: { type: String },
  purchasedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "course" }],
});

module.exports = mongoose.model("user", userSchema);
