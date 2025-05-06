export type City = {
  id: string;
  name: string;
  country: string;
  continent: string;
  image: string;
  description: string;
  gymDensity: number; // 1-10 scale
  beltFriendliness: number; // 1-10 scale
  instructorQuality: number; // 1-10 scale
  dropInFriendliness: number; // 1-10 scale
  trainingStyles: {
    gi: boolean;
    noGi: boolean;
    mma: boolean;
    selfDefense: boolean;
  };
  classAvailability: {
    morning: boolean;
    afternoon: boolean;
    evening: boolean;
  };
  competitionOpportunities: number; // 1-10 scale
  monthlyCost: number; // in USD
  costOfLiving: number; // 1-10 scale (1 = very cheap, 10 = very expensive)
  visaFriendliness: number; // 1-10 scale
  safety: number; // 1-10 scale
  englishFriendly: boolean;
  weather: {
    type: 'tropical' | 'temperate' | 'mediterranean' | 'desert' | 'cold';
    score: number; // 1-10 scale
  };
  healthcare: number; // 1-10 scale
  bjjCommunity: number; // 1-10 scale
  socialLife: number; // 1-10 scale
  recoveryFacilities: boolean;
  remoteWorkFriendly: boolean;
  wifiSpeed: number; // Mbps
  coworkingSpaces: boolean;
  coordinates: {
    lat: number;
    lng: number;
  };
  featured?: boolean;
};

export interface Gym {
  id: string;
  name: string;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  rating?: number;
  website?: string;
  type: 'bjj' | 'mma';
  monthlyFee?: number;
  dropInFee?: number;
  image?: string;
  description?: string;
  classSchedule?: {
    [key: string]: string[]; // e.g., { "Monday": ["9:00 AM - 10:30 AM", "6:00 PM - 7:30 PM"] }
  };
  amenities?: string[];
  instructor?: string;
  beltLevels?: string[];
  phone?: string;
  reviews?: Array<{
    author: string;
    rating: number;
    text: string;
    date: string;
  }>;
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