import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router';
import { ArrowLeft, Pencil, Trash2, Send, Clock, DollarSign, Mail, Phone, Building2, User, Tag } from 'lucide-react';
import { useLeads } from '@/context/LeadsContext';
import { useAuth } from '@/context/AuthContext';
import Button from '@/components/ui/ActionButton';
import Badge from '@/components/ui/StatusBadge';
import Card from '@/components/ui/InfoCard';
import LeadFormModal from '@/components/leads/LeadFormModal';
import StatusSelect from '@/components/leads/StatusSelect';
import { STATUS_CONFIG, LEAD_SOURCE_CONFIG } from '@/utils/statusColors';
import { formatCurrency, formatDateTime, formatRelativeTime } from '@/utils/formatters';
import type { Lead, Note } from '@/types';

export default function LeadDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { updateLead, deleteLead, getLeadNotes, addNote, getLeadById, getUserName } = useLeads();
  const { user } = useAuth();

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [noteContent, setNoteContent] = useState('');
  const [addingNote, setAddingNote] = useState(false);

  const lead = useMemo(() => getLeadById(id || ''), [id, getLeadById]);
  const notes = useMemo(() => getLeadNotes(id || ''), [id, getLeadNotes]);

  if (!lead) {
    return (
      <div className="text-center py-20">
        <p className="text-lg text-slate-500 dark:text-slate-400">Lead not found</p>
        <Button variant="primary" className="mt-4" onClick={() => navigate('/leads')}>
          Back to Leads
        </Button>
      </div>
    );
  }

  const handleStatusChange = (status: string) => {
    updateLead(lead.id, { status });
  };

  const handleSaveEdit = (data: Partial<Lead>) => {
    updateLead(lead.id, data);
    setEditModalOpen(false);
  };

  const handleDelete = () => {
    deleteLead(lead.id);
    navigate('/leads');
  };

  const handleAddNote = () => {
    if (!noteContent.trim() || !user) return;
    addNote(lead.id, noteContent.trim(), user.id);
    setNoteContent('');
    setAddingNote(false);
  };

  return (
    <div className="space-y-6">
      {/* Back button */}
      <button
        onClick={() => navigate('/leads')}
        className="inline-flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Leads
      </button>

      {/* Header with actions */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-50">{lead.lead_name}</h1>
            <StatusSelect value={lead.status} onChange={handleStatusChange} size="md" />
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400">{lead.company_name}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" onClick={() => setEditModalOpen(true)}>
            <Pencil className="w-4 h-4" />
            Edit
          </Button>
          <Button variant="danger" onClick={() => setDeleteConfirm(true)}>
            <Trash2 className="w-4 h-4" />
            Delete
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Lead Info + Notes */}
        <div className="lg:col-span-2 space-y-6">
          {/* Lead Info Card */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">Lead Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InfoRow icon={Mail} label="Email" value={lead.email} />
              <InfoRow icon={Phone} label="Phone" value={lead.phone} />
              <InfoRow icon={Building2} label="Company" value={lead.company_name} />
              <InfoRow icon={Tag} label="Source" value={<Badge text={lead.lead_source} className={LEAD_SOURCE_CONFIG[lead.lead_source] || ''} />} />
              <InfoRow icon={User} label="Assigned To" value={getUserName(lead.assigned_to)} />
              <InfoRow icon={DollarSign} label="Deal Value" value={formatCurrency(lead.deal_value)} />
            </div>
          </Card>

          {/* Notes Section */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">
              Notes ({notes.length})
            </h2>

            {notes.length === 0 ? (
              <p className="text-sm text-slate-500 dark:text-slate-400 py-4 text-center">
                No notes yet. Add the first note below.
              </p>
            ) : (
              <div className="space-y-4 mb-6">
                {notes.map((note, i) => (
                  <NoteItem key={note.id} note={note} isLast={i === notes.length - 1} />
                ))}
              </div>
            )}

            {/* Add Note */}
            {!addingNote ? (
              <button
                onClick={() => setAddingNote(true)}
                className="w-full py-2.5 px-4 rounded-lg border border-dashed border-slate-300 dark:border-slate-600 text-sm text-slate-500 dark:text-slate-400 hover:border-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                + Add a note
              </button>
            ) : (
              <div className="space-y-3">
                <textarea
                  value={noteContent}
                  onChange={e => setNoteContent(e.target.value)}
                  placeholder="Write your note..."
                  rows={3}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none transition-colors"
                  autoFocus
                />
                <div className="flex justify-end gap-2">
                  <Button variant="secondary" onClick={() => { setAddingNote(false); setNoteContent(''); }}>
                    Cancel
                  </Button>
                  <Button variant="primary" onClick={handleAddNote} disabled={!noteContent.trim()}>
                    <Send className="w-4 h-4" />
                    Add Note
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* Right: Meta Info */}
        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-4 uppercase tracking-wide">Details</h2>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Created</p>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-slate-400" />
                  <p className="text-sm text-slate-700 dark:text-slate-300">{formatDateTime(lead.created_at)}</p>
                </div>
              </div>
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Last Updated</p>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-slate-400" />
                  <p className="text-sm text-slate-700 dark:text-slate-300">{formatDateTime(lead.updated_at)}</p>
                </div>
              </div>
              <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Status</p>
                <Badge text={lead.status} className={STATUS_CONFIG[lead.status]?.classes || ''} />
              </div>
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Deal Value</p>
                <p className="text-xl font-bold tabular-nums text-slate-900 dark:text-slate-50">
                  {formatCurrency(lead.deal_value)}
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Edit Modal */}
      <LeadFormModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        onSave={handleSaveEdit}
        lead={lead}
      />

      {/* Delete Confirmation */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setDeleteConfirm(false)} />
          <div className="relative bg-white dark:bg-slate-800 rounded-xl shadow-2xl max-w-sm w-full mx-4 p-6">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">Delete Lead</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
              Are you sure you want to delete <strong>{lead.lead_name}</strong>? This will also remove all {notes.length} note{notes.length !== 1 ? 's' : ''}.
            </p>
            <div className="flex justify-end gap-3">
              <Button variant="secondary" onClick={() => setDeleteConfirm(false)}>Cancel</Button>
              <Button variant="danger" onClick={handleDelete}>Delete</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Sub-components
function InfoRow({ icon: Icon, label, value }: { icon: React.ComponentType<any>; label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-8 h-8 rounded-lg bg-slate-50 dark:bg-slate-700/50 flex items-center justify-center shrink-0">
        <Icon className="w-4 h-4 text-slate-500 dark:text-slate-400" />
      </div>
      <div className="min-w-0">
        <p className="text-xs text-slate-500 dark:text-slate-400">{label}</p>
        <div className="text-sm text-slate-700 dark:text-slate-300 mt-0.5">{value || '-'}</div>
      </div>
    </div>
  );
}

function NoteItem({ note, isLast }: { note: Note; isLast: boolean }) {
  return (
    <div className="flex gap-4">
      {/* Timeline dot + line */}
      <div className="flex flex-col items-center">
        <div className="w-2.5 h-2.5 rounded-full bg-indigo-500 mt-2" />
        {!isLast && <div className="w-px flex-1 bg-slate-200 dark:bg-slate-700 my-1" />}
      </div>
      {/* Content */}
      <div className={`flex-1 pb-4 ${!isLast ? '' : ''}`}>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{note.content}</p>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
            {note.created_by_name || 'Unknown'}
          </span>
          <span className="text-xs text-slate-400 dark:text-slate-500">-</span>
          <span className="text-xs font-mono text-slate-400 dark:text-slate-500" title={formatDateTime(note.created_at)}>
            {formatRelativeTime(note.created_at)}
          </span>
        </div>
      </div>
    </div>
  );
}
