const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { 
  updateDomainProgress, 
  getDomainProgress, 
  getAllDomainsProgress,
  getRecentActivity 
} = require('../controllers/domainController');

// All routes are protected with auth middleware
router.use(protect);

// Update progress for a domain
router.post('/progress', updateDomainProgress);

// Get progress for a specific domain
router.get('/progress/:domainId', getDomainProgress);

// Get progress for all domains
router.get('/progress', getAllDomainsProgress);

// Get recent activity
router.get('/recent-activity', getRecentActivity);

module.exports = router;