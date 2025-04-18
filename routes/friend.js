const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const Score = require("../models/Score");

const router = express.Router();

router.get("/friend", (req, res) =>{
    res.render("friend");
});

module.exports = router;