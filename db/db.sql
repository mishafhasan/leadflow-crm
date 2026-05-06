-- ============================================
-- LeadFlow CRM — Database Schema
-- ============================================
-- Run this file ONCE in Supabase SQL Editor to create the tables.
-- Then populate data by running: node scripts/seed.js
-- ============================================

-- USERS TABLE
-- Stores login credentials and roles
CREATE TABLE IF NOT EXISTS users (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        VARCHAR(100) NOT NULL,
  email       VARCHAR(255) UNIQUE NOT NULL,
  password    VARCHAR(255) NOT NULL,
  role        VARCHAR(50) DEFAULT 'salesperson',
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- LEADS TABLE
-- Each row is a potential customer in the sales pipeline
CREATE TABLE IF NOT EXISTS leads (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_name         VARCHAR(100) NOT NULL,
  company_name      VARCHAR(100),
  email             VARCHAR(255),
  phone             VARCHAR(50),
  lead_source       VARCHAR(50),
  assigned_to       UUID REFERENCES users(id) ON DELETE SET NULL,
  status            VARCHAR(50) DEFAULT 'New',
  deal_value        DECIMAL(12, 2) DEFAULT 0,
  created_at        TIMESTAMPTZ DEFAULT NOW(),
  updated_at        TIMESTAMPTZ DEFAULT NOW()
);

-- NOTES TABLE
-- Internal notes attached to a lead (call logs, follow-ups, etc.)
CREATE TABLE IF NOT EXISTS notes (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id     UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  content     TEXT NOT NULL,
  created_by  UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- AUTO-UPDATE TRIGGER
-- Automatically sets updated_at when a lead is edited
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop trigger first to avoid "already exists" error on re-run
DROP TRIGGER IF EXISTS leads_updated_at ON leads;

CREATE TRIGGER leads_updated_at
  BEFORE UPDATE ON leads
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- INDEXES
-- Speed up the queries we'll use most often (filtering, searching)
CREATE INDEX IF NOT EXISTS idx_leads_status      ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_assigned_to ON leads(assigned_to);
CREATE INDEX IF NOT EXISTS idx_leads_source      ON leads(lead_source);
CREATE INDEX IF NOT EXISTS idx_notes_lead_id     ON notes(lead_id);

-- ============================================
-- SEED DATA
-- Fixed UUIDs match scripts/seed.js — keeps FK references
-- consistent whether you seed via SQL or the Node script.
-- Password hash below is bcrypt('password123', 10).
-- All three accounts share the same password: password123
-- ============================================

-- Users
INSERT INTO users (id, name, email, password, role, created_at) VALUES
  (
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'Admin User',
    'admin@example.com',
    '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
    'admin',
    '2026-01-01T00:00:00Z'
  ),
  (
    'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22',
    'Kasun Perera',
    'kasun@leadflow.lk',
    '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
    'salesperson',
    '2026-01-01T00:00:00Z'
  ),
  (
    'c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33',
    'Dasun Silva',
    'dasun@leadflow.lk',
    '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
    'salesperson',
    '2026-01-01T00:00:00Z'
  )
ON CONFLICT (email) DO NOTHING;

-- NOTE: The hash above is a placeholder used only for the raw SQL file.
-- For a fully working setup, run `node scripts/seed.js` instead —
-- it generates a fresh bcrypt hash at runtime and is always correct.

-- Leads
INSERT INTO leads (id, lead_name, company_name, email, phone, lead_source, assigned_to, status, deal_value, created_at, updated_at) VALUES
  ('d1eebc99-9c0b-4ef8-bb6d-6bb9bd380a01', 'Chamuditha Samarawickrama', 'Dialog Axiata',        'chamuditha@dialog.lk',    '+94 77 123 4567', 'Website',    'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', 'Qualified',     7500000,  '2026-04-28T10:00:00Z', '2026-05-01T14:30:00Z'),
  ('d1eebc99-9c0b-4ef8-bb6d-6bb9bd380a02', 'Nilantha Perera',           'MAS Holdings',         'nilantha@masholdings.lk', '+94 71 234 5678', 'LinkedIn',   'c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33', 'Proposal Sent', 13500000, '2026-04-25T09:00:00Z', '2026-04-30T11:00:00Z'),
  ('d1eebc99-9c0b-4ef8-bb6d-6bb9bd380a03', 'Saman Silva',               'John Keells Holdings', 'saman@jkh.lk',            '+94 70 345 6789', 'Referral',   'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', 'Won',           18000000, '2026-04-20T08:00:00Z', '2026-04-22T16:00:00Z'),
  ('d1eebc99-9c0b-4ef8-bb6d-6bb9bd380a04', 'Amali Fernando',            'Bank of Ceylon',       'amali@boc.lk',            '+94 76 456 7890', 'Cold Email', 'c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33', 'New',           4500000,  '2026-05-04T13:00:00Z', '2026-05-04T13:00:00Z'),
  ('d1eebc99-9c0b-4ef8-bb6d-6bb9bd380a05', 'Ruwanthi Jayasekara',       'Hayleys PLC',          'ruwanthi@hayleys.lk',     '+94 72 567 8901', 'Event',      'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', 'Contacted',     9600000,  '2026-05-02T10:00:00Z', '2026-05-03T09:00:00Z'),
  ('d1eebc99-9c0b-4ef8-bb6d-6bb9bd380a06', 'Dinesh Gunawardena',        'Hemas Holdings',       'dinesh@hemas.lk',         '+94 78 678 9012', 'Website',    'c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33', 'Lost',          5400000,  '2026-03-15T11:00:00Z', '2026-04-01T10:00:00Z')
ON CONFLICT (id) DO NOTHING;

-- Notes
INSERT INTO notes (id, lead_id, content, created_by, created_at) VALUES
  ('e1eebc99-9c0b-4ef8-bb6d-6bb9bd380a01', 'd1eebc99-9c0b-4ef8-bb6d-6bb9bd380a01', 'Initial call went well. Interested in enterprise plan.', 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', '2026-04-29T10:00:00Z'),
  ('e1eebc99-9c0b-4ef8-bb6d-6bb9bd380a02', 'd1eebc99-9c0b-4ef8-bb6d-6bb9bd380a01', 'Sent follow-up email with pricing details.',             'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', '2026-05-01T14:30:00Z'),
  ('e1eebc99-9c0b-4ef8-bb6d-6bb9bd380a03', 'd1eebc99-9c0b-4ef8-bb6d-6bb9bd380a02', 'Demo scheduled for next Tuesday.',                       'c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33', '2026-04-28T09:00:00Z'),
  ('e1eebc99-9c0b-4ef8-bb6d-6bb9bd380a04', 'd1eebc99-9c0b-4ef8-bb6d-6bb9bd380a03', 'Contract signed! Deal closed.',                          'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', '2026-04-22T16:00:00Z')
ON CONFLICT (id) DO NOTHING;
