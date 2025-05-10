const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const domainRoutes = require('./routes/domainRoutes');
const profileRoutes = require('./routes/profileRoutes');
const newsletterRoute = require('./routes/newsletterRoutes');
const mongoose = require('mongoose');


// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(express.json());

// Update CORS configuration to allow requests from frontend
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.FRONTEND_URL || 'https://yourproductionurl.com' 
    : 'http://localhost:3000',
  credentials: true
}));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/domains', domainRoutes);
app.use('/api/users/profile', profileRoutes);
app.use('/api/newsletter', newsletterRoute);

// Health check route
app.get('/', (req, res) => {
  res.json({ message: 'API is running...' });
});

// Debug/Testing route to check DB status - REMOVE IN PRODUCTION
app.get('/api/debug/db-status', async (req, res) => {
  try {
    const collections = await mongoose.connection.db.listCollections().toArray();
    const collectionNames = collections.map(c => c.name);
    
    // Count documents in each collection
    const stats = {};
    for (const name of collectionNames) {
      stats[name] = await mongoose.connection.db.collection(name).countDocuments();
    }
    
    res.json({ 
      database: mongoose.connection.name,
      collections: collectionNames,
      stats,
      connected: mongoose.connection.readyState === 1
    });
  } catch (error) {
    console.error('DB Status Error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Debug/Testing route to reset users collection - REMOVE IN PRODUCTION
app.delete('/api/debug/reset-users', async (req, res) => {
  try {
    const result = await mongoose.connection.db.collection('users').deleteMany({});
    res.json({ 
      message: 'Users collection reset',
      deletedCount: result.deletedCount 
    });
  } catch (error) {
    console.error('Reset Users Error:', error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
