import express from 'express';
import cors from 'cors';
import { scrapeBJJGyms } from './scripts/scrapeGyms.js';

const app = express();
const port = 3001;

// Configure CORS
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175'],
  methods: ['GET', 'POST'],
  credentials: true
}));

// Cache for gym data
const gymCache = new Map();

// API endpoint to get gyms for a city
app.get('/api/gyms/:city', async (req, res) => {
  try {
    const city = req.params.city;
    
    // Check cache first
    if (gymCache.has(city)) {
      const cachedData = gymCache.get(city);
      if (Date.now() - cachedData.timestamp < 24 * 60 * 60 * 1000) { // 24 hours
        return res.json(cachedData.gyms);
      }
    }

    // If not in cache or expired, fetch new data
    const gyms = await scrapeBJJGyms(city);
    
    // Update cache
    gymCache.set(city, {
      gyms,
      timestamp: Date.now()
    });

    res.json(gyms);
  } catch (error) {
    console.error('Error fetching gyms:', error);
    res.status(500).json({ error: 'Failed to fetch gyms' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
}); 