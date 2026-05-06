// Central database connection using a connection pool.
const { Pool } = require('pg');

const isProduction = process.env.NODE_ENV === 'production';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    // Supabase (and its connection pooler) requires SSL in ALL environments
    ssl: isProduction
        ? { rejectUnauthorized: false }
        : { rejectUnauthorized: false },
    // Pool configuration tuned for Supabase's transaction-mode pooler (Supavisor)
    max: isProduction ? 10 : 5,
    idleTimeoutMillis: 20000,
    connectionTimeoutMillis: 15000, // 15s — remote DB needs more time, especially on cold start
});
pool.on('error', (err) => {
    // Log but don't crash — transient pool errors can self-recover
    console.error('⚠️ Unexpected pool error:', err.message);
});
module.exports = {
    // The function every model will call
    // Usage: const { rows } = await db.query('SELECT * FROM leads WHERE id = $1', [id])
    query: (text, params) => pool.query(text, params),
    // Export the pool itself in case we need direct access (e.g., testing DB connection on startup)
    pool,
};