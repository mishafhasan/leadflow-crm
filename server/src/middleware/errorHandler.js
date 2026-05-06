// Global error handler — catches all errors thrown by controllers/models.
const errorHandler = (err, req, res, next) => {
    // Log the error with timestamp for debugging
    console.error(`[${new Date().toISOString()}] ${err.stack || err.message}`);
    // Handle specific PostgreSQL error codes
    // Unique constraint violation (e.g., duplicate email)
    if (err.code === '23505') {
        return res.status(409).json({
            success: false,
            message: 'A record with that value already exists',
        });
    }
    // Foreign key constraint violation (e.g., assigning to a non-existent user)
    if (err.code === '23503') {
        return res.status(400).json({
            success: false,
            message: 'Referenced record does not exist',
        });
    }
    // Invalid UUID format (e.g., passing "abc" as a lead ID)
    if (err.code === '22P02') {
        return res.status(400).json({
            success: false,
            message: 'Invalid ID format',
        });
    }
    // For all other errors, send a generic response
    const status = err.status || err.statusCode || 500;
    // Hide internal error details from users in production
    // Show the actual error message for easier debugging in development
    const message =
        process.env.NODE_ENV === 'production' && status === 500
            ? 'Internal server error'
            : err.message || 'Internal server error';
    res.status(status).json({ success: false, message });
};
module.exports = { errorHandler };
