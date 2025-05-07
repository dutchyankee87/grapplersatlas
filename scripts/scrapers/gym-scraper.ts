import { getJson } from 'serpapi';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { createClient } from '@supabase/supabase-js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from project root
const envPath = join(__dirname, '../../../.env');
console.log('Looking for .env file at:', envPath);
dotenv.config({ path: envPath });

// Get Supabase project URL from the database URL
const dbUrl = process.env.DATABASE_URL;
const projectRef = dbUrl?.match(/db\.(.+?)\.supabase/)?.[1];
if (!projectRef) {
  throw new Error('Could not extract project reference from DATABASE_URL');
}

const supabaseUrl = `https://${projectRef}.supabase.co`;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const serpApiKey = process.env.SERPAPI_KEY;

if (!supabaseKey || !serpApiKey) {
  throw new Error('Missing required environment variables');
}

// Initialize Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

console.log('Attempting to connect to Supabase...');

// Function to search for BJJ gyms in a city
async function searchGymsInCity(city: string, country: string) {
  try {
    const params = {
      api_key: serpApiKey,
      engine: 'google_maps',
      q: `Brazilian Jiu Jitsu gym ${city} ${country}`,
      type: 'search',
      ll: '@0,0,15z',
      data: '!4m5!3m4!1s0x0:0x0!8m2!3d0!4d0'
    };

    const response = await getJson(params);
    const results = response.local_results || [];

    return results.map((result: any) => ({
      name: result.title,
      address: result.address,
      phone: result.phone,
      website: result.website,
      rating: result.rating,
      reviews_count: result.reviews,
      latitude: result.gps_coordinates?.latitude,
      longitude: result.gps_coordinates?.longitude,
      city,
      country,
      last_updated: new Date().toISOString(),
    }));
  } catch (error) {
    console.error(`Error searching gyms in ${city}, ${country}:`, error);
    return [];
  }
}

// Function to save gyms to database
async function saveGymsToDatabase(gymsData: any[]) {
  try {
    const { data, error } = await supabase
      .from('gyms')
      .upsert(gymsData, {
        onConflict: 'name,address',
        ignoreDuplicates: false
      });

    if (error) throw error;
    console.log(`Successfully saved ${gymsData.length} gyms to database`);
    return data;
  } catch (error) {
    console.error('Error saving to database:', error);
    throw error;
  }
}

// Main function to run the scraper
async function main() {
  try {
    // Test the connection
    const { data, error } = await supabase.from('gyms').select('count').single();
    if (error) throw error;
    console.log('Successfully connected to Supabase');

    // List of cities to search (you can expand this)
    const cities = [
      { city: 'New York', country: 'USA' },
      { city: 'Los Angeles', country: 'USA' },
      { city: 'London', country: 'UK' },
      // Add more cities as needed
    ];

    for (const { city, country } of cities) {
      console.log(`Searching for gyms in ${city}, ${country}...`);
      const gyms = await searchGymsInCity(city, country);
      if (gyms.length > 0) {
        await saveGymsToDatabase(gyms);
      }
      // Add a delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

// Run the scraper
main().catch(console.error); 