// @ts-nocheck
import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import ScrollReveal from '../ui/ScrollReveal'
import { Upload, GitBranch, Trophy } from 'lucide-react'

const STEPS = [
  {
    number: '01',
    title: 'Capture Leads',
    description: 'Import leads from any source — website forms, LinkedIn, CSV uploads, or manual entry. LeadFlow automatically enriches contact data.',
    icon: Upload,
    align: 'left',
  },
  {
    number: '02',
    title: 'Track Progress',
    description: 'Move leads through your custom pipeline stages. Get visual alerts when leads go stale and need follow-up.',
    icon: GitBranch,
    align: 'right',
  },
  {
    number: '03',
    title: 'Close Deals',
    description: 'Add notes, update status, and celebrate wins. LeadFlow tracks every interaction so nothing falls through the cracks.',
    icon: Trophy,
    align: 'left',
  },
]

export default function HowItWorksSection() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  })

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section id="how-it-works" className="relative py-24 px-6 bg-slate-950" ref={containerRef}>
      <div className="max-w-5xl mx-auto">
        <ScrollReveal className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-50 mb-4">
            From Lead to Customer in <span className="text-gradient">3 Steps</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            A simple, proven workflow that keeps your team focused on what matters — closing deals.
          </p>
        </ScrollReveal>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2 hidden md:block">
            <motion.div
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-indigo-500 to-purple-500"
              style={{ height: lineHeight }}
            />
          </div>

          <div className="space-y-16 md:space-y-24">
            {STEPS.map((step, i) => (
              <div key={step.number} className={`relative flex flex-col md:flex-row items-center gap-8 ${
                step.align === 'right' ? 'md:flex-row-reverse' : ''
              }`}>
                <ScrollReveal 
                  className="flex-1" 
                  direction={step.align === 'left' ? 'right' : 'left'}
                >
                  <div className="glass p-8 relative group">
                    <div className={`absolute -top-4 ${step.align === 'left' ? '-left-4' : '-right-4'} w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold`}>
                      <step.icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-mono text-indigo-400 mb-2 block">{step.number}</span>
                    <h3 className="text-2xl font-bold text-slate-100 mb-3">{step.title}</h3>
                    <p className="text-slate-400 leading-relaxed">{step.description}</p>
                  </div>
                </ScrollReveal>

                <div className="hidden md:flex w-4 h-4 rounded-full bg-indigo-500 border-4 border-slate-950 z-10 shrink-0" />

                <div className="flex-1 hidden md:block" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
