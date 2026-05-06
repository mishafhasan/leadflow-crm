// Handles HTTP logic for lead CRUD operations.
const Lead = require('../models/lead.model');
// GET /api/leads
exports.getLeads = async (req, res, next) => {
    try {
        const { status, source, assignedTo, search, page, limit } = req.query;
        const result = await Lead.findAll({ status, source, assignedTo, search, page, limit });
        res.json({ success: true, ...result });
    } catch (err) {
        next(err);
    }
};
// GET /api/leads/:id
exports.getLead = async (req, res, next) => {
    try {
        const lead = await Lead.findById(req.params.id);
        if (!lead) {
            return res.status(404).json({ success: false, message: 'Lead not found' });
        }
        res.json({ success: true, lead });
    } catch (err) {
        next(err);
    }
};
// POST /api/leads
exports.createLead = async (req, res, next) => {
    try {
        const { lead_name } = req.body;
        if (!lead_name?.trim()) {
            return res.status(400).json({ success: false, message: 'Lead name is required' });
        }
        const lead = await Lead.create(req.body);
        res.status(201).json({ success: true, lead });
    } catch (err) {
        next(err);
    }
};
// PUT /api/leads/:id
exports.updateLead = async (req, res, next) => {
    try {
        const lead = await Lead.update(req.params.id, req.body);
        if (!lead) {
            return res.status(404).json({ success: false, message: 'Lead not found' });
        }
        res.json({ success: true, lead });
    } catch (err) {
        next(err);
    }
};
// DELETE /api/leads/:id
exports.deleteLead = async (req, res, next) => {
    try {
        const deleted = await Lead.remove(req.params.id);
        if (!deleted) {
            return res.status(404).json({ success: false, message: 'Lead not found' });
        }
        res.json({ success: true, message: 'Lead deleted successfully' });
    } catch (err) {
        next(err);
    }
};