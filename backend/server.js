const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./db');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/payment', require('./routes/paymentRoutes'));

// Update payment verification to handle subscriptions
app.post('/api/payment/verify', async (req, res) => {
  try {
    // ... existing verification code ...
    
    // After successful verification
    const user = await User.findById(req.body.userId);
    if (user) {
      user.isSubscribed = true;
      user.subscriptionExpiry = new Date(Date.now() + 180 * 24 * 60 * 60 * 1000); // 6 months
      await user.save();
    }

    res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on http://192.168.1.4:${PORT}`);
});