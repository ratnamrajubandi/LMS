const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: { type: String },
  token: { type: String },
  resettoken:{type: String},
  
}, {timestamps:true});

module.exports = mongoose.model("user", userSchema);
