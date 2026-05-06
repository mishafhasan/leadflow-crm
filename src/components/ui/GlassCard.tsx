// @ts-nocheck
import { motion } from 'framer-motion'

export default function GlassCard({ children, className = '', hover = true }) {
  return (
    <motion.div
      className={`glass p-6 ${className}`}
      whileHover={hover ? { y: -8, boxShadow: '0 0 30px rgba(99,102,241,0.2)' } : {}}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      {children}
    </motion.div>
  )
}
