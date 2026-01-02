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
    <aside className="fixed right-0 top-0 h-screen w-64 bg-white/90 backdrop-blur-md border-s border-gray-200 shadow-lg z-40">
      <div className="p-6">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-lg">
            <Stethoscope className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900">ד״ר רוג׳ה</h1>
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
                  'flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200',
                  isActive
                    ? 'bg-primary-100 text-primary-700 font-medium shadow-sm'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                )}
              >
                <item.icon className={cn('w-5 h-5', isActive && 'text-primary-600')} />
                <span>{t(item.label)}</span>
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Settings at bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200">
        <Link
          href="/settings"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all duration-200"
        >
          <Settings className="w-5 h-5" />
          <span>{t('settings')}</span>
        </Link>
      </div>
    </aside>
  )
}
