// @ts-nocheck
import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Float, Sphere, MeshDistortMaterial, Trail, Sparkles } from '@react-three/drei'
import * as THREE from 'three'
import { useMousePosition } from '../../hooks/useMousePosition'

function LeadComet({ radius, speed, color, angleOffset, yOffset }) {
  const ref = useRef()
  
  useFrame(() => {
    const t = (performance.now() / 1000) * speed + angleOffset
    if (ref.current) {
      ref.current.position.x = Math.sin(t) * radius
      ref.current.position.z = Math.cos(t) * radius
      ref.current.position.y = Math.sin(t * 2) * yOffset
    }
  })

  return (
    <Trail
      width={1.5}
      length={8}
      color={new THREE.Color(color)}
      attenuation={(t) => t * t}
    >
      <mesh ref={ref}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshBasicMaterial color={color} toneMapped={false} />
        <pointLight color={color} intensity={1} distance={4} />
      </mesh>
    </Trail>
  )
}

function Core() {
  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
      <Sphere args={[1.4, 64, 64]}>
        <MeshDistortMaterial
          color="#1e1b4b"
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.1}
          metalness={0.8}
          transmission={0.9}
          thickness={1.5}
          envMapIntensity={2}
        />
      </Sphere>
      {/* Inner glowing sphere */}
      <Sphere args={[0.9, 32, 32]}>
        <meshStandardMaterial
          color="#4f46e5"
          emissive="#3730a3"
          emissiveIntensity={4}
          wireframe
          transparent
          opacity={0.2}
        />
      </Sphere>
    </Float>
  )
}

function OrbitingNodes() {
  const nodes = [
    { name: 'New', color: '#f59e0b', ring: 2.8, speed: 0.3, offset: 0, yOffset: 0.4 },
    { name: 'Contacted', color: '#3b82f6', ring: 3.6, speed: -0.25, offset: Math.PI / 3, yOffset: 0.6 },
    { name: 'Qualified', color: '#6366f1', ring: 4.4, speed: 0.2, offset: Math.PI, yOffset: 0.3 },
    { name: 'Proposal', color: '#a855f7', ring: 5.2, speed: -0.15, offset: Math.PI * 1.5, yOffset: 0.8 },
    { name: 'Won', color: '#10b981', ring: 6.0, speed: 0.1, offset: Math.PI / 2, yOffset: 0.5 },
  ]
  
  return (
    <group>
      {nodes.map((node, i) => (
        <LeadComet 
          key={i} 
          radius={node.ring} 
          speed={node.speed} 
          color={node.color} 
          angleOffset={node.offset} 
          yOffset={node.yOffset}
        />
      ))}
      {/* Rings */}
      {nodes.map((node, i) => (
        <mesh key={`ring-${i}`} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[node.ring - 0.015, node.ring + 0.015, 64]} />
          <meshBasicMaterial color={node.color} transparent opacity={0.1} side={THREE.DoubleSide} />
        </mesh>
      ))}
    </group>
  )
}

function SceneContent() {
  const groupRef = useRef()
  const mouse = useMousePosition()

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        mouse.x * 0.2,
        0.05
      )
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        mouse.y * 0.15 + 0.2, // slight tilt
        0.05
      )
    }
  })

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 8, 5]} color="#818cf8" intensity={2} />
      <spotLight position={[-5, -8, -5]} color="#a855f7" angle={0.8} penumbra={1} intensity={1.5} />

      <Core />
      <OrbitingNodes />
      
      <Sparkles count={300} scale={12} size={2} speed={0.4} opacity={0.4} color="#818cf8" />
      
      <Environment preset="city" />
    </group>
  )
}

export default function PipelineScene() {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 3, 10], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <SceneContent />
      </Canvas>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-950/20 via-slate-950/80 to-slate-950 pointer-events-none" />
    </div>
  )
}
