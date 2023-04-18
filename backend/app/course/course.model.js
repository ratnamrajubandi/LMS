const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    courseID: { type: String, unique: true },
    courseName: { type: String, required: true },
    duration: { type: Number, required: true },

    curriculum: [{ name: String, notes: String, id: String }],

    price: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("course", courseSchema);
