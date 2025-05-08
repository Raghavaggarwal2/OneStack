const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { updateProfile, getProfile } = require('../controllers/profileController');

// PATCH /api/users/profile - Update user profile
router.patch('/', protect, updateProfile);

// GET /api/users/profile - Get user profile
router.get('/', protect, getProfile);

module.exports = router;