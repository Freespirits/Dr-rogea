'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Plus, Search, Syringe, Calendar, AlertTriangle, Check } from 'lucide-react'

// Demo vaccinations data
const vaccinations = [
  { id: '1', pet: 'מקס', owner: 'יוסי כהן', name: 'כלבת', dateGiven: '2025-03-15', nextDue: '2026-03-15', batchNumber: 'RB2025-001', species: 'dog' },
  { id: '2', pet: 'מקס', owner: 'יוסי כהן', name: 'משושה', dateGiven: '2025-03-15', nextDue: '2026-03-15', batchNumber: 'DH2025-045', species: 'dog' },
  { id: '3', pet: 'לונה', owner: 'שרה לוי', name: 'משולש לחתולים', dateGiven: '2025-02-20', nextDue: '2026-02-20', batchNumber: 'FC2025-112', species: 'cat' },
  { id: '4', pet: 'לונה', owner: 'שרה לוי', name: 'כלבת', dateGiven: '2025-02-20', nextDue: '2026-02-20', batchNumber: 'RB2025-089', species: 'cat' },
  { id: '5', pet: 'צ׳רלי', owner: 'דני אברהם', name: 'כלבת', dateGiven: '2025-04-10', nextDue: '2026-04-10', batchNumber: 'RB2025-234', species: 'dog' },
  { id: '6', pet: 'מיה', owner: 'רונית גל', name: 'משולש לחתולים', dateGiven: '2025-01-05', nextDue: '2026-01-05', batchNumber: 'FC2024-567', species: 'cat' },
  { id: '7', pet: 'בובי', owner: 'משה דהן', name: 'כלבת', dateGiven: '2025-05-20', nextDue: '2026-05-20', batchNumber: 'RB2025-345', species: 'dog' },
]

const getSpeciesEmoji = (species: string) => species === 'dog' ? '🐕' : species === 'cat' ? '🐈' : '🐾'

const getDaysUntilDue = (dueDate: string) => {
  const due = new Date(dueDate)
  const now = new Date()
  const diff = due.getTime() - now.getTime()
  return Math.ceil(diff / (1000 * 60 * 60 * 24))
}

const getStatusColor = (daysUntil: number) => {
  if (daysUntil < 0) return 'bg-red-100 text-red-700 border-red-200'
  if (daysUntil <= 30) return 'bg-orange-100 text-orange-700 border-orange-200'
  return 'bg-green-100 text-green-700 border-green-200'
}

const getStatusIcon = (daysUntil: number) => {
  if (daysUntil < 0) return <AlertTriangle className="w-4 h-4" />
  if (daysUntil <= 30) return <Calendar className="w-4 h-4" />
  return <Check className="w-4 h-4" />
}

export default function VaccinationsPage() {
  const t = useTranslations('vaccinations')
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'urgent' | 'upcoming' | 'ok'>('all')

  const filteredVaccinations = vaccinations.filter((vax) => {
    const matchesSearch =
      vax.pet.includes(searchQuery) ||
      vax.owner.includes(searchQuery) ||
      vax.name.includes(searchQuery)

    const daysUntil = getDaysUntilDue(vax.nextDue)
    let matchesStatus = true
    if (statusFilter === 'urgent') matchesStatus = daysUntil < 0
    else if (statusFilter === 'upcoming') matchesStatus = daysUntil >= 0 && daysUntil <= 30
    else if (statusFilter === 'ok') matchesStatus = daysUntil > 30

    return matchesSearch && matchesStatus
  })

  const urgentCount = vaccinations.filter((v) => getDaysUntilDue(v.nextDue) < 0).length
  const upcomingCount = vaccinations.filter((v) => {
    const d = getDaysUntilDue(v.nextDue)
    return d >= 0 && d <= 30
  }).length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t('title')}</h1>
          <p className="text-gray-500 mt-1">מעקב אחר חיסונים ותאריכי חידוש</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-5 h-5" />
          {t('addNew')}
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {urgentCount > 0 && (
          <Card className="bg-red-50 border-red-200">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-red-700">{urgentCount}</p>
                <p className="text-sm text-red-600">חיסונים באיחור</p>
              </div>
            </CardContent>
          </Card>
        )}
        {upcomingCount > 0 && (
          <Card className="bg-orange-50 border-orange-200">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-orange-700">{upcomingCount}</p>
                <p className="text-sm text-orange-600">מתקרבים (30 יום)</p>
              </div>
            </CardContent>
          </Card>
        )}
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
              <Check className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-green-700">{vaccinations.length}</p>
              <p className="text-sm text-green-600">סה״כ חיסונים</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="חיפוש לפי שם חיה, בעלים או חיסון..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-field pr-10"
          />
        </div>

        <div className="flex gap-2">
          {[
            { key: 'all', label: 'הכל' },
            { key: 'urgent', label: 'באיחור' },
            { key: 'upcoming', label: 'מתקרבים' },
            { key: 'ok', label: 'בתוקף' },
          ].map((filter) => (
            <button
              key={filter.key}
              onClick={() => setStatusFilter(filter.key as typeof statusFilter)}
              className={`px-4 py-2 rounded-xl transition-all ${
                statusFilter === filter.key
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Vaccinations List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Syringe className="w-5 h-5 text-primary-600" />
            רשימת חיסונים
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredVaccinations.map((vax) => {
              const daysUntil = getDaysUntilDue(vax.nextDue)
              return (
                <div
                  key={vax.id}
                  className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div className="text-3xl">{getSpeciesEmoji(vax.species)}</div>

                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-white shadow-lg">
                    <Syringe className="w-6 h-6" />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-gray-900">{vax.name}</h3>
                    </div>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">{vax.pet}</span> • {vax.owner}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      אצווה: {vax.batchNumber}
                    </p>
                  </div>

                  <div className="text-left">
                    <p className="text-sm text-gray-500">
                      ניתן: {new Date(vax.dateGiven).toLocaleDateString('he-IL')}
                    </p>
                    <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium mt-1 ${getStatusColor(daysUntil)}`}>
                      {getStatusIcon(daysUntil)}
                      <span>
                        {daysUntil < 0
                          ? `באיחור ${Math.abs(daysUntil)} ימים`
                          : daysUntil === 0
                          ? 'היום!'
                          : `עוד ${daysUntil} ימים`}
                      </span>
                    </div>
                  </div>

                  <Button variant="outline" size="sm">
                    חדש
                  </Button>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
