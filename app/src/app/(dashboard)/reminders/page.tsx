'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import {
  Plus,
  Bell,
  Check,
  Clock,
  Send,
  Calendar,
  Syringe,
  Pill,
  Stethoscope,
} from 'lucide-react'

// Demo reminders data
const reminders = [
  { id: '1', pet: 'מקס', owner: 'יוסי כהן', type: 'vaccination', message: 'חיסון כלבת שנתי', dueDate: '2026-01-05', sent: false, species: 'dog' },
  { id: '2', pet: 'לונה', owner: 'שרה לוי', type: 'checkup', message: 'בדיקה תקופתית', dueDate: '2026-01-07', sent: false, species: 'cat' },
  { id: '3', pet: 'בובי', owner: 'משה דהן', type: 'medication', message: 'חידוש מרשם לתרופות לב', dueDate: '2026-01-10', sent: false, species: 'dog' },
  { id: '4', pet: 'שושי', owner: 'עדי כץ', type: 'vaccination', message: 'חיסון משולש לחתולים', dueDate: '2026-01-12', sent: false, species: 'cat' },
  { id: '5', pet: 'רקסי', owner: 'אבי גולן', type: 'followup', message: 'בדיקת מעקב לאחר ניתוח', dueDate: '2026-01-15', sent: false, species: 'dog' },
  { id: '6', pet: 'צ׳רלי', owner: 'דני אברהם', type: 'vaccination', message: 'תילוע שגרתי', dueDate: '2025-12-28', sent: true, sentAt: '2025-12-25', species: 'dog' },
  { id: '7', pet: 'מיה', owner: 'רונית גל', type: 'checkup', message: 'בדיקת שיניים', dueDate: '2025-12-20', sent: true, sentAt: '2025-12-18', species: 'cat' },
]

const typeIcons: Record<string, React.ReactNode> = {
  vaccination: <Syringe className="w-5 h-5" />,
  checkup: <Stethoscope className="w-5 h-5" />,
  medication: <Pill className="w-5 h-5" />,
  followup: <Calendar className="w-5 h-5" />,
}

const typeLabels: Record<string, string> = {
  vaccination: 'חיסון',
  checkup: 'בדיקה',
  medication: 'תרופות',
  followup: 'מעקב',
}

const typeColors: Record<string, string> = {
  vaccination: 'bg-green-100 text-green-600',
  checkup: 'bg-blue-100 text-blue-600',
  medication: 'bg-purple-100 text-purple-600',
  followup: 'bg-orange-100 text-orange-600',
}

const getSpeciesEmoji = (species: string) => species === 'dog' ? '🐕' : species === 'cat' ? '🐈' : '🐾'

export default function RemindersPage() {
  const t = useTranslations('reminders')
  const [filter, setFilter] = useState<'all' | 'pending' | 'sent'>('all')

  const filteredReminders = reminders.filter((reminder) => {
    if (filter === 'pending') return !reminder.sent
    if (filter === 'sent') return reminder.sent
    return true
  })

  const pendingCount = reminders.filter((r) => !r.sent).length
  const sentCount = reminders.filter((r) => r.sent).length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t('title')}</h1>
          <p className="text-gray-500 mt-1">{pendingCount} תזכורות ממתינות לשליחה</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-5 h-5" />
          {t('create')}
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card
          className={`cursor-pointer transition-all ${filter === 'all' ? 'ring-2 ring-primary-500' : ''}`}
          onClick={() => setFilter('all')}
        >
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center">
              <Bell className="w-6 h-6 text-gray-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{reminders.length}</p>
              <p className="text-sm text-gray-500">כל התזכורות</p>
            </div>
          </CardContent>
        </Card>

        <Card
          className={`cursor-pointer transition-all ${filter === 'pending' ? 'ring-2 ring-primary-500' : ''}`}
          onClick={() => setFilter('pending')}
        >
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{pendingCount}</p>
              <p className="text-sm text-gray-500">ממתינות</p>
            </div>
          </CardContent>
        </Card>

        <Card
          className={`cursor-pointer transition-all ${filter === 'sent' ? 'ring-2 ring-primary-500' : ''}`}
          onClick={() => setFilter('sent')}
        >
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
              <Check className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{sentCount}</p>
              <p className="text-sm text-gray-500">נשלחו</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Reminders List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-primary-600" />
            רשימת תזכורות
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredReminders.map((reminder) => (
              <div
                key={reminder.id}
                className={`flex items-center gap-4 p-4 rounded-xl transition-colors ${
                  reminder.sent ? 'bg-gray-50' : 'bg-orange-50 hover:bg-orange-100'
                }`}
              >
                <div className="text-3xl">{getSpeciesEmoji(reminder.species)}</div>

                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${typeColors[reminder.type]}`}>
                  {typeIcons[reminder.type]}
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-gray-900">{reminder.pet}</h3>
                    <span className="text-sm text-gray-500">• {reminder.owner}</span>
                  </div>
                  <p className="text-sm text-gray-600">{reminder.message}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-gray-200 text-gray-600">
                      {typeLabels[reminder.type]}
                    </span>
                    <span className="text-xs text-gray-500">
                      תאריך יעד: {new Date(reminder.dueDate).toLocaleDateString('he-IL')}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {reminder.sent ? (
                    <div className="flex items-center gap-1 text-green-600">
                      <Check className="w-4 h-4" />
                      <span className="text-sm">נשלח</span>
                    </div>
                  ) : (
                    <Button size="sm" className="gap-1">
                      <Send className="w-4 h-4" />
                      שלח
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
