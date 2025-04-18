const express = require("express");
const User = require("../models/user");
const Score = require("../models/Score");
const Chat = require("../models/Chat");

const router = express.Router();

const isAuthenticated = (req, res, next) => {
    if (req.session.user) {
        return next();
    }
    res.redirect("/login");
};

router.get("/friend", isAuthenticated, (req, res) => {
    res.render("friend", { user: req.session.user });
});

router.get("/api/friends", isAuthenticated, async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id)
            .populate({
                path: "following",
                select: "_id username"
            });

        const friendsWithStatus = currentUser.following.map(friend => ({
            _id: friend._id,
            username: friend.username,
            isFollowing: true
        }));

        res.json({ success: true, friends: friendsWithStatus });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

router.get("/api/users/search", isAuthenticated, async (req, res) => {
    try {
        const searchTerm = req.query.username || "";
        const query = searchTerm ? 
            { username: { $regex: searchTerm, $options: "i" } } : 
            {};
        
        query._id = { $ne: req.session.user._id };

        const users = await User.find(query).limit(10);
        
        const currentUser = await User.findById(req.session.user._id);
        const usersWithFollowStatus = users.map(user => {
            return {
                _id: user._id,
                username: user.username,
                isFollowing: currentUser.following.includes(user._id)
            };
        });
        
        res.json({ success: true, users: usersWithFollowStatus });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

router.get("/api/users/random", isAuthenticated, async (req, res) => {
    try {
        const users = await User.aggregate([
            { $match: { _id: { $ne: req.session.user._id } } },
            { $sample: { size: 10 } }
        ]);
        
        const currentUser = await User.findById(req.session.user._id);
        const usersWithFollowStatus = users.map(user => {
            return {
                _id: user._id,
                username: user.username,
                isFollowing: currentUser.following.includes(user._id.toString())
            };
        });
        
        res.json({ success: true, users: usersWithFollowStatus });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

router.get("/api/users/:userId", isAuthenticated, async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId);
        
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        
        const scores = await Score.find({ user: userId });
        
        const formattedScores = {
            mouse: { "5": 0, "10": 0, "15": 0 },
            keyboard: { "5": 0, "10": 0, "15": 0 }
        };
        
        scores.forEach(score => {
            const clickMode = score.clickmode || "mouse";
            const timeMode = score.timemode || 5;
            
            if (formattedScores[clickMode][timeMode] < score.score) {
                formattedScores[clickMode][timeMode] = score.score;
            }
        });
        
        res.json({ 
            success: true, 
            user: {
                username: user.username,
                scores: formattedScores
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

router.post("/api/users/:userId/follow", isAuthenticated, async (req, res) => {
    try {
        const userToFollowId = req.params.userId;
        const currentUserId = req.session.user._id;
        
        const userToFollow = await User.findById(userToFollowId);
        if (!userToFollow) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        
        const currentUser = await User.findById(currentUserId);
        
        const isFollowing = currentUser.following.includes(userToFollowId);
        
        if (isFollowing) {
            await User.findByIdAndUpdate(currentUserId, {
                $pull: { following: userToFollowId }
            });
            await User.findByIdAndUpdate(userToFollowId, {
                $pull: { followers: currentUserId }
            });
            res.json({ success: true, action: "unfollowed" });
        } else {
            await User.findByIdAndUpdate(currentUserId, {
                $addToSet: { following: userToFollowId }
            });
            await User.findByIdAndUpdate(userToFollowId, {
                $addToSet: { followers: currentUserId }
            });
            res.json({ success: true, action: "followed" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

router.get("/api/chats/:userId", isAuthenticated, async (req, res) => {
    try {
        const otherUserId = req.params.userId;
        const currentUserId = req.session.user._id;
        
        const messages = await Chat.find({
            $or: [
                { sender: currentUserId, receiver: otherUserId },
                { sender: otherUserId, receiver: currentUserId }
            ]
        }).sort({ createdAt: 1 });
        
        res.json({ success: true, messages });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

router.post("/api/chats/:userId", isAuthenticated, async (req, res) => {
    try {
        const receiverId = req.params.userId;
        const senderId = req.session.user._id;
        const { message } = req.body;
        
        if (!message || message.trim() === "") {
            return res.status(400).json({ success: false, message: "Message cannot be empty" });
        }
        
        const newMessage = new Chat({
            sender: senderId,
            receiver: receiverId,
            message: message,
            read: false
        });
        
        await newMessage.save();
        res.json({ success: true, message: newMessage });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

module.exports = router;