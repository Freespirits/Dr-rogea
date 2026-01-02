'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { Plus, Search, Phone, Mail, MapPin, PawPrint, ChevronLeft } from 'lucide-react'
import { cn } from '@/lib/utils'

// Demo data
const clients = [
  {
    id: '1',
    name: 'יוסי כהן',
    email: 'yossi@email.com',
    phone: '050-1234567',
    address: 'תל אביב, רחוב הרצל 15',
    pets: [{ name: 'מקס', species: 'dog' }, { name: 'בלה', species: 'cat' }],
    since: '2024-03-15',
  },
  {
    id: '2',
    name: 'שרה לוי',
    email: 'sara@email.com',
    phone: '052-9876543',
    address: 'רמת גן, שדרות ירושלים 42',
    pets: [{ name: 'לונה', species: 'cat' }],
    since: '2023-11-20',
  },
  {
    id: '3',
    name: 'דני אברהם',
    email: 'dani@email.com',
    phone: '054-5551234',
    address: 'גבעתיים, רחוב ביאליק 8',
    pets: [{ name: 'צ׳רלי', species: 'dog' }, { name: 'רוקי', species: 'dog' }],
    since: '2024-01-10',
  },
  {
    id: '4',
    name: 'רונית גל',
    email: 'ronit@email.com',
    phone: '053-7778899',
    address: 'הרצליה, רחוב הים 3',
    pets: [{ name: 'מיה', species: 'cat' }, { name: 'נמר', species: 'cat' }, { name: 'שוקו', species: 'hamster' }],
    since: '2025-06-01',
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

export default function ClientsPage() {
  const t = useTranslations('clients')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredClients = clients.filter(
    (client) =>
      client.name.includes(searchQuery) ||
      client.email.includes(searchQuery) ||
      client.phone.includes(searchQuery)
  )

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">{t('title')}</h1>
          <p className="text-sm text-gray-500">{clients.length} לקוחות רשומים</p>
        </div>
        <Button className="gap-2 w-full sm:w-auto">
          <Plus className="w-5 h-5" />
          {t('addNew')}
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="חיפוש לפי שם, טלפון או אימייל..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="input-field pr-10"
        />
      </div>

      {/* Clients List */}
      <div className="space-y-3">
        {filteredClients.map((client, index) => (
          <div
            key={client.id}
            className="mobile-card animate-fade-in"
            style={{ animationDelay: `${index * 30}ms` }}
          >
            <div className="p-4">
              {/* Header */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-lg font-bold shadow-sm">
                  {client.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-900">{client.name}</h3>
                  <p className="text-xs text-gray-500">
                    לקוח מאז {new Date(client.since).toLocaleDateString('he-IL', {
                      month: 'short',
                      year: 'numeric',
                    })}
                  </p>
                </div>
                <Link
                  href={`/clients/${client.id}`}
                  className="p-2 rounded-lg bg-gray-100 active:bg-gray-200 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4 text-gray-500" />
                </Link>
              </div>

              {/* Contact Actions */}
              <div className="flex gap-2 mt-3">
                <a
                  href={`tel:${client.phone}`}
                  className="flex-1 flex items-center justify-center gap-2 p-2.5 rounded-xl bg-primary-50 text-primary-700 text-sm font-medium active:bg-primary-100 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span dir="ltr">{client.phone}</span>
                </a>
                <a
                  href={`mailto:${client.email}`}
                  className="p-2.5 rounded-xl bg-gray-100 text-gray-600 active:bg-gray-200 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>

              {/* Pets */}
              <div className="mt-3 pt-3 border-t border-gray-100">
                <div className="flex items-center gap-2 mb-2">
                  <PawPrint className="w-4 h-4 text-primary-600" />
                  <span className="text-xs font-medium text-gray-700">{t('pets')}:</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {client.pets.map((pet, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-gray-100 text-gray-700 text-xs font-medium"
                    >
                      {getSpeciesEmoji(pet.species)}
                      {pet.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredClients.length === 0 && (
        <div className="empty-state">
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-3">
            <span className="text-3xl">👤</span>
          </div>
          <p className="text-gray-500 text-sm">לא נמצאו לקוחות</p>
        </div>
      )}

      {/* FAB */}
      <Link href="/clients/new" className="fab md:hidden">
        <Plus className="w-6 h-6" />
      </Link>
    </div>
  )
}
