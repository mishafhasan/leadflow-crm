import { useEffect, useState } from 'react'
import LandingNavbar from '../components/layout/LandingNavbar'
import HeroSection from '../components/sections/HeroSection'
import PipelineVizSection from '../components/sections/PipelineVizSection'
import FeaturesSection from '../components/sections/FeaturesSection'
import HowItWorksSection from '../components/sections/HowItWorksSection'
import DemoSection from '../components/sections/DemoSection'
import TestimonialsSection from '../components/sections/TestimonialsSection'
import PricingSection from '../components/sections/PricingSection'
import CTASection from '../components/sections/CTASection'
import FooterSection from '../components/sections/FooterSection'
import { publicApi } from '../services/api'

export default function LandingPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [publicStats, setPublicStats] = useState<any>(null)

  useEffect(() => {
    // Fetch real stats from backend, then show the page
    publicApi.getStats()
      .then(data => setPublicStats(data))
      .catch(() => {}) // fail silently — landing page still shows with fallback data
      .finally(() => {
        setTimeout(() => setIsLoaded(true), 300)
      })
  }, [])

  if (!isLoaded) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950">
        <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="relative bg-slate-950 text-slate-50 min-h-screen">
      <LandingNavbar />
      <main>
        <HeroSection />
        <PipelineVizSection publicStats={publicStats} />
        <FeaturesSection />
        <HowItWorksSection />
        <DemoSection publicStats={publicStats} />
        <TestimonialsSection />
        <PricingSection />
        <CTASection />
      </main>
      <FooterSection />
    </div>
  )
}
