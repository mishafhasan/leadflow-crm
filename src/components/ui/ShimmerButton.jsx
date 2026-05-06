import { motion } from 'framer-motion'

export default function ShimmerButton({ children, className = '', onClick, variant = 'primary' }) {
  const baseStyles = 'relative overflow-hidden px-6 py-3 rounded-xl font-medium text-sm transition-all duration-300 inline-flex items-center justify-center gap-2'
  const variants = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-500',
    ghost: 'glass text-slate-200 hover:bg-white/10',
    outline: 'border border-white/20 text-slate-200 hover:bg-white/5',
  }

  return (
    <motion.button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
    >
      {variant === 'primary' && (
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-shimmer" />
      )}
      {children}
    </motion.button>
  )
}
