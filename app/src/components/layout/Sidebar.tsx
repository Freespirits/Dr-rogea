'use client'

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

export default function Sidebar() {
  const pathname = usePathname()
  const t = useTranslations('nav')

  return (
    <aside className="fixed right-0 top-0 h-screen w-64 bg-white/95 backdrop-blur-lg border-s border-gray-100 shadow-sm z-40">
      <div className="p-5">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-8 px-2">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-lg">
            <Stethoscope className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-base font-bold text-gray-900">ד״ר רוג׳ה</h1>
            <p className="text-xs text-gray-500">קליניקה וטרינרית</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200',
                  isActive
                    ? 'bg-primary-50 text-primary-700 font-medium'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                )}
              >
                <div
                  className={cn(
                    'w-9 h-9 rounded-lg flex items-center justify-center transition-colors',
                    isActive ? 'bg-primary-100' : 'bg-transparent'
                  )}
                >
                  <item.icon
                    className={cn(
                      'w-5 h-5',
                      isActive ? 'text-primary-600' : 'text-gray-500'
                    )}
                  />
                </div>
                <span className="text-sm">{t(item.label)}</span>
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Settings at bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-5 border-t border-gray-100">
        <Link
          href="/settings"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200"
        >
          <div className="w-9 h-9 rounded-lg flex items-center justify-center">
            <Settings className="w-5 h-5 text-gray-500" />
          </div>
          <span className="text-sm">{t('settings')}</span>
        </Link>
      </div>
    </aside>
  )
}
