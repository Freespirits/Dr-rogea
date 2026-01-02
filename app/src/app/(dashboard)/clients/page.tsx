'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Plus, Search, Phone, Mail, MapPin, PawPrint, MoreVertical } from 'lucide-react'

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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t('title')}</h1>
          <p className="text-gray-500 mt-1">{clients.length} לקוחות רשומים</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-5 h-5" />
          {t('addNew')}
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="חיפוש לפי שם, טלפון או אימייל..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="input-field pr-10"
        />
      </div>

      {/* Clients Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredClients.map((client) => (
          <Card key={client.id} className="card-hover">
            <CardContent className="p-0">
              <div className="p-4">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-lg font-bold">
                      {client.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{client.name}</h3>
                      <p className="text-sm text-gray-500">לקוח מאז {new Date(client.since).toLocaleDateString('he-IL')}</p>
                    </div>
                  </div>
                  <button className="p-1 rounded-lg hover:bg-gray-100">
                    <MoreVertical className="w-5 h-5 text-gray-400" />
                  </button>
                </div>

                {/* Contact Info */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="w-4 h-4" />
                    <span dir="ltr">{client.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail className="w-4 h-4" />
                    <span>{client.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{client.address}</span>
                  </div>
                </div>

                {/* Pets */}
                <div className="border-t border-gray-100 pt-4">
                  <div className="flex items-center gap-2 mb-2">
                    <PawPrint className="w-4 h-4 text-primary-600" />
                    <span className="text-sm font-medium text-gray-700">{t('pets')}:</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {client.pets.map((pet, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-primary-100 text-primary-700 text-sm"
                      >
                        {getSpeciesEmoji(pet.species)}
                        {pet.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
