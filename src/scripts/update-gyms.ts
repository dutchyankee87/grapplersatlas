import { db } from '../db/config';
import { cities, gyms } from '../db/schema';
import { eq, and } from 'drizzle-orm';
import { SerpAPI } from '../lib/serpapi';
import dotenv from 'dotenv';

dotenv.config();

const serpApi = new SerpAPI(process.env.SERPAPI_KEY!);

async function updateGymData() {
  try {
    // Get all cities
    const allCities = await db.select().from(cities);
    
    for (const city of allCities) {
      console.log(`\n🔄 Updating gyms for ${city.name}...`);
      
      // Extract coordinates
      const coordsMatch = city.coordinates?.match(/\((-?\d+\.\d+),(-?\d+\.\d+)\)/);
      if (!coordsMatch) {
        console.error(`❌ Invalid coordinates for ${city.name}`);
        continue;
      }
      
      const [_, lat, lng] = coordsMatch;
      
      // Search for gyms
      const searchResults = await serpApi.searchGyms({
        query: `BJJ gyms in ${city.name}`,
        location: `${lat},${lng}`,
        radius: 50000 // 50km radius
      });
      
      // Update existing gyms and add new ones
      for (const result of searchResults) {
        const existingGym = await db
          .select()
          .from(gyms)
          .where(
            and(
              eq(gyms.name, result.name),
              eq(gyms.address, result.address)
            )
          )
          .limit(1);
          
        if (existingGym.length > 0) {
          // Update existing gym
          await db
            .update(gyms)
            .set({
              name: result.name,
              address: result.address,
              rating: result.rating ? result.rating.toString() : null,
              review_count: result.reviews ? parseInt(result.reviews) : 0,
              phone: result.phone,
              website: result.website,
              opening_hours: result.hours,
              updated_at: new Date()
            })
            .where(
              and(
                eq(gyms.name, result.name),
                eq(gyms.address, result.address)
              )
            );
            
          console.log(`✅ Updated: ${result.name}`);
        } else {
          // Add new gym
          await db.insert(gyms).values({
            city_id: city.id,
            name: result.name,
            address: result.address,
            rating: result.rating ? result.rating.toString() : null,
            review_count: result.reviews ? parseInt(result.reviews) : 0,
            phone: result.phone,
            website: result.website,
            opening_hours: result.hours,
            coordinates: result.coordinates ? `(${result.coordinates.lng},${result.coordinates.lat})` : null,
            created_at: new Date(),
            updated_at: new Date()
          });
          
          console.log(`➕ Added: ${result.name}`);
        }
      }
    }
    
    console.log('\n✨ Gym data update completed!');
  } catch (error) {
    console.error('❌ Error updating gym data:', error);
  }
}

// Run update
updateGymData(); 