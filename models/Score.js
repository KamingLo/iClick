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
<<<<<<< HEAD
=======
    timemode: {
        type: Number
    },
    clickmode: {
        type: String,
        enum: ['mouse', 'keyboard'],
        default: 'mouse'
    },
>>>>>>> ver.2.1.28
    createdAt: {
        type: Date,
        default: Date.now
    }
});

<<<<<<< HEAD
module.exports = mongoose.model('Score', scoreSchema);
=======
module.exports = mongoose.model('Score', scoreSchema);
>>>>>>> ver.2.1.28
