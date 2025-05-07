import { db } from './db';
import { gyms } from './db/schema';

async function testConnection() {
  try {
    // Try to query the database
    const result = await db.select().from(gyms).limit(1);
    console.log('✅ Database connection successful!');
    console.log('Current gyms in database:', result);
  } catch (error) {
    console.error('❌ Database connection failed:', error);
  }
}

testConnection(); 