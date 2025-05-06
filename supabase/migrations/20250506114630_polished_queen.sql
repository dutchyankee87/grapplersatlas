/*
  # Add sample gym data

  1. Changes
    - Insert sample gyms for existing cities
    - Add instructors for each gym
    - Include real-world details like training schedules and amenities

  2. Data Structure
    - Each gym has basic info (name, location, contact)
    - Training styles and schedules
    - Instructor details with belt levels
*/

-- Rio de Janeiro Gyms
INSERT INTO gyms (city_id, name, description, website, phone, address, rating, training_styles, opening_hours, amenities, drop_in_fee, monthly_fee, verified) 
VALUES 
  ((SELECT id FROM cities WHERE name = 'Rio de Janeiro'), 
   'Gracie Barra RJ',
   'The original Gracie Barra academy, offering world-class BJJ training.',
   'https://graciebarra.com/rj',
   '+55 21 9999-9999',
   'Av. das Américas, 3301 - Barra da Tijuca, Rio de Janeiro',
   4.9,
   '{"gi": true, "noGi": true, "mma": false, "selfDefense": true}',
   '{"monday": "6:00-22:00", "tuesday": "6:00-22:00", "wednesday": "6:00-22:00", "thursday": "6:00-22:00", "friday": "6:00-21:00", "saturday": "9:00-13:00"}',
   ARRAY['Showers', 'Changing Rooms', 'Pro Shop', 'Weight Room'],
   50,
   200,
   true
  );

-- Bali Gyms
INSERT INTO gyms (city_id, name, description, website, phone, address, rating, training_styles, opening_hours, amenities, drop_in_fee, monthly_fee, verified)
VALUES 
  ((SELECT id FROM cities WHERE name = 'Bali'),
   'Arena MMA Bali',
   'Premier BJJ and MMA training facility in Canggu.',
   'https://arenammbali.com',
   '+62 812-3456-7890',
   'Jl. Pantai Berawa No.99, Canggu, Bali',
   4.8,
   '{"gi": true, "noGi": true, "mma": true, "selfDefense": false}',
   '{"monday": "7:00-21:00", "tuesday": "7:00-21:00", "wednesday": "7:00-21:00", "thursday": "7:00-21:00", "friday": "7:00-21:00", "saturday": "8:00-12:00"}',
   ARRAY['Air Conditioning', 'Showers', 'Changing Rooms', 'Recovery Room'],
   25,
   150,
   true
  );

-- Lisbon Gyms
INSERT INTO gyms (city_id, name, description, website, phone, address, rating, training_styles, opening_hours, amenities, drop_in_fee, monthly_fee, verified)
VALUES 
  ((SELECT id FROM cities WHERE name = 'Lisbon'),
   'Focus BJJ Lisboa',
   'Modern academy with competition focus and all levels welcome.',
   'https://focusbjj.pt',
   '+351 912 345 678',
   'R. da Junqueira 295, 1300-338 Lisboa',
   4.7,
   '{"gi": true, "noGi": true, "mma": false, "selfDefense": false}',
   '{"monday": "7:00-22:00", "tuesday": "7:00-22:00", "wednesday": "7:00-22:00", "thursday": "7:00-22:00", "friday": "7:00-21:00", "saturday": "10:00-13:00"}',
   ARRAY['Air Conditioning', 'Showers', 'Changing Rooms', 'Study Room'],
   30,
   120,
   true
  );

-- Add some instructors
INSERT INTO instructors (gym_id, name, belt, stripes, bio, achievements)
VALUES
  ((SELECT id FROM gyms WHERE name = 'Gracie Barra RJ'),
   'Roberto Silva',
   'black',
   4,
   'Training for over 20 years, multiple-time world champion.',
   ARRAY['IBJJF World Champion 2019', 'ADCC Bronze 2017']
  ),
  ((SELECT id FROM gyms WHERE name = 'Arena MMA Bali'),
   'John Smith',
   'black',
   2,
   'Former MMA fighter turned BJJ instructor.',
   ARRAY['Pan Pacific Champion 2018', 'Asian Open Gold 2020']
  ),
  ((SELECT id FROM gyms WHERE name = 'Focus BJJ Lisboa'),
   'Miguel Santos',
   'black',
   3,
   'European champion with 15 years of teaching experience.',
   ARRAY['European Champion 2016', 'IBJJF Pro League Finalist']
  );