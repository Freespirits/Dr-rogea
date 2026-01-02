'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/Button'
import { Search, Bell, Globe, Menu, Stethoscope, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface HeaderProps {
  onToggleSidebar?: () => void
}

export default function Header({ onToggleSidebar }: HeaderProps) {
  const t = useTranslations('common')
  const [locale, setLocale] = useState('he')
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  const toggleLocale = () => {
    const newLocale = locale === 'he' ? 'en' : 'he'
    setLocale(newLocale)
    document.cookie = `locale=${newLocale};path=/;max-age=31536000`
    window.location.reload()
  }

  return (
    <header className="fixed top-0 left-0 right-0 md:right-64 h-14 md:h-16 bg-white/95 backdrop-blur-lg border-b border-gray-100 z-30 px-4 md:px-6 flex items-center justify-between safe-area-top">
      {/* Mobile: Logo & Menu */}
      <div className="flex items-center gap-3 md:hidden">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-md">
          <Stethoscope className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-sm font-bold text-gray-900 leading-tight">ד״ר רוג׳ה</h1>
          <p className="text-[10px] text-gray-500 leading-tight">קליניקה וטרינרית</p>
        </div>
      </div>

      {/* Desktop: Search */}
      <div className="hidden md:flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>

        <div className="relative">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder={t('search')}
            className="w-64 h-10 pr-10 pl-4 rounded-xl bg-gray-100 border-0 focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all duration-200 text-right"
          />
        </div>
      </div>

      {/* Mobile: Search Expandable */}
      <div
        className={cn(
          'md:hidden absolute inset-x-0 top-0 h-14 bg-white flex items-center px-4 gap-3 transition-all duration-300 z-50',
          isSearchOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        )}
      >
        <div className="flex-1 relative">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder={t('search')}
            className="w-full h-10 pr-10 pl-4 rounded-xl bg-gray-100 border-0 focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all duration-200 text-right text-base"
            autoFocus={isSearchOpen}
          />
        </div>
        <button
          onClick={() => setIsSearchOpen(false)}
          className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-1 md:gap-3">
        {/* Mobile Search Toggle */}
        <button
          onClick={() => setIsSearchOpen(true)}
          className="md:hidden p-2.5 rounded-xl hover:bg-gray-100 transition-colors active:scale-95"
        >
          <Search className="w-5 h-5 text-gray-600" />
        </button>

        {/* Notifications */}
        <button className="relative p-2.5 rounded-xl hover:bg-gray-100 transition-colors active:scale-95">
          <Bell className="w-5 h-5 text-gray-600" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
        </button>

        {/* Language Toggle */}
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleLocale}
          className="flex items-center gap-1.5 px-2.5 md:px-3"
        >
          <Globe className="w-4 h-4" />
          <span className="text-xs md:text-sm font-medium">
            {locale === 'he' ? 'EN' : 'עב'}
          </span>
        </Button>
      </div>
    </header>
  )
}
