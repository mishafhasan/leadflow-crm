// Express application setup — middleware, routes, and error handling.
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const publicRoutes = require('./routes/public.routes');

// Import route handlers
const authRoutes = require('./routes/auth.routes');
const leadsRoutes = require('./routes/leads.routes');
const notesRoutes = require('./routes/notes.routes');
const dashboardRoutes = require('./routes/dashboard.routes');

// Import global error handler
const { errorHandler } = require('./middleware/errorHandler');
const app = express();

// Security headers
app.use(helmet());

// CORS — supports both local dev and production
const allowedOrigins = [
    process.env.FRONTEND_URL,       // Production Vercel URL
    'http://localhost:5173',         // Vite dev server
    'http://localhost:3000',         // Alternative local port
].filter(Boolean);
app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (curl, Postman, mobile apps)
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error(`CORS: origin ${origin} not allowed`));
        }
    },
    credentials: true,
}));


// Mount public routes BEFORE auth-protected routes
app.use('/api/public', publicRoutes);

// Parse incoming JSON request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Health check — a quick way to confirm the server is running
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Mount all routes
app.use('/api/auth', authRoutes);
app.use('/api/leads', leadsRoutes);
app.use('/api', notesRoutes);   // notes are at /api/leads/:leadId/notes
app.use('/api/dashboard', dashboardRoutes);

// 404 handler — catches requests to routes that don't exist
app.use((req, res) => {
    res.status(404).json({ success: false, message: 'Route not found' });
});

// Global error handler — MUST be last (Express rule: 4 parameters)
app.use(errorHandler);
module.exports = app;