const mongoose = require("mongoose");

const purchasedCoursesSchema = new mongoose.Schema({
  purchasedCourseId: {
    type: String,
    required: true,
  },
  purchasedUserId: {
    type: String,
    required: true,
  },
  purchasedCourseExpiry: {
    type: Number,
  },
});

module.exports = mongoose.model("PurchasedCourses", purchasedCoursesSchema);
