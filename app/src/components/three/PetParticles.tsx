'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

function ParticleField() {
  const ref = useRef<THREE.Points>(null)

  const particlesCount = 2000

  const positions = useMemo(() => {
    const pos = new Float32Array(particlesCount * 3)
    for (let i = 0; i < particlesCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20
    }
    return pos
  }, [])

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.02
      ref.current.rotation.y = state.clock.elapsedTime * 0.03
    }
  })

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#22c55e"
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  )
}

function FloatingPaws() {
  const groupRef = useRef<THREE.Group>(null)

  const pawPositions = useMemo(() => {
    const positions = []
    for (let i = 0; i < 15; i++) {
      positions.push({
        x: (Math.random() - 0.5) * 10,
        y: (Math.random() - 0.5) * 10,
        z: (Math.random() - 0.5) * 5 - 3,
        speed: 0.2 + Math.random() * 0.3,
        rotationSpeed: 0.01 + Math.random() * 0.02,
      })
    }
    return positions
  }, [])

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((child, i) => {
        const data = pawPositions[i]
        child.position.y = data.y + Math.sin(state.clock.elapsedTime * data.speed + i) * 0.5
        child.rotation.z = Math.sin(state.clock.elapsedTime * data.rotationSpeed + i) * 0.3
      })
    }
  })

  return (
    <group ref={groupRef}>
      {pawPositions.map((pos, i) => (
        <mesh key={i} position={[pos.x, pos.y, pos.z]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshBasicMaterial color="#86efac" transparent opacity={0.4} />
        </mesh>
      ))}
    </group>
  )
}

export default function PetParticles() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <ParticleField />
        <FloatingPaws />
      </Canvas>
    </div>
  )
}
