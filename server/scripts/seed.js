// Seed script for LeadFlow CRM database
// Usage: node scripts/seed.js
// Mirrors src/utils/data.ts dummy data into Supabase
const bcrypt = require('bcryptjs');
require('dotenv').config();
const db = require('../src/config/db');

// Fixed UUIDs — keeps FK references consistent across re-runs
const USER_IDS = {
  admin: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  kasun: 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22',
  dasun: 'c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33',
};

const LEAD_IDS = {
  chamuditha: 'd1eebc99-9c0b-4ef8-bb6d-6bb9bd380a01',
  nilantha: 'd1eebc99-9c0b-4ef8-bb6d-6bb9bd380a02',
  saman: 'd1eebc99-9c0b-4ef8-bb6d-6bb9bd380a03',
  amali: 'd1eebc99-9c0b-4ef8-bb6d-6bb9bd380a04',
  ruwanthi: 'd1eebc99-9c0b-4ef8-bb6d-6bb9bd380a05',
  dinesh: 'd1eebc99-9c0b-4ef8-bb6d-6bb9bd380a06',
};

const NOTE_IDS = {
  n1: 'e1eebc99-9c0b-4ef8-bb6d-6bb9bd380a01',
  n2: 'e1eebc99-9c0b-4ef8-bb6d-6bb9bd380a02',
  n3: 'e1eebc99-9c0b-4ef8-bb6d-6bb9bd380a03',
  n4: 'e1eebc99-9c0b-4ef8-bb6d-6bb9bd380a04',
};

async function seed() {
  console.log('🌱 Seeding LeadFlow CRM database...\n');

  try {
    // ── 1. Clean slate (reverse FK order) ────────────────────────
    await db.query('DELETE FROM notes');
    await db.query('DELETE FROM leads');
    await db.query('DELETE FROM users');
    console.log('✅ Cleared existing data (notes, leads, users)');

    // ── 2. Insert users with fixed UUIDs ──────────────────────────
    const passwordHash = bcrypt.hashSync('password123', 10);

    const users = [
      { id: USER_IDS.admin, name: 'Admin User', email: 'admin@example.com', role: 'admin', created_at: '2026-01-01T00:00:00Z' },
      { id: USER_IDS.kasun, name: 'Kasun Perera', email: 'kasun@leadflow.lk', role: 'salesperson', created_at: '2026-01-01T00:00:00Z' },
      { id: USER_IDS.dasun, name: 'Dasun Silva', email: 'dasun@leadflow.lk', role: 'salesperson', created_at: '2026-01-01T00:00:00Z' },
    ];

    for (const u of users) {
      await db.query(
        `INSERT INTO users (id, name, email, password, role, created_at)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [u.id, u.name, u.email, passwordHash, u.role, u.created_at]
      );
    }
    console.log(`✅ ${users.length} users created (password: password123)`);

    // ── 3. Insert leads with fixed UUIDs ──────────────────────────
    const leads = [
      { id: LEAD_IDS.chamuditha, name: 'Chamuditha Samarawickrama', company: 'Dialog Axiata', email: 'chamuditha@dialog.lk', phone: '+94 77 123 4567', source: 'Website', assigned_to: USER_IDS.kasun, status: 'Qualified', value: 7500000, created_at: '2026-04-28T10:00:00Z', updated_at: '2026-05-01T14:30:00Z' },
      { id: LEAD_IDS.nilantha, name: 'Nilantha Perera', company: 'MAS Holdings', email: 'nilantha@masholdings.lk', phone: '+94 71 234 5678', source: 'LinkedIn', assigned_to: USER_IDS.dasun, status: 'Proposal Sent', value: 13500000, created_at: '2026-04-25T09:00:00Z', updated_at: '2026-04-30T11:00:00Z' },
      { id: LEAD_IDS.saman, name: 'Saman Silva', company: 'John Keells Holdings', email: 'saman@jkh.lk', phone: '+94 70 345 6789', source: 'Referral', assigned_to: USER_IDS.kasun, status: 'Won', value: 18000000, created_at: '2026-04-20T08:00:00Z', updated_at: '2026-04-22T16:00:00Z' },
      { id: LEAD_IDS.amali, name: 'Amali Fernando', company: 'Bank of Ceylon', email: 'amali@boc.lk', phone: '+94 76 456 7890', source: 'Cold Email', assigned_to: USER_IDS.dasun, status: 'New', value: 4500000, created_at: '2026-05-04T13:00:00Z', updated_at: '2026-05-04T13:00:00Z' },
      { id: LEAD_IDS.ruwanthi, name: 'Ruwanthi Jayasekara', company: 'Hayleys PLC', email: 'ruwanthi@hayleys.lk', phone: '+94 72 567 8901', source: 'Event', assigned_to: USER_IDS.kasun, status: 'Contacted', value: 9600000, created_at: '2026-05-02T10:00:00Z', updated_at: '2026-05-03T09:00:00Z' },
      { id: LEAD_IDS.dinesh, name: 'Dinesh Gunawardena', company: 'Hemas Holdings', email: 'dinesh@hemas.lk', phone: '+94 78 678 9012', source: 'Website', assigned_to: USER_IDS.dasun, status: 'Lost', value: 5400000, created_at: '2026-03-15T11:00:00Z', updated_at: '2026-04-01T10:00:00Z' },
    ];

    for (const l of leads) {
      await db.query(
        `INSERT INTO leads (id, lead_name, company_name, email, phone, lead_source, assigned_to, status, deal_value, created_at, updated_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
        [l.id, l.name, l.company, l.email, l.phone, l.source, l.assigned_to, l.status, l.value, l.created_at, l.updated_at]
      );
    }
    console.log(`✅ ${leads.length} leads created`);

    // ── 4. Insert notes with fixed UUIDs ──────────────────────────
    const notes = [
      { id: NOTE_IDS.n1, lead_id: LEAD_IDS.chamuditha, content: 'Initial call went well. Interested in enterprise plan.', created_by: USER_IDS.kasun, created_at: '2026-04-29T10:00:00Z' },
      { id: NOTE_IDS.n2, lead_id: LEAD_IDS.chamuditha, content: 'Sent follow-up email with pricing details.', created_by: USER_IDS.kasun, created_at: '2026-05-01T14:30:00Z' },
      { id: NOTE_IDS.n3, lead_id: LEAD_IDS.nilantha, content: 'Demo scheduled for next Tuesday.', created_by: USER_IDS.dasun, created_at: '2026-04-28T09:00:00Z' },
      { id: NOTE_IDS.n4, lead_id: LEAD_IDS.saman, content: 'Contract signed! Deal closed.', created_by: USER_IDS.kasun, created_at: '2026-04-22T16:00:00Z' },
    ];

    for (const n of notes) {
      await db.query(
        `INSERT INTO notes (id, lead_id, content, created_by, created_at)
         VALUES ($1, $2, $3, $4, $5)`,
        [n.id, n.lead_id, n.content, n.created_by, n.created_at]
      );
    }
    console.log(`✅ ${notes.length} notes created`);

    console.log('\n🎉 Seeding complete!');
    console.log('\nLogin credentials:');
    console.log('  Admin:      admin@example.com   / password123');
    console.log('  Kasun:      kasun@leadflow.lk    / kasun123');
    console.log('  Dasun:      dasun@leadflow.lk    / dasun123');

    process.exit(0);
  } catch (err) {
    console.error('❌ Seed error:', err.message);
    process.exit(1);
  }
}

seed();
