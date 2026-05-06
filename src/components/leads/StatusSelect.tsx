import { STATUS_CONFIG } from '@/utils/statusColors';

const STATUSES = ['New', 'Contacted', 'Qualified', 'Proposal Sent', 'Won', 'Lost'];

interface StatusSelectProps {
  value: string;
  onChange: (status: string) => void;
  size?: 'sm' | 'md';
}

export default function StatusSelect({ value, onChange, size = 'sm' }: StatusSelectProps) {
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      className={`${size === 'sm' ? 'text-xs py-0.5 px-2' : 'text-sm py-1 px-3'} rounded-full border-0 font-medium cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors ${STATUS_CONFIG[value]?.classes || ''}`}
    >
      {STATUSES.map(s => (
        <option key={s} value={s} className="bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100">
          {s}
        </option>
      ))}
    </select>
  );
}
