// Entry point — loads environment variables, tests the DB connection, then starts the server.

require('dotenv').config();

const app = require('./src/app');
const { pool } = require('./src/config/db');

const PORT = process.env.PORT || 5000;
const MAX_RETRIES = 5;
const RETRY_DELAY_MS = 3000;

/**
 * Attempt to connect to the database with retries.
 * Supabase free-tier projects auto-pause after 1 week of inactivity —
 * the first connection can timeout while the DB wakes up (takes ~30-60s).
 * Retrying gives it time to come back online.
 */
async function connectWithRetry(retryCount = 0) {
    try {
        await pool.query('SELECT 1');
        console.log('✅ Database connected successfully');
        return true;
    } catch (err) {
        const attempt = retryCount + 1;
        console.error(`❌ Database connection attempt ${attempt}/${MAX_RETRIES} failed: ${err.message}`);

        if (attempt >= MAX_RETRIES) {
            console.error('💥 All connection attempts exhausted. Check your DATABASE_URL and Supabase project status.');
            return false;
        }

        // Progressively longer waits: 3s → 6s → 9s → 12s
        const delay = RETRY_DELAY_MS * attempt;
        console.log(`⏳ Retrying in ${delay / 1000}s...`);
        await new Promise(resolve => setTimeout(resolve, delay));
        return connectWithRetry(attempt);
    }
}

async function start() {
    const connected = await connectWithRetry();

    if (!connected) {
        process.exit(1);
    }

    app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
        console.log(`📋 Health check: http://localhost:${PORT}/health`);
        console.log(`🌍 Environment: ${process.env.NODE_ENV}`);
    });
}
start();