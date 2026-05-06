// Central database connection using a connection pool.
const { Pool } = require('pg');
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    // Supabase requires SSL in production
    ssl: process.env.NODE_ENV === 'production'
        ? { rejectUnauthorized: false }
        : false,
    // Pool configuration
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});
pool.on('error', (err) => {
    console.error('Unexpected database error:', err);
    process.exit(-1);
});
module.exports = {
    // The function every model will call
    // Usage: const { rows } = await db.query('SELECT * FROM leads WHERE id = $1', [id])
    query: (text, params) => pool.query(text, params),
    // Export the pool itself in case we need direct access (e.g., testing DB connection on startup)
    pool,
};