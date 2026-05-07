// Maps note-related URLs to their controller functions.
// Notes live under leads: /api/leads/:leadId/notes
const router = require('express').Router();
const auth = require('../middleware/auth');
const ctrl = require('../controllers/notes.controller');
// All note routes require authentication
router.use(auth);
router.get('/leads/:leadId/notes', ctrl.getNotes);   // Get all notes for a lead
router.post('/leads/:leadId/notes', ctrl.addNote);   // Add a note to a lead
router.post('/leads/:leadId/notes/summary', ctrl.summariseNotes); // AI summariser
module.exports = router;