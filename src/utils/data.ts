import type { User, Lead, Note } from '@/types';

export const users: User[] = [
  { id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', name: 'Admin User', email: 'admin@example.com', role: 'admin' },
  { id: 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', name: 'Kasun Perera', email: 'kasun@leadflow.lk', role: 'salesperson' },
  { id: 'c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33', name: 'Dasun Silva', email: 'dasun@leadflow.lk', role: 'salesperson' }
];

export const initialLeads: Lead[] = [
  { id: 'l1', lead_name: 'Chamuditha Samarawickrama', company_name: 'Dialog Axiata', email: 'chamuditha@dialog.lk', phone: '+94 77 123 4567', lead_source: 'Website', assigned_to: 'u2', status: 'Qualified', deal_value: 7500000, created_at: '2026-04-28T10:00:00Z', updated_at: '2026-05-01T14:30:00Z' },
  { id: 'l2', lead_name: 'Nilantha Perera', company_name: 'MAS Holdings', email: 'nilantha@masholdings.lk', phone: '+94 71 234 5678', lead_source: 'LinkedIn', assigned_to: 'u3', status: 'Proposal Sent', deal_value: 13500000, created_at: '2026-04-25T09:00:00Z', updated_at: '2026-04-30T11:00:00Z' },
  { id: 'l3', lead_name: 'Saman Silva', company_name: 'John Keells Holdings', email: 'saman@jkh.lk', phone: '+94 70 345 6789', lead_source: 'Referral', assigned_to: 'u2', status: 'Won', deal_value: 18000000, created_at: '2026-04-20T08:00:00Z', updated_at: '2026-04-22T16:00:00Z' },
  { id: 'l4', lead_name: 'Amali Fernando', company_name: 'Bank of Ceylon', email: 'amali@boc.lk', phone: '+94 76 456 7890', lead_source: 'Cold Email', assigned_to: 'u3', status: 'New', deal_value: 4500000, created_at: '2026-05-04T13:00:00Z', updated_at: '2026-05-04T13:00:00Z' },
  { id: 'l5', lead_name: 'Ruwanthi Jayasekara', company_name: 'Hayleys PLC', email: 'ruwanthi@hayleys.lk', phone: '+94 72 567 8901', lead_source: 'Event', assigned_to: 'u2', status: 'Contacted', deal_value: 9600000, created_at: '2026-05-02T10:00:00Z', updated_at: '2026-05-03T09:00:00Z' },
  { id: 'l6', lead_name: 'Dinesh Gunawardena', company_name: 'Hemas Holdings', email: 'dinesh@hemas.lk', phone: '+94 78 678 9012', lead_source: 'Website', assigned_to: 'u3', status: 'Lost', deal_value: 5400000, created_at: '2026-03-15T11:00:00Z', updated_at: '2026-04-01T10:00:00Z' }
];

export const initialNotes: Note[] = [
  { id: 'n1', lead_id: 'l1', content: 'Initial call went well. Interested in enterprise plan.', created_by: 'u2', created_at: '2026-04-29T10:00:00Z' },
  { id: 'n2', lead_id: 'l1', content: 'Sent follow-up email with pricing details.', created_by: 'u2', created_at: '2026-05-01T14:30:00Z' },
  { id: 'n3', lead_id: 'l2', content: 'Demo scheduled for next Tuesday.', created_by: 'u3', created_at: '2026-04-28T09:00:00Z' },
  { id: 'n4', lead_id: 'l3', content: 'Contract signed! Deal closed.', created_by: 'u2', created_at: '2026-04-22T16:00:00Z' }
];

export const VALID_LOGIN = {
  email: 'admin@example.com',
  password: 'password123'
};
