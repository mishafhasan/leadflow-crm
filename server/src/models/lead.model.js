// SQL queries for the leads table — the heart of the CRM.
const db = require('../config/db');
// Base SELECT query — joins with users table to get the assigned salesperson's name
const BASE_SELECT = `
  SELECT
    l.id, l.lead_name, l.company_name, l.email, l.phone,
    l.lead_source, l.status, l.deal_value,
    l.created_at, l.updated_at,
    l.assigned_to, u.name AS assigned_to_name
  FROM leads l
  LEFT JOIN users u ON l.assigned_to = u.id
`;
// Get all leads with optional filters and pagination
exports.findAll = async ({ status, source, assignedTo, search, page = 1, limit = 20 }) => {
    const conditions = [];
    const params = [];
    let i = 1;
    if (status) {
        conditions.push(`l.status = $${i++}`);
        params.push(status);
    }
    if (source) {
        conditions.push(`l.lead_source = $${i++}`);
        params.push(source);
    }
    if (assignedTo) {
        conditions.push(`l.assigned_to = $${i++}`);
        params.push(assignedTo);
    }
    if (search) {
        // ILIKE = case-insensitive search across multiple columns
        conditions.push(
            `(l.lead_name ILIKE $${i} OR l.company_name ILIKE $${i} OR l.email ILIKE $${i})`
        );
        params.push(`%${search}%`);
        i++;
    }
    const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
    const offset = (page - 1) * limit;
    // Run both queries in parallel for performance
    const [dataResult, countResult] = await Promise.all([
        db.query(
            `${BASE_SELECT} ${where} ORDER BY l.created_at DESC LIMIT $${i} OFFSET $${i + 1}`,
            [...params, limit, offset]
        ),
        db.query(`SELECT COUNT(*) FROM leads l ${where}`, params),
    ]);
    return {
        leads: dataResult.rows,
        total: parseInt(countResult.rows[0].count, 10),
        page: parseInt(page, 10),
        totalPages: Math.ceil(parseInt(countResult.rows[0].count, 10) / limit),
    };
};
// Get a single lead by ID
exports.findById = async (id) => {
    const { rows } = await db.query(`${BASE_SELECT} WHERE l.id = $1`, [id]);
    return rows[0] || null;
};
// Create a new lead
exports.create = async (data) => {
    const { lead_name, company_name, email, phone, lead_source, assigned_to, status, deal_value } = data;
    const { rows } = await db.query(
        `INSERT INTO leads (lead_name, company_name, email, phone, lead_source, assigned_to, status, deal_value)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`,
        [lead_name, company_name, email, phone, lead_source, assigned_to || null, status || 'New', deal_value || 0]
    );
    // Return the full lead with joined user name
    return exports.findById(rows[0].id);
};
// Update an existing lead (only updates fields that are provided)
exports.update = async (id, data) => {
    const fields = ['lead_name', 'company_name', 'email', 'phone', 'lead_source', 'assigned_to', 'status', 'deal_value'];
    const updates = [];
    const params = [];
    let i = 1;
    // Only build SET clauses for fields that were actually sent in the request
    for (const field of fields) {
        if (data[field] !== undefined) {
            updates.push(`${field} = $${i++}`);
            params.push(data[field]);
        }
    }
    // If nothing to update, just return the existing lead
    if (!updates.length) return exports.findById(id);
    params.push(id);
    await db.query(
        `UPDATE leads SET ${updates.join(', ')} WHERE id = $${i}`,
        params
    );
    return exports.findById(id);
};
// Delete a lead
exports.remove = async (id) => {
    const { rowCount } = await db.query('DELETE FROM leads WHERE id = $1', [id]);
    return rowCount > 0; // Returns true if a row was actually deleted
};