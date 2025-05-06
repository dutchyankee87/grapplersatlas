import { useEffect, useState } from 'react';
import { CityGyms } from "@/components/CityGyms";

interface Gym {
  name: string;
  address: string;
  rating?: number;
  reviews?: number;
  website?: string;
  phone?: string;
}

export default function RioDeJaneiroPage() {
  const [gyms, setGyms] = useState<Gym[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchGyms() {
      try {
        const response = await fetch('http://localhost:3001/api/gyms/rio-de-janeiro');
        if (!response.ok) {
          throw new Error('Failed to fetch gym data');
        }
        const data = await response.json();
        setGyms(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchGyms();
  }, []);

  if (loading) {
    return <div className="container mx-auto py-8">Loading gyms...</div>;
  }

  if (error) {
    return <div className="container mx-auto py-8 text-red-500">Error: {error}</div>;
  }

  return <CityGyms city="Rio de Janeiro" gyms={gyms} />;
} 