import type { LucideIcon } from 'lucide-react';
import { formatCurrency } from '@/utils/formatters';

interface StatCardProps {
  label: string;
  value: number;
  isCurrency?: boolean;
  icon: LucideIcon;
  iconColor: string;
  iconBg: string;
}

export default function StatCard({ label, value, isCurrency, icon: Icon, iconColor, iconBg }: StatCardProps) {
  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm p-5">
      <div className="flex items-start justify-between">
        <div className="space-y-3">
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">{label}</p>
          <p className="text-2xl font-bold tabular-nums text-slate-900 dark:text-slate-50">
            {isCurrency ? formatCurrency(value) : value.toLocaleString()}
          </p>
        </div>
        <div className={`w-10 h-10 rounded-lg ${iconBg} flex items-center justify-center`}>
          <Icon className={`w-5 h-5 ${iconColor}`} />
        </div>
      </div>
    </div>
  );
}
