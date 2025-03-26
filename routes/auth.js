const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const Score = require("../models/Score");

const router = express.Router();

// Register Page
router.get("/register", (req, res) => {
  res.render("register");
});

// Register Handler
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Cek apakah username atau email sudah digunakan
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.render("register", { errorMessage: "Username or email have been used!" });
    }

    // Buat user baru
    const newUser = new User({ username, email, password });
    const savedUser = await newUser.save();

    // Create initial score for new user
    const initialScore = new Score({ score: 0, user: savedUser._id });
    await initialScore.save();

    console.log("User berhasil terdaftar:", username);
    res.render("login", { successMessage: "Registration successful!" });
  } catch (err) {
    console.log(err);
    res.render("register", { errorMessage: "Terjadi kesalahan saat registrasi." });
  }
});

// Login Page
router.get("/login", (req, res) => {
  res.render("login");
});

// Login Handler
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.render("login", { errorMessage: "Invalid username or password!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.render("login", { errorMessage: "Invalid username or password!" });
    }

    req.session.user = user;
    res.render("home");
  } catch (err) {
    console.log(err);
    res.render("login", { errorMessage: "Invalid username or password!" });
  }
});

// Logout
router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.send("Gagal logout.");
    }
    res.send("Logout berhasil! <a href='/auth/login'>Login lagi</a>");
  });
});

module.exports = router;
