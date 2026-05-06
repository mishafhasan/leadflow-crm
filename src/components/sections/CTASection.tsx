// @ts-nocheck
import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Canvas, useFrame } from '@react-three/fiber'
import { TorusKnot } from '@react-three/drei'
import ScrollReveal from '../ui/ScrollReveal'
import ShimmerButton from '../ui/ShimmerButton'
import { ArrowRight, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'

function RotatingTorus() {
  const meshRef = useRef()

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2
    }
  })

  return (
    <TorusKnot
      ref={meshRef}
      args={[1.2, 0.4, 128, 32]}
      rotation={[0.5, 0.5, 0]}
    >
      <meshPhysicalMaterial
        color="#4f46e5"
        roughness={0.1}
        metalness={0.3}
        iridescence={1}
        iridescenceIOR={1.3}
        clearcoat={1}
      />
    </TorusKnot>
  )
}

function Scene() {
  const groupRef = useRef()

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.2
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.2
    }
  })

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} color="#818cf8" intensity={3} />
      <pointLight position={[-5, -5, -5]} color="#a855f7" intensity={2} />
      <RotatingTorus />
    </group>
  )
}

export default function CTASection() {
  const [email, setEmail] = useState('')
  const [particles, setParticles] = useState([])
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const handleHover = () => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: Date.now() + i,
      x: (Math.random() - 0.5) * 200,
      y: (Math.random() - 0.5) * 200,
      color: ['#6366f1', '#a855f7', '#10b981', '#f59e0b'][Math.floor(Math.random() * 4)],
    }))
    setParticles(newParticles)
    setTimeout(() => setParticles([]), 1000)
  }

  return (
    <section className="relative py-24 px-6 min-h-[60vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-slate-950 to-slate-950" />

      <div className="absolute inset-0 z-0 opacity-40">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <Scene />
        </Canvas>
      </div>

      <div className="relative z-10 max-w-3xl mx-auto text-center" ref={ref}>
        <ScrollReveal>
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs font-medium text-indigo-300 mb-6"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
          >
            <Sparkles className="w-3 h-3" />
            Join 500+ teams already using LeadFlow
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-bold text-slate-50 mb-6">
            Ready to Supercharge<br />Your <span className="text-gradient">Sales</span>?
          </h2>

          <p className="text-lg text-slate-400 mb-10 max-w-xl mx-auto">
            Start your free trial today. No credit card required. Cancel anytime.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto relative">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full sm:flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <div className="relative" onMouseEnter={handleHover}>
              <Link to="/login">
                <ShimmerButton variant="primary" className="px-6 py-3 whitespace-nowrap">
                  Get Started
                  <ArrowRight className="w-4 h-4" />
                </ShimmerButton>
              </Link>

              {particles.map((p) => (
                <motion.div
                  key={p.id}
                  className="absolute w-2 h-2 rounded-full"
                  style={{ backgroundColor: p.color, left: '50%', top: '50%' }}
                  initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                  animate={{ x: p.x, y: p.y, opacity: 0, scale: 0 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                />
              ))}
            </div>
          </div>

          <p className="text-xs text-slate-600 mt-4">
            By signing up, you agree to our Terms of Service and Privacy Policy.
          </p>
        </ScrollReveal>
      </div>
    </section>
  )
}
