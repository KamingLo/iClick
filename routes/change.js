const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const Score = require("../models/Score");

const router = express.Router();

router.get("/ChangeUsername", (req, res) => {
    res.render("ChangeUsername");
});

router.post("/ChangeUsername", async(req, res) => {
    try {
        const { 'New-username': newUsername, password } = req.body;
        const userId = req.session.user;
        
        // Get current user
        const user = await User.findById(userId);
        console.log("userId", userId); // Changed to log userId instead of undefined user
        
        if (!user) {
            return res.status(404).send("User not found");
        }

        // Verify password
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.render("ChangeUsername", { errorMessage: "Invalid password" });
        }

        // Check if new username already exists
        const existingUser = await User.findOne({ username: newUsername });
        if (existingUser) {
            return res.render("ChangeUsername", { errorMessage: "Username already exists" });
        }

        // Update username
        await User.findByIdAndUpdate(userId, { username: newUsername });
        res.redirect("/home");
    } catch (error) {
        console.error(error);
        res.render("ChangeUsername", { errorMessage: "An error occurred" });
    }
});

router.get("/ChangePassword", (req, res) => {
    res.render("ChangePassword");
});

router.post("/ChangePassword", async(req, res) => {
    try {
        const { currentPassword, newPassword, confirmPassword } = req.body;
        const userId = req.session.user;

        // Get current user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send("User not found");
        }

        // Verify current password
        const isValidPassword = await bcrypt.compare(currentPassword, user.password);
        if (!isValidPassword) {
            return res.render("ChangePassword", { errorMessage: "Current password is incorrect" });
        }

        // Check if new passwords match
        if (newPassword !== confirmPassword) {
            return res.render("ChangePassword", { errorMessage: "New passwords don't match" });
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update password
        await User.findByIdAndUpdate(userId, { password: hashedPassword });
        res.redirect("home");
    } catch (error) {
        console.error(error);
        res.render("ChangePassword", { errorMessage: "An error occurred" });
    }
});

module.exports = router;