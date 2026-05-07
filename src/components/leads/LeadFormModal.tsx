import React, { useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/ActionButton';
import type { Lead, User } from '@/types';
import { usersApi } from '@/services/api';

const SOURCES = ['Website', 'LinkedIn', 'Referral', 'Cold Email', 'Event'];
const STATUSES = ['New', 'Contacted', 'Qualified', 'Proposal Sent', 'Won', 'Lost'];

interface LeadFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (lead: Partial<Lead>) => void;
  lead?: Lead | null;
}

const emptyForm = {
  lead_name: '',
  company_name: '',
  email: '',
  phone: '',
  lead_source: 'Website',
  assigned_to: '',
  status: 'New',
  deal_value: '',
};

export default function LeadFormModal({ isOpen, onClose, onSave, lead }: LeadFormModalProps) {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [users, setUsers] = useState<User[]>([]);

  // Fetch real users from the database when the modal opens
  useEffect(() => {
    if (isOpen) {
      usersApi.getAll()
        .then(data => setUsers(data.users))
        .catch(console.error);
    }
  }, [isOpen]);

  useEffect(() => {
    if (lead) {
      setForm({
        lead_name: lead.lead_name || '',
        company_name: lead.company_name || '',
        email: lead.email || '',
        phone: lead.phone || '',
        lead_source: lead.lead_source || 'Website',
        assigned_to: lead.assigned_to || '',
        status: lead.status || 'New',
        deal_value: lead.deal_value ? String(lead.deal_value) : '',
      });
    } else {
      setForm(emptyForm);
    }
    setErrors({});
  }, [lead, isOpen]);

  const handleChange = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => { const n = { ...prev }; delete n[field]; return n; });
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.lead_name.trim()) errs.lead_name = 'Lead name is required';
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Invalid email format';
    if (form.deal_value && isNaN(Number(form.deal_value))) errs.deal_value = 'Must be a number';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const data: Partial<Lead> = {
      lead_name: form.lead_name.trim(),
      company_name: form.company_name.trim() || undefined,
      email: form.email.trim() || undefined,
      phone: form.phone.trim() || undefined,
      lead_source: form.lead_source,
      assigned_to: form.assigned_to || undefined,
      status: form.status,
      deal_value: form.deal_value ? Number(form.deal_value) : 0,
    };

    onSave(data);
    onClose();
  };

  const inputBase = `w-full px-3 py-2 text-sm rounded-lg border bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors`;
  const errorBorder = 'border-red-300 dark:border-red-600';
  const normalBorder = 'border-slate-200 dark:border-slate-600';

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={lead ? 'Edit Lead' : 'Add New Lead'}
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button variant="primary" onClick={handleSubmit}>
            <Save className="w-4 h-4" />
            {lead ? 'Update Lead' : 'Create Lead'}
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Lead Name */}
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
            Lead Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={form.lead_name}
            onChange={e => handleChange('lead_name', e.target.value)}
            placeholder="Jane Smith"
            className={`${inputBase} ${errors.lead_name ? errorBorder : normalBorder}`}
          />
          {errors.lead_name && <p className="mt-1 text-xs text-red-500">{errors.lead_name}</p>}
        </div>

        {/* Company */}
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Company</label>
          <input
            type="text"
            value={form.company_name}
            onChange={e => handleChange('company_name', e.target.value)}
            placeholder="Acme Corp"
            className={`${inputBase} ${normalBorder}`}
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Email</label>
          <input
            type="email"
            value={form.email}
            onChange={e => handleChange('email', e.target.value)}
            placeholder="jane@acme.com"
            className={`${inputBase} ${errors.email ? errorBorder : normalBorder}`}
          />
          {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Phone</label>
          <input
            type="tel"
            value={form.phone}
            onChange={e => handleChange('phone', e.target.value)}
            placeholder="+1-555-0101"
            className={`${inputBase} ${normalBorder}`}
          />
        </div>

        {/* Lead Source */}
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Lead Source</label>
          <select
            value={form.lead_source}
            onChange={e => handleChange('lead_source', e.target.value)}
            className={`${inputBase} ${normalBorder}`}
          >
            {SOURCES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        {/* Assigned To */}
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Assigned To</label>
          <select
            value={form.assigned_to}
            onChange={e => handleChange('assigned_to', e.target.value)}
            className={`${inputBase} ${normalBorder}`}
          >
            <option value="">Unassigned</option>
            {users.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
          </select>
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Status</label>
          <select
            value={form.status}
            onChange={e => handleChange('status', e.target.value)}
            className={`${inputBase} ${normalBorder}`}
          >
            {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        {/* Deal Value */}
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Deal Value ($)</label>
          <input
            type="number"
            value={form.deal_value}
            onChange={e => handleChange('deal_value', e.target.value)}
            placeholder="25000"
            min="0"
            step="100"
            className={`${inputBase} ${errors.deal_value ? errorBorder : normalBorder}`}
          />
          {errors.deal_value && <p className="mt-1 text-xs text-red-500">{errors.deal_value}</p>}
        </div>
      </form>
    </Modal>
  );
}
