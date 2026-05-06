// @ts-nocheck
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ScrollReveal from '../ui/ScrollReveal'
import ShimmerButton from '../ui/ShimmerButton'
import { Check } from 'lucide-react'
import { Link } from 'react-router-dom'

const PLANS = [
  {
    name: 'Starter',
    description: 'Perfect for solo sales reps getting started.',
    monthlyPrice: 0,
    yearlyPrice: 0,
    features: [
      'Up to 100 leads',
      'Basic pipeline view',
      'Lead notes & activity',
      'Email notifications',
      'Mobile responsive',
    ],
    cta: 'Start Free',
    popular: false,
  },
  {
    name: 'Pro',
    description: 'For growing teams that need more power.',
    monthlyPrice: 8900,
    yearlyPrice: 7500,
    features: [
      'Unlimited leads',
      'Advanced pipeline analytics',
      'Team collaboration',
      'Custom fields & filters',
      'API access',
      'Priority support',
      'Data export',
    ],
    cta: 'Start Free Trial',
    popular: true,
  },
  {
    name: 'Enterprise',
    description: 'For organizations with advanced needs.',
    monthlyPrice: 24000,
    yearlyPrice: 19500,
    features: [
      'Everything in Pro',
      'SSO & SAML',
      'Advanced permissions',
      'Custom integrations',
      'Dedicated account manager',
      'SLA guarantee',
      'On-premise option',
    ],
    cta: 'Contact Sales',
    popular: false,
  },
]

export default function PricingSection() {
  const [isYearly, setIsYearly] = useState(false)

  return (
    <section id="pricing" className="relative py-24 px-6 bg-slate-950">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-50 mb-4">
            Simple, Transparent <span className="text-gradient">Pricing</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Start free, scale as you grow. No hidden fees, no surprises.
          </p>
        </ScrollReveal>

        {/* Toggle */}
        <ScrollReveal className="flex items-center justify-center gap-4 mb-12">
          <span className={`text-sm ${!isYearly ? 'text-slate-100' : 'text-slate-500'}`}>Monthly</span>
          <button
            className="relative w-14 h-7 bg-slate-800 rounded-full p-1"
            onClick={() => setIsYearly(!isYearly)}
          >
            <motion.div
              className="w-5 h-5 bg-indigo-500 rounded-full"
              layout
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              animate={{ x: isYearly ? 28 : 0 }}
            />
          </button>
          <span className={`text-sm ${isYearly ? 'text-slate-100' : 'text-slate-500'}`}>
            Yearly <span className="text-emerald-400 text-xs">Save 20%</span>
          </span>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          {PLANS.map((plan, i) => (
            <ScrollReveal key={plan.name} delay={i * 0.1} className="h-full">
              <motion.div
                className={`relative glass p-8 h-full flex flex-col ${
                  plan.popular ? 'border-indigo-500/50 shadow-lg shadow-indigo-500/10' : ''
                }`}
                whileHover={{ scale: 1.02, y: -4 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-indigo-600 text-white text-xs font-medium rounded-full">
                    Most Popular
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-xl font-bold text-slate-100 mb-1">{plan.name}</h3>
                  <p className="text-sm text-slate-500">{plan.description}</p>
                </div>

                <div className="mb-6">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={isYearly ? 'yearly' : 'monthly'}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <span className="text-4xl font-bold text-slate-50">
                        Rs.{isYearly ? plan.yearlyPrice.toLocaleString() : plan.monthlyPrice.toLocaleString()}
                      </span>
                      <span className="text-slate-500 text-sm">/mo</span>
                      {isYearly && plan.monthlyPrice > 0 && (
                        <div className="text-xs text-slate-500 mt-1">
                          Billed annually (Rs.{(plan.yearlyPrice * 12).toLocaleString()}/year)
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-slate-400">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link to="/login" className="w-full">
                  <ShimmerButton
                    variant={plan.popular ? 'primary' : 'ghost'}
                    className="w-full"
                  >
                    {plan.cta}
                  </ShimmerButton>
                </Link>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
