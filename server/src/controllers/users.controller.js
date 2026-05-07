// Handles listing all users (for the "Assigned To" dropdown).
const User = require('../models/user.model');

// GET /api/users
exports.getUsers = async (req, res, next) => {
    try {
        const users = await User.findAll();
        res.json({ success: true, users });
    } catch (err) {
        next(err);
    }
};
