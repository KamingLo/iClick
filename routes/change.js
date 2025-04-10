const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const Score = require("../models/Score");

const router = express.Router();

router.get("/ChangeUsername", (req, res) => {
    res.render("ChangeUsername");
});

router.post("/ChangeUsername", async(req, res) => {

});

router.get("/ChangePassword", (req, res) => {
    res.render("ChangePassword");
});

router.post("/ChangePassword", async(req, res) => {

});


module.exports = router;
