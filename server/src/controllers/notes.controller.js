// Handles get and add notes for a lead.
const Note = require('../models/note.model');
const Lead = require('../models/lead.model');
// GET /api/leads/:leadId/notes
exports.getNotes = async (req, res, next) => {
    try {
        const notes = await Note.findByLead(req.params.leadId);
        res.json({ success: true, notes });
    } catch (err) {
        next(err);
    }
};
// POST /api/leads/:leadId/notes
exports.addNote = async (req, res, next) => {
    try {
        const { content } = req.body;
        // Validate: note must have content
        if (!content?.trim()) {
            return res.status(400).json({
                success: false,
                message: 'Note content is required',
            });
        }
        // Verify the lead actually exists before adding a note to it
        const lead = await Lead.findById(req.params.leadId);
        if (!lead) {
            return res.status(404).json({
                success: false,
                message: 'Lead not found',
            });
        }
        // req.user.id comes from the JWT auth middleware — who is adding the note
        const note = await Note.create({
            leadId: req.params.leadId,
            content,
            userId: req.user.id,
        });
        res.status(201).json({ success: true, note });
    } catch (err) {
        next(err);
    }
};