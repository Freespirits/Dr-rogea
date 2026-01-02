'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Plus, Search, Pill, Scissors, Syringe, Shield, FileText } from 'lucide-react'

// Demo treatments data
const treatments = [
  { id: '1', pet: 'מקס', owner: 'יוסי כהן', type: 'medication', name: 'אנטיביוטיקה', date: '2026-01-02', notes: 'אמוקסיצילין 250mg פעמיים ביום ל-7 ימים', species: 'dog' },
  { id: '2', pet: 'לונה', owner: 'שרה לוי', type: 'preventive', name: 'טיפול נגד פרעושים', date: '2026-01-01', notes: 'טיפות Frontline', species: 'cat' },
  { id: '3', pet: 'צ׳רלי', owner: 'דני אברהם', type: 'surgery', name: 'הסרת גידול', date: '2025-12-28', notes: 'גידול שפיר בכתף ימין, הוסר בהצלחה', species: 'dog' },
  { id: '4', pet: 'מיה', owner: 'רונית גל', type: 'procedure', name: 'ניקוי שיניים', date: '2025-12-20', notes: 'ניקוי אבנית מלא תחת הרדמה', species: 'cat' },
  { id: '5', pet: 'בובי', owner: 'משה דהן', type: 'medication', name: 'תרופות לב', date: '2025-12-15', notes: 'Vetmedin 2.5mg פעם ביום', species: 'dog' },
  { id: '6', pet: 'שושי', owner: 'עדי כץ', type: 'preventive', name: 'תילוע', date: '2025-12-10', notes: 'Milbemax לחתולים', species: 'cat' },
]

const typeIcons: Record<string, React.ReactNode> = {
  medication: <Pill className="w-5 h-5" />,
  procedure: <Scissors className="w-5 h-5" />,
  surgery: <Syringe className="w-5 h-5" />,
  preventive: <Shield className="w-5 h-5" />,
}

const typeLabels: Record<string, string> = {
  medication: 'תרופות',
  procedure: 'פרוצדורה',
  surgery: 'ניתוח',
  preventive: 'מניעתי',
}

const typeColors: Record<string, string> = {
  medication: 'from-purple-500 to-purple-600',
  procedure: 'from-blue-500 to-blue-600',
  surgery: 'from-red-500 to-red-600',
  preventive: 'from-green-500 to-green-600',
}

const getSpeciesEmoji = (species: string) => species === 'dog' ? '🐕' : species === 'cat' ? '🐈' : '🐾'

export default function TreatmentsPage() {
  const t = useTranslations('treatments')
  const [searchQuery, setSearchQuery] = useState('')
  const [typeFilter, setTypeFilter] = useState<string>('all')

  const filteredTreatments = treatments.filter((treatment) => {
    const matchesSearch =
      treatment.pet.includes(searchQuery) ||
      treatment.owner.includes(searchQuery) ||
      treatment.name.includes(searchQuery)
    const matchesType = typeFilter === 'all' || treatment.type === typeFilter
    return matchesSearch && matchesType
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t('title')}</h1>
          <p className="text-gray-500 mt-1">היסטוריית טיפולים ומעקב</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-5 h-5" />
          {t('addNew')}
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="חיפוש לפי שם חיה, בעלים או טיפול..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-field pr-10"
          />
        </div>

        <div className="flex gap-2">
          {['all', 'medication', 'procedure', 'surgery', 'preventive'].map((type) => (
            <button
              key={type}
              onClick={() => setTypeFilter(type)}
              className={`px-4 py-2 rounded-xl transition-all ${
                typeFilter === type
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {type === 'all' ? 'הכל' : typeLabels[type]}
            </button>
          ))}
        </div>
      </div>

      {/* Treatments List */}
      <div className="space-y-4">
        {filteredTreatments.map((treatment) => (
          <Card key={treatment.id} className="card-hover">
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <div className="text-3xl">{getSpeciesEmoji(treatment.species)}</div>

                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${typeColors[treatment.type]} flex items-center justify-center text-white shadow-lg`}>
                  {typeIcons[treatment.type]}
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-gray-900">{treatment.name}</h3>
                    <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">
                      {typeLabels[treatment.type]}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    <span className="font-medium">{treatment.pet}</span> • {treatment.owner}
                  </p>
                  {treatment.notes && (
                    <div className="flex items-start gap-2 bg-gray-50 p-3 rounded-lg">
                      <FileText className="w-4 h-4 text-gray-400 mt-0.5" />
                      <p className="text-sm text-gray-600">{treatment.notes}</p>
                    </div>
                  )}
                </div>

                <div className="text-left">
                  <p className="text-sm font-medium text-gray-900">
                    {new Date(treatment.date).toLocaleDateString('he-IL')}
                  </p>
                  <Button variant="ghost" size="sm" className="mt-2">
                    פרטים
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
