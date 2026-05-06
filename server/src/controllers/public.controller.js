// No auth required — only safe aggregate numbers, no names or emails.
const db = require('../config/db');

exports.getPublicStats = async (req, res, next) => {
    try {
        const [pipeline, totals, recentLeads, userCount] = await Promise.all([
            db.query('SELECT status, COUNT(*) AS count FROM leads GROUP BY status'),
            db.query(`
        SELECT
          COUNT(*) AS total_leads,
          SUM(deal_value) AS total_pipeline,
          SUM(CASE WHEN status = 'Won' THEN deal_value ELSE 0 END) AS total_won,
          SUM(CASE WHEN status = 'Won' THEN 1 ELSE 0 END) AS won_count
        FROM leads
      `),
            db.query(`
        SELECT company_name, status, deal_value
        FROM leads ORDER BY created_at DESC LIMIT 4
      `),
            db.query('SELECT COUNT(*) AS count FROM users'),
        ]);
        const t = totals.rows[0];
        const totalLeads = parseInt(t.total_leads, 10);
        const wonCount = parseInt(t.won_count, 10);
        const winRate = totalLeads > 0 ? Math.round((wonCount / totalLeads) * 100) : 0;
        res.json({
            success: true,
            pipeline: pipeline.rows.map(r => ({
                name: r.status,
                count: parseInt(r.count, 10),
            })),
            stats: {
                total_leads: totalLeads,
                won_count: wonCount,
                total_pipeline: parseFloat(t.total_pipeline || 0),
                team_members: parseInt(userCount.rows[0].count, 10),
                win_rate: winRate,
            },
            recent_leads: recentLeads.rows,
        });
    } catch (err) {
        next(err);
    }
};