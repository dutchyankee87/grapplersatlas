import { db } from '../db/config';
import { gyms, cities } from '../db/schema';
import { getJson } from 'serpapi';
import dotenv from 'dotenv';
import { eq, and } from 'drizzle-orm';

dotenv.config();

const SERP_API_KEY = process.env.SERP_API_KEY;

if (!SERP_API_KEY) {
  throw new Error('SERP_API_KEY is not defined');
}

function parseCoordinates(coordString: string | null): { lat: number; lng: number } | null {
  if (!coordString) return null;
  
  // Remove parentheses and split by comma
  const coords = coordString.replace(/[()]/g, '').split(',').map(Number);
  if (coords.length === 2 && !isNaN(coords[0]) && !isNaN(coords[1])) {
    return { lng: coords[0], lat: coords[1] };
  }
  return null;
}

async function searchGymsInCity(city: string, country: string, coordinates: string | null) {
  try {
    console.log(`Searching for BJJ gyms in ${city}, ${country}...`);
    
    const cityCoords = parseCoordinates(coordinates);
    const locationString = cityCoords 
      ? `@${cityCoords.lat},${cityCoords.lng},13z`
      : `${city} ${country}`;
    
    console.log(`Using location: ${locationString}`);
    
    const searchResults = await getJson({
      api_key: SERP_API_KEY,
      engine: 'google_maps',
      q: `Brazilian Jiu Jitsu ${city} ${country}`,
      type: 'search',
      ll: locationString,
      limit: 20
    });

    console.log('Raw search results:', JSON.stringify(searchResults, null, 2));
    
    if (!searchResults.local_results) {
      console.log('No local results found, trying alternative search...');
      // Try alternative search
      const altResults = await getJson({
        api_key: SERP_API_KEY,
        engine: 'google_maps',
        q: `BJJ ${city} ${country}`,
        type: 'search',
        ll: locationString,
        limit: 20
      });
      
      return altResults.local_results || [];
    }

    return searchResults.local_results;
  } catch (error) {
    console.error(`Error searching gyms in ${city}, ${country}:`, error);
    return [];
  }
}

async function saveGymToDatabase(gymData: any, cityId: string) {
  try {
    // Extract coordinates from the address
    const coordinates = gymData.gps_coordinates 
      ? `(${gymData.gps_coordinates.longitude},${gymData.gps_coordinates.latitude})`
      : null;

    // Create gym object matching our schema
    const newGym = {
      city_id: cityId,
      name: gymData.title,
      description: gymData.description || null,
      website: gymData.website || null,
      phone: gymData.phone || null,
      email: null, // Not available from SerpAPI
      address: gymData.address,
      coordinates,
      rating: gymData.rating ? gymData.rating.toString() : null,
      review_count: gymData.reviews ? parseInt(gymData.reviews) : 0,
      photos: gymData.photos ? gymData.photos.map((p: any) => p.url) : [],
      opening_hours: gymData.operating_hours ? gymData.operating_hours : null,
      amenities: [], // Not available from SerpAPI
      training_styles: {
        gi: true, // Default to true as most BJJ gyms offer gi
        noGi: true, // Default to true as most BJJ gyms offer no-gi
        mma: false,
        selfDefense: true
      },
      drop_in_fee: null, // Not available from SerpAPI
      monthly_fee: null, // Not available from SerpAPI
      verified: false
    };

    // Check if gym already exists
    const existingGym = await db.select()
      .from(gyms)
      .where(
        and(
          eq(gyms.name, newGym.name),
          eq(gyms.address, newGym.address)
        )
      )
      .limit(1);

    if (existingGym.length > 0) {
      // Update existing gym
      const result = await db.update(gyms)
        .set(newGym)
        .where(
          and(
            eq(gyms.name, newGym.name),
            eq(gyms.address, newGym.address)
          )
        )
        .returning();
      console.log(`Updated gym: ${newGym.name} in ${gymData.address}`);
      return result;
    } else {
      // Insert new gym
      const result = await db.insert(gyms)
        .values(newGym)
        .returning();
      console.log(`Saved new gym: ${newGym.name} in ${gymData.address}`);
      return result;
    }
  } catch (error) {
    console.error('Error saving gym to database:', error);
    throw error;
  }
}

async function main() {
  try {
    // Get all cities from the database
    const citiesList = await db.select().from(cities);
    console.log(`Found ${citiesList.length} cities in database`);
    
    for (const city of citiesList) {
      console.log(`\nProcessing ${city.name}, ${city.country}...`);
      
      const gyms = await searchGymsInCity(city.name, city.country, city.coordinates);
      console.log(`Found ${gyms?.length || 0} gyms in ${city.name}`);
      
      if (gyms && gyms.length > 0) {
        for (const gym of gyms) {
          await saveGymToDatabase(gym, city.id);
          // Add a delay to avoid rate limiting
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }
    }
    
    console.log('\n✅ Scraping completed successfully!');
  } catch (error) {
    console.error('❌ Error during scraping:', error);
  } finally {
    process.exit();
  }
}

main(); 