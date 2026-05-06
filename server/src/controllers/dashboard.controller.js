// src/controllers/dashboard.controller.js
// Computes and returns aggregated CRM statistics for the dashboard.

const db = require('../config/db');

// GET /api/dashboard/stats
exports.getStats = async (req, res, next) => {
    try {
        // Run all 4 queries in PARALLEL using Promise.all
        const [statusCounts, dealValues, recentLeads, topSalespeople] = await Promise.all([

            // Count leads grouped by each status
            db.query(`
        SELECT status, COUNT(*) AS count
        FROM leads
        GROUP BY status
      `),

            // Total pipeline value, total won value, total lead count
            db.query(`
        SELECT
          COUNT(*)                                                      AS total_leads,
          SUM(deal_value)                                               AS total_pipeline_value,
          SUM(CASE WHEN status = 'Won' THEN deal_value ELSE 0 END)     AS total_won_value
        FROM leads
      `),

            // The 5 most recently added leads
            db.query(`
        SELECT id, lead_name, company_name, status, deal_value, created_at
        FROM leads
        ORDER BY created_at DESC
        LIMIT 5
      `),

            // Top 5 salespeople ranked by total value of won deals
            db.query(`
        SELECT
          u.name,
          COUNT(*)           AS won_count,
          SUM(l.deal_value)  AS won_value
        FROM leads l
        JOIN users u ON l.assigned_to = u.id
        WHERE l.status = 'Won'
        GROUP BY u.id, u.name
        ORDER BY won_value DESC
        LIMIT 5
      `),
        ]);

        // Turn the status rows into a lookup map: { "New": 4, "Won": 2, ... }
        const statusMap = {};
        statusCounts.rows.forEach(row => {
            statusMap[row.status] = parseInt(row.count, 10);
        });

        const agg = dealValues.rows[0];

        res.json({
            success: true,
            stats: {
                total_leads: parseInt(agg.total_leads, 10),
                new_leads: statusMap['New'] || 0,
                contacted_leads: statusMap['Contacted'] || 0,
                qualified_leads: statusMap['Qualified'] || 0,
                proposal_sent: statusMap['Proposal Sent'] || 0,
                won_leads: statusMap['Won'] || 0,
                lost_leads: statusMap['Lost'] || 0,
                total_pipeline_value: parseFloat(agg.total_pipeline_value || 0),
                total_won_value: parseFloat(agg.total_won_value || 0),
            },
            pipeline: statusCounts.rows.map(r => ({ status: r.status, count: parseInt(r.count, 10) })),
            recent_leads: recentLeads.rows,
            top_salespeople: topSalespeople.rows,
        });
    } catch (err) {
        next(err);
    }
};
