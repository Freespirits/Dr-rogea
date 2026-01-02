'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import Sidebar from '@/components/layout/Sidebar'
import Header from '@/components/layout/Header'
import MobileDrawer from '@/components/layout/MobileDrawer'
import BottomNav from '@/components/layout/BottomNav'

const PetParticles = dynamic(() => import('@/components/three/PetParticles'), {
  ssr: false,
})

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen)
  const closeMobileMenu = () => setIsMobileMenuOpen(false)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop Only: Particle Background */}
      {!isMobile && <PetParticles />}

      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Mobile Drawer */}
      <MobileDrawer isOpen={isMobileMenuOpen} onClose={closeMobileMenu} />

      {/* Header */}
      <Header onToggleSidebar={toggleMobileMenu} />

      {/* Main Content */}
      <main className="md:mr-64 pt-16 pb-24 md:pb-6 px-4 md:px-6 min-h-screen">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <BottomNav onMenuClick={toggleMobileMenu} />
    </div>
  )
}
