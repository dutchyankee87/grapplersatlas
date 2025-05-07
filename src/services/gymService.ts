import { db } from '../db';
import { gyms } from '../db/schema';
import { eq } from 'drizzle-orm';

const SERP_API_KEY = process.env.SERP_API_KEY!;

export async function searchGymsByLocation(location: string) {
  const response = await fetch(
    `https://serpapi.com/search.json?engine=google_maps&q=bjj+gym+${location}&api_key=${SERP_API_KEY}`
  );
  
  const data = await response.json();
  return data.local_results || [];
}

export async function saveGym(gymData: any) {
  const newGym = {
    name: gymData.title,
    address: gymData.address,
    city: gymData.address.split(',')[1]?.trim() || '',
    state: gymData.address.split(',')[2]?.trim() || '',
    country: gymData.address.split(',')[3]?.trim() || '',
    phone: gymData.phone,
    website: gymData.website,
    description: gymData.description,
    latitude: gymData.gps_coordinates?.latitude,
    longitude: gymData.gps_coordinates?.longitude,
  };

  return await db.insert(gyms).values(newGym).returning();
}

export async function getGymsByCity(city: string) {
  return await db.select().from(gyms).where(eq(gyms.city, city));
}

export async function getAllCities() {
  const result = await db.select({ city: gyms.city }).from(gyms).groupBy(gyms.city);
  return result.map(r => r.city);
} 