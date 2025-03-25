const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");

router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Cek apakah username atau email sudah digunakan
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.render("register", {
        errorMessage: "Username or email have been used!",
      });
    }

    // Buat user baru
    const newUser = new User({ username, email, password });
    await newUser.save();

    console.log("User berhasil terdaftar:", username);
    res.render("login", { successMessage: "Registration successful!" });
  } catch (err) {
    console.log(err);
    res.render("register", {
      errorMessage: "Terjadi kesalahan saat registrasi.",
    });
  }
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Cari user di database
    const user = await User.findOne({ username });
    if (!user) {
      return res.render("login", { errorMessage: "Invalid username or password!" });
    }

    // Bandingkan password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.render("login", { errorMessage: "Invalid username or password!" });
    }

    // Simpan session login
    req.session.user = user;
    res.render("home");
  } catch (err) {
    console.log(err);
    res.render("login", { errorMessage: "Invalid username or password!" });
  }
});

router.get("/dashboard", (req, res) => {
  if (!req.session.user) {
    return res.send("Anda harus login terlebih dahulu. <a href='/login'>Login</a>");
  }
  res.send(`Selamat datang, ${req.session.user.username}! <a href='/logout'>Logout</a>`);
});

router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.send("Gagal logout.");
    }
    res.send("Logout berhasil! <a href='/login'>Login lagi</a>");
  });
});

module.exports = router;
