import { db } from '../db/config';
import { gyms } from '../db/schema';
import { eq } from 'drizzle-orm';

export async function getGyms(cityId?: string) {
  try {
    if (cityId) {
      // Get gyms for specific city
      const cityGyms = await db
        .select()
        .from(gyms)
        .where(eq(gyms.city_id, cityId));

      return cityGyms;
    } else {
      // Get all gyms
      const allGyms = await db.select().from(gyms);
      return allGyms;
    }
  } catch (error) {
    console.error('Error fetching gyms:', error);
    throw new Error('Failed to fetch gyms');
  }
} 