// @ts-nocheck
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Zap, Github, Twitter, Linkedin, Mail } from 'lucide-react'
import { Link } from 'react-router-dom'

const FOOTER_LINKS = {
  Product: ['Features', 'Pricing', 'Integrations', 'Changelog', 'Roadmap'],
  Resources: ['Documentation', 'API Reference', 'Blog', 'Community', 'Support'],
  Company: ['About', 'Careers', 'Press', 'Contact', 'Partners'],
  Legal: ['Privacy', 'Terms', 'Security', 'Cookies'],
}

export default function FooterSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <footer className="relative bg-slate-950 pt-20 pb-8 px-6" ref={ref}>
      {/* Animated divider */}
      <div className="max-w-7xl mx-auto mb-16">
        <motion.div
          className="h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-16">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-slate-50">LeadFlow</span>
            </Link>
            <p className="text-sm text-slate-500 mb-4 max-w-xs">
              The intelligent CRM that helps small sales teams close more deals.
            </p>
            <div className="flex gap-3">
              {[Github, Twitter, Linkedin, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-slate-500 hover:text-slate-200 hover:bg-white/10 transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-sm font-semibold text-slate-200 mb-4">{category}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-slate-500 hover:text-slate-300 transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-600">
            &copy; {new Date().getFullYear()} LeadFlow CRM. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <span>Made by: </span>
            <a href="https://github.com/mishafhasan" target="_blank" rel="noopener noreferrer" className="text-indigo-400 font-medium">Mishaf Hasan</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
