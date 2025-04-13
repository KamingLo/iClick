const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const Score = require("../models/Score");

const router = express.Router();

router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

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

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.render("login", {
        errorMessage: "Invalid username or password!",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.render("login", {
        errorMessage: "Invalid username or password!",
      });
    }

    req.session.user = user;
    res.render("home");
  } catch (err) {
    console.log(err);
    res.render("login", { errorMessage: "Invalid username or password!" });
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