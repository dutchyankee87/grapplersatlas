import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../db/config';
import { gyms, cities } from '../../db/schema';
import { eq } from 'drizzle-orm';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const { cityId } = req.query;

      if (cityId) {
        // Get gyms for specific city
        const cityGyms = await db
          .select()
          .from(gyms)
          .where(eq(gyms.city_id, cityId as string));

        return res.status(200).json(cityGyms);
      } else {
        // Get all gyms
        const allGyms = await db.select().from(gyms);
        return res.status(200).json(allGyms);
      }
    } catch (error) {
      console.error('Error fetching gyms:', error);
      return res.status(500).json({ error: 'Failed to fetch gyms' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
} 