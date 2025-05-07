import express from 'express';
import { db } from '../db/config';
import { eq } from 'drizzle-orm';
import { cities, gyms } from '../db/schema';

const router = express.Router();

// Get city by ID
router.get('/cities/:id', async (req, res) => {
  try {
    const result = await db
      .select()
      .from(cities)
      .where(eq(cities.id, req.params.id))
      .limit(1);

    if (result && result.length > 0) {
      res.json(result[0]);
    } else {
      res.status(404).json({ error: 'City not found' });
    }
  } catch (error) {
    console.error('Error fetching city:', error);
    res.status(500).json({ error: 'Failed to fetch city' });
  }
});

// Get gyms by city ID
router.get('/cities/:cityId/gyms', async (req, res) => {
  try {
    const result = await db
      .select()
      .from(gyms)
      .where(eq(gyms.city_id, req.params.cityId));

    res.json(result);
  } catch (error) {
    console.error('Error fetching gyms:', error);
    res.status(500).json({ error: 'Failed to fetch gyms' });
  }
});

export default router; 