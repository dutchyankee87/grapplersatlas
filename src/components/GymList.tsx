import { useEffect, useState } from 'react';
import { getAllCities, getGymsByCity, searchGymsByLocation, saveGym } from '../services/gymService';
import type { Gym } from '../db/schema';

export default function GymList() {
  const [cities, setCities] = useState<string[]>([]);
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [gyms, setGyms] = useState<Gym[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCities();
  }, []);

  useEffect(() => {
    if (selectedCity) {
      loadGymsForCity(selectedCity);
    }
  }, [selectedCity]);

  async function loadCities() {
    const citiesList = await getAllCities();
    setCities(citiesList);
  }

  async function loadGymsForCity(city: string) {
    setLoading(true);
    try {
      const gymsList = await getGymsByCity(city);
      setGyms(gymsList);
    } catch (error) {
      console.error('Error loading gyms:', error);
    }
    setLoading(false);
  }

  async function searchNewGyms() {
    if (!selectedCity) return;
    
    setLoading(true);
    try {
      const results = await searchGymsByLocation(selectedCity);
      for (const gym of results) {
        await saveGym(gym);
      }
      await loadGymsForCity(selectedCity);
    } catch (error) {
      console.error('Error searching gyms:', error);
    }
    setLoading(false);
  }

  return (
    <div className="p-4">
      <div className="mb-4">
        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">Select a city</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
        <button
          onClick={searchNewGyms}
          disabled={loading || !selectedCity}
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Search New Gyms
        </button>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {gyms.map((gym) => (
            <div key={gym.id} className="border p-4 rounded shadow">
              <h3 className="text-xl font-bold">{gym.name}</h3>
              <p>{gym.address}</p>
              {gym.phone && <p>Phone: {gym.phone}</p>}
              {gym.website && (
                <a href={gym.website} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                  Website
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 