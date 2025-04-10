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
        // Get scores for each timeMode
        const scores5s = await Score.aggregate([
            { $match: { timemode: 5 } },
            {
                $group: {
                    _id: '$user',
                    score: { $max: '$score' },
                    userId: { $first: '$user' }
                }
            },
            { $sort: { score: -1 } },
            { $limit: 10 }
        ]);

        const scores10s = await Score.aggregate([
            { $match: { timemode: 10 } },
            {
                $group: {
                    _id: '$user',
                    score: { $max: '$score' },
                    userId: { $first: '$user' }
                }
            },
            { $sort: { score: -1 } },
            { $limit: 10 }
        ]);

        const scores15s = await Score.aggregate([
            { $match: { timemode: 15 } },
            {
                $group: {
                    _id: '$user',
                    score: { $max: '$score' },
                    userId: { $first: '$user' }
                }
            },
            { $sort: { score: -1 } },
            { $limit: 10 }
        ]);

        // Populate user information for all scores
        await Score.populate(scores5s.concat(scores10s, scores15s), {
            path: '_id',
            select: 'username',
            model: 'User'
        });

        // Map scores with usernames
        const mapScores = scores => scores.map(score => ({
            score: score.score,
            namaUser: score._id ? score._id.username : 'Unknown User'
        }));

        res.render('leaderboard', {
            scores5s: mapScores(scores5s),
            scores10s: mapScores(scores10s),
            scores15s: mapScores(scores15s)
        });
    } catch (error) {
        console.error('Leaderboard error:', error);
        res.render('leaderboard', { 
            scores5s: [], 
            scores10s: [], 
            scores15s: [] 
        });
    }
});
module.exports = router;
