import { db } from './config';
import { gyms, cities } from './schema';

async function testConnection() {
  try {
    console.log('Attempting to connect to database...');
    // Try to query the database
    const result = await db.select().from(cities).limit(1);
    console.log('✅ Database connection successful!');
    console.log('Sample data:', result);
  } catch (error) {
    console.error('❌ Database connection failed:');
    console.error('Error details:', error);
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
  } finally {
    process.exit();
  }
}

testConnection(); 