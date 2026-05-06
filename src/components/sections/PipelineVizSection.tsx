// @ts-nocheck
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import ScrollReveal from '../ui/ScrollReveal'
import AnimatedCounter from '../ui/AnimatedCounter'

const STAGE_COLORS: Record<string, string> = {
  'New': 'bg-amber-500',
  'Contacted': 'bg-blue-500',
  'Qualified': 'bg-indigo-500',
  'Proposal Sent': 'bg-purple-500',
  'Won': 'bg-emerald-500',
  'Lost': 'bg-red-500',
}

// Fallback if backend is unavailable
const FALLBACK_STAGES = [
  { name: 'New', count: 4 },
  { name: 'Contacted', count: 1 },
  { name: 'Qualified', count: 1 },
  { name: 'Proposal Sent', count: 1 },
  { name: 'Won', count: 1 },
  { name: 'Lost', count: 1 },
]

export default function PipelineVizSection({ publicStats }: { publicStats: any }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const stages = publicStats?.pipeline?.length > 0 ? publicStats.pipeline : FALLBACK_STAGES
  const stats = publicStats?.stats

  const formatValue = (val: number) => {
    if (val >= 1_000_000) {
      return { val: val / 1_000_000, suffix: 'M', decimals: 2 }
    }
    if (val >= 1_000) {
      return { val: val / 1_000, suffix: 'K', decimals: 0 }
    }
    return { val: val, suffix: '', decimals: 0 }
  }

  const pipeline = formatValue(stats?.total_pipeline ?? 840000000)

  const STATS = [
    { label: 'Total Leads', value: stats?.total_leads ?? 361, prefix: '', suffix: '', decimals: 0 },
    { label: 'Won Deals', value: stats?.won_count ?? 28, prefix: '', suffix: '', decimals: 0 },
    { label: 'Pipeline Value', value: pipeline.val, prefix: 'Rs.', suffix: pipeline.suffix, decimals: pipeline.decimals },
    { label: 'Team Members', value: stats?.team_members ?? 12, prefix: '', suffix: '', decimals: 0 },
  ]

  const maxCount = Math.max(...stages.map((s: any) => s.count), 1)

  return (
    <section className="relative py-24 px-6 bg-slate-950" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-50 mb-4">
            Your Pipeline, <span className="text-gradient">Visualized</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            See every lead's journey from first contact to closed deal in real-time.
          </p>
        </ScrollReveal>

        <div className="glass p-6 md:p-8 mb-12 overflow-x-auto">
          <div className="flex flex-row items-end gap-2 h-48 md:h-64 min-w-[500px]">
            {stages.map((stage: any, i: number) => {
              const height = (stage.count / maxCount) * 100

              return (
                <div key={stage.name} className="flex-1 h-full flex flex-col justify-end items-center gap-3">
                  <motion.div
                    className={`w-full ${STAGE_COLORS[stage.name] || 'bg-slate-500'} rounded-t-lg opacity-80`}
                    initial={{ height: 0 }}
                    animate={isInView ? { height: `${height}%` } : {}}
                    transition={{ duration: 1, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                  />
                  <div className="text-center">
                    <span className="text-xs font-semibold text-slate-300 block">{stage.name}</span>
                    <span className="text-xs text-slate-500">{stage.count}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {STATS.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 0.1}>
              <div className="glass p-6 text-center">
                <div className="text-3xl md:text-4xl font-bold text-slate-50 mb-1">
                  <AnimatedCounter
                    target={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    decimals={stat.decimals}
                  />
                </div>
                <div className="text-sm text-slate-400">{stat.label}</div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
