const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true }, // Pastikan email ada di skema
  password: { type: String, required: true },
  profilePicture: { type: String, default: "/image/profile.png" },
});



module.exports = mongoose.model("User", userSchema);