import { STATUS_CONFIG, STATUS_ORDER } from '@/utils/statusColors';

interface PipelineItem {
  status: string;
  count: number;
}

interface PipelineBarProps {
  pipeline: PipelineItem[];
  total: number;
}

const barColors: Record<string, string> = {
  New: 'bg-amber-500',
  Contacted: 'bg-blue-500',
  Qualified: 'bg-indigo-500',
  'Proposal Sent': 'bg-purple-500',
  Won: 'bg-emerald-500',
  Lost: 'bg-red-500',
};

export default function PipelineBar({ pipeline, total }: PipelineBarProps) {
  const pipelineMap: Record<string, number> = {};
  pipeline.forEach(p => { pipelineMap[p.status] = p.count; });

  return (
    <div className="space-y-4">
      {/* Segmented bar */}
      <div className="h-4 w-full rounded-full overflow-hidden flex bg-slate-100 dark:bg-slate-700">
        {STATUS_ORDER.map(status => {
          const count = pipelineMap[status] || 0;
          const pct = total > 0 ? (count / total) * 100 : 0;
          if (pct === 0) return null;
          return (
            <div
              key={status}
              className={`${barColors[status] || 'bg-slate-400'} h-full transition-all duration-500`}
              style={{ width: `${pct}%` }}
              title={`${status}: ${count}`}
            />
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-x-6 gap-y-2">
        {STATUS_ORDER.map(status => {
          const count = pipelineMap[status] || 0;
          const config = STATUS_CONFIG[status];
          return (
            <div key={status} className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${barColors[status] || 'bg-slate-400'}`} />
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {config?.label || status}
              </span>
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                {count}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
