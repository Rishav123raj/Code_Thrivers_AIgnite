// server.js

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// Routes
const userRoutes = require('./routes/userRoutes');
const ocrRoutes = require('./routes/ocrRoutes');
const userDetailRoutes = require('./routes/userDetailRoutes'); // Import userDetailRoutes

app.use('/api', userDetailRoutes);       // e.g. /api/user/signup
app.use('/api', userRoutes);           // e.g. /api/user/profile
app.use('/api/ocr', ocrRoutes);        // e.g. /api/ocr/upload

// Server Listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
