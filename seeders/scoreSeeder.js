const mongoose = require('mongoose');
const Score = require('../models/Score');
const User = require('../models/user');

mongoose.connect("mongodb://127.0.0.1:27017/mydatabase")
    .then(() => console.log('Connected to MongoDB for seeding'))
    .catch(err => console.error('MongoDB connection error:', err));

const seedDB = async () => {
    try {
        const users = await User.find();
        if (users.length === 0) {
            console.log('No users found in database. Please create users first.');
            return;
        }

        await Score.deleteMany({});
        console.log('Cleared existing scores');

        const dummyScores = [];
        for (const user of users) {
            const score = {
                score: Math.floor(Math.random() * 1000) + 100,
                user: user._id
            };
            dummyScores.push(score);
            console.log(`Created score for user: ${user.username}`);
        }
        
        const result = await Score.insertMany(dummyScores);
        console.log(`Successfully seeded ${result.length} scores`);
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        mongoose.connection.close();
    }
};

seedDB();
