// Handles get and add notes for a lead.
const Note = require('../models/note.model');
const Lead = require('../models/lead.model');
const { summariseLeadNotes } = require('../services/ai.service');
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

// POST /api/leads/:leadId/notes/summary
// Calls Gemma 4 to produce a structured AI summary of all notes for a lead.
exports.summariseNotes = async (req, res, next) => {
    try {
        const { leadId } = req.params;

        // Fetch the lead and all its notes in parallel
        const [lead, notes] = await Promise.all([
            Lead.findById(leadId),
            Note.findByLead(leadId),
        ]);

        if (!lead) {
            return res.status(404).json({ success: false, message: 'Lead not found' });
        }
        if (notes.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'No notes to summarise. Add at least one note first.',
            });
        }

        // Call Gemma 4 via the AI service
        const summary = await summariseLeadNotes({
            leadName: lead.lead_name,
            companyName: lead.company_name || 'Unknown Company',
            leadStatus: lead.status,
            notes,
        });

        res.json({ success: true, summary });

    } catch (err) {
        // Handle specific Google AI API errors cleanly
        if (err.message?.includes('GEMINI_API_KEY')) {
            return res.status(503).json({
                success: false,
                message: 'AI service is not configured. Please contact your administrator.',
            });
        }
        // Handle rate limit errors (HTTP 429 from Google AI)
        if (err.status === 429 || err.message?.includes('429') || err.message?.includes('RESOURCE_EXHAUSTED')) {
            return res.status(429).json({
                success: false,
                message: 'AI rate limit reached. Please wait a minute before trying again.',
            });
        }
        next(err);
    }
};