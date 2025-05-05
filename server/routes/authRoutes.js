const express = require('express');
const { check } = require('express-validator');
const { register, login, logout, getProfile } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Register route with validation
router.post(
  '/register',
  [
    check('firstName', 'First name is required').not().isEmpty(),
    check('lastName', 'Last name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be at least 10 characters long').isLength({ min: 10 }),
  ],
  register
);

// Login route
router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  login
);

// Logout route
router.post('/logout', logout);

// Get user profile route (protected)
router.get('/user/profile', protect, getProfile);

module.exports = router;
