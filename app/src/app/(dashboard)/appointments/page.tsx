'use client'

import { useState, useRef, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import {
  Plus,
  Calendar,
  Clock,
  ChevronRight,
  ChevronLeft,
  Check,
  X,
  AlertCircle,
} from 'lucide-react'
import { cn } from '@/lib/utils'

// Demo appointments data
const appointments = [
  { id: '1', date: '2026-01-02', time: '09:00', pet: 'מקס', owner: 'יוסי כהן', type: 'checkup', status: 'scheduled', species: 'dog' },
  { id: '2', date: '2026-01-02', time: '10:30', pet: 'לונה', owner: 'שרה לוי', type: 'vaccination', status: 'scheduled', species: 'cat' },
  { id: '3', date: '2026-01-02', time: '14:00', pet: 'צ׳רלי', owner: 'דני אברהם', type: 'surgery', status: 'scheduled', species: 'dog' },
  { id: '4', date: '2026-01-02', time: '16:00', pet: 'מיה', owner: 'רונית גל', type: 'consultation', status: 'completed', species: 'cat' },
  { id: '5', date: '2026-01-03', time: '09:30', pet: 'בובי', owner: 'משה דהן', type: 'vaccination', status: 'scheduled', species: 'dog' },
  { id: '6', date: '2026-01-03', time: '11:00', pet: 'שושי', owner: 'עדי כץ', type: 'checkup', status: 'scheduled', species: 'cat' },
  { id: '7', date: '2026-01-04', time: '10:00', pet: 'רקסי', owner: 'אבי גולן', type: 'grooming', status: 'scheduled', species: 'dog' },
]

const typeColors: Record<string, string> = {
  checkup: 'bg-blue-100 text-blue-700',
  vaccination: 'bg-green-100 text-green-700',
  surgery: 'bg-red-100 text-red-700',
  emergency: 'bg-red-100 text-red-700',
  grooming: 'bg-purple-100 text-purple-700',
  consultation: 'bg-yellow-100 text-yellow-700',
}

const typeLabels: Record<string, string> = {
  checkup: 'בדיקה',
  vaccination: 'חיסון',
  surgery: 'ניתוח',
  emergency: 'חירום',
  grooming: 'טיפוח',
  consultation: 'ייעוץ',
}

const statusConfig: Record<string, { icon: React.ReactNode; label: string; color: string }> = {
  scheduled: { icon: <Clock className="w-3.5 h-3.5" />, label: 'מתוזמן', color: 'text-blue-500' },
  completed: { icon: <Check className="w-3.5 h-3.5" />, label: 'הושלם', color: 'text-green-500' },
  cancelled: { icon: <X className="w-3.5 h-3.5" />, label: 'בוטל', color: 'text-red-500' },
  no_show: { icon: <AlertCircle className="w-3.5 h-3.5" />, label: 'לא הגיע', color: 'text-yellow-500' },
}

const getSpeciesEmoji = (species: string) => species === 'dog' ? '🐕' : species === 'cat' ? '🐈' : '🐾'

// Generate week days
const generateWeekDays = (startDate: Date) => {
  const days = []
  for (let i = 0; i < 7; i++) {
    const date = new Date(startDate)
    date.setDate(date.getDate() + i)
    days.push(date)
  }
  return days
}

export default function AppointmentsPage() {
  const t = useTranslations('appointments')
  const scrollRef = useRef<HTMLDivElement>(null)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [weekStart, setWeekStart] = useState(() => {
    const today = new Date()
    const day = today.getDay()
    const diff = today.getDate() - day
    return new Date(today.setDate(diff))
  })

  const weekDays = generateWeekDays(weekStart)

  const filteredAppointments = appointments.filter(
    (apt) => apt.date === selectedDate.toISOString().split('T')[0]
  )

  const dayNames = ['א׳', 'ב׳', 'ג׳', 'ד׳', 'ה׳', 'ו׳', 'ש׳']

  // Scroll to today on mount (mobile)
  useEffect(() => {
    const todayIndex = weekDays.findIndex(
      (d) => d.toDateString() === new Date().toDateString()
    )
    if (scrollRef.current && todayIndex !== -1) {
      const scrollTo = todayIndex * 60 - scrollRef.current.offsetWidth / 2 + 30
      scrollRef.current.scrollLeft = Math.max(0, scrollTo)
    }
  }, [])

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">{t('title')}</h1>
          <p className="text-sm text-gray-500">ניהול וקביעת תורים</p>
        </div>
        <Button className="gap-2 w-full sm:w-auto">
          <Plus className="w-5 h-5" />
          {t('schedule')}
        </Button>
      </div>

      {/* Week Navigation - Mobile Optimized */}
      <div className="mobile-card overflow-hidden">
        {/* Month Header */}
        <div className="flex items-center justify-between p-3 border-b border-gray-100">
          <button
            onClick={() => {
              const newStart = new Date(weekStart)
              newStart.setDate(newStart.getDate() - 7)
              setWeekStart(newStart)
            }}
            className="p-2 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
          <h2 className="text-base font-semibold text-gray-900">
            {weekStart.toLocaleDateString('he-IL', { month: 'long', year: 'numeric' })}
          </h2>
          <button
            onClick={() => {
              const newStart = new Date(weekStart)
              newStart.setDate(newStart.getDate() + 7)
              setWeekStart(newStart)
            }}
            className="p-2 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Week Days - Horizontal Scroll on Mobile */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto gap-2 p-3 snap-x snap-mandatory scrollbar-hide md:grid md:grid-cols-7 md:gap-2"
        >
          {weekDays.map((date, index) => {
            const isSelected = date.toDateString() === selectedDate.toDateString()
            const isToday = date.toDateString() === new Date().toDateString()
            const dayAppointments = appointments.filter(
              (apt) => apt.date === date.toISOString().split('T')[0]
            )

            return (
              <button
                key={index}
                onClick={() => setSelectedDate(date)}
                className={cn(
                  'flex-shrink-0 w-14 md:w-auto p-2.5 md:p-3 rounded-xl text-center transition-all snap-center touch-feedback',
                  isSelected
                    ? 'bg-primary-500 text-white shadow-md'
                    : isToday
                    ? 'bg-primary-50 text-primary-700 ring-1 ring-primary-200'
                    : 'bg-gray-50 hover:bg-gray-100'
                )}
              >
                <div className={cn(
                  'text-[10px] md:text-xs font-medium',
                  isSelected ? 'text-primary-100' : 'text-gray-500'
                )}>
                  {dayNames[date.getDay()]}
                </div>
                <div className={cn(
                  'text-lg md:text-xl font-bold mt-0.5',
                  !isSelected && !isToday && 'text-gray-900'
                )}>
                  {date.getDate()}
                </div>
                {dayAppointments.length > 0 && (
                  <div className={cn(
                    'mt-1 flex justify-center gap-0.5',
                    isSelected ? 'text-primary-200' : 'text-primary-500'
                  )}>
                    {[...Array(Math.min(dayAppointments.length, 3))].map((_, i) => (
                      <div
                        key={i}
                        className={cn(
                          'w-1.5 h-1.5 rounded-full',
                          isSelected ? 'bg-white/70' : 'bg-primary-400'
                        )}
                      />
                    ))}
                  </div>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Appointments List */}
      <div className="mobile-card">
        <div className="section-header p-4 pb-0">
          <h2 className="section-title">
            <div className="w-8 h-8 rounded-lg bg-primary-100 flex items-center justify-center">
              <Calendar className="w-4 h-4 text-primary-600" />
            </div>
            <span className="text-base">
              {selectedDate.toLocaleDateString('he-IL', { weekday: 'long', day: 'numeric', month: 'short' })}
            </span>
          </h2>
          <span className="text-sm text-gray-500">
            {filteredAppointments.length} תורים
          </span>
        </div>

        <div className="p-3">
          {filteredAppointments.length === 0 ? (
            <div className="empty-state py-8">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                <Calendar className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-500 text-sm">אין תורים מתוזמנים ליום זה</p>
              <Button variant="outline" size="sm" className="mt-3">
                <Plus className="w-4 h-4 mr-1" />
                הוסף תור
              </Button>
            </div>
          ) : (
            <div className="space-y-2">
              {filteredAppointments.map((apt, index) => (
                <div
                  key={apt.id}
                  className="list-item animate-fade-in"
                  style={{ animationDelay: `${index * 30}ms` }}
                >
                  <div className="w-11 h-11 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-xl">
                    {getSpeciesEmoji(apt.species)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold text-gray-900 text-sm">{apt.pet}</h3>
                      <span className={cn(
                        'px-2 py-0.5 rounded-md text-[10px] font-medium',
                        typeColors[apt.type]
                      )}>
                        {typeLabels[apt.type]}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 truncate">{apt.owner}</p>
                  </div>
                  <div className="text-left flex flex-col items-end gap-1">
                    <p className="font-bold text-gray-900 text-sm">{apt.time}</p>
                    <div className={cn(
                      'flex items-center gap-1 text-[10px]',
                      statusConfig[apt.status].color
                    )}>
                      {statusConfig[apt.status].icon}
                      <span>{statusConfig[apt.status].label}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* FAB */}
      <Link href="/appointments/new" className="fab md:hidden">
        <Plus className="w-6 h-6" />
      </Link>
    </div>
  )
}
