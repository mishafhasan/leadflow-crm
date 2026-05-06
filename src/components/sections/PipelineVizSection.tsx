// @ts-nocheck
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import ScrollReveal from '../ui/ScrollReveal'
import AnimatedCounter from '../ui/AnimatedCounter'

const STAGES = [
  { name: 'New', color: 'bg-amber-500', count: 142 },
  { name: 'Contacted', color: 'bg-blue-500', count: 89 },
  { name: 'Qualified', color: 'bg-indigo-500', count: 56 },
  { name: 'Proposal Sent', color: 'bg-purple-500', count: 34 },
  { name: 'Won', color: 'bg-emerald-500', count: 28 },
  { name: 'Lost', color: 'bg-red-500', count: 12 },
]

const STATS = [
  { label: 'Total Leads', value: 361, prefix: '' },
  { label: 'Won Deals', value: 28, prefix: '' },
  { label: 'Pipeline Value', value: 840000000, prefix: 'Rs.' },
  { label: 'Team Members', value: 12, prefix: '' },
]

export default function PipelineVizSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

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
            {STAGES.map((stage, i) => {
              const maxCount = Math.max(...STAGES.map(s => s.count))
              const height = (stage.count / maxCount) * 100

              return (
                <div key={stage.name} className="flex-1 h-full flex flex-col justify-end items-center gap-3">
                  <motion.div
                    className={`w-full ${stage.color} rounded-t-lg opacity-80`}
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
                  <AnimatedCounter target={stat.value} prefix={stat.prefix} />
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
