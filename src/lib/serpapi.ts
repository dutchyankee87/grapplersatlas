interface SearchGymsParams {
  query: string;
  location: string;
  radius: number;
}

interface GymSearchResult {
  name: string;
  address: string;
  rating?: number;
  reviews?: string;
  phone?: string;
  website?: string;
  hours?: any;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export class SerpAPI {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async searchGyms(params: SearchGymsParams): Promise<GymSearchResult[]> {
    try {
      const response = await fetch(
        `https://serpapi.com/search.json?engine=google_maps&q=${encodeURIComponent(params.query)}&ll=${params.location}&radius=${params.radius}&api_key=${this.apiKey}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (!data.local_results) {
        return [];
      }

      return data.local_results.map((result: any) => ({
        name: result.title,
        address: result.address,
        rating: result.rating,
        reviews: result.reviews,
        phone: result.phone,
        website: result.website,
        hours: result.operating_hours,
        coordinates: result.gps_coordinates
      }));
    } catch (error) {
      console.error('Error searching gyms:', error);
      return [];
    }
  }
} 