import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types for Supabase
export type Database = {
  public: {
    Tables: {
      clients: {
        Row: {
          id: string
          name: string
          email: string
          phone: string
          address: string | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['clients']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['clients']['Insert']>
      }
      pets: {
        Row: {
          id: string
          client_id: string
          name: string
          species: string
          breed: string | null
          birth_date: string | null
          gender: string
          weight: number | null
          microchip_id: string | null
          notes: string | null
          image_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['pets']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['pets']['Insert']>
      }
      appointments: {
        Row: {
          id: string
          pet_id: string
          client_id: string
          date: string
          time: string
          type: string
          status: string
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['appointments']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['appointments']['Insert']>
      }
      vaccinations: {
        Row: {
          id: string
          pet_id: string
          name: string
          date_given: string
          next_due_date: string | null
          batch_number: string | null
          notes: string | null
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['vaccinations']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['vaccinations']['Insert']>
      }
      treatments: {
        Row: {
          id: string
          pet_id: string
          appointment_id: string | null
          type: string
          name: string
          description: string | null
          date: string
          notes: string | null
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['treatments']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['treatments']['Insert']>
      }
      reminders: {
        Row: {
          id: string
          pet_id: string
          client_id: string
          type: string
          message: string
          due_date: string
          sent: boolean
          sent_at: string | null
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['reminders']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['reminders']['Insert']>
      }
    }
  }
}
