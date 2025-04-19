const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Score = require("../models/Score");
const mongoose = require("mongoose");

// Create new schema for friend requests
const FriendRequest = mongoose.model("FriendRequest", new mongoose.Schema({
  from: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  to: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  status: { type: String, enum: ["pending", "accepted", "declined"], default: "pending" },
  createdAt: { type: Date, default: Date.now }
}));

// Create new schema for chat messages
const Message = mongoose.model("Message", new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
}));

// Middleware to check if user is logged in
const requireLogin = (req, res, next) => {
  if (!req.session.user) {
    return res.redirect("/login");
  }
  next();
};

// Friend page
router.get("/friend", requireLogin, async (req, res) => {
  try {
    res.render("friend");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Get current user's friends (people they follow)
router.get("/api/friends", requireLogin, async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id)
      .populate("following", "username");
    
    if (!currentUser) {
      return res.status(404).json({ error: "User not found" });
    }
    
    res.json({ friends: currentUser.following });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Search for users
router.get("/api/users/search", requireLogin, async (req, res) => {
  try {
    const { username } = req.query;
    
    if (!username) {
      return res.status(400).json({ error: "Username query parameter is required" });
    }
    
    const currentUser = await User.findById(req.session.user._id);
    const regex = new RegExp(username, "i");
    
    // Search for users whose username matches the search query
    const users = await User.find({ 
      username: regex,
      _id: { $ne: req.session.user._id } // Exclude current user
    }).select("username");
    
    // Add isFollowing flag to each user
    const usersWithFollowingStatus = users.map(user => {
      return {
        _id: user._id,
        username: user.username,
        isFollowing: currentUser.following.includes(user._id)
      };
    });
    
    res.json({ users: usersWithFollowingStatus });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Send friend request
router.post("/api/friend-requests", requireLogin, async (req, res) => {
  try {
    const { userId } = req.body;
    
    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }
    
    const currentUser = await User.findById(req.session.user._id);
    const targetUser = await User.findById(userId);
    
    if (!targetUser) {
      return res.status(404).json({ error: "User not found" });
    }
    
    // Check if a request already exists
    const existingRequest = await FriendRequest.findOne({
      from: currentUser._id,
      to: targetUser._id,
      status: "pending"
    });
    
    if (existingRequest) {
      return res.status(400).json({ error: "Friend request already sent" });
    }
    
    // Create new friend request
    const newRequest = new FriendRequest({
      from: currentUser._id,
      to: targetUser._id
    });
    
    await newRequest.save();
    
    res.json({ message: "Friend request sent successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Get pending friend requests for current user
router.get("/api/friend-requests", requireLogin, async (req, res) => {
  try {
    const requests = await FriendRequest.find({
      to: req.session.user._id,
      status: "pending"
    }).populate("from", "username");
    
    res.json({ requests });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Accept friend request
router.post("/api/friend-requests/:requestId/accept", requireLogin, async (req, res) => {
  try {
    const { requestId } = req.params;
    
    const request = await FriendRequest.findById(requestId);
    
    if (!request) {
      return res.status(404).json({ error: "Friend request not found" });
    }
    
    if (request.to.toString() !== req.session.user._id.toString()) {
      return res.status(403).json({ error: "Not authorized" });
    }
    
    // Update request status
    request.status = "accepted";
    await request.save();
    
    // Add each user to the other's following/followers lists
    await User.findByIdAndUpdate(request.from, {
      $addToSet: { following: request.to }
    });
    
    await User.findByIdAndUpdate(request.to, {
      $addToSet: { following: request.from }
    });
    
    res.json({ message: "Friend request accepted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Decline friend request
router.post("/api/friend-requests/:requestId/decline", requireLogin, async (req, res) => {
  try {
    const { requestId } = req.params;
    
    const request = await FriendRequest.findById(requestId);
    
    if (!request) {
      return res.status(404).json({ error: "Friend request not found" });
    }
    
    if (request.to.toString() !== req.session.user._id.toString()) {
      return res.status(403).json({ error: "Not authorized" });
    }
    
    // Update request status
    request.status = "declined";
    await request.save();
    
    res.json({ message: "Friend request declined" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Get user scores
router.get("/api/users/:userId/scores", requireLogin, async (req, res) => {
  try {
    const { userId } = req.params;
    
    // Validate userId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }
    
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    
    // Get best scores for mouse mode
    const mouseScores = await Score.aggregate([
      { $match: { user: mongoose.Types.ObjectId(userId), clickmode: "mouse" } },
      {
        $group: {
          _id: "$timemode",
          score: { $max: "$score" }
        }
      },
      { $sort: { "_id": 1 } }
    ]);
    
    // Get best scores for keyboard mode
    const keyboardScores = await Score.aggregate([
      { $match: { user: mongoose.Types.ObjectId(userId), clickmode: "keyboard" } },
      {
        $group: {
          _id: "$timemode",
          score: { $max: "$score" }
        }
      },
      { $sort: { "_id": 1 } }
    ]);
    
    // Get user ranks
    const userRanks = {};
    
    for (const clickmode of ["mouse", "keyboard"]) {
      for (const timemode of [5, 10, 15]) {
        const allScores = await Score.aggregate([
          { $match: { timemode, clickmode } },
          {
            $group: {
              _id: "$user",
              score: { $max: "$score" }
            }
          },
          { $sort: { score: -1 } }
        ]);
        
        const userIndex = allScores.findIndex(item => 
          item._id.toString() === userId
        );
        
        if (userIndex !== -1) {
          userRanks[`${clickmode}_${timemode}`] = userIndex + 1;
        }
      }
    }
    
    // Format response data
    const formatScores = (scores, mode) => {
      const result = {};
      
      [5, 10, 15].forEach(timemode => {
        const score = scores.find(s => s._id === timemode);
        result[`${mode}_${timemode}s`] = score ? score.score : "-";
      });
      
      return result;
    };
    
    const response = {
      username: user.username,
      ...formatScores(mouseScores, "mouse"),
      ...formatScores(keyboardScores, "keyboard"),
      ranks: userRanks
    };
    
    res.json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Send a message to a user
router.post("/api/messages", requireLogin, async (req, res) => {
  try {
    const { receiverId, message } = req.body;
    
    if (!receiverId || !message) {
      return res.status(400).json({ error: "Receiver ID and message are required" });
    }
    
    const currentUser = await User.findById(req.session.user._id);
    const receiver = await User.findById(receiverId);
    
    if (!receiver) {
      return res.status(404).json({ error: "Receiver not found" });
    }
    
    // Check if users are friends (following each other)
    const isFriend = currentUser.following.includes(receiverId);
    
    if (!isFriend) {
      return res.status(403).json({ error: "You can only message users you are following" });
    }
    
    // Create and save new message
    const newMessage = new Message({
      sender: currentUser._id,
      receiver: receiver._id,
      message
    });
    
    await newMessage.save();
    
    res.json({ 
      message: "Message sent successfully",
      messageData: {
        id: newMessage._id,
        message: newMessage.message,
        timestamp: newMessage.createdAt,
        sender: {
          id: currentUser._id,
          username: currentUser.username
        }
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Get chat history with a user
router.get("/api/messages/:userId", requireLogin, async (req, res) => {
  try {
    const { userId } = req.params;
    const currentUserId = req.session.user._id;
    
    // Validate userId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }
    
    // Verify users are friends
    const currentUser = await User.findById(currentUserId);
    const isFriend = currentUser.following.includes(userId);
    
    if (!isFriend) {
      return res.status(403).json({ error: "You can only view messages with users you are following" });
    }
    
    // Get messages in both directions
    const messages = await Message.find({
      $or: [
        { sender: currentUserId, receiver: userId },
        { sender: userId, receiver: currentUserId }
      ]
    })
    .sort({ createdAt: 1 })
    .populate("sender", "username")
    .populate("receiver", "username");
    
    const formattedMessages = messages.map(msg => ({
      id: msg._id,
      message: msg.message,
      timestamp: msg.createdAt,
      sender: {
        id: msg.sender._id,
        username: msg.sender.username
      },
      receiver: {
        id: msg.receiver._id,
        username: msg.receiver.username
      },
      isFromCurrentUser: msg.sender._id.toString() === currentUserId.toString()
    }));
    
    res.json({ messages: formattedMessages });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;