'use client'

import { useTranslations } from 'next-intl'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import {
  Users,
  PawPrint,
  Calendar,
  Bell,
  Plus,
  Clock,
  TrendingUp,
  ArrowUpRight,
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
  { label: 'totalClients', value: 156, icon: Users, change: '+12%', color: 'from-blue-500 to-blue-600' },
  { label: 'totalPets', value: 234, icon: PawPrint, change: '+8%', color: 'from-primary-500 to-primary-600' },
  { label: 'thisMonthAppointments', value: 89, icon: Calendar, change: '+23%', color: 'from-purple-500 to-purple-600' },
  { label: 'pendingReminders', value: 12, icon: Bell, change: '-5%', color: 'from-orange-500 to-orange-600' },
]

const getSpeciesEmoji = (species: string) => {
  return species === 'dog' ? '🐕' : species === 'cat' ? '🐈' : '🐾'
}

export default function DashboardPage() {
  const t = useTranslations('dashboard')
  const tStats = useTranslations('dashboard.stats')

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t('title')}</h1>
          <p className="text-gray-500 mt-1">שלום ד״ר רוג׳ה, יום נהדר לטפל בחיות! 🐾</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-5 h-5" />
          תור חדש
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="stat-card card-hover">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <span className="flex items-center gap-1 text-sm font-medium text-green-600">
                <TrendingUp className="w-4 h-4" />
                {stat.change}
              </span>
            </div>
            <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-sm text-gray-500 mt-1">{tStats(stat.label)}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Appointments */}
        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary-600" />
              {t('todayAppointments')}
            </CardTitle>
            <Button variant="ghost" size="sm" className="gap-1">
              הכל
              <ArrowUpRight className="w-4 h-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {todayAppointments.map((apt) => (
                <div
                  key={apt.id}
                  className="flex items-center gap-4 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div className="text-2xl">{getSpeciesEmoji(apt.species)}</div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{apt.pet}</p>
                    <p className="text-sm text-gray-500">{apt.owner}</p>
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-gray-900">{apt.time}</p>
                    <p className="text-sm text-primary-600">{apt.type}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Reminders */}
        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-orange-500" />
              {t('upcomingReminders')}
            </CardTitle>
            <Button variant="ghost" size="sm" className="gap-1">
              הכל
              <ArrowUpRight className="w-4 h-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingReminders.map((reminder) => (
                <div
                  key={reminder.id}
                  className="flex items-center gap-4 p-3 rounded-xl bg-orange-50 hover:bg-orange-100 transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-orange-200 flex items-center justify-center">
                    <Bell className="w-5 h-5 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{reminder.pet}</p>
                    <p className="text-sm text-gray-500">{reminder.type}</p>
                  </div>
                  <div className="text-sm text-gray-500">
                    {new Date(reminder.dueDate).toLocaleDateString('he-IL')}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
