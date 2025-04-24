const express = require('express');
const router = express.Router();

router.get('/global', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    res.render('global', {
        session: req.session // Pass the entire session object
    });
});

module.exports = router;