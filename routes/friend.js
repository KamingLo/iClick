const express = require("express");
const User = require("../models/user");
const Score = require("../models/Score");
const Chat = require("../models/Chat");

const router = express.Router();

//Fungsi untuk cek apakah user sudah login? atau belum?
const isAuthenticated = (req, res, next) => {
    if (req.session.user) {
        return next();
    }
    res.redirect("/login");
};

//Fungsi untuk menampilkan page
router.get("/friend", isAuthenticated, (req, res) => {
    res.render("friend", { user: req.session.user });
});

//Fungsi untuk menampilkan daftar teman
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

//Fungsi untuk mencari user secara spesifik
router.get("/api/users/search", isAuthenticated, async (req, res) => {
    try {
        const searchTerm = req.query.username || "";
        const query = searchTerm ? 
            { username: { $regex: searchTerm, $options: "i" } } : 
            {};
        
        query._id = { $ne: req.session.user._id };

        const users = await User.find(query)
        .select('_id username followRequests')
        .limit(10)
        .lean();
       
        const currentUser = await User.findById(req.session.user._id);
        const usersWithFollowStatus = users.map(user => {
            return {
                _id: user._id,
                username: user.username,
                isFollowing: (currentUser.following || []).includes(user._id),
                isPendingRequest: (user.followRequests || []).includes(currentUser._id)
            };
        });
          
        
        res.json({ success: true, users: usersWithFollowStatus });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server error" });
    }
});
//Fungsi untuk menampilakn user secara random di find
router.get("/api/users/random", isAuthenticated, async (req, res) => {
    try {
        const allUsers = await User.find({ _id: { $ne: req.session.user._id } }).lean();
        const currentUser = await User.findById(req.session.user._id);

        function getRandomUsers(arr, count) {
            const shuffled = arr.sort(() => 0.5 - Math.random());
            return shuffled.slice(0, count);
        }

        const randomUsers = getRandomUsers(allUsers, 10);

        const usersWithFollowStatus = randomUsers.map(user => ({
            _id: user._id,
            username: user.username,
            isFollowing: currentUser.following.includes(user._id.toString()),
            isPendingRequest: user.followRequests?.includes(currentUser._id) || false
        }));

        res.json({ success: true, users: usersWithFollowStatus });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

//Fungsi untuk menampilkan detail user lain
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

// Fungsi untuk follow/unfollow user
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
        const isPending = userToFollow.followRequests && userToFollow.followRequests.includes(currentUserId);
        
        if (isFollowing) {
            // Sudah follow, maka unfollow satu sama lain
            await User.findByIdAndUpdate(currentUserId, {
                $pull: { following: userToFollowId, followers: userToFollowId }
            });
            await User.findByIdAndUpdate(userToFollowId, {
                $pull: { followers: currentUserId, following: currentUserId }
            });
            res.json({ success: true, action: "unfollowed" });
        } else if (isPending) {
            await User.findByIdAndUpdate(userToFollowId, {
                $pull: { followRequests: currentUserId }
            });
            res.json({ success: true, action: "canceled" });
        } else {
            await User.findByIdAndUpdate(userToFollowId, {
                $addToSet: { followRequests: currentUserId }
            });
            res.json({ success: true, action: "requested" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

// FUngsi untuk menampilkan permintaan follow
router.get("/api/follow-requests", isAuthenticated, async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id)
            .populate({
                path: "followRequests",
                select: "_id username"
            });
        
        res.json({ success: true, requests: currentUser.followRequests || [] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

// Fungsi untuk menerima atau menolak permintaan follow
router.post("/api/follow-requests/:userId/:action", isAuthenticated, async (req, res) => {
    try {
        const requesterId = req.params.userId;
        const currentUserId = req.session.user._id;
        const action = req.params.action;
        
        await User.findByIdAndUpdate(currentUserId, {
            $pull: { followRequests: requesterId }
        });
        
        if (action === 'accept') {
            // Current code just adds the follower relationship one-way
            await User.findByIdAndUpdate(currentUserId, {
                $addToSet: { followers: requesterId }
            });
            await User.findByIdAndUpdate(requesterId, {
                $addToSet: { following: currentUserId }
            });
            
            // ADD THESE NEW LINES to make it mutual following:
            await User.findByIdAndUpdate(currentUserId, {
                $addToSet: { following: requesterId }
            });
            await User.findByIdAndUpdate(requesterId, {
                $addToSet: { followers: currentUserId }
            });
            
            res.json({ success: true, message: "Follow request accepted" });
        } else {
            res.json({ success: true, message: "Follow request declined" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

//menerima chat teman di friend.ejs
router.get("/api/chats/:userId", isAuthenticated, async (req, res) => {
    try {
        const otherUserId = req.params.userId;
        const currentUserId = req.session.user._id;
        
        const currentUser = await User.findById(currentUserId);
        if (!currentUser.following.includes(otherUserId)) {
            return res.status(403).json({ 
                success: false, 
                message: "You must follow this user to chat with them" 
            });
        }

        // Added condition to exclude messages deleted by current user
        const messages = await Chat.find({
            $or: [
                { sender: currentUserId, receiver: otherUserId },
                { sender: otherUserId, receiver: currentUserId }
            ],
            deletedFor: { $ne: currentUserId } // Don't show messages deleted by current user
        }).sort({ createdAt: 1 });
        
        res.json({ success: true, messages });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

//Mengirim pesan ke teman di friend.ejs
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

// delete chat dari user dengan friendnya
router.delete("/api/chats/:userId", isAuthenticated, async (req, res) => {
    try {
        const otherUserId = req.params.userId;
        const currentUserId = req.session.user._id;
        
        // Update all messages between these users to mark as deleted for current user
        await Chat.deleteMany(
            {
                $or: [
                    { sender: currentUserId, receiver: otherUserId },
                    { sender: otherUserId, receiver: currentUserId }
                ]
            },
            { $addToSet: { deletedFor: currentUserId } }
        );
        
        res.json({ success: true, message: "Chat history deleted" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

module.exports = router;