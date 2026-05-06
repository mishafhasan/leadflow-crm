// Maps auth-related URLs to their controller functions.
const router = require('express').Router();
const { login, getMe } = require('../controllers/auth.controller');
const auth = require('../middleware/auth');
// Public route — no auth middleware needed
router.post('/login', login);
// Protected route — auth middleware verifies the token first
router.get('/me', auth, getMe);
module.exports = router;