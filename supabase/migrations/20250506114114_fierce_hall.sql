/*
  # Create BJJ Nomads Database Schema

  1. New Tables
    - `cities`: Stores city information and BJJ-related metrics
    - `gyms`: Stores BJJ gym information
    - `instructors`: Stores instructor information
    - `gym_owners`: Links gym owners to their gyms

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access
    - Add policies for gym owners to update their data

  3. Indexes
    - Add indexes for common query patterns
    - Add spatial index for gym coordinates
*/

-- Create cities table
CREATE TABLE IF NOT EXISTS cities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  country text NOT NULL,
  continent text NOT NULL,
  description text,
  image text,
  coordinates point,
  featured boolean DEFAULT false,
  gym_density integer DEFAULT 0,
  belt_friendliness integer DEFAULT 0,
  instructor_quality integer DEFAULT 0,
  drop_in_friendliness integer DEFAULT 0,
  competition_opportunities integer DEFAULT 0,
  monthly_cost numeric DEFAULT 0,
  cost_of_living integer DEFAULT 0,
  visa_friendliness integer DEFAULT 0,
  safety integer DEFAULT 0,
  english_friendly boolean DEFAULT false,
  weather_type text,
  weather_score integer DEFAULT 0,
  healthcare integer DEFAULT 0,
  bjj_community integer DEFAULT 0,
  social_life integer DEFAULT 0,
  recovery_facilities boolean DEFAULT false,
  remote_work_friendly boolean DEFAULT false,
  wifi_speed integer DEFAULT 0,
  coworking_spaces boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create gyms table
CREATE TABLE IF NOT EXISTS gyms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  city_id uuid REFERENCES cities(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text,
  website text,
  phone text,
  email text,
  address text NOT NULL,
  coordinates point,
  rating numeric,
  review_count integer DEFAULT 0,
  photos text[],
  opening_hours jsonb,
  amenities text[],
  training_styles jsonb,
  drop_in_fee numeric,
  monthly_fee numeric,
  verified boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create instructors table
CREATE TABLE IF NOT EXISTS instructors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  gym_id uuid REFERENCES gyms(id) ON DELETE CASCADE,
  name text NOT NULL,
  belt text NOT NULL,
  stripes integer DEFAULT 0,
  photo text,
  bio text,
  achievements text[],
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create gym_owners table
CREATE TABLE IF NOT EXISTS gym_owners (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  gym_id uuid REFERENCES gyms(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, gym_id)
);

-- Enable RLS
ALTER TABLE cities ENABLE ROW LEVEL SECURITY;
ALTER TABLE gyms ENABLE ROW LEVEL SECURITY;
ALTER TABLE instructors ENABLE ROW LEVEL SECURITY;
ALTER TABLE gym_owners ENABLE ROW LEVEL SECURITY;

-- Policies for cities
CREATE POLICY "Allow public read access to cities"
  ON cities
  FOR SELECT
  TO public
  USING (true);

-- Policies for gyms
CREATE POLICY "Allow public read access to gyms"
  ON gyms
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow gym owners to update their gyms"
  ON gyms
  FOR UPDATE
  TO authenticated
  USING (auth.uid() IN (
    SELECT user_id 
    FROM gym_owners 
    WHERE gym_id = id
  ));

-- Policies for instructors
CREATE POLICY "Allow public read access to instructors"
  ON instructors
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow gym owners to update their instructors"
  ON instructors
  FOR UPDATE
  TO authenticated
  USING (auth.uid() IN (
    SELECT user_id 
    FROM gym_owners 
    WHERE gym_id = gym_id
  ));

-- Policies for gym_owners
CREATE POLICY "Allow gym owners to view their own records"
  ON gym_owners
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_cities_updated_at
  BEFORE UPDATE ON cities
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_gyms_updated_at
  BEFORE UPDATE ON gyms
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_instructors_updated_at
  BEFORE UPDATE ON instructors
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_cities_continent ON cities(continent);
CREATE INDEX IF NOT EXISTS idx_cities_country ON cities(country);
CREATE INDEX IF NOT EXISTS idx_cities_featured ON cities(featured);
CREATE INDEX IF NOT EXISTS idx_gyms_city_id ON gyms(city_id);
CREATE INDEX IF NOT EXISTS idx_instructors_gym_id ON instructors(gym_id);
CREATE INDEX IF NOT EXISTS idx_gyms_coordinates ON gyms USING gist(coordinates);
CREATE INDEX IF NOT EXISTS idx_gyms_verified ON gyms(verified);
CREATE INDEX IF NOT EXISTS idx_gym_owners_user_id ON gym_owners(user_id);
CREATE INDEX IF NOT EXISTS idx_gym_owners_gym_id ON gym_owners(gym_id);