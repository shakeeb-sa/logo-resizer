const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// @route POST /api/auth/register
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: 'User already exists' });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = await User.create({ username, email, password: hashedPassword });

        res.status(201).json({
            _id: user._id,
            username: user.username,
            token: generateToken(user._id)
        });
    } catch (err) { res.status(500).json({ message: err.message }); }
});

// @route POST /api/auth/login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                _id: user._id,
                username: user.username,
                favoriteColors: user.favoriteColors, // Brilliant Feature: Return their brand colors
                token: generateToken(user._id)
            });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (err) { res.status(500).json({ message: err.message }); }
});
const { protect } = require('../middleware/auth');

// @route PUT /api/auth/brand-kit
// @desc Update user favorite colors and size presets
router.put('/brand-kit', protect, async (req, res) => {
    const { favoriteColors, customPresets } = req.body;
    try {
        const user = await User.findById(req.user._id);
        if (favoriteColors) user.favoriteColors = favoriteColors;
        if (customPresets) user.customPresets = customPresets;
        
        await user.save();
        res.json({ favoriteColors: user.favoriteColors, customPresets: user.customPresets });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;