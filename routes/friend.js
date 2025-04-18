const express = require("express");
const User = require("../models/user");
const router = express.Router();

// Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
    if (req.session && req.session.user) {
        return next();
    }
    res.redirect('/login');
};

// Get friends page
router.get("/friend", isAuthenticated, async (req, res) => {
    try {
        const user = await User.findById(req.session.user._id)
            .populate('friends')
            .populate('friendRequests');
        
        const otherUsers = await User.find({
            _id: { 
                $nin: [...user.friends, user._id, ...user.friendRequests]
            }
        });

        res.render("friend", {
            user,
            friends: user.friends,
            requests: user.friendRequests,
            otherUsers
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Server error");
    }
});

// Send friend request
router.post("/friend/request", isAuthenticated, async (req, res) => {
    try {
        const { friendId } = req.body;
        await User.findByIdAndUpdate(friendId, {
            $addToSet: { friendRequests: req.session.user._id }
        });
        res.redirect('/friend');
    } catch (error) {
        res.status(500).send("Server error");
    }
});

// Accept friend request
router.post("/friend/accept", isAuthenticated, async (req, res) => {
    try {
        const { friendId } = req.body;
        const user = await User.findById(req.session.user._id);
        const friend = await User.findById(friendId);

        user.friends.push(friendId);
        friend.friends.push(req.session.user._id);
        user.friendRequests = user.friendRequests.filter(id => id.toString() !== friendId);

        await user.save();
        await friend.save();
        res.redirect('/friend');
    } catch (error) {
        res.status(500).send("Server error");
    }
});

// Reject friend request
router.post("/friend/reject", isAuthenticated, async (req, res) => {
    try {
        const { friendId } = req.body;
        await User.findByIdAndUpdate(req.session.user._id, {
            $pull: { friendRequests: friendId }
        });
        res.redirect('/friend');
    } catch (error) {
        res.status(500).send("Server error");
    }
});

// Remove friend
router.post("/friend/remove", isAuthenticated, async (req, res) => {
    try {
        const { friendId } = req.body;
        await User.findByIdAndUpdate(req.session.user._id, {
            $pull: { friends: friendId }
        });
        await User.findByIdAndUpdate(friendId, {
            $pull: { friends: req.session.user._id }
        });
        res.redirect('/friend');
    } catch (error) {
        res.status(500).send("Server error");
    }
});

module.exports = router;