'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  PawPrint,
  Calendar,
  Bell,
  Menu,
} from 'lucide-react'

const navItems = [
  { href: '/', icon: LayoutDashboard, label: 'dashboard' },
  { href: '/pets', icon: PawPrint, label: 'pets' },
  { href: '/appointments', icon: Calendar, label: 'appointments' },
  { href: '/reminders', icon: Bell, label: 'reminders' },
]

interface BottomNavProps {
  onMenuClick: () => void
}

export default function BottomNav({ onMenuClick }: BottomNavProps) {
  const pathname = usePathname()
  const t = useTranslations('nav')

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-[72px] bg-white/95 backdrop-blur-lg border-t border-gray-200 z-40 md:hidden safe-area-bottom">
      <div className="flex items-center justify-around h-full px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center gap-1 w-16 h-14 rounded-2xl transition-all duration-200 active:scale-95',
                isActive
                  ? 'text-primary-600'
                  : 'text-gray-400 hover:text-gray-600'
              )}
            >
              <div
                className={cn(
                  'p-1.5 rounded-xl transition-colors',
                  isActive && 'bg-primary-100'
                )}
              >
                <item.icon
                  className={cn(
                    'w-6 h-6 transition-all',
                    isActive && 'text-primary-600'
                  )}
                  strokeWidth={isActive ? 2.5 : 2}
                />
              </div>
              <span
                className={cn(
                  'text-[10px] font-medium transition-colors',
                  isActive && 'text-primary-600'
                )}
              >
                {t(item.label)}
              </span>
            </Link>
          )
        })}

        {/* More Menu Button */}
        <button
          onClick={onMenuClick}
          className="flex flex-col items-center justify-center gap-1 w-16 h-14 rounded-2xl text-gray-400 hover:text-gray-600 transition-all duration-200 active:scale-95"
        >
          <div className="p-1.5 rounded-xl">
            <Menu className="w-6 h-6" />
          </div>
          <span className="text-[10px] font-medium">עוד</span>
        </button>
      </div>
    </nav>
  )
}
