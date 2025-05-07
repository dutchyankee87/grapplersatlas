import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { users } from './schema';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL is not defined');
}

// Configure for connection pooler
const client = postgres(connectionString, { 
  prepare: false,
  ssl: 'require',
  max: 1,
  idle_timeout: 20,
  connect_timeout: 10
});

const db = drizzle(client);

async function testUsers() {
  try {
    console.log('Testing users query...');
    const allUsers = await db.select().from(users);
    console.log('✅ Query successful!');
    console.log('Users:', allUsers);
  } catch (error) {
    console.error('❌ Query failed:', error);
  } finally {
    process.exit();
  }
}

testUsers(); 