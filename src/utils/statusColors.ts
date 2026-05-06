export const STATUS_CONFIG: Record<string, { label: string; classes: string }> = {
  New:            { label: 'New',            classes: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400' },
  Contacted:      { label: 'Contacted',      classes: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' },
  Qualified:      { label: 'Qualified',      classes: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400' },
  'Proposal Sent':{ label: 'Proposal Sent',  classes: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400' },
  Won:            { label: 'Won',            classes: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400' },
  Lost:           { label: 'Lost',           classes: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' },
};

export const LEAD_SOURCE_CONFIG: Record<string, string> = {
  Website:      'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300',
  LinkedIn:     'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  Referral:     'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  'Cold Email': 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  Event:        'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
};

export const STATUS_ORDER = ['New', 'Contacted', 'Qualified', 'Proposal Sent', 'Won', 'Lost'];
