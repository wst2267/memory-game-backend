const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  maxLevel: { type: Number, default: 1 },
  bestScore: { type: Number, default: 0 }
});

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
