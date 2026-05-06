// Seed script for LeadFlow CRM database
// Usage: node scripts/seed.js
const bcrypt = require('bcryptjs');
require('dotenv').config();
const db = require('../src/config/db');

async function seed() {
  console.log('🌱 Seeding LeadFlow CRM database...\n');

  try {
    // ── 1. Seed admin user ─────────────────────────────────────
    const adminPasswordHash = bcrypt.hashSync('password123', 10);

    const userResult = await db.query(
      `INSERT INTO users (name, email, password, role)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (email) DO UPDATE SET password = EXCLUDED.password
       RETURNING id, name, email, role`,
      ['Admin User', 'admin@example.com', adminPasswordHash, 'admin']
    );
    const adminUser = userResult.rows[0];
    console.log('✅ Admin user:', adminUser.email, '(password: password123)');

    // ── 2. Seed salesperson ────────────────────────────────────
    const salesPasswordHash = bcrypt.hashSync('sales123', 10);

    const salesResult = await db.query(
      `INSERT INTO users (name, email, password, role)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (email) DO UPDATE SET password = EXCLUDED.password
       RETURNING id, name, email, role`,
      ['Jane Sales', 'jane@example.com', salesPasswordHash, 'salesperson']
    );
    const salesUser = salesResult.rows[0];
    console.log('✅ Sales user:', salesUser.email, '(password: sales123)');

    // ── 3. Seed sample leads ───────────────────────────────────
    const leads = [
      { name: 'Alex Rivera', company: 'TechVentures Inc', email: 'alex@techventures.io', phone: '+1-555-0101', source: 'Website', status: 'New', value: 12000 },
      { name: 'Sarah Chen', company: 'DataFlow Solutions', email: 'sarah@dataflow.com', phone: '+1-555-0102', source: 'LinkedIn', status: 'Contacted', value: 25000 },
      { name: 'Marcus Johnson', company: 'CloudNine Systems', email: 'marcus@cloudnine.tech', phone: '+1-555-0103', source: 'Referral', status: 'Qualified', value: 45000 },
      { name: 'Emily Watson', company: 'GreenLeaf Corp', email: 'emily@greenleaf.co', phone: '+1-555-0104', source: 'Cold Email', status: 'Proposal Sent', value: 68000 },
      { name: 'David Kim', company: 'Stellar Analytics', email: 'david@stellaranalytics.io', phone: '+1-555-0105', source: 'Event', status: 'Won', value: 35000 },
      { name: 'Rachel Torres', company: 'BlueSky Digital', email: 'rachel@blueskydigital.com', phone: '+1-555-0106', source: 'Website', status: 'Won', value: 52000 },
      { name: 'James Mitchell', company: 'Omega Partners', email: 'james@omegapartners.com', phone: '+1-555-0107', source: 'LinkedIn', status: 'Lost', value: 18000 },
      { name: 'Lisa Park', company: 'InnoVate Labs', email: 'lisa@innovatelabs.io', phone: '+1-555-0108', source: 'Referral', status: 'New', value: 30000 },
    ];

    // Clear existing leads first (cascade deletes notes too)
    await db.query('DELETE FROM leads');

    for (const lead of leads) {
      const assignedTo = lead.status === 'Won' || lead.status === 'Proposal Sent'
        ? adminUser.id
        : salesUser.id;

      await db.query(
        `INSERT INTO leads (lead_name, company_name, email, phone, lead_source, assigned_to, status, deal_value)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [lead.name, lead.company, lead.email, lead.phone, lead.source, assignedTo, lead.status, lead.value]
      );
    }
    console.log(`✅ ${leads.length} sample leads created`);

    // ── 4. Seed sample notes ───────────────────────────────────
    const { rows: allLeads } = await db.query('SELECT id, lead_name FROM leads');

    const sampleNotes = [
      { leadName: 'Sarah Chen', content: 'Had an introductory call. Very interested in our enterprise plan. Follow up next week.' },
      { leadName: 'Emily Watson', content: 'Proposal sent for the full suite. Decision expected by end of month.' },
      { leadName: 'David Kim', content: 'Deal closed! Onboarding starts Monday.' },
      { leadName: 'Marcus Johnson', content: 'Needs custom integration with their existing CRM. Sent technical docs.' },
    ];

    for (const note of sampleNotes) {
      const lead = allLeads.find(l => l.lead_name === note.leadName);
      if (lead) {
        await db.query(
          `INSERT INTO notes (lead_id, content, created_by) VALUES ($1, $2, $3)`,
          [lead.id, note.content, adminUser.id]
        );
      }
    }
    console.log(`✅ ${sampleNotes.length} sample notes created`);

    console.log('\n🎉 Seeding complete!');
    console.log('\nLogin credentials:');
    console.log('  Admin:  admin@example.com / password123');
    console.log('  Sales:  jane@example.com  / sales123');

    process.exit(0);
  } catch (err) {
    console.error('❌ Seed error:', err.message);
    process.exit(1);
  }
}

seed();
