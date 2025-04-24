const express = require("express");
const router = express.Router();
<<<<<<< HEAD

router.get("/", (req, res) => {
  res.render("index");
});

=======
const User = require("../models/user");

const requireLogin = (req, res, next) => {
  if (!req.session.user) {
    return res.redirect("/login");
  }
  next();
};

router.get("/", (req, res) => {
  res.render("LandingPage");
});

router.get("/global", (req, res) => {
  res.render("global");
})
>>>>>>> ver.2.1.28
router.get("/home", (req, res) => {
  res.render("home");
});

router.get("/about", (req, res) => {
  res.render("about");
});

<<<<<<< HEAD
=======
router.get("/profile", requireLogin, async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id);
    if (!user) {
      return res.redirect("/login");
    }
    res.render("profile", { user });
  } catch (err) {
    console.error(err);
    res.redirect("/login");
  }
});

router.get("/ChangeUsername", (req, res) => {
  res.render("ChangeUsername");
});

router.get("/ChangePassword", (req, res) => {
  res.render("ChangePassword");
});

>>>>>>> ver.2.1.28
module.exports = router;
