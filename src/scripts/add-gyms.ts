import { db } from '../db/config';
import { cities, gyms } from '../db/schema';
import { eq } from 'drizzle-orm';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';

dotenv.config();

async function main() {
  try {
    // Get San Diego's ID
    const sanDiego = await db.select().from(cities).where(eq(cities.name, 'San Diego')).limit(1);
    if (!sanDiego.length) {
      throw new Error('San Diego not found in cities table');
    }

    const cityId = sanDiego[0].id;

    const newGyms = [
      {
        id: uuidv4(),
        city_id: cityId,
        name: 'Atos Jiu-Jitsu HQ',
        description: 'World-renowned competition team led by Andre Galvao.',
        address: '4227 Balboa Ave, San Diego, CA 92117',
        coordinates: '(32.8242,-117.1857)',
        rating: '4.9',
        review_count: '156',
        website: 'https://atosjiujitsuhq.com',
        phone: '+1 858-292-5040',
        email: 'info@atosjiujitsuhq.com',
        photos: ['https://images.pexels.com/photos/8032834/pexels-photo-8032834.jpeg'],
        monthly_fee: '200',
        drop_in_fee: '40',
        training_styles: {
          gi: true,
          noGi: true,
          mma: false,
          selfDefense: true
        },
        opening_hours: {
          monday: '6:00-21:00',
          tuesday: '6:00-21:00',
          wednesday: '6:00-21:00',
          thursday: '6:00-21:00',
          friday: '6:00-20:00',
          saturday: '9:00-12:00',
          sunday: 'Closed'
        },
        amenities: ['Showers', 'Changing Rooms', 'Pro Shop', 'Weight Room']
      },
      {
        id: uuidv4(),
        city_id: cityId,
        name: 'Studio 540',
        description: 'High-level training with a focus on technical development.',
        address: '540 Stevens Ave, Solana Beach, CA 92075',
        coordinates: '(32.9871,-117.2714)',
        rating: '4.8',
        review_count: '89',
        website: 'https://studio540.com',
        phone: '+1 858-755-5402',
        email: 'info@studio540.com',
        photos: ['https://images.pexels.com/photos/8032851/pexels-photo-8032851.jpeg'],
        monthly_fee: '180',
        drop_in_fee: '35',
        training_styles: {
          gi: true,
          noGi: true,
          mma: false,
          selfDefense: false
        },
        opening_hours: {
          monday: '7:00-21:00',
          tuesday: '7:00-21:00',
          wednesday: '7:00-21:00',
          thursday: '7:00-21:00',
          friday: '7:00-20:00',
          saturday: '9:00-12:00',
          sunday: 'Closed'
        },
        amenities: ['Showers', 'Changing Rooms', 'Study Room']
      },
      {
        id: uuidv4(),
        city_id: cityId,
        name: 'Victory MMA & Fitness',
        description: 'Large facility offering BJJ, MMA, and fitness classes.',
        address: '3666 Midway Dr, San Diego, CA 92110',
        coordinates: '(32.7516,-117.2087)',
        rating: '4.7',
        review_count: '124',
        website: 'https://victorygyms.com',
        phone: '+1 619-223-5581',
        email: 'info@victorygyms.com',
        photos: ['https://images.pexels.com/photos/8032836/pexels-photo-8032836.jpeg'],
        monthly_fee: '150',
        drop_in_fee: '30',
        training_styles: {
          gi: true,
          noGi: true,
          mma: true,
          selfDefense: false
        },
        opening_hours: {
          monday: '6:00-22:00',
          tuesday: '6:00-22:00',
          wednesday: '6:00-22:00',
          thursday: '6:00-22:00',
          friday: '6:00-21:00',
          saturday: '8:00-14:00',
          sunday: '9:00-12:00'
        },
        amenities: ['Showers', 'Changing Rooms', 'Weight Room', 'MMA Cage', 'Boxing Ring']
      },
      {
        id: uuidv4(),
        city_id: cityId,
        name: 'The Arena MMA',
        description: 'Premier MMA and BJJ training facility.',
        address: '3350 Sports Arena Blvd, San Diego, CA 92110',
        coordinates: '(32.7553,-117.2147)',
        rating: '4.8',
        review_count: '167',
        website: 'https://thearenagym.com',
        phone: '+1 619-222-5554',
        email: 'info@thearenagym.com',
        photos: ['https://images.pexels.com/photos/8032837/pexels-photo-8032837.jpeg'],
        monthly_fee: '175',
        drop_in_fee: '35',
        training_styles: {
          gi: true,
          noGi: true,
          mma: true,
          selfDefense: false
        },
        opening_hours: {
          monday: '6:00-22:00',
          tuesday: '6:00-22:00',
          wednesday: '6:00-22:00',
          thursday: '6:00-22:00',
          friday: '6:00-21:00',
          saturday: '8:00-14:00',
          sunday: '9:00-12:00'
        },
        amenities: ['Showers', 'Changing Rooms', 'Weight Room', 'MMA Cage', 'Pro Shop']
      },
      {
        id: uuidv4(),
        city_id: cityId,
        name: 'University of Jiu Jitsu',
        description: 'Saulo and Xande Ribeiro\'s academy focusing on fundamentals.',
        address: '3350 Sports Arena Blvd, San Diego, CA 92110',
        coordinates: '(32.7553,-117.2147)',
        rating: '4.9',
        review_count: '143',
        website: 'https://universityofjiujitsu.com',
        phone: '+1 619-222-5555',
        email: 'info@universityofjiujitsu.com',
        photos: ['https://images.pexels.com/photos/8032838/pexels-photo-8032838.jpeg'],
        monthly_fee: '190',
        drop_in_fee: '35',
        training_styles: {
          gi: true,
          noGi: true,
          mma: false,
          selfDefense: true
        },
        opening_hours: {
          monday: '6:00-21:00',
          tuesday: '6:00-21:00',
          wednesday: '6:00-21:00',
          thursday: '6:00-21:00',
          friday: '6:00-20:00',
          saturday: '9:00-13:00',
          sunday: 'Closed'
        },
        amenities: ['Showers', 'Changing Rooms', 'Pro Shop', 'Study Room']
      }
    ];

    for (const gym of newGyms) {
      const result = await db.insert(gyms).values(gym).returning();
      console.log(`Added gym: ${gym.name} with ID: ${gym.id}`);
    }

    console.log('\n✅ Successfully added all gyms!');
  } catch (error) {
    console.error('❌ Error adding gyms:', error);
  } finally {
    process.exit();
  }
}

main(); 