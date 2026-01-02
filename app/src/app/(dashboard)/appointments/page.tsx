'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
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

const statusIcons: Record<string, React.ReactNode> = {
  scheduled: <Clock className="w-4 h-4 text-blue-500" />,
  completed: <Check className="w-4 h-4 text-green-500" />,
  cancelled: <X className="w-4 h-4 text-red-500" />,
  no_show: <AlertCircle className="w-4 h-4 text-yellow-500" />,
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t('title')}</h1>
          <p className="text-gray-500 mt-1">ניהול וקביעת תורים</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-5 h-5" />
          {t('schedule')}
        </Button>
      </div>

      {/* Week Navigation */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => {
                const newStart = new Date(weekStart)
                newStart.setDate(newStart.getDate() - 7)
                setWeekStart(newStart)
              }}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <h2 className="text-lg font-semibold">
              {weekStart.toLocaleDateString('he-IL', { month: 'long', year: 'numeric' })}
            </h2>
            <button
              onClick={() => {
                const newStart = new Date(weekStart)
                newStart.setDate(newStart.getDate() + 7)
                setWeekStart(newStart)
              }}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-2">
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
                  className={`p-3 rounded-xl text-center transition-all ${
                    isSelected
                      ? 'bg-primary-600 text-white'
                      : isToday
                      ? 'bg-primary-100 text-primary-700'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <div className="text-xs opacity-75">{dayNames[date.getDay()]}</div>
                  <div className="text-lg font-bold">{date.getDate()}</div>
                  {dayAppointments.length > 0 && (
                    <div className={`text-xs mt-1 ${isSelected ? 'text-primary-200' : 'text-primary-600'}`}>
                      {dayAppointments.length} תורים
                    </div>
                  )}
                </button>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Appointments List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary-600" />
            תורים ל-{selectedDate.toLocaleDateString('he-IL', { weekday: 'long', day: 'numeric', month: 'long' })}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredAppointments.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>אין תורים מתוזמנים ליום זה</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredAppointments.map((apt) => (
                <div
                  key={apt.id}
                  className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div className="text-3xl">{getSpeciesEmoji(apt.species)}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-gray-900">{apt.pet}</h3>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${typeColors[apt.type]}`}>
                        {typeLabels[apt.type]}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">{apt.owner}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-left">
                      <p className="font-bold text-gray-900">{apt.time}</p>
                      <div className="flex items-center gap-1 text-sm">
                        {statusIcons[apt.status]}
                        <span className="text-gray-500">
                          {apt.status === 'scheduled' ? 'מתוזמן' : apt.status === 'completed' ? 'הושלם' : apt.status}
                        </span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      פרטים
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
