// Maps user-related URLs to their controller functions.
const router = require('express').Router();
const auth = require('../middleware/auth');
const ctrl = require('../controllers/users.controller');

// All user routes require authentication
router.use(auth);
router.get('/users', ctrl.getUsers);

module.exports = router;
