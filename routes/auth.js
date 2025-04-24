const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const Score = require("../models/Score");

const router = express.Router();

<<<<<<< HEAD
// Register Page
=======
>>>>>>> ver.2.1.28
router.get("/register", (req, res) => {
  res.render("register");
});

<<<<<<< HEAD
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
=======
router.post("/register", async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  if (password.length < 8) {
    return res.render("register", {
      errorMessage: "Password must be at least 8 characters!",
    });
  }

  if (password !== confirmPassword) {
    return res.render("register", {
      errorMessage: "Password doesnt match!",
    });
  }

  try {
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.render("register", {
        errorMessage: "Username or email have been used!",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    const savedUser = await newUser.save();

    const initialScore = new Score({ score: 0, user: savedUser._id });
    await initialScore.save();
    
    res.render("login", { successMessage: "Registration successful!" });
  } catch (err) {
    console.log(err);
    res.render("register", {
      errorMessage: "Something error when registration.",
    });
  }
});

>>>>>>> ver.2.1.28
router.get("/login", (req, res) => {
  res.render("login");
});

<<<<<<< HEAD
// Login Handler
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.render("login", { errorMessage: "Invalid username or password!" });
=======
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (password.length < 8 & password !== "Admin") {
    return res.render("login", {
      errorMessage: "Password must be at least 8 characters!",
    });
  }

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.render("login", {
        errorMessage: "Invalid username or password!",
      });
>>>>>>> ver.2.1.28
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
<<<<<<< HEAD
      return res.render("login", { errorMessage: "Invalid username or password!" });
=======
      return res.render("login", {
        errorMessage: "Invalid username or password!",
      });
>>>>>>> ver.2.1.28
    }

    req.session.user = user;
    res.render("home");
  } catch (err) {
    console.log(err);
    res.render("login", { errorMessage: "Invalid username or password!" });
  }
});

<<<<<<< HEAD
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
=======

router.delete('/api/user/delete', async (req, res) => {
  try {
    if (!req.session.user) {
      return res.status(401).json({ success: false, message: 'Not authenticated' });
    }

    const userId = req.session.user._id;

    await Score.deleteMany({ user: userId });
    
    await User.findByIdAndDelete(userId);

    req.session.destroy((err) => {
      if (err) {
        console.error('Error Destroying Session:', err);
      }
      
      res.json({ success: true, message: 'Account Has Been Deleted' });
    });
  } catch (error) {
    console.error('Error Deleting Account:', error);
    res.status(500).json({ success: false, message: 'Failed To Delete Account' });
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.send("failed to logout.");
    }
    res.redirect("/login");
  });
});
module.exports = router;
>>>>>>> ver.2.1.28
