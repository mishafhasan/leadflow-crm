// @ts-nocheck
import { motion } from 'framer-motion'
import { ChevronDown, Play } from 'lucide-react'
import PipelineScene from '../three/PipelineScene'
import ShimmerButton from '../ui/ShimmerButton'
import { Link } from 'react-router-dom'

export default function HeroSection() {
  const titleWords = 'Grow Your Business with LeadFlow'.split(' ')

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <PipelineScene />

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto pt-24 pb-12">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-slate-50 mb-6">
          {titleWords.map((word, i) => (
            <motion.span
              key={i}
              className={`inline-block mr-[0.25em]${word === 'LeadFlow' || word === 'Grow' ? ' text-gradient' : ''}`}
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.2 + i * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.p
          className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          The intelligent CRM that helps small sales teams track, nurture, and convert leads effortlessly.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6 }}
        >
          <Link to="/login">
            <ShimmerButton variant="primary" className="px-8 py-4 text-base">
              Get Started Free
            </ShimmerButton>
          </Link>
          <ShimmerButton variant="ghost" className="px-8 py-4 text-base">
            <Play className="w-4 h-4" />
            Watch Demo
          </ShimmerButton>
        </motion.div>

        <motion.div
          className="mt-16 flex items-center justify-center gap-8 opacity-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          {['Trusted by 500+ teams', 'SOC 2 Compliant', 'GDPR Ready'].map((text) => (
            <span key={text} className="text-xs text-slate-500 font-medium hidden sm:block">
              {text}
            </span>
          ))}
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ChevronDown className="w-6 h-6 text-slate-500" />
      </motion.div>
    </section>
  )
}
