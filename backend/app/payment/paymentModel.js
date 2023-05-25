const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  razorpay_order_id: {
    type: String,
    required: true,
  },
  razorpay_payment_id: {
    type: String,
    required: true,
  },
  razorpay_signature: {
    type: String,
    required: true,
  },
/////////////
  razorpay_user_id: {
    type: String,
  },
  
});

module.exports = mongoose.model("Payment", paymentSchema);
