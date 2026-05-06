// SQL queries for the users table.
const db = require('../config/db');
// Find a user by email — used during login
exports.findByEmail = async (email) => {
    const { rows } = await db.query(
        'SELECT id, name, email, password, role FROM users WHERE email = $1',
        [email.toLowerCase().trim()]
    );
    return rows[0] || null;
};
// Find a user by ID — used by the "get current user" endpoint
exports.findById = async (id) => {
    const { rows } = await db.query(
        'SELECT id, name, email, role FROM users WHERE id = $1',
        [id]
    );
    return rows[0] || null;
};