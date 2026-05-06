// Dashboard stats endpoint — protected, read-only.
const router = require('express').Router();
const auth = require('../middleware/auth');
const { getStats } = require('../controllers/dashboard.controller');
// GET /api/dashboard/stats — requires authentication
router.get('/stats', auth, getStats);
module.exports = router;