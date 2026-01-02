'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { Plus, Search, Calendar, Weight, Syringe, FileText, ChevronLeft } from 'lucide-react'
import { cn } from '@/lib/utils'

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
    dog: 'bg-amber-500',
    cat: 'bg-purple-500',
    bird: 'bg-sky-500',
    rabbit: 'bg-pink-500',
    hamster: 'bg-orange-500',
  }
  return colors[species] || 'bg-gray-500'
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

  const speciesOptions = [
    { value: 'all', label: 'הכל' },
    { value: 'dog', emoji: '🐕' },
    { value: 'cat', emoji: '🐈' },
    { value: 'hamster', emoji: '🐹' },
    { value: 'bird', emoji: '🐦' },
    { value: 'rabbit', emoji: '🐰' },
  ]

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">{t('title')}</h1>
          <p className="text-sm text-gray-500">{pets.length} חיות מחמד רשומות</p>
        </div>
        <Button className="gap-2 w-full sm:w-auto">
          <Plus className="w-5 h-5" />
          {t('addNew')}
        </Button>
      </div>

      {/* Search & Filter */}
      <div className="space-y-3">
        {/* Search */}
        <div className="relative">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="חיפוש לפי שם או בעלים..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-field pr-10"
          />
        </div>

        {/* Species Filter - Horizontal Scroll */}
        <div className="flex overflow-x-auto gap-2 pb-1 -mx-1 px-1">
          {speciesOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setSpeciesFilter(option.value)}
              className={cn(
                'flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all touch-feedback',
                speciesFilter === option.value
                  ? 'bg-primary-500 text-white shadow-sm'
                  : 'bg-gray-100 text-gray-600 active:bg-gray-200'
              )}
            >
              {option.label || option.emoji}
            </button>
          ))}
        </div>
      </div>

      {/* Pets List */}
      <div className="space-y-3">
        {filteredPets.map((pet, index) => (
          <div
            key={pet.id}
            className="mobile-card p-4 animate-fade-in touch-feedback"
            style={{ animationDelay: `${index * 30}ms` }}
          >
            <div className="flex items-start gap-3">
              {/* Avatar */}
              <div className={cn(
                'w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-sm',
                getSpeciesColor(pet.species)
              )}>
                <span className="drop-shadow-sm">{getSpeciesEmoji(pet.species)}</span>
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-gray-900">{pet.name}</h3>
                    <p className="text-xs text-gray-500">
                      {pet.breed} • {pet.gender === 'male' ? 'זכר' : 'נקבה'}
                    </p>
                  </div>
                  <Link
                    href={`/pets/${pet.id}`}
                    className="p-2 rounded-lg bg-gray-100 active:bg-gray-200 transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4 text-gray-500" />
                  </Link>
                </div>

                {/* Quick Stats */}
                <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {calculateAge(pet.birthDate)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Weight className="w-3.5 h-3.5" />
                    {pet.weight} ק״ג
                  </span>
                </div>

                {/* Owner & Vaccine */}
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                  <span className="text-xs text-primary-600 font-medium">{pet.owner}</span>
                  {pet.nextVaccine && (
                    <span className="flex items-center gap-1 text-xs text-orange-600">
                      <Syringe className="w-3.5 h-3.5" />
                      {new Date(pet.nextVaccine).toLocaleDateString('he-IL', {
                        day: 'numeric',
                        month: 'short',
                      })}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredPets.length === 0 && (
        <div className="empty-state">
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-3">
            <span className="text-3xl">🐾</span>
          </div>
          <p className="text-gray-500 text-sm">לא נמצאו חיות מחמד</p>
        </div>
      )}

      {/* FAB */}
      <Link href="/pets/new" className="fab md:hidden">
        <Plus className="w-6 h-6" />
      </Link>
    </div>
  )
}
