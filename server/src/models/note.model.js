// SQL queries for the notes table.
const db = require('../config/db');
// Get all notes for a specific lead, newest first
exports.findByLead = async (leadId) => {
    const { rows } = await db.query(
        `SELECT
       n.id, n.content, n.created_at,
       u.name AS created_by_name
     FROM notes n
     LEFT JOIN users u ON n.created_by = u.id
     WHERE n.lead_id = $1
     ORDER BY n.created_at DESC`,
        [leadId]
    );
    return rows;
};
// Add a new note to a lead
exports.create = async ({ leadId, content, userId }) => {
    // Insert the note and get its ID back
    const { rows } = await db.query(
        `INSERT INTO notes (lead_id, content, created_by)
     VALUES ($1, $2, $3) RETURNING id`,
        [leadId, content, userId]
    );
    // Fetch the full note with the creator's name joined
    const { rows: result } = await db.query(
        `SELECT n.id, n.content, n.created_at, u.name AS created_by_name
     FROM notes n
     LEFT JOIN users u ON n.created_by = u.id
     WHERE n.id = $1`,
        [rows[0].id]
    );
    return result[0];
};