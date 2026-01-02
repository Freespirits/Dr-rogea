'use client'

import { useEffect, useCallback } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  Users,
  PawPrint,
  Calendar,
  Syringe,
  Pill,
  Bell,
  Info,
  Settings,
  Stethoscope,
  X,
  LogOut,
} from 'lucide-react'

const navItems = [
  { href: '/', icon: LayoutDashboard, label: 'dashboard' },
  { href: '/clients', icon: Users, label: 'clients' },
  { href: '/pets', icon: PawPrint, label: 'pets' },
  { href: '/appointments', icon: Calendar, label: 'appointments' },
  { href: '/vaccinations', icon: Syringe, label: 'vaccinations' },
  { href: '/treatments', icon: Pill, label: 'treatments' },
  { href: '/reminders', icon: Bell, label: 'reminders' },
  { href: '/info', icon: Info, label: 'info' },
]

interface MobileDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export default function MobileDrawer({ isOpen, onClose }: MobileDrawerProps) {
  const pathname = usePathname()
  const t = useTranslations('nav')

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    },
    [onClose]
  )

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      document.addEventListener('keydown', handleKeyDown)
    }
    return () => {
      document.body.style.overflow = 'unset'
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, handleKeyDown])

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          'fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity duration-300',
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={onClose}
      />

      {/* Drawer */}
      <aside
        className={cn(
          'fixed top-0 right-0 h-full w-[280px] max-w-[85vw] bg-white z-50 shadow-2xl transition-transform duration-300 ease-out',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-lg">
              <Stethoscope className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-base font-bold text-gray-900">ד״ר רוג׳ה</h1>
              <p className="text-xs text-gray-500">קליניקה וטרינרית</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-gray-100 transition-colors active:scale-95"
            aria-label="Close menu"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-180px)]">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  'flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 active:scale-[0.98]',
                  isActive
                    ? 'bg-primary-50 text-primary-700 font-semibold'
                    : 'text-gray-600 hover:bg-gray-50 active:bg-gray-100'
                )}
              >
                <div
                  className={cn(
                    'w-10 h-10 rounded-xl flex items-center justify-center transition-colors',
                    isActive ? 'bg-primary-100' : 'bg-gray-100'
                  )}
                >
                  <item.icon
                    className={cn(
                      'w-5 h-5',
                      isActive ? 'text-primary-600' : 'text-gray-500'
                    )}
                  />
                </div>
                <span className="text-[15px]">{t(item.label)}</span>
              </Link>
            )
          })}
        </nav>

        {/* Bottom Section */}
        <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-gray-100 bg-white">
          <Link
            href="/settings"
            onClick={onClose}
            className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-gray-600 hover:bg-gray-50 active:bg-gray-100 transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
              <Settings className="w-5 h-5 text-gray-500" />
            </div>
            <span className="text-[15px]">{t('settings')}</span>
          </Link>
        </div>
      </aside>
    </>
  )
}
