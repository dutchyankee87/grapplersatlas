import { db } from './config';
import { gyms, cities } from './schema';

async function testConnection() {
  try {
    // Try to query the database
    const result = await db.select().from(cities).limit(1);
    console.log('✅ Database connection successful!');
    console.log('Sample data:', result);
  } catch (error) {
    console.error('❌ Database connection failed:', error);
  } finally {
    process.exit();
  }
}

testConnection(); 