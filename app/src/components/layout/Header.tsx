'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/Button'
import { Search, Bell, Globe, Menu } from 'lucide-react'

interface HeaderProps {
  onToggleSidebar?: () => void
}

export default function Header({ onToggleSidebar }: HeaderProps) {
  const t = useTranslations('common')
  const [locale, setLocale] = useState('he')

  const toggleLocale = () => {
    const newLocale = locale === 'he' ? 'en' : 'he'
    setLocale(newLocale)
    document.cookie = `locale=${newLocale};path=/;max-age=31536000`
    window.location.reload()
  }

  return (
    <header className="fixed top-0 left-0 right-64 h-16 bg-white/80 backdrop-blur-md border-b border-gray-200 z-30 px-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Search */}
        <div className="relative">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder={t('search')}
            className="w-64 h-10 pr-10 pl-4 rounded-xl bg-gray-100 border-0 focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all duration-200 text-right"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Notifications */}
        <button className="relative p-2 rounded-xl hover:bg-gray-100 transition-colors">
          <Bell className="w-5 h-5 text-gray-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        {/* Language Toggle */}
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleLocale}
          className="flex items-center gap-2"
        >
          <Globe className="w-4 h-4" />
          <span>{locale === 'he' ? 'EN' : 'עב'}</span>
        </Button>
      </div>
    </header>
  )
}
