// JWT Auth Middleware
const jwt = require('jsonwebtoken');
const auth = (req, res, next) => {
    // Get the Authorization header
    const authHeader = req.headers.authorization;
    // Check if it exists and follows the "Bearer <token>" format
    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({
            success: false,
            message: 'No token provided',
        });
    }
    // Extract the token
    const token = authHeader.split(' ')[1];
    try {
        // Verify the token using our secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Attach the decoded user info to the request object
        req.user = decoded;
        // Pass control to the next middleware/controller
        next();
    } catch (err) {
        return res.status(401).json({
            success: false,
            message: 'Invalid or expired token',
        });
    }
};
module.exports = auth;