const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { subscribeUser, getAllSubscribers } = require('../controllers/newsletterController');
const adminAuthMiddleware = require('../middleware/adminAuthMiddleware');

router.post('/subscribe', protect, subscribeUser);
router.get('/subscribers', adminAuthMiddleware, getAllSubscribers);

module.exports = router;
