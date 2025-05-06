export interface Gym {
  id: string;
  name: string;
  address: string;
  phone: string;
  website: string | null;
  rating: number;
  reviews: Array<{
    author_name: string;
    rating: number;
    text: string;
    time: number;
  }>;
  isOpen: boolean;
  location: {
    lat: number;
    lng: number;
  };
  googleMapsUrl: string;
  photos: Array<{
    url: string;
    width: number;
    height: number;
  }>;
} 