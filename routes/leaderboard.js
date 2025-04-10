const express = require('express');
const router = express.Router();
const Score = require('../models/Score');

router.post('/saveScore', async (req, res) => {
    try {
        console.log('Headers:', req.headers);
        console.log('Raw body:', req.body);
        console.log('User session:', req.session);

        if (!req.session.user) {
            return res.status(401).json({ error: 'User not authenticated' });
        }

        if (!req.body || !req.body.score || !req.body.timemode) {
            return res.status(400).json({ 
                error: 'Missing required fields',
                received: req.body,
                headers: req.headers['content-type']
            });
        }

        const newScore = new Score({
            score: Number(req.body.score),
            timemode: Number(req.body.timemode),
            user: req.session.user._id
        });

        await newScore.save();
        res.status(200).json({ 
            message: 'Score saved successfully',
            savedScore: newScore
        });
    } catch (error) {
        console.error('Error saving score:', error);
        res.status(500).json({ 
            error: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
});

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
