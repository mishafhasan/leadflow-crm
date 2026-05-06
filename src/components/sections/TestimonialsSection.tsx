// @ts-nocheck
import { motion } from 'framer-motion'
import ScrollReveal from '../ui/ScrollReveal'

const TESTIMONIALS = [
  {
    name: 'Sarah Mitchell',
    role: 'Sales Director',
    company: 'TechVenture Labs',
    initials: 'SM',
    color: 'bg-blue-500',
    quote: 'LeadFlow transformed how our team manages leads. We went from scattered spreadsheets to a unified pipeline in one week. Our close rate jumped 40%.',
  },
  {
    name: 'James Rodriguez',
    role: 'Founder',
    company: 'GrowthStack',
    initials: 'JR',
    color: 'bg-emerald-500',
    quote: 'The pipeline visualization alone is worth it. I can see exactly where every deal stands without chasing my team for updates. Game changer.',
  },
  {
    name: 'Emily Chen',
    role: 'VP of Sales',
    company: 'CloudNine SaaS',
    initials: 'EC',
    color: 'bg-purple-500',
    quote: 'We evaluated 5 CRMs before choosing LeadFlow. It is the only one that felt built for small teams — simple, fast, and actually enjoyable to use.',
  },
  {
    name: 'Marcus Johnson',
    role: 'Account Executive',
    company: 'DataPulse',
    initials: 'MJ',
    color: 'bg-amber-500',
    quote: 'The notes and activity tracking keeps me organized. I never forget a follow-up anymore, and my manager loves the visibility into my pipeline.',
  },
  {
    name: 'Lisa Park',
    role: 'Sales Manager',
    company: 'InnovateCo',
    initials: 'LP',
    color: 'bg-rose-500',
    quote: 'LeadFlow is the CRM I wish I had at my last three companies. Clean UI, powerful features, and the team actually adopted it without training.',
  },
  {
    name: 'David Kim',
    role: 'CEO',
    company: 'NexGen Solutions',
    initials: 'DK',
    color: 'bg-indigo-500',
    quote: 'We onboarded our entire 12-person sales team in a day. The dashboard gives me real-time revenue visibility I never had before.',
  },
]

export default function TestimonialsSection() {
  return (
    <section className="relative py-24 px-6 bg-slate-950 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-50 mb-4">
            Loved by Sales <span className="text-gradient">Teams</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            See why hundreds of sales professionals trust LeadFlow to manage their pipeline.
          </p>
        </ScrollReveal>

        {/* Marquee container */}
        <div className="relative">
          <div className="flex gap-6 animate-marquee hover:[animation-play-state:paused]">
            {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
              <motion.div
                key={`${t.name}-${i}`}
                className="glass p-6 min-w-[350px] max-w-[350px] flex-shrink-0"
                whileHover={{ scale: 1.02, y: -4 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 ${t.color} rounded-full flex items-center justify-center text-white text-sm font-bold`}>
                    {t.initials}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-100">{t.name}</div>
                    <div className="text-xs text-slate-500">{t.role} at {t.company}</div>
                  </div>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed italic">
                  "{t.quote}"
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
      `}</style>
    </section>
  )
}
