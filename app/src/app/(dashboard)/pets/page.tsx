'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Plus, Search, Calendar, Weight, Syringe, FileText, MoreVertical } from 'lucide-react'

// Demo data
const pets = [
  {
    id: '1',
    name: 'מקס',
    species: 'dog',
    breed: 'גולדן רטריבר',
    gender: 'male',
    birthDate: '2021-05-15',
    weight: 32,
    owner: 'יוסי כהן',
    lastVisit: '2025-12-15',
    nextVaccine: '2026-03-15',
  },
  {
    id: '2',
    name: 'לונה',
    species: 'cat',
    breed: 'פרסית',
    gender: 'female',
    birthDate: '2022-08-20',
    weight: 4.5,
    owner: 'שרה לוי',
    lastVisit: '2025-11-20',
    nextVaccine: '2026-02-20',
  },
  {
    id: '3',
    name: 'צ׳רלי',
    species: 'dog',
    breed: 'לברדור',
    gender: 'male',
    birthDate: '2020-03-10',
    weight: 28,
    owner: 'דני אברהם',
    lastVisit: '2026-01-02',
    nextVaccine: '2026-04-10',
  },
  {
    id: '4',
    name: 'מיה',
    species: 'cat',
    breed: 'חתול רחוב',
    gender: 'female',
    birthDate: '2023-01-05',
    weight: 3.2,
    owner: 'רונית גל',
    lastVisit: '2025-12-28',
    nextVaccine: '2026-01-15',
  },
  {
    id: '5',
    name: 'שוקו',
    species: 'hamster',
    breed: 'אוגר סורי',
    gender: 'male',
    birthDate: '2025-06-01',
    weight: 0.15,
    owner: 'רונית גל',
    lastVisit: '2025-10-15',
    nextVaccine: null,
  },
]

const getSpeciesEmoji = (species: string) => {
  const emojis: Record<string, string> = {
    dog: '🐕',
    cat: '🐈',
    bird: '🐦',
    rabbit: '🐰',
    hamster: '🐹',
  }
  return emojis[species] || '🐾'
}

const getSpeciesColor = (species: string) => {
  const colors: Record<string, string> = {
    dog: 'from-amber-400 to-amber-600',
    cat: 'from-purple-400 to-purple-600',
    bird: 'from-sky-400 to-sky-600',
    rabbit: 'from-pink-400 to-pink-600',
    hamster: 'from-orange-400 to-orange-600',
  }
  return colors[species] || 'from-gray-400 to-gray-600'
}

const calculateAge = (birthDate: string) => {
  const birth = new Date(birthDate)
  const now = new Date()
  const years = now.getFullYear() - birth.getFullYear()
  const months = now.getMonth() - birth.getMonth()

  if (years > 0) {
    return `${years} שנים`
  } else if (months > 0) {
    return `${months} חודשים`
  } else {
    return 'פחות מחודש'
  }
}

export default function PetsPage() {
  const t = useTranslations('pets')
  const [searchQuery, setSearchQuery] = useState('')
  const [speciesFilter, setSpeciesFilter] = useState<string>('all')

  const filteredPets = pets.filter((pet) => {
    const matchesSearch = pet.name.includes(searchQuery) || pet.owner.includes(searchQuery)
    const matchesSpecies = speciesFilter === 'all' || pet.species === speciesFilter
    return matchesSearch && matchesSpecies
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t('title')}</h1>
          <p className="text-gray-500 mt-1">{pets.length} חיות מחמד רשומות</p>
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
            placeholder="חיפוש לפי שם או בעלים..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-field pr-10"
          />
        </div>

        <div className="flex gap-2">
          {['all', 'dog', 'cat', 'hamster', 'bird', 'rabbit'].map((species) => (
            <button
              key={species}
              onClick={() => setSpeciesFilter(species)}
              className={`px-4 py-2 rounded-xl transition-all ${
                speciesFilter === species
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {species === 'all' ? 'הכל' : getSpeciesEmoji(species)}
            </button>
          ))}
        </div>
      </div>

      {/* Pets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPets.map((pet) => (
          <Card key={pet.id} className="card-hover overflow-hidden">
            <CardContent className="p-0">
              {/* Header with gradient */}
              <div className={`h-24 bg-gradient-to-br ${getSpeciesColor(pet.species)} relative`}>
                <div className="absolute -bottom-8 right-4">
                  <div className="w-16 h-16 rounded-2xl bg-white shadow-lg flex items-center justify-center text-3xl">
                    {getSpeciesEmoji(pet.species)}
                  </div>
                </div>
                <button className="absolute top-2 left-2 p-1 rounded-lg bg-white/20 hover:bg-white/30 text-white">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>

              <div className="p-4 pt-10">
                {/* Name and breed */}
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-900">{pet.name}</h3>
                  <p className="text-sm text-gray-500">{pet.breed} • {pet.gender === 'male' ? 'זכר' : 'נקבה'}</p>
                  <p className="text-sm text-primary-600">בעלים: {pet.owner}</p>
                </div>

                {/* Info grid */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">{calculateAge(pet.birthDate)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Weight className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">{pet.weight} ק״ג</span>
                  </div>
                </div>

                {/* Last visit and next vaccine */}
                <div className="border-t border-gray-100 pt-4 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500 flex items-center gap-1">
                      <FileText className="w-4 h-4" />
                      ביקור אחרון:
                    </span>
                    <span className="text-gray-700">{new Date(pet.lastVisit).toLocaleDateString('he-IL')}</span>
                  </div>
                  {pet.nextVaccine && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500 flex items-center gap-1">
                        <Syringe className="w-4 h-4" />
                        חיסון הבא:
                      </span>
                      <span className="text-orange-600 font-medium">
                        {new Date(pet.nextVaccine).toLocaleDateString('he-IL')}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
