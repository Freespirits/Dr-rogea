'use client'

import dynamic from 'next/dynamic'
import Sidebar from '@/components/layout/Sidebar'
import Header from '@/components/layout/Header'

const PetParticles = dynamic(() => import('@/components/three/PetParticles'), {
  ssr: false,
})

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen">
      <PetParticles />
      <Sidebar />
      <Header />
      <main className="mr-64 pt-16 p-6 min-h-screen">
        {children}
      </main>
    </div>
  )
}
