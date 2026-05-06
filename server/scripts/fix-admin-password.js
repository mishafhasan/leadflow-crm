// Fix admin user password hash
const bcrypt = require('bcryptjs');
require('dotenv').config();
const db = require('../src/config/db');

async function fixAdminPassword() {
  try {
    const hash = bcrypt.hashSync('password123', 10);
    console.log('Generated fresh hash:', hash);

    const result = await db.query(
      'UPDATE users SET password = $1 WHERE email = $2 RETURNING id, email',
      [hash, 'admin@example.com']
    );

    if (result.rows.length > 0) {
      console.log('Password updated for user:', result.rows[0]);
    } else {
      console.log('No user found with email admin@example.com');
    }

    // Verify the fix
    const verify = await db.query(
      'SELECT id, email, password FROM users WHERE email = $1',
      ['admin@example.com']
    );
    const user = verify.rows[0];
    const match = await bcrypt.compare('password123', user.password);
    console.log('Verification - bcrypt compare result:', match);

    process.exit(0);
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
}

fixAdminPassword();
