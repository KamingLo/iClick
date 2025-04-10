const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
    score: {
        type: Number,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    timemode:
    {   type: Number},
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Score', scoreSchema);
