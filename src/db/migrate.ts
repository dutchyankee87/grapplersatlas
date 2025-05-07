import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const runMigration = async () => {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not defined');
  }

  const connection = postgres(process.env.DATABASE_URL, { max: 1 });

  console.log('Dropping existing tables...');
  await connection`DROP TABLE IF EXISTS gyms CASCADE`;
  await connection`DROP TABLE IF EXISTS cities CASCADE`;
  
  console.log('Creating tables...');
  await connection`
    CREATE TABLE cities (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name TEXT NOT NULL,
      country TEXT NOT NULL,
      continent TEXT NOT NULL,
      description TEXT,
      image TEXT,
      coordinates TEXT,
      featured BOOLEAN DEFAULT false,
      gym_density NUMERIC DEFAULT 0,
      belt_friendliness NUMERIC DEFAULT 0,
      instructor_quality NUMERIC DEFAULT 0,
      drop_in_friendliness NUMERIC DEFAULT 0,
      competition_opportunities NUMERIC DEFAULT 0,
      monthly_cost NUMERIC DEFAULT 0,
      cost_of_living NUMERIC DEFAULT 0,
      visa_friendliness NUMERIC DEFAULT 0,
      safety NUMERIC DEFAULT 0,
      english_friendly BOOLEAN DEFAULT false,
      weather_type TEXT,
      weather_score NUMERIC DEFAULT 0,
      healthcare NUMERIC DEFAULT 0,
      bjj_community NUMERIC DEFAULT 0,
      social_life NUMERIC DEFAULT 0,
      recovery_facilities BOOLEAN DEFAULT false,
      remote_work_friendly BOOLEAN DEFAULT false,
      wifi_speed NUMERIC DEFAULT 0,
      coworking_spaces BOOLEAN DEFAULT false,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    )
  `;

  await connection`
    CREATE TABLE gyms (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      city_id UUID REFERENCES cities(id) ON DELETE CASCADE,
      name TEXT NOT NULL,
      description TEXT,
      address TEXT NOT NULL,
      coordinates TEXT,
      rating NUMERIC DEFAULT 0,
      review_count NUMERIC DEFAULT 0,
      website TEXT,
      phone TEXT,
      email TEXT,
      photos TEXT[],
      monthly_fee NUMERIC,
      drop_in_fee NUMERIC,
      training_styles JSONB,
      opening_hours JSONB,
      amenities TEXT[],
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW(),
      UNIQUE(name, address)
    )
  `;
  
  console.log('Migration completed!');
  
  await connection.end();
};

runMigration().catch((err) => {
  console.error('Migration failed!');
  console.error(err);
  process.exit(1);
}); 