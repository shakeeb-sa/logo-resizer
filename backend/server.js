require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// --- 1. PRO-DATABASE CONNECTION (Vercel Stable Pattern) ---
const MONGO_URI = process.env.MONGO_URI;
let isConnected = false;

const connectDB = async () => {
    if (isConnected) return;
    try {
        const db = await mongoose.connect(MONGO_URI, {
            serverSelectionTimeoutMS: 5000,
        });
        isConnected = db.connections[0].readyState;
        console.log("🚀 MongoDB Connected Successfully");
    } catch (err) {
        console.error("❌ MongoDB Connection Error:", err.message);
    }
};

// Middleware: Force wait for DB on every request
app.use(async (req, res, next) => {
    await connectDB();
    next();
});

// --- 2. Routes ---
app.get('/', (req, res) => {
    res.send(`LogoFixer API Online. DB Connected: ${isConnected ? 'Yes' : 'No'}`);
});

app.use('/api/auth', require('./routes/authRoutes'));

// --- 3. Export for Vercel ---
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Local Server Running on ${PORT}`));
}

module.exports = app;