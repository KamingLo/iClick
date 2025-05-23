const express = require('express');
const router = express.Router();

//Fungsi untuk menampilkan page global chat
router.get('/global', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    res.render('global', {
        session: req.session
    });
});

module.exports = router;