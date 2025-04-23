const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const paymentRoutes = require('./routes/paymentRoutes');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/payment', paymentRoutes);

const PORT = process.env.PORT || 5000;
// Change port to 5001
app.listen(5001, '0.0.0.0', () => {
  console.log('🚀 Server running on http://192.168.1.12:5001');
});

