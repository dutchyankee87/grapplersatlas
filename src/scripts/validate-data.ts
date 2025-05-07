import { db } from '../db/config';
import { cities, gyms } from '../db/schema';
import { eq, sql } from 'drizzle-orm';

interface ValidationResult {
  city: string;
  issues: string[];
}

async function validateData() {
  const results: ValidationResult[] = [];
  
  // Get all cities
  const allCities = await db.select().from(cities);
  
  for (const city of allCities) {
    const issues: string[] = [];
    
    // Check coordinates format
    if (!city.coordinates?.match(/^\(-?\d+\.\d+,-?\d+\.\d+\)$/)) {
      issues.push('Invalid coordinates format');
    }
    
    // Check rating ranges (should be 1-10)
    const ratingFields = [
      'gym_density', 'belt_friendliness', 'instructor_quality',
      'drop_in_friendliness', 'competition_opportunities', 'cost_of_living',
      'visa_friendliness', 'safety', 'weather_score', 'healthcare',
      'bjj_community', 'social_life'
    ];
    
    for (const field of ratingFields) {
      const value = city[field as keyof typeof city];
      if (typeof value === 'number' && (value < 1 || value > 10)) {
        issues.push(`${field} rating out of range (1-10): ${value}`);
      }
    }
    
    // Check monthly cost format
    if (typeof city.monthly_cost !== 'string' || !/^\d+$/.test(city.monthly_cost)) {
      issues.push('Invalid monthly cost format');
    }
    
    // Check boolean fields
    const booleanFields = [
      'featured', 'english_friendly', 'recovery_facilities',
      'remote_work_friendly', 'coworking_spaces'
    ];
    
    for (const field of booleanFields) {
      if (typeof city[field as keyof typeof city] !== 'boolean') {
        issues.push(`${field} should be boolean`);
      }
    }
    
    // Check gym count
    const gymCount = await db
      .select({ count: sql<number>`count(*)` })
      .from(gyms)
      .where(eq(gyms.city_id, city.id));
      
    if (gymCount[0].count === 0) {
      issues.push('No gyms found for this city');
    }
    
    if (issues.length > 0) {
      results.push({ city: city.name, issues });
    }
  }
  
  return results;
}

async function main() {
  try {
    console.log('🔍 Starting data validation...\n');
    const validationResults = await validateData();
    
    if (validationResults.length === 0) {
      console.log('✅ All data is valid!');
    } else {
      console.log('⚠️ Found validation issues:\n');
      validationResults.forEach(({ city, issues }) => {
        console.log(`City: ${city}`);
        issues.forEach(issue => console.log(`  - ${issue}`));
        console.log('');
      });
    }
  } catch (error) {
    console.error('❌ Error during validation:', error);
  } finally {
    process.exit();
  }
}

main(); 