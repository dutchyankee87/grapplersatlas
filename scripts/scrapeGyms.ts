import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { gyms } from '../src/db/schema';
import { Google } from 'serpapi';
import dotenv from 'dotenv';

dotenv.config();

// Initialize database connection
const connectionString = process.env.DATABASE_URL;
if (!connectionString) throw new Error('DATABASE_URL is not defined');

const client = postgres(connectionString);
const db = drizzle(client);

// List of major cities to search
const cities = [
  'New York, NY',
  'Los Angeles, CA',
  'Chicago, IL',
  'Houston, TX',
  'Phoenix, AZ',
  // Add more cities as needed
];

async function scrapeGymsForCity(city: string) {
  try {
    // Search for BJJ gyms in the city using SerpAPI
    const searchResults = await Google.search({
      api_key: process.env.SERPAPI_KEY,
      q: `Brazilian Jiu Jitsu gyms in ${city}`,
      location: city,
      num: 100, // Maximum results per page
    });

    const localResults = searchResults.local_results || [];
    
    // Process and insert each gym
    for (const result of localResults) {
      try {
        await db.insert(gyms).values({
          name: result.title,
          address: result.address,
          city: city.split(',')[0].trim(),
          state: city.split(',')[1].trim(),
          phone: result.phone,
          website: result.website,
          latitude: result.gps_coordinates?.latitude?.toString(),
          longitude: result.gps_coordinates?.longitude?.toString(),
        });
        console.log(`Added gym: ${result.title} in ${city}`);
      } catch (error) {
        console.error(`Error adding gym ${result.title}:`, error);
      }
    }
  } catch (error) {
    console.error(`Error scraping gyms for ${city}:`, error);
  }
}

async function main() {
  console.log('Starting gym scraping...');
  
  for (const city of cities) {
    console.log(`Scraping gyms in ${city}...`);
    await scrapeGymsForCity(city);
    // Add a delay between cities to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  
  console.log('Scraping completed!');
  process.exit(0);
}

main().catch(console.error); 