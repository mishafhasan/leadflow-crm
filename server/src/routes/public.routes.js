const router = require('express').Router();
const { getPublicStats } = require('../controllers/public.controller');
router.get('/stats', getPublicStats);
module.exports = router;