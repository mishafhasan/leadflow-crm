// Maps lead-related URLs to their controller functions.
const router = require('express').Router();
const auth = require('../middleware/auth');
const ctrl = require('../controllers/leads.controller');
// All lead routes require authentication
router.use(auth);
router.get('/', ctrl.getLeads);        // List all leads (with filters)
router.post('/', ctrl.createLead);      // Create a new lead
router.get('/:id', ctrl.getLead);       // Get a single lead
router.put('/:id', ctrl.updateLead);    // Update a lead
router.delete('/:id', ctrl.deleteLead); // Delete a lead
module.exports = router;