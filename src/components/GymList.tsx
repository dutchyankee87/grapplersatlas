import { useEffect, useState } from 'react';
import { getAllCities, getGymsByCity, searchGymsByLocation, saveGym } from '../services/gymService';
import type { Gym, City } from '../types';

interface GymListProps {
  cityId: string;
}

export default function GymList({ cityId }: GymListProps) {
  const [gyms, setGyms] = useState<Gym[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (cityId) {
      loadGymsForCity(cityId);
    }
  }, [cityId]);

  async function loadGymsForCity(cityId: string) {
    setLoading(true);
    setError(null);
    try {
      const gymsList = await getGymsByCity(cityId);
      setGyms(gymsList);
    } catch (error) {
      console.error('Error loading gyms:', error);
      setError('Failed to load gyms. Please try again later.');
    }
    setLoading(false);
  }

  async function searchNewGyms() {
    if (!cityId) return;
    
    setLoading(true);
    setError(null);
    try {
      const results = await searchGymsByLocation(cityId);
      for (const gym of results) {
        await saveGym(gym);
      }
      await loadGymsForCity(cityId);
    } catch (error) {
      console.error('Error searching gyms:', error);
      setError('Failed to search for new gyms. Please try again later.');
    }
    setLoading(false);
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8 text-red-600">
        <p>{error}</p>
        <button
          onClick={() => loadGymsForCity(cityId)}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Gyms in this City</h2>
        <button
          onClick={searchNewGyms}
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300"
        >
          Search New Gyms
        </button>
      </div>

      {gyms.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No gyms found in this city. Try searching for new gyms!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {gyms.map((gym) => (
            <div key={gym.id} className="bg-white border rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{gym.name}</h3>
              <p className="text-gray-600 mb-2">{gym.address}</p>
              {gym.phone && (
                <p className="text-gray-600 mb-1">
                  <span className="font-medium">Phone:</span> {gym.phone}
                </p>
              )}
              {gym.website && (
                <a 
                  href={gym.website} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-blue-500 hover:text-blue-600 inline-block mt-2"
                >
                  Visit Website
                </a>
              )}
              {gym.rating && (
                <div className="mt-2 flex items-center">
                  <span className="text-yellow-500 mr-1">★</span>
                  <span className="text-gray-600">{gym.rating}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 