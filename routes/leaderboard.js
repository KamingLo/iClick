const express = require('express');
const router = express.Router();
const Score = require('../models/Score');

router.get('/', async (req, res) => {
    try {
        const scores = await Score.find()
            .populate('user', 'username')
            .sort({ score: -1 })
            .limit(10)
            .lean();
        
        const mappedScores = scores.map(score => ({
            score: score.score,
            namaUser: score.user ? score.user.username : 'Unknown User',
            createdAt: score.createdAt
        }));
        
        res.render('leaderboard', { scores: mappedScores });
    } catch (error) {
        console.error('Leaderboard error:', error);
        res.render('leaderboard', { scores: [] });
    }
});

module.exports = router;
