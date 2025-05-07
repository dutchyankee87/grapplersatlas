export type City = {
  id: string;
  name: string;
  country: string;
  continent: string;
  description: string | null;
  image: string | null;
  coordinates: string | null;
  featured: boolean | null;
  gym_density: number | null;
  belt_friendliness: number | null;
  instructor_quality: number | null;
  drop_in_friendliness: number | null;
  competition_opportunities: number | null;
  monthly_cost: number | null;
  cost_of_living: number | null;
  visa_friendliness: number | null;
  safety: number | null;
  english_friendly: boolean | null;
  weather_type: string | null;
  weather_score: number | null;
  healthcare: number | null;
  bjj_community: number | null;
  social_life: number | null;
  recovery_facilities: boolean | null;
  remote_work_friendly: boolean | null;
  wifi_speed: number | null;
  coworking_spaces: boolean | null;
  created_at: Date | null;
  updated_at: Date | null;
  training_styles?: {
    gi: boolean;
    noGi: boolean;
    mma: boolean;
    selfDefense: boolean;
  } | null;
  class_availability?: {
    morning: boolean;
    afternoon: boolean;
    evening: boolean;
  } | null;
  rating?: number | null;
  gym_count?: number | null;
};

export interface Gym {
  id: string;
  city_id: string | null;
  name: string;
  description: string | null;
  website: string | null;
  phone: string | null;
  email: string | null;
  address: string;
  coordinates: string | null;
  rating: number | null;
  review_count: number;
  photos: string[] | null;
  opening_hours: any | null;
  amenities: string[] | null;
  training_styles: {
    gi: boolean;
    noGi: boolean;
    mma: boolean;
    selfDefense: boolean;
  } | null;
  drop_in_fee: number | null;
  monthly_fee: number | null;
  verified: boolean;
  created_at: Date | null;
  updated_at: Date | null;
}

export type Instructor = {
  id: string;
  name: string;
  belt: 'black' | 'brown' | 'purple' | 'blue' | 'white';
  stripes: number;
  photo?: string;
  bio?: string;
  achievements?: string[];
};

export type FilterType = {
  gymDensityMin?: number;
  beltFriendlinessMin?: number;
  instructorQualityMin?: number;
  dropInFriendlinessMin?: number;
  trainingStyles?: {
    gi?: boolean;
    noGi?: boolean;
    mma?: boolean;
    selfDefense?: boolean;
  };
  classAvailability?: {
    morning?: boolean;
    afternoon?: boolean;
    evening?: boolean;
  };
  competitionOpportunitiesMin?: number;
  monthlyCostMax?: number;
  costOfLivingMax?: number;
  visaFriendlinessMin?: number;
  safetyMin?: number;
  englishFriendly?: boolean;
  weatherTypes?: Array<'tropical' | 'temperate' | 'mediterranean' | 'desert' | 'cold'>;
  healthcareMin?: number;
  bjjCommunityMin?: number;
  socialLifeMin?: number;
  recoveryFacilities?: boolean;
  remoteWorkFriendly?: boolean;
  wifiSpeedMin?: number;
  coworkingSpaces?: boolean;
  continent?: string;
};