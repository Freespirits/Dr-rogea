// סוגי נתונים למערכת הווטרינרית

export interface Client {
  id: string
  name: string
  email: string
  phone: string
  address?: string
  created_at: string
  updated_at: string
}

export interface Pet {
  id: string
  client_id: string
  name: string
  species: 'dog' | 'cat' | 'bird' | 'rabbit' | 'hamster' | 'other'
  breed?: string
  birth_date?: string
  gender: 'male' | 'female'
  weight?: number
  microchip_id?: string
  notes?: string
  image_url?: string
  created_at: string
  updated_at: string
}

export interface Appointment {
  id: string
  pet_id: string
  client_id: string
  date: string
  time: string
  type: 'checkup' | 'vaccination' | 'surgery' | 'emergency' | 'grooming' | 'consultation'
  status: 'scheduled' | 'completed' | 'cancelled' | 'no_show'
  notes?: string
  created_at: string
  updated_at: string
}

export interface Vaccination {
  id: string
  pet_id: string
  name: string
  date_given: string
  next_due_date?: string
  batch_number?: string
  notes?: string
  created_at: string
}

export interface Treatment {
  id: string
  pet_id: string
  appointment_id?: string
  type: 'medication' | 'procedure' | 'surgery' | 'preventive'
  name: string
  description?: string
  date: string
  notes?: string
  created_at: string
}

export interface MedicalRecord {
  id: string
  pet_id: string
  appointment_id?: string
  diagnosis?: string
  symptoms?: string
  treatment_notes?: string
  prescriptions?: string
  weight?: number
  temperature?: number
  date: string
  created_at: string
}

export interface Reminder {
  id: string
  pet_id: string
  client_id: string
  type: 'vaccination' | 'checkup' | 'medication' | 'followup'
  message: string
  due_date: string
  sent: boolean
  sent_at?: string
  created_at: string
}

// סוגי מידע לכרטיסיות
export interface InfoCard {
  id: string
  category: 'snake_bite' | 'ticks' | 'deworming' | 'oral_health' | 'grooming' | 'allergies' | 'tumors' | 'urinary' | 'neutering'
  title_he: string
  title_en: string
  content_he: string
  content_en: string
  image_url?: string
}
