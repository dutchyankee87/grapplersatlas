import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Database configuration
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL is not defined');
}

// Create the PostgreSQL client
const client = postgres(connectionString, {
  ssl: 'require',
  max: 1,
  idle_timeout: 20,
  connect_timeout: 10,
  prepare: false,
  connection: {
    application_name: 'grapplers-atlas',
    statement_timeout: 10000,
  },
});

// Create the Drizzle instance
export const db = drizzle(client, { schema });

// Export the client for migrations
export const migrationClient = client; 