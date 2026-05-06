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

export default function LandingPage() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 500)
    return () => clearTimeout(timer)
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
        <PipelineVizSection />
        <FeaturesSection />
        <HowItWorksSection />
        <DemoSection />
        <TestimonialsSection />
        <PricingSection />
        <CTASection />
      </main>
      <FooterSection />
    </div>
  )
}
