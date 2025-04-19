const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Chat = require('../models/Chat');
const Score = require('../models/Score');
const mongoose = require('mongoose');

const isAuthenticated = (req, res, next) => {
    if (req.session.user) {
        return next();
    }
    return res.status(401).json({ error: 'Not authenticated' });
};

router.get('/users/search', isAuthenticated, async (req, res) => {
    try {
        const query = req.query.username || '';
        
        if (!query || query.trim().length < 1) {
            return res.status(400).json({ error: 'Search query required', success: false });
        }
        
        const users = await User.find({
            username: { $regex: query, $options: 'i' },
            _id: { $ne: req.session.user._id }
        }).select('username').limit(10);
        
        const currentUser = await User.findById(req.session.user._id);
        const usersWithFollow = users.map(user => {
            return {
                _id: user._id,
                username: user.username,
                isFollowing: currentUser.following.includes(user._id)
            };
        });
        
        res.json({ success: true, users: usersWithFollow });
    } catch (error) {
        console.error('Error searching users:', error);
        res.status(500).json({ error: 'Failed to search users', success: false });
    }
});

router.get('/users/random', isAuthenticated, async (req, res) => {
    try {
        const users = await User.aggregate([
            { $match: { _id: { $ne: mongoose.Types.ObjectId.createFromHexString(req.session.user._id) } } },
            { $sample: { size: 10 } },
            { $project: { username: 1 } }
        ]);
                const currentUser = await User.findById(req.session.user._id);
        const usersWithFollow = users.map(user => {
            return {
                _id: user._id,
                username: user.username,
                isFollowing: currentUser.following.includes(user._id.toString())
            };
        });
        
        res.json({ success: true, users: usersWithFollow });
    } catch (error) {
        console.error('Error fetching random users:', error);
        res.status(500).json({ error: 'Failed to fetch random users', success: false });
    }
});

router.get('/users/:userId', isAuthenticated, async (req, res) => {
    try {
        const userId = req.params.userId;
        
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ error: 'Invalid user ID', success: false });
        }
        
        const user = await User.findById(userId).select('username');
        
        if (!user) {
            return res.status(404).json({ error: 'User not found', success: false });
        }
        
        const mouseScores5s = await Score.findOne({ user: userId, timemode: 5, clickmode: 'mouse' }).sort({ score: -1 });
        const mouseScores10s = await Score.findOne({ user: userId, timemode: 10, clickmode: 'mouse' }).sort({ score: -1 });
        const mouseScores15s = await Score.findOne({ user: userId, timemode: 15, clickmode: 'mouse' }).sort({ score: -1 });
        
        const keyboardScores5s = await Score.findOne({ user: userId, timemode: 5, clickmode: 'keyboard' }).sort({ score: -1 });
        const keyboardScores10s = await Score.findOne({ user: userId, timemode: 10, clickmode: 'keyboard' }).sort({ score: -1 });
        const keyboardScores15s = await Score.findOne({ user: userId, timemode: 15, clickmode: 'keyboard' }).sort({ score: -1 });
        
        const userData = {
            _id: user._id,
            username: user.username,
            scores: {
                mouse: {
                    '5': mouseScores5s ? mouseScores5s.score : '-',
                    '10': mouseScores10s ? mouseScores10s.score : '-',
                    '15': mouseScores15s ? mouseScores15s.score : '-'
                },
                keyboard: {
                    '5': keyboardScores5s ? keyboardScores5s.score : '-',
                    '10': keyboardScores10s ? keyboardScores10s.score : '-',
                    '15': keyboardScores15s ? keyboardScores15s.score : '-'
                }
            }
        };
        
        res.json({ success: true, user: userData });
    } catch (error) {
        console.error('Error fetching user info:', error);
        res.status(500).json({ error: 'Failed to fetch user info', success: false });
    }
});

router.post('/users/:userId/follow', isAuthenticated, async (req, res) => {
    try {
        const targetUserId = req.params.userId;
        
        if (!mongoose.Types.ObjectId.isValid(targetUserId)) {
            return res.status(400).json({ error: 'Invalid user ID', success: false });
        }
        
        const targetUser = await User.findById(targetUserId);
        if (!targetUser) {
            return res.status(404).json({ error: 'User not found', success: false });
        }
        
        if (targetUserId === req.session.user._id.toString()) {
            return res.status(400).json({ error: 'Cannot follow yourself', success: false });
        }
        
        const currentUser = await User.findById(req.session.user._id);
        const isFollowing = currentUser.following.includes(targetUserId);
        
        if (isFollowing) {
            currentUser.following = currentUser.following.filter(id => id.toString() !== targetUserId);
            await currentUser.save();
            res.json({ success: true, action: 'unfollowed' });
        } else {
            currentUser.following.push(targetUserId);
            await currentUser.save();
            res.json({ success: true, action: 'followed' });
        }
    } catch (error) {
        console.error('Error toggling follow status:', error);
        res.status(500).json({ error: 'Failed to toggle follow status', success: false });
    }
});

router.get('/chats/:userId', isAuthenticated, async (req, res) => {
    try {
        const currentUserId = req.session.user._id;
        const otherUserId = req.params.userId;
        
        if (!mongoose.Types.ObjectId.isValid(otherUserId)) {
            return res.status(400).json({ error: 'Invalid user ID', success: false });
        }

        const messages = await Chat.find({
            $or: [
                { sender: currentUserId, recipient: otherUserId },
                { sender: otherUserId, recipient: currentUserId }
            ]
        })
        .sort({ timestamp: 1 })
        .populate('sender', 'username')
        .populate('recipient', 'username');

        await Chat.updateMany(
            { sender: otherUserId, recipient: currentUserId, read: false },
            { $set: { read: true } }
        );

        res.json({
            success: true,
            messages: messages.map(msg => ({
                sender: msg.sender._id,
                recipient: msg.recipient._id,
                message: msg.message,
                timestamp: msg.timestamp
            }))
        });
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ error: 'Failed to fetch messages', success: false });
    }
});

router.post('/chats/:userId', isAuthenticated, async (req, res) => {
    try {
        const recipientId = req.params.userId;
        const { message } = req.body;
        
        if (!recipientId || !message) {
            return res.status(400).json({ error: 'Recipient ID and message are required', success: false });
        }

        if (!mongoose.Types.ObjectId.isValid(recipientId)) {
            return res.status(400).json({ error: 'Invalid recipient ID', success: false });
        }

        const recipientExists = await User.exists({ _id: recipientId });
        if (!recipientExists) {
            return res.status(404).json({ error: 'Recipient not found', success: false });
        }

        const newMessage = new Chat({
            sender: req.session.user._id,
            recipient: recipientId,
            message: message
        });

        await newMessage.save();

        await newMessage.populate('sender', 'username');
        await newMessage.populate('recipient', 'username');

        res.status(201).json({
            success: true,
            message: {
                sender: newMessage.sender._id,
                recipient: newMessage.recipient._id,
                message: newMessage.message,
                timestamp: newMessage.timestamp
            }
        });
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).json({ error: 'Failed to send message', success: false });
    }
});

router.get('/chats/unread', isAuthenticated, async (req, res) => {
    try {
        const unreadCount = await Chat.countDocuments({
            recipient: req.session.user._id,
            read: false
        });
        
        res.json({ unreadCount, success: true });
    } catch (error) {
        console.error('Error fetching unread count:', error);
        res.status(500).json({ error: 'Failed to fetch unread count', success: false });
    }
});

router.get('/friends', isAuthenticated, async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id)
            .populate('following', 'username');
        
        if (!currentUser || !currentUser.following) {
            return res.json({ success: true, friends: [] });
        }
        
        const friends = await Promise.all(currentUser.following.map(async (friend) => {
            const unreadCount = await Chat.countDocuments({
                sender: friend._id,
                recipient: req.session.user._id,
                read: false
            });
            
            return {
                _id: friend._id,
                username: friend.username,
                unreadCount,
                isFollowing: true
            };
        }));
        
        res.json({ success: true, friends });
    } catch (error) {
        console.error('Error fetching friends:', error);
        res.status(500).json({ error: 'Failed to fetch friends', success: false });
    }
});

router.get('/friends/status/:userId', isAuthenticated, async (req, res) => {
    try {
        const targetUserId = req.params.userId;
        
        if (!mongoose.Types.ObjectId.isValid(targetUserId)) {
            return res.status(400).json({ error: 'Invalid user ID', success: false });
        }
        
        const currentUser = await User.findById(req.session.user._id);
        const isFollowing = currentUser.following.includes(targetUserId);
        
        res.json({ success: true, isFollowing });
    } catch (error) {
        console.error('Error checking follow status:', error);
        res.status(500).json({ error: 'Failed to check follow status', success: false });
    }
});

router.get('/chat/messages/:userId', async (req, res) => {
    const targetUserId = req.params.userId;
    const currentUserId = req.session.user._id;
  
    try {
      const messages = await Chat.find({
        $or: [
          { from: currentUserId, to: targetUserId },
          { from: targetUserId, to: currentUserId }
        ]
      }).sort({ timestamp: 1 });
  
      res.json({ messages });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch messages' });
    }
  });
  

module.exports = router;