import { z } from 'zod';

// Define environment variable schema
const envSchema = z.object({
  DATABASE_URL: z.string().optional(),
  VITE_GOOGLE_MAPS_API_KEY: z.string().optional(),
  VITE_SUPABASE_URL: z.string().optional(),
  VITE_SUPABASE_ANON_KEY: z.string().optional(),
});

// Parse environment variables
const env = envSchema.parse(import.meta.env);

// Export validated environment variables
export const config = {
  databaseUrl: env.DATABASE_URL,
  googleMapsApiKey: env.VITE_GOOGLE_MAPS_API_KEY,
  supabaseUrl: env.VITE_SUPABASE_URL,
  supabaseAnonKey: env.VITE_SUPABASE_ANON_KEY,
} as const; 