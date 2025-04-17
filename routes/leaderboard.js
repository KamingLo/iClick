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
            clickmode: req.body.clickmode || 'mouse',
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

        const allScores = [
            ...scores5sMouse, ...scores5sKeyboard,
            ...scores10sMouse, ...scores10sKeyboard,
            ...scores15sMouse, ...scores15sKeyboard
        ];

        await Score.populate(allScores, {
            path: '_id',
            select: 'username',
            model: 'User'
        });

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

router.get('/api/scores', async (req, res) => {
    try {
        const { timemode, clickmode } = req.query;
        
        if (!timemode || !clickmode) {
            return res.status(400).json({ error: 'Missing required parameters' });
        }
        
        const timeModeNum = Number(timemode);
        
        if (![5, 10, 15].includes(timeModeNum) || !['mouse', 'keyboard'].includes(clickmode)) {
            return res.status(400).json({ error: 'Invalid parameters' });
        }
        
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
            { $limit: 10 }
        ]);
        
        await Score.populate(scores, {
            path: '_id',
            select: 'username',
            model: 'User'
        });
        
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

  router.get('/api/user/rank', async (req, res) => {
    try {
      if (!req.session.user) {
        return res.status(401).json({ error: 'User not authenticated' });
      }
  
      const userId = req.session.user._id;
      let { timemode, clickmode } = req.query;
      
      if (!timemode || !clickmode) {
        return res.status(400).json({ error: 'Missing required parameters' });
      }
      
      // Convert timemode to Number
      const timeModeNum = Number(timemode);
      
      if (![5, 10, 15].includes(timeModeNum) || !['mouse', 'keyboard'].includes(clickmode)) {
        return res.status(400).json({ error: 'Invalid parameters' });
      }
  
      // Get all scores for this time and click mode, sorted by score (descending)
      const allScores = await Score.aggregate([
        { $match: { timemode: timeModeNum, clickmode: clickmode } },
        {
          $group: {
            _id: '$user',
            score: { $max: '$score' },
            userId: { $first: '$user' }
          }
        },
        { $sort: { score: -1 } }
      ]);
  
      // Populate user data
      await Score.populate(allScores, {
        path: '_id',
        select: 'username',
        model: 'User'
      });
  
      // Find the user's position in the leaderboard
      const userRank = allScores.findIndex(score => 
        score.userId && score.userId.toString() === userId.toString()
      );
  
      // Get the user's best score for this mode
      const userBestScore = await Score.findOne({ 
        user: userId, 
        timemode: timeModeNum, 
        clickmode: clickmode 
      }).sort({ score: -1 });
  
      res.json({
        rank: userRank !== -1 ? userRank + 1 : null, // +1 because index is 0-based
        score: userBestScore ? userBestScore.score : null,
        username: req.session.user.username,
        hasScore: !!userBestScore
      });
    } catch (error) {
      console.error('Error fetching user rank:', error);
      res.status(500).json({ error: 'Failed to fetch rank' });
    }
  });

  router.delete('/api/user/scores', async (req, res) => {
    try {
      if (!req.session.user) {
        return res.status(401).json({ error: 'User not authenticated' });
      }
  
      const userId = req.session.user._id;
      let { timemode, clickmode } = req.body;
      
      if (!timemode || !clickmode) {
        return res.status(400).json({ error: 'Missing required parameters' });
      }
      
      // Convert timemode to Number
      const timeModeNum = Number(timemode);
      
      if (![5, 10, 15].includes(timeModeNum) || !['mouse', 'keyboard'].includes(clickmode)) {
        return res.status(400).json({ 
          error: 'Invalid parameters',
          received: { timemode, clickmode }
        });
      }
  
      // Delete all scores for this user, time mode, and click mode
      const result = await Score.deleteMany({ 
        user: userId, 
        timemode: timeModeNum, 
        clickmode: clickmode 
      });
  
      res.json({
        message: 'Scores deleted successfully',
        deletedCount: result.deletedCount
      });
    } catch (error) {
      console.error('Error deleting scores:', error);
      res.status(500).json({ error: 'Failed to delete scores' });
    }
  });

module.exports = router;