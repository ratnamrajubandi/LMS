const mongoose = require("mongoose");

const userOrderSchema = new mongoose.Schema({
  razorpay_user_email: {
    type: String,
    required: true,
  },
  order_id: {
    type: String,
    required: true,
  },

  razorpay_courseName: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
  },
});

module.exports = mongoose.model("UserOrder", userOrderSchema);
