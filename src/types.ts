/// <reference types="@types/google.maps" />

export interface City {
  id: string;
  name: string;
  country: string;
  description: string | null;
  image: string | null;
  coordinates: string | null;
  rating: number | null;
  gym_count: number;
  created_at: Date;
  updated_at: Date;
  // Additional properties for filtering
  continent?: string | null;
  featured?: boolean;
  gym_density?: number | null;
  belt_friendliness?: number | null;
  instructor_quality?: number | null;
  drop_in_friendliness?: number | null;
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
  competition_opportunities?: number | null;
  monthly_cost?: number | null;
  cost_of_living?: number | null;
  visa_friendliness?: number | null;
  safety?: number | null;
  english_friendly?: boolean;
  weather?: {
    type: string;
    description: string;
  } | null;
  healthcare?: number | null;
  bjj_community?: number | null;
  social_life?: number | null;
  recovery_facilities?: boolean;
  remote_work_friendly?: boolean;
  wifi_speed?: number | null;
  coworking_spaces?: boolean;
}

export interface Gym {
  id: string;
  city_id: string;
  name: string;
  description: string | null;
  address: string;
  coordinates: string | null;
  rating: string | null;
  review_count: string | null;
  website: string | null;
  phone: string | null;
  email: string | null;
  photos: string[] | null;
  monthly_fee: string | null;
  drop_in_fee: string | null;
  training_styles: {
    gi: boolean;
    noGi: boolean;
    mma: boolean;
    selfDefense: boolean;
  } | null;
  opening_hours: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  } | null;
  amenities: string[] | null;
  created_at: string;
  updated_at: string;
}

export interface FilterType {
  gymDensityMin?: number;
  beltFriendlinessMin?: number;
  instructorQualityMin?: number;
  dropInFriendlinessMin?: number;
  trainingStyles?: {
    gi: boolean;
    noGi: boolean;
    mma: boolean;
    selfDefense: boolean;
  };
  classAvailability?: {
    morning: boolean;
    afternoon: boolean;
    evening: boolean;
  };
  competitionOpportunitiesMin?: number;
  monthlyCostMax?: number;
  costOfLivingMax?: number;
  visaFriendlinessMin?: number;
  safetyMin?: number;
  englishFriendly?: boolean;
  weatherTypes?: string[];
  healthcareMin?: number;
  bjjCommunityMin?: number;
  socialLifeMin?: number;
  recoveryFacilities?: boolean;
  remoteWorkFriendly?: boolean;
  wifiSpeedMin?: number;
  coworkingSpaces?: boolean;
  continent?: string;
}

declare global {
  interface Window {
    google: typeof google;
  }
} 