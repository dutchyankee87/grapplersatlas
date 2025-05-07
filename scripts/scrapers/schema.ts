import { pgTable, serial, text, timestamp, numeric } from 'drizzle-orm/pg-core';

// Define the gyms table schema
export const gyms = pgTable('gyms', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  address: text('address').notNull(),
  phone: text('phone'),
  website: text('website'),
  rating: numeric('rating'),
  reviews_count: numeric('reviews_count'),
  latitude: numeric('latitude'),
  longitude: numeric('longitude'),
  city: text('city').notNull(),
  country: text('country').notNull(),
  last_updated: timestamp('last_updated').notNull().defaultNow(),
  created_at: timestamp('created_at').notNull().defaultNow(),
}); 