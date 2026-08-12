import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const isSupabaseConfigured = Boolean(url && anonKey)

// Null until .env.local has real Supabase credentials — callers fall back
// to mock data in that case (see src/lib/api/creators.js). Copy
// .env.example to .env.local and fill in your project's URL/anon key to
// switch from mock data to live queries.
export const supabase = isSupabaseConfigured ? createClient(url, anonKey) : null
