'use client'

import { useTranslations } from 'next-intl'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import {
  Users,
  PawPrint,
  Calendar,
  Bell,
  Plus,
  Clock,
  ChevronLeft,
  Stethoscope,
} from 'lucide-react'

// Demo data
const todayAppointments = [
  { id: 1, time: '09:00', pet: 'מקס', owner: 'יוסי כהן', type: 'בדיקה', species: 'dog' },
  { id: 2, time: '10:30', pet: 'לונה', owner: 'שרה לוי', type: 'חיסון', species: 'cat' },
  { id: 3, time: '14:00', pet: 'צ׳רלי', owner: 'דני אברהם', type: 'ניתוח', species: 'dog' },
  { id: 4, time: '16:00', pet: 'מיה', owner: 'רונית גל', type: 'ייעוץ', species: 'cat' },
]

const upcomingReminders = [
  { id: 1, pet: 'בובי', type: 'חיסון כלבת', dueDate: '2026-01-05' },
  { id: 2, pet: 'שושי', type: 'בדיקת דם', dueDate: '2026-01-07' },
  { id: 3, pet: 'רקסי', type: 'תילוע', dueDate: '2026-01-10' },
]

const stats = [
  { label: 'totalClients', value: 156, icon: Users, color: 'bg-blue-500' },
  { label: 'totalPets', value: 234, icon: PawPrint, color: 'bg-primary-500' },
  { label: 'thisMonthAppointments', value: 89, icon: Calendar, color: 'bg-purple-500' },
  { label: 'pendingReminders', value: 12, icon: Bell, color: 'bg-orange-500' },
]

const getSpeciesEmoji = (species: string) => {
  return species === 'dog' ? '🐕' : species === 'cat' ? '🐈' : '🐾'
}

export default function DashboardPage() {
  const t = useTranslations('dashboard')
  const tStats = useTranslations('dashboard.stats')

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Welcome Section - Mobile Optimized */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">{t('title')}</h1>
          <p className="text-sm text-gray-500 mt-0.5">יום נהדר לטפל בחיות! 🐾</p>
        </div>
        <Button className="gap-2 w-full sm:w-auto">
          <Plus className="w-5 h-5" />
          תור חדש
        </Button>
      </div>

      {/* Stats Grid - 2x2 on mobile, 4 on desktop */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className="stat-card touch-feedback animate-fade-in"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex items-center gap-3 mb-2">
              <div
                className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center shadow-sm`}
              >
                <stat.icon className="w-5 h-5 text-white" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-xs text-gray-500 mt-0.5 truncate">{tStats(stat.label)}</p>
          </div>
        ))}
      </div>

      {/* Today's Appointments */}
      <div className="mobile-card">
        <div className="section-header p-4 pb-0">
          <h2 className="section-title">
            <div className="w-8 h-8 rounded-lg bg-primary-100 flex items-center justify-center">
              <Clock className="w-4 h-4 text-primary-600" />
            </div>
            {t('todayAppointments')}
          </h2>
          <Link
            href="/appointments"
            className="flex items-center gap-1 text-sm text-primary-600 font-medium touch-feedback"
          >
            הכל
            <ChevronLeft className="w-4 h-4" />
          </Link>
        </div>
        <div className="p-3 space-y-2">
          {todayAppointments.map((apt, index) => (
            <div
              key={apt.id}
              className="list-item animate-fade-in"
              style={{ animationDelay: `${index * 30}ms` }}
            >
              <div className="w-11 h-11 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-xl">
                {getSpeciesEmoji(apt.species)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 text-sm">{apt.pet}</p>
                <p className="text-xs text-gray-500 truncate">{apt.owner}</p>
              </div>
              <div className="text-left">
                <p className="font-semibold text-gray-900 text-sm">{apt.time}</p>
                <span className="inline-block px-2 py-0.5 rounded-md bg-primary-100 text-primary-700 text-xs font-medium">
                  {apt.type}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Reminders */}
      <div className="mobile-card">
        <div className="section-header p-4 pb-0">
          <h2 className="section-title">
            <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center">
              <Bell className="w-4 h-4 text-orange-600" />
            </div>
            {t('upcomingReminders')}
          </h2>
          <Link
            href="/reminders"
            className="flex items-center gap-1 text-sm text-primary-600 font-medium touch-feedback"
          >
            הכל
            <ChevronLeft className="w-4 h-4" />
          </Link>
        </div>
        <div className="p-3 space-y-2">
          {upcomingReminders.map((reminder, index) => (
            <div
              key={reminder.id}
              className="list-item bg-orange-50 animate-fade-in"
              style={{ animationDelay: `${index * 30}ms` }}
            >
              <div className="w-11 h-11 rounded-xl bg-orange-100 flex items-center justify-center">
                <Bell className="w-5 h-5 text-orange-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 text-sm">{reminder.pet}</p>
                <p className="text-xs text-gray-500 truncate">{reminder.type}</p>
              </div>
              <div className="text-sm text-gray-600 font-medium">
                {new Date(reminder.dueDate).toLocaleDateString('he-IL', {
                  day: 'numeric',
                  month: 'short',
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions Section - Mobile Only */}
      <div className="mobile-card md:hidden">
        <div className="p-4">
          <h2 className="section-title mb-3">פעולות מהירות</h2>
          <div className="grid grid-cols-2 gap-2">
            <Link
              href="/clients"
              className="flex items-center gap-3 p-3 rounded-xl bg-blue-50 text-blue-700 touch-feedback"
            >
              <Users className="w-5 h-5" />
              <span className="text-sm font-medium">לקוחות</span>
            </Link>
            <Link
              href="/vaccinations"
              className="flex items-center gap-3 p-3 rounded-xl bg-green-50 text-green-700 touch-feedback"
            >
              <Stethoscope className="w-5 h-5" />
              <span className="text-sm font-medium">חיסונים</span>
            </Link>
          </div>
        </div>
      </div>

      {/* FAB for new appointment */}
      <Link href="/appointments/new" className="fab md:hidden">
        <Plus className="w-6 h-6" />
      </Link>
    </div>
  )
}
