/*
  # Add Bali city data

  1. Changes
    - Insert Bali city data with all required fields
    - Set as featured destination
*/

INSERT INTO cities (
  name, country, continent, description, image, coordinates,
  featured, gym_density, belt_friendliness, instructor_quality,
  drop_in_friendliness, competition_opportunities, monthly_cost,
  cost_of_living, visa_friendliness, safety, english_friendly,
  weather_type, weather_score, healthcare, bjj_community,
  social_life, recovery_facilities, remote_work_friendly,
  wifi_speed, coworking_spaces
) VALUES (
  'Bali',
  'Indonesia',
  'Asia',
  'A tropical paradise with a growing BJJ scene and digital nomad community.',
  'https://images.pexels.com/photos/1694621/pexels-photo-1694621.jpeg',
  point(115.1889, -8.4095),
  true,
  7,
  9,
  8,
  10,
  6,
  80,
  4,
  8,
  8,
  true,
  'tropical',
  9,
  6,
  8,
  9,
  true,
  true,
  35,
  true
);