const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    courseID: { type: Number, unique: true },
    courseName: { type: String },
    duration: { type: Number },
    curriculum: {
      topics: { type: String },
    },
    price: { type: Number },
  },
  { timestamps: true }
);

module.exports = mongoose.model("course", courseSchema);
