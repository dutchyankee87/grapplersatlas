import dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response } from 'express';
import cors from 'cors';
import { db } from './src/db/config';
import { eq, and, or, like, gte, lte, sql, SQL } from 'drizzle-orm';
import { cities, gyms } from './src/db/schema';
import { v4 as uuidv4 } from 'uuid';

const app = express();
const port = process.env.PORT || 3001;

// Enable CORS for development
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());

// Get all cities with optional filtering
app.get('/api/cities', async (req: Request, res: Response) => {
  try {
    const {
      continent,
      featured,
      gymDensityMin,
      beltFriendlinessMin,
      instructorQualityMin,
      dropInFriendlinessMin,
      competitionOpportunitiesMin,
      monthlyCostMax,
      costOfLivingMax,
      visaFriendlinessMin,
      safetyMin,
      englishFriendly,
      healthcareMin,
      bjjCommunityMin,
      socialLifeMin,
      recoveryFacilities,
      remoteWorkFriendly,
      wifiSpeedMin,
      coworkingSpaces,
      search
    } = req.query;

    const conditions: SQL[] = [];

    // Apply filters if they exist
    if (continent) {
      conditions.push(eq(cities.continent, continent as string));
    }
    if (featured) {
      conditions.push(eq(cities.featured, featured === 'true'));
    }
    if (gymDensityMin) {
      conditions.push(sql`${cities.gym_density} >= ${gymDensityMin}`);
    }
    if (beltFriendlinessMin) {
      conditions.push(sql`${cities.belt_friendliness} >= ${beltFriendlinessMin}`);
    }
    if (instructorQualityMin) {
      conditions.push(sql`${cities.instructor_quality} >= ${instructorQualityMin}`);
    }
    if (dropInFriendlinessMin) {
      conditions.push(sql`${cities.drop_in_friendliness} >= ${dropInFriendlinessMin}`);
    }
    if (competitionOpportunitiesMin) {
      conditions.push(sql`${cities.competition_opportunities} >= ${competitionOpportunitiesMin}`);
    }
    if (monthlyCostMax) {
      conditions.push(sql`${cities.monthly_cost} <= ${monthlyCostMax}`);
    }
    if (costOfLivingMax) {
      conditions.push(sql`${cities.cost_of_living} <= ${costOfLivingMax}`);
    }
    if (visaFriendlinessMin) {
      conditions.push(sql`${cities.visa_friendliness} >= ${visaFriendlinessMin}`);
    }
    if (safetyMin) {
      conditions.push(sql`${cities.safety} >= ${safetyMin}`);
    }
    if (englishFriendly) {
      conditions.push(eq(cities.english_friendly, englishFriendly === 'true'));
    }
    if (healthcareMin) {
      conditions.push(sql`${cities.healthcare} >= ${healthcareMin}`);
    }
    if (bjjCommunityMin) {
      conditions.push(sql`${cities.bjj_community} >= ${bjjCommunityMin}`);
    }
    if (socialLifeMin) {
      conditions.push(sql`${cities.social_life} >= ${socialLifeMin}`);
    }
    if (recoveryFacilities) {
      conditions.push(eq(cities.recovery_facilities, recoveryFacilities === 'true'));
    }
    if (remoteWorkFriendly) {
      conditions.push(eq(cities.remote_work_friendly, remoteWorkFriendly === 'true'));
    }
    if (wifiSpeedMin) {
      conditions.push(sql`${cities.wifi_speed} >= ${wifiSpeedMin}`);
    }
    if (coworkingSpaces) {
      conditions.push(eq(cities.coworking_spaces, coworkingSpaces === 'true'));
    }
    if (search) {
      conditions.push(
        or(
          like(cities.name, `%${search}%`),
          like(cities.country, `%${search}%`),
          like(cities.description, `%${search}%`)
        )
      );
    }

    let query = db.select().from(cities);
    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }
    const result = await query;

    res.json(result);
  } catch (error) {
    console.error('Error fetching cities:', error);
    res.status(500).json({ error: 'Failed to fetch cities' });
  }
});

// Get city by ID
app.get('/api/cities/:id', async (req: Request, res: Response) => {
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
app.get('/api/cities/:cityId/gyms', async (req: Request, res: Response) => {
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

// Create a new gym
app.post('/api/gyms', async (req, res) => {
  try {
    const { name, address, coordinates, phone, website, description, city_id } = req.body;

    if (!name || !address || !city_id) {
      return res.status(400).json({ error: 'Name, address, and city_id are required' });
    }

    const newGym = {
      id: uuidv4(),
      name,
      address,
      coordinates,
      phone,
      website,
      description,
      city_id,
      created_at: new Date(),
      updated_at: new Date()
    };

    const result = await db.insert(gyms).values(newGym).returning();
    res.status(201).json(result[0]);
  } catch (error) {
    console.error('Error creating gym:', error);
    res.status(500).json({ error: 'Failed to create gym' });
  }
});

// Update gym count for a city
app.patch('/api/cities/:id/gym-count', async (req: Request, res: Response) => {
  try {
    const result = await db
      .update(cities)
      .set({ 
        gym_count: req.body.gym_count,
        updated_at: new Date()
      })
      .where(eq(cities.id, req.params.id))
      .returning();

    if (result && result.length > 0) {
      res.json(result[0]);
    } else {
      res.status(404).json({ error: 'City not found' });
    }
  } catch (error) {
    console.error('Error updating city:', error);
    res.status(500).json({ error: 'Failed to update city' });
  }
});

// Error handling middleware
app.use((err, _req, res, _next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 