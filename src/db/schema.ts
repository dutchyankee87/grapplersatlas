import { pgTable, text, timestamp, uuid, numeric, boolean, jsonb, integer, uniqueIndex } from 'drizzle-orm/pg-core';

interface TrainingStyles {
  gi: boolean;
  noGi: boolean;
  mma: boolean;
  selfDefense: boolean;
}

interface ClassAvailability {
  morning: boolean;
  afternoon: boolean;
  evening: boolean;
}

interface Weather {
  type: string;
  description: string;
}

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
  gym_density: numeric('gym_density').default('0'),
  belt_friendliness: numeric('belt_friendliness').default('0'),
  instructor_quality: numeric('instructor_quality').default('0'),
  drop_in_friendliness: numeric('drop_in_friendliness').default('0'),
  competition_opportunities: numeric('competition_opportunities').default('0'),
  monthly_cost: numeric('monthly_cost').default('0'),
  cost_of_living: numeric('cost_of_living').default('0'),
  visa_friendliness: numeric('visa_friendliness').default('0'),
  safety: numeric('safety').default('0'),
  english_friendly: boolean('english_friendly').default(false),
  weather_type: text('weather_type'),
  weather_score: numeric('weather_score').default('0'),
  healthcare: numeric('healthcare').default('0'),
  bjj_community: numeric('bjj_community').default('0'),
  social_life: numeric('social_life').default('0'),
  recovery_facilities: boolean('recovery_facilities').default(false),
  remote_work_friendly: boolean('remote_work_friendly').default(false),
  wifi_speed: numeric('wifi_speed').default('0'),
  coworking_spaces: boolean('coworking_spaces').default(false),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow()
});

// Define the gyms table schema
export const gyms = pgTable('gyms', {
  id: uuid('id').primaryKey().defaultRandom(),
  city_id: uuid('city_id').references(() => cities.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  description: text('description'),
  address: text('address').notNull(),
  coordinates: text('coordinates'),
  rating: numeric('rating').default('0'),
  review_count: numeric('review_count').default('0'),
  website: text('website'),
  phone: text('phone'),
  email: text('email'),
  photos: text('photos').array(),
  monthly_fee: numeric('monthly_fee'),
  drop_in_fee: numeric('drop_in_fee'),
  training_styles: jsonb('training_styles').$type<{
    gi: boolean;
    noGi: boolean;
    mma: boolean;
    selfDefense: boolean;
  }>(),
  opening_hours: jsonb('opening_hours').$type<{
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  }>(),
  amenities: text('amenities').array(),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow()
}, (table) => {
  return {
    nameAddressIdx: uniqueIndex('name_address_idx').on(table.name, table.address)
  };
});

export type City = typeof cities.$inferSelect;
export type NewCity = typeof cities.$inferInsert;
export type Gym = typeof gyms.$inferSelect;
export type NewGym = typeof gyms.$inferInsert; 