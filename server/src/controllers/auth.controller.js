// Handles login and "get current user" logic.
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
// POST /api/auth/login
exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        // Validate input
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email and password are required',
            });
        }
        // Find the user by email
        const user = await User.findByEmail(email);
        // Check if user exists AND if password matches the hash
        // We combine both checks to avoid revealing whether the email exists
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials',
            });
        }
        // Create a JWT token with user info embedded inside
        const token = jwt.sign(
            { id: user.id, email: user.email, name: user.name, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
        );
        // Send the token and user info (without password) to the frontend
        res.json({
            success: true,
            token,
            user: { id: user.id, name: user.name, email: user.email, role: user.role },
        });
    } catch (err) {
        next(err); // Pass any unexpected error to the global error handler
    }
};
// GET /api/auth/me
exports.getMe = async (req, res, next) => {
    try {
        // req.user was set by the auth middleware (contains decoded token data)
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }
        res.json({ success: true, user });
    } catch (err) {
        next(err);
    }
};