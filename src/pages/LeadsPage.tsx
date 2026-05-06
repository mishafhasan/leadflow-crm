import { useState, useMemo, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Plus, Pencil, Trash2, Search, ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import { useLeads } from '@/context/LeadsContext';
import type { Lead } from '@/types';
import Button from '@/components/ui/ActionButton';
import Badge from '@/components/ui/StatusBadge';
import EmptyState from '@/components/ui/EmptyState';
import LeadFormModal from '@/components/leads/LeadFormModal';
import StatusSelect from '@/components/leads/StatusSelect';
import { STATUS_CONFIG, LEAD_SOURCE_CONFIG } from '@/utils/statusColors';
import { formatCurrency, formatDate } from '@/utils/formatters';
import { users } from '@/utils/data';

const LEADS_PER_PAGE = 5;

export default function LeadsPage() {
  const { leads, fetchLeads, addLead, updateLead, deleteLead } = useLeads();
  const navigate = useNavigate();

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  // Filter state
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sourceFilter, setSourceFilter] = useState('');
  const [assigneeFilter, setAssigneeFilter] = useState('');
  const [page, setPage] = useState(1);

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  // Filtered + paginated leads
  const filtered = useMemo(() => {
    return leads.filter(l => {
      if (statusFilter && l.status !== statusFilter) return false;
      if (sourceFilter && l.lead_source !== sourceFilter) return false;
      if (assigneeFilter && l.assigned_to !== assigneeFilter) return false;
      if (search) {
        const q = search.toLowerCase();
        return (
          l.lead_name.toLowerCase().includes(q) ||
          l.company_name.toLowerCase().includes(q) ||
          l.email.toLowerCase().includes(q)
        );
      }
      return true;
    }).sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }, [leads, search, statusFilter, sourceFilter, assigneeFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / LEADS_PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const paginated = useMemo(() => {
    const start = (currentPage - 1) * LEADS_PER_PAGE;
    return filtered.slice(start, start + LEADS_PER_PAGE);
  }, [filtered, currentPage]);

  const handleAdd = useCallback(() => {
    setEditingLead(null);
    setModalOpen(true);
  }, []);

  const handleEdit = useCallback((lead: Lead) => {
    setEditingLead(lead);
    setModalOpen(true);
  }, []);

  const handleSave = useCallback(async (data: Partial<Lead>) => {
    if (editingLead) {
      await updateLead(editingLead.id, data);
    } else {
      await addLead(data as Omit<Lead, 'id' | 'created_at' | 'updated_at'>);
    }
  }, [editingLead, addLead, updateLead]);

  const handleDelete = useCallback(async (id: string) => {
    await deleteLead(id);
    setDeleteConfirm(null);
  }, [deleteLead]);

  const handleStatusChange = useCallback(async (id: string, status: string) => {
    await updateLead(id, { status });
  }, [updateLead]);


  // Reset page on filter change
  const handleSearchChange = (v: string) => { setSearch(v); setPage(1); };
  const handleStatusChangeFilter = (v: string) => { setStatusFilter(v); setPage(1); };
  const handleSourceChangeFilter = (v: string) => { setSourceFilter(v); setPage(1); };
  const handleAssigneeChangeFilter = (v: string) => { setAssigneeFilter(v); setPage(1); };

  const hasFilters = search || statusFilter || sourceFilter || assigneeFilter;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-50">Leads</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            {filtered.length} total lead{filtered.length !== 1 ? 's' : ''} across all stages
          </p>
        </div>
        <Button variant="primary" onClick={handleAdd}>
          <Plus className="w-4 h-4" />
          Add Lead
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={e => handleSearchChange(e.target.value)}
            placeholder="Search name, company, email..."
            className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
          />
        </div>

        <select
          value={statusFilter}
          onChange={e => handleStatusChangeFilter(e.target.value)}
          className="px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">All Statuses</option>
          {Object.keys(STATUS_CONFIG).map(s => <option key={s} value={s}>{s}</option>)}
        </select>

        <select
          value={sourceFilter}
          onChange={e => handleSourceChangeFilter(e.target.value)}
          className="px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">All Sources</option>
          {['Website', 'LinkedIn', 'Referral', 'Cold Email', 'Event'].map(s => <option key={s} value={s}>{s}</option>)}
        </select>

        <select
          value={assigneeFilter}
          onChange={e => handleAssigneeChangeFilter(e.target.value)}
          className="px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">All Assignees</option>
          {users.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
        </select>

        {hasFilters && (
          <button
            onClick={() => { setSearch(''); setStatusFilter(''); setSourceFilter(''); setAssigneeFilter(''); setPage(1); }}
            className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm overflow-hidden">
        {filtered.length === 0 ? (
          <EmptyState
            title="No leads found"
            description={hasFilters ? "Try adjusting your filters or search terms." : "Get started by adding your first lead."}
            icon={<Filter className="w-6 h-6 text-slate-400" />}
          />
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700">
                    <th className="text-left px-4 py-3 text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">Lead</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide hidden md:table-cell">Email</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">Source</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide hidden sm:table-cell">Assignee</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">Status</th>
                    <th className="text-right px-4 py-3 text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">Value</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide hidden lg:table-cell">Created</th>
                    <th className="text-right px-4 py-3 text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                  {paginated.map(lead => (
                    <tr
                      key={lead.id}
                      className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group"
                      onClick={() => navigate(`/leads/${lead.id}`)}
                    >
                      <td className="px-4 py-3">
                        <div>
                          <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{lead.lead_name}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">{lead.company_name}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300 hidden md:table-cell">{lead.email}</td>
                      <td className="px-4 py-3">
                        <Badge text={lead.lead_source} className={LEAD_SOURCE_CONFIG[lead.lead_source] || ''} />
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300 hidden sm:table-cell">
                        {lead.assigned_to_name || '-'}
                      </td>
                      <td className="px-4 py-3" onClick={e => e.stopPropagation()}>
                        <StatusSelect value={lead.status} onChange={status => handleStatusChange(lead.id, status)} />
                      </td>
                      <td className="px-4 py-3 text-right text-sm font-semibold tabular-nums text-slate-700 dark:text-slate-300">
                        {formatCurrency(lead.deal_value)}
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-500 dark:text-slate-400 hidden lg:table-cell">
                        {formatDate(lead.created_at)}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={e => { e.stopPropagation(); handleEdit(lead); }}
                            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                            title="Edit"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            onClick={e => { e.stopPropagation(); setDeleteConfirm(lead.id); }}
                            className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between px-4 py-3 border-t border-slate-200 dark:border-slate-700">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Showing {((currentPage - 1) * LEADS_PER_PAGE) + 1}-{Math.min(currentPage * LEADS_PER_PAGE, filtered.length)} of {filtered.length}
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={currentPage <= 1}
                  className="p-2 rounded-lg border border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                </button>
                <span className="text-sm text-slate-600 dark:text-slate-300 tabular-nums">
                  {currentPage} / {totalPages}
                </span>
                <button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage >= totalPages}
                  className="p-2 rounded-lg border border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Add/Edit Modal */}
      <LeadFormModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        lead={editingLead}
      />

      {/* Delete Confirmation */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setDeleteConfirm(null)} />
          <div className="relative bg-white dark:bg-slate-800 rounded-xl shadow-2xl max-w-sm w-full mx-4 p-6">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">Delete Lead</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
              Are you sure you want to delete this lead? This action cannot be undone and will also remove all associated notes.
            </p>
            <div className="flex justify-end gap-3">
              <Button variant="secondary" onClick={() => setDeleteConfirm(null)}>Cancel</Button>
              <Button variant="danger" onClick={() => handleDelete(deleteConfirm)}>Delete</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
