import { Gym, City } from '../types';

const API_BASE_URL = '/api';

export async function searchGymsByLocation(location: string) {
  const response = await fetch(
    `https://serpapi.com/search.json?engine=google_maps&q=bjj+gym+${location}&api_key=${process.env.VITE_SERP_API_KEY}`
  );
  
  const data = await response.json();
  return data.local_results || [];
}

export async function saveGym(gymData: any) {
  const response = await fetch(`${API_BASE_URL}/gyms`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: gymData.title,
      address: gymData.address,
      coordinates: `${gymData.gps_coordinates?.longitude},${gymData.gps_coordinates?.latitude}`,
      phone: gymData.phone,
      website: gymData.website,
      description: gymData.description,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to save gym');
  }

  return response.json();
}

export async function getGymsByCity(cityId: string): Promise<Gym[]> {
  const response = await fetch(`${API_BASE_URL}/cities/${cityId}/gyms`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch gyms');
  }

  return response.json();
}

export async function getAllCities(): Promise<City[]> {
  try {
    console.log('Fetching cities from:', `${API_BASE_URL}/cities`);
    const response = await fetch(`${API_BASE_URL}/cities`);
    
    if (!response.ok) {
      console.error('Failed to fetch cities:', {
        status: response.status,
        statusText: response.statusText,
        url: response.url
      });
      throw new Error(`Failed to fetch cities: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Successfully fetched cities:', data);
    return data;
  } catch (error) {
    console.error('Error in getAllCities:', error);
    throw error;
  }
}

export async function getCityById(cityId: string): Promise<City> {
  const response = await fetch(`${API_BASE_URL}/cities/${cityId}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch city');
  }

  return response.json();
} 