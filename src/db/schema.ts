import { pgTable, text, timestamp, uuid, numeric, boolean, jsonb, integer, uniqueIndex } from 'drizzle-orm/pg-core';

// Define the gyms table schema
export const gyms = pgTable('gyms', {
  id: uuid('id').primaryKey().defaultRandom(),
  city_id: uuid('city_id').references(() => cities.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  description: text('description'),
  website: text('website'),
  phone: text('phone'),
  email: text('email'),
  address: text('address').notNull(),
  coordinates: text('coordinates'),
  rating: numeric('rating'),
  review_count: integer('review_count').default(0),
  photos: text('photos').array(),
  opening_hours: jsonb('opening_hours'),
  amenities: text('amenities').array(),
  training_styles: jsonb('training_styles'),
  drop_in_fee: numeric('drop_in_fee'),
  monthly_fee: numeric('monthly_fee'),
  verified: boolean('verified').default(false),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow(),
}, (table) => {
  return {
    nameAddressIdx: uniqueIndex('name_address_idx').on(table.name, table.address)
  };
});

// Define the cities table schema
export const cities = pgTable('cities', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  country: text('country').notNull(),
  continent: text('continent').notNull(),
  description: text('description'),
  image: text('image'),
  coordinates: text('coordinates'),
  featured: boolean('featured').default(false),
  gym_density: integer('gym_density').default(0),
  belt_friendliness: integer('belt_friendliness').default(0),
  instructor_quality: integer('instructor_quality').default(0),
  drop_in_friendliness: integer('drop_in_friendliness').default(0),
  competition_opportunities: integer('competition_opportunities').default(0),
  monthly_cost: numeric('monthly_cost').default(0),
  cost_of_living: integer('cost_of_living').default(0),
  visa_friendliness: integer('visa_friendliness').default(0),
  safety: integer('safety').default(0),
  english_friendly: boolean('english_friendly').default(false),
  weather_type: text('weather_type'),
  weather_score: integer('weather_score').default(0),
  healthcare: integer('healthcare').default(0),
  bjj_community: integer('bjj_community').default(0),
  social_life: integer('social_life').default(0),
  recovery_facilities: boolean('recovery_facilities').default(false),
  remote_work_friendly: boolean('remote_work_friendly').default(false),
  wifi_speed: integer('wifi_speed').default(0),
  coworking_spaces: boolean('coworking_spaces').default(false),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow(),
});

export type Gym = typeof gyms.$inferSelect;
export type NewGym = typeof gyms.$inferInsert;
export type City = typeof cities.$inferSelect;
export type NewCity = typeof cities.$inferInsert; 