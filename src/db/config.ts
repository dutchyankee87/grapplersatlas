import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Get Supabase connection string from environment
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  if (import.meta.env.DEV) {
    console.warn('DATABASE_URL is not defined in development. Some features may not work.');
  } else {
    throw new Error('DATABASE_URL is not defined');
  }
}

// Create postgres client with Supabase-specific configuration
const client = postgres(connectionString || '', {
  ssl: import.meta.env.PROD ? 'require' : false,
  max: 1, // Use a single connection for migrations
  idle_timeout: 20, // Close idle connections after 20 seconds
  connect_timeout: 10, // Connection timeout of 10 seconds
});

// Create drizzle instance
export const db = drizzle(client, { schema });

// Export client for migrations
export const migrationClient = client; 