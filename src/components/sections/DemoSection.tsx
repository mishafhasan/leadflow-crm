// @ts-nocheck
import { useRef } from 'react'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import ScrollReveal from '../ui/ScrollReveal'
import { TrendingUp, Users, DollarSign, Target } from 'lucide-react'

const FLOATING_CARDS = [
  { icon: TrendingUp, label: 'Pipeline Growth', value: '+24%', color: 'text-emerald-400', bg: 'bg-emerald-500/10', x: -180, y: -100, delay: 0 },
  { icon: Users, label: 'Active Leads', value: '142', color: 'text-blue-400', bg: 'bg-blue-500/10', x: 200, y: -80, delay: 0.5 },
  { icon: DollarSign, label: 'Deal Value', value: 'Rs.840M', color: 'text-amber-400', bg: 'bg-amber-500/10', x: -200, y: 100, delay: 1 },
  { icon: Target, label: 'Win Rate', value: '38%', color: 'text-purple-400', bg: 'bg-purple-500/10', x: 180, y: 120, delay: 1.5 },
]

export default function DemoSection() {
  const containerRef = useRef(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [10, -10]), { stiffness: 100, damping: 20 })
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-10, 10]), { stiffness: 100, damping: 20 })

  const handleMouseMove = (e) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (rect) {
      mouseX.set(e.clientX - rect.left - rect.width / 2)
      mouseY.set(e.clientY - rect.top - rect.height / 2)
    }
  }

  return (
    <section id="demo" className="relative py-24 px-6 bg-slate-950 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-50 mb-4">
            See LeadFlow in <span className="text-gradient">Action</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            A powerful yet intuitive dashboard that gives your team everything they need at a glance.
          </p>
        </ScrollReveal>

        <div 
          ref={containerRef}
          className="relative flex items-center justify-center min-h-[500px]"
          onMouseMove={handleMouseMove}
          style={{ perspective: 1000 }}
        >
          {/* Floating stat cards */}
          {FLOATING_CARDS.map((card) => (
            <motion.div
              key={card.label}
              className="absolute glass p-4 rounded-xl hidden lg:flex items-center gap-3"
              style={{ 
                x: card.x, 
                y: card.y,
              }}
              animate={{
                y: [card.y, card.y - 15, card.y],
              }}
              transition={{
                duration: 4,
                delay: card.delay,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <div className={`w-10 h-10 ${card.bg} rounded-lg flex items-center justify-center`}>
                <card.icon className={`w-5 h-5 ${card.color}`} />
              </div>
              <div>
                <div className="text-lg font-bold text-slate-100">{card.value}</div>
                <div className="text-xs text-slate-400">{card.label}</div>
              </div>
            </motion.div>
          ))}

          {/* Main mockup */}
          <motion.div
            className="relative w-full max-w-3xl"
            style={{ rotateX, rotateY }}
          >
            <div className="glass-strong p-1 rounded-2xl overflow-hidden">
              {/* Mock header */}
              <div className="bg-slate-900/80 px-4 py-3 flex items-center gap-2 border-b border-white/5">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <div className="flex-1 text-center text-xs text-slate-500 font-mono">LeadFlow Dashboard</div>
              </div>

              {/* Mock content */}
              <div className="p-6 bg-slate-900/50">
                {/* Stat row */}
                <div className="grid grid-cols-4 gap-3 mb-6">
                  {[
                    { label: 'Total Leads', value: '361', color: 'text-blue-400' },
                    { label: 'Won', value: '28', color: 'text-emerald-400' },
                    { label: 'Pipeline', value: 'Rs.840M', color: 'text-amber-400' },
                    { label: 'Win Rate', value: '38%', color: 'text-purple-400' },
                  ].map((stat) => (
                    <div key={stat.label} className="glass p-3 text-center">
                      <div className={`text-xl font-bold ${stat.color}`}>{stat.value}</div>
                      <div className="text-[10px] text-slate-500 mt-1">{stat.label}</div>
                    </div>
                  ))}
                </div>

                {/* Pipeline bar */}
                <div className="mb-6">
                  <div className="text-xs text-slate-500 mb-2">Pipeline Overview</div>
                  <div className="flex h-8 rounded-lg overflow-hidden">
                    {[
                      { width: '35%', color: 'bg-amber-500' },
                      { width: '22%', color: 'bg-blue-500' },
                      { width: '18%', color: 'bg-indigo-500' },
                      { width: '12%', color: 'bg-purple-500' },
                      { width: '10%', color: 'bg-emerald-500' },
                      { width: '3%', color: 'bg-red-500' },
                    ].map((seg, i) => (
                      <motion.div
                        key={i}
                        className={`${seg.color} opacity-80`}
                        initial={{ width: 0 }}
                        whileInView={{ width: seg.width }}
                        transition={{ duration: 1, delay: i * 0.1 }}
                        viewport={{ once: true }}
                      />
                    ))}
                  </div>
                </div>

                {/* Lead rows */}
                <div className="space-y-2">
                  {[
                    { name: 'Dialog Axiata', status: 'Qualified', color: 'bg-indigo-500', value: 'Rs.13.5M' },
                    { name: 'MAS Holdings', status: 'Proposal Sent', color: 'bg-purple-500', value: 'Rs.36.0M' },
                    { name: 'John Keells', status: 'New', color: 'bg-amber-500', value: 'Rs.23.4M' },
                    { name: 'Bank of Ceylon', status: 'Contacted', color: 'bg-blue-500', value: 'Rs.9.6M' },
                  ].map((lead, i) => (
                    <motion.div
                      key={lead.name}
                      className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-300">
                        {lead.name.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <div className="text-sm text-slate-200">{lead.name}</div>
                      </div>
                      <div className={`px-2 py-0.5 rounded-full text-[10px] ${lead.color} text-white`}>
                        {lead.status}
                      </div>
                      <div className="text-sm text-slate-300 font-mono">{lead.value}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
