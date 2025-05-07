import dotenv from 'dotenv';
import { z } from 'zod';

// Load environment variables
dotenv.config();

// Define environment variable schema
const envSchema = z.object({
  DATABASE_URL: z.string().min(1),
  SERP_API_KEY: z.string().min(1).optional(),
});

// Parse and validate environment variables
const env = envSchema.parse(process.env);

export default env; 