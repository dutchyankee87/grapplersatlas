import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';

// Create a new pool instance
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

// Create a new drizzle instance
export const db = drizzle(pool, { schema }); 