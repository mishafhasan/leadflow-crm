// Check database tables and data
require('dotenv').config();
const db = require('../src/config/db');

async function check() {
  try {
    const tables = await db.query(
      "SELECT tablename FROM pg_tables WHERE schemaname = 'public'"
    );
    console.log('Tables:', tables.rows.map(r => r.tablename));

    for (const t of ['users', 'leads', 'notes']) {
      try {
        const c = await db.query('SELECT COUNT(*) FROM ' + t);
        console.log(t + ' count:', c.rows[0].count);
      } catch (e) {
        console.log(t + ' error:', e.message);
      }
    }

    process.exit(0);
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
}

check();
