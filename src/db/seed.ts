import { db } from './index';
import { cities } from './schema';

const cityData = [
  {
    name: 'Bangkok',
    country: 'Thailand',
    description: 'A vibrant city with a growing BJJ scene and excellent training facilities.',
    image: '/images/cities/bangkok.jpg',
    coordinates: '13.7563,100.5018',
    rating: 4.5,
    gym_count: 15,
    continent: 'Asia',
    featured: true,
    gym_density: 4.2,
    belt_friendliness: 4.5,
    instructor_quality: 4.3,
    drop_in_friendliness: 4.8,
    training_styles: {
      gi: true,
      noGi: true,
      mma: true,
      selfDefense: true
    },
    class_availability: {
      morning: true,
      afternoon: true,
      evening: true
    },
    competition_opportunities: 4.0,
    monthly_cost: 800,
    cost_of_living: 3.5,
    visa_friendliness: 4.0,
    safety: 3.8,
    english_friendly: true,
    weather: {
      type: 'tropical',
      description: 'Hot and humid year-round'
    },
    healthcare: 4.0,
    bjj_community: 4.2,
    social_life: 4.5,
    recovery_facilities: true,
    remote_work_friendly: true,
    wifi_speed: 4.0,
    coworking_spaces: true
  },
  {
    name: 'Tokyo',
    country: 'Japan',
    description: 'Home to some of the most prestigious BJJ academies in Asia.',
    image: '/images/cities/tokyo.jpg',
    coordinates: '35.6762,139.6503',
    rating: 4.7,
    gym_count: 20,
    continent: 'Asia',
    featured: true,
    gym_density: 4.5,
    belt_friendliness: 4.8,
    instructor_quality: 4.9,
    drop_in_friendliness: 4.2,
    training_styles: {
      gi: true,
      noGi: true,
      mma: true,
      selfDefense: true
    },
    class_availability: {
      morning: true,
      afternoon: true,
      evening: true
    },
    competition_opportunities: 4.5,
    monthly_cost: 1200,
    cost_of_living: 4.2,
    visa_friendliness: 3.5,
    safety: 4.9,
    english_friendly: false,
    weather: {
      type: 'temperate',
      description: 'Four distinct seasons'
    },
    healthcare: 4.8,
    bjj_community: 4.6,
    social_life: 4.3,
    recovery_facilities: true,
    remote_work_friendly: true,
    wifi_speed: 4.9,
    coworking_spaces: true
  }
];

async function seed() {
  try {
    // Clear existing data
    await db.delete(cities);
    
    // Insert new data
    for (const city of cityData) {
      await db.insert(cities).values(city);
    }
    
    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}

seed(); 