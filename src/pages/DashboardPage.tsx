import { useMemo } from 'react';
import { useNavigate } from 'react-router';
import { Users, UserPlus, Target, Trophy, XCircle, DollarSign, TrendingUp } from 'lucide-react';
import { useLeads } from '@/context/LeadsContext';
import { useAuth } from '@/context/AuthContext';
import StatCard from '@/components/dashboard/StatCard';
import PipelineBar from '@/components/dashboard/PipelineBar';
import Badge from '@/components/ui/StatusBadge';
import { STATUS_CONFIG } from '@/utils/statusColors';
import { formatCurrency } from '@/utils/formatters';

export default function DashboardPage() {
  const { leads, getUserName } = useLeads();
  const { user } = useAuth();
  const navigate = useNavigate();

  const stats = useMemo(() => {
    const total = leads.length;
    const statusCounts: Record<string, number> = {};
    let totalPipeline = 0;
    let totalWon = 0;

    leads.forEach(l => {
      statusCounts[l.status] = (statusCounts[l.status] || 0) + 1;
      totalPipeline += Number(l.deal_value) || 0;
      if (l.status === 'Won') totalWon += Number(l.deal_value) || 0;
    });

    return {
      total_leads: total,
      new_leads: statusCounts['New'] || 0,
      contacted_leads: statusCounts['Contacted'] || 0,
      qualified_leads: statusCounts['Qualified'] || 0,
      proposal_sent: statusCounts['Proposal Sent'] || 0,
      won_leads: statusCounts['Won'] || 0,
      lost_leads: statusCounts['Lost'] || 0,
      total_pipeline_value: totalPipeline,
      total_won_value: totalWon,
    };
  }, [leads]);

  const pipeline = useMemo(() => {
    const map: Record<string, number> = {};
    leads.forEach(l => { map[l.status] = (map[l.status] || 0) + 1; });
    return Object.entries(map).map(([status, count]) => ({ status, count }));
  }, [leads]);

  const recentLeads = useMemo(() => {
    return [...leads]
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, 5);
  }, [leads]);

  const topSalespeople = useMemo(() => {
    const map: Record<string, { name: string; won_count: number; won_value: number }> = {};
    leads.forEach(l => {
      if (l.status === 'Won' && l.assigned_to) {
        const name = getUserName(l.assigned_to);
        if (!map[name]) map[name] = { name, won_count: 0, won_value: 0 };
        map[name].won_count += 1;
        map[name].won_value += Number(l.deal_value) || 0;
      }
    });
    return Object.values(map).sort((a, b) => b.won_value - a.won_value).slice(0, 5);
  }, [leads, getUserName]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-50">Dashboard</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Welcome back, {user?.name || 'Admin'}. Here's what's happening with your leads.
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Leads" value={stats.total_leads} icon={Users} iconColor="text-indigo-600" iconBg="bg-indigo-100 dark:bg-indigo-900/30" />
        <StatCard label="New Leads" value={stats.new_leads} icon={UserPlus} iconColor="text-amber-600" iconBg="bg-amber-100 dark:bg-amber-900/30" />
        <StatCard label="Qualified" value={stats.qualified_leads} icon={Target} iconColor="text-blue-600" iconBg="bg-blue-100 dark:bg-blue-900/30" />
        <StatCard label="Won" value={stats.won_leads} icon={Trophy} iconColor="text-emerald-600" iconBg="bg-emerald-100 dark:bg-emerald-900/30" />
        <StatCard label="Lost" value={stats.lost_leads} icon={XCircle} iconColor="text-red-600" iconBg="bg-red-100 dark:bg-red-900/30" />
        <StatCard label="Pipeline Value" value={stats.total_pipeline_value} isCurrency icon={DollarSign} iconColor="text-indigo-600" iconBg="bg-indigo-100 dark:bg-indigo-900/30" />
        <StatCard label="Won Value" value={stats.total_won_value} isCurrency icon={TrendingUp} iconColor="text-emerald-600" iconBg="bg-emerald-100 dark:bg-emerald-900/30" />
        <StatCard label="Proposal Sent" value={stats.proposal_sent} icon={Target} iconColor="text-purple-600" iconBg="bg-purple-100 dark:bg-purple-900/30" />
      </div>

      {/* Pipeline Bar */}
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">Pipeline Overview</h2>
        <PipelineBar pipeline={pipeline} total={stats.total_leads} />
      </div>

      {/* Two-column: Recent Leads + Top Salespeople */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Leads */}
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">Recent Leads</h2>
          <div className="space-y-3">
            {recentLeads.map(lead => (
              <div
                key={lead.id}
                onClick={() => navigate(`/leads/${lead.id}`)}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer transition-colors"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate">{lead.lead_name}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{lead.company_name}</p>
                </div>
                <div className="flex items-center gap-3 shrink-0 ml-4">
                  <Badge text={lead.status} className={STATUS_CONFIG[lead.status]?.classes || ''} />
                  <span className="text-sm font-semibold tabular-nums text-slate-700 dark:text-slate-300">
                    {formatCurrency(lead.deal_value)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Salespeople */}
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">Top Salespeople</h2>
          {topSalespeople.length === 0 ? (
            <p className="text-sm text-slate-500 dark:text-slate-400 py-4 text-center">No closed deals yet</p>
          ) : (
            <div className="space-y-3">
              {topSalespeople.map((sp, i) => (
                <div key={sp.name} className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-700/30">
                  <div className="flex items-center gap-3">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                      i === 0 ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' :
                      i === 1 ? 'bg-slate-200 text-slate-600 dark:bg-slate-600 dark:text-slate-300' :
                      i === 2 ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' :
                      'bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-400'
                    }`}>
                      {i + 1}
                    </div>
                    <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{sp.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold tabular-nums text-slate-700 dark:text-slate-300">
                      {formatCurrency(sp.won_value)}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{sp.won_count} deals</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
