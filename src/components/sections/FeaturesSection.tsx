// @ts-nocheck
import { motion } from 'framer-motion'
import { 
  Users, 
  Workflow, 
  MessageSquare, 
  Search, 
  BarChart3, 
  Filter 
} from 'lucide-react'
import ScrollReveal from '../ui/ScrollReveal'
import GlassCard from '../ui/GlassCard'

const FEATURES = [
  {
    icon: Users,
    title: 'Lead Tracking',
    description: 'Capture and organize every lead with automatic enrichment and contact history.',
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
  },
  {
    icon: Workflow,
    title: 'Pipeline Management',
    description: 'Visual drag-and-drop pipeline that mirrors your real sales process.',
    color: 'text-indigo-400',
    bgColor: 'bg-indigo-500/10',
  },
  {
    icon: MessageSquare,
    title: 'Team Collaboration',
    description: 'Share notes, assign leads, and collaborate with @mentions and real-time updates.',
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/10',
  },
  {
    icon: BarChart3,
    title: 'Smart Dashboard',
    description: 'Get instant insights into team performance, conversion rates, and revenue forecasts.',
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/10',
  },
  {
    icon: Search,
    title: 'Search & Filters',
    description: 'Find any lead in seconds with powerful full-text search and advanced filtering.',
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/10',
  },
  {
    icon: Filter,
    title: 'Notes & Activity',
    description: 'Log calls, emails, and meetings. Keep a complete history of every interaction.',
    color: 'text-rose-400',
    bgColor: 'bg-rose-500/10',
  },
]

export default function FeaturesSection() {
  return (
    <section id="features" className="relative py-24 px-6 bg-slate-950">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-50 mb-4">
            Everything Your Sales Team <span className="text-gradient">Needs</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Powerful features designed to help small teams close more deals with less effort.
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature, i) => (
            <ScrollReveal key={feature.title} delay={i * 0.1}>
              <GlassCard className="h-full group">
                <motion.div
                  className={`w-12 h-12 ${feature.bgColor} rounded-xl flex items-center justify-center mb-4`}
                  whileHover={{ rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </motion.div>
                <h3 className="text-lg font-semibold text-slate-100 mb-2">{feature.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{feature.description}</p>
              </GlassCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
