const express = require('express');
const User = require('../models/user');
const Score = require('../models/Score');

const router = express.Router();

router.delete('/api/user/delete', async (req, res) => {
  try {
    if (!req.session.user) {
      return res.status(401).json({ success: false, message: 'Not authenticated' });
    }

    const userId = req.session.user._id;

    await Score.deleteMany({ user: userId });
    
    await User.findByIdAndDelete(userId);

    req.session.destroy((err) => {
      if (err) {
        console.error('Error Destroying Session:', err);
      }
      
      res.json({ success: true, message: 'Account Has Been Deleted' });
    });
  } catch (error) {
    console.error('Error Deleting Account:', error);
    res.status(500).json({ success: false, message: 'Failed To Delete Account' });
  }
});

module.exports = router;