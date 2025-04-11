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
            clickmode: req.body.clickmode || 'mouse', // Add this line to store the click mode
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
        // Get scores for 5s mode with mouse
        const scores5sMouse = await Score.aggregate([
            { $match: { timemode: 5, clickmode: 'mouse' } },
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

        // Get scores for 5s mode with keyboard
        const scores5sKeyboard = await Score.aggregate([
            { $match: { timemode: 5, clickmode: 'keyboard' } },
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

        // Get scores for 10s mode with mouse
        const scores10sMouse = await Score.aggregate([
            { $match: { timemode: 10, clickmode: 'mouse' } },
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

        // Get scores for 10s mode with keyboard
        const scores10sKeyboard = await Score.aggregate([
            { $match: { timemode: 10, clickmode: 'keyboard' } },
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

        // Get scores for 15s mode with mouse
        const scores15sMouse = await Score.aggregate([
            { $match: { timemode: 15, clickmode: 'mouse' } },
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

        // Get scores for 15s mode with keyboard
        const scores15sKeyboard = await Score.aggregate([
            { $match: { timemode: 15, clickmode: 'keyboard' } },
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

        // Combine all scores for population
        const allScores = [
            ...scores5sMouse, ...scores5sKeyboard,
            ...scores10sMouse, ...scores10sKeyboard,
            ...scores15sMouse, ...scores15sKeyboard
        ];

        // Populate user information for all scores
        await Score.populate(allScores, {
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
            scores5sMouse: mapScores(scores5sMouse),
            scores5sKeyboard: mapScores(scores5sKeyboard),
            scores10sMouse: mapScores(scores10sMouse),
            scores10sKeyboard: mapScores(scores10sKeyboard),
            scores15sMouse: mapScores(scores15sMouse),
            scores15sKeyboard: mapScores(scores15sKeyboard)
        });
    } catch (error) {
        console.error('Leaderboard error:', error);
        res.render('leaderboard', { 
            scores5sMouse: [], 
            scores5sKeyboard: [],
            scores10sMouse: [], 
            scores10sKeyboard: [],
            scores15sMouse: [], 
            scores15sKeyboard: []
        });
    }
});

// Add this to leaderboard.js
router.get('/api/scores', async (req, res) => {
    try {
        const { timemode, clickmode } = req.query;
        
        if (!timemode || !clickmode) {
            return res.status(400).json({ error: 'Missing required parameters' });
        }
        
        // Convert timemode to number
        const timeModeNum = Number(timemode);
        
        // Validate parameters
        if (![5, 10, 15].includes(timeModeNum) || !['mouse', 'keyboard'].includes(clickmode)) {
            return res.status(400).json({ error: 'Invalid parameters' });
        }
        
        // Get top scores for the specific mode
        const scores = await Score.aggregate([
            { $match: { timemode: timeModeNum, clickmode: clickmode } },
            {
                $group: {
                    _id: '$user',
                    score: { $max: '$score' },
                    userId: { $first: '$user' }
                }
            },
            { $sort: { score: -1 } },
            { $limit: 5 } // Only get top 5 for compact display
        ]);
        
        // Populate user information
        await Score.populate(scores, {
            path: '_id',
            select: 'username',
            model: 'User'
        });
        
        // Map scores with usernames
        const formattedScores = scores.map(score => ({
            score: score.score,
            username: score._id ? score._id.username : 'Unknown User'
        }));
        
        res.json(formattedScores);
    } catch (error) {
        console.error('Error fetching scores:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/api/user/scores', async (req, res) => {
    try {
      if (!req.session.user) {
        return res.status(401).json({ error: 'User not authenticated' });
      }
  
      const userId = req.session.user._id;
      const clickmode = req.query.clickmode || 'mouse';
  
      if (!['mouse', 'keyboard'].includes(clickmode)) {
        return res.status(400).json({ error: 'Invalid click mode' });
      }
  
      const scores5s = await Score.findOne({ user: userId, timemode: 5, clickmode }).sort({ score: -1 });
      const scores10s = await Score.findOne({ user: userId, timemode: 10, clickmode }).sort({ score: -1 });
      const scores15s = await Score.findOne({ user: userId, timemode: 15, clickmode }).sort({ score: -1 });
  
      res.json({
        scores5s: scores5s ? scores5s.score : '-',
        scores10s: scores10s ? scores10s.score : '-',
        scores15s: scores15s ? scores15s.score : '-'
      });
    } catch (error) {
      console.error('Error fetching user scores:', error);
      res.status(500).json({ error: 'Failed to fetch scores' });
    }
  });

module.exports = router;