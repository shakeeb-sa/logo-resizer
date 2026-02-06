const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    // Brilliant Feature: Save the user's brand colors
    favoriteColors: [{ type: String, default: ['#ffffff', '#000000'] }],
    // Brilliant Feature: Save custom size templates
    customPresets: [{
        name: String,
        width: Number,
        height: Number
    }]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);