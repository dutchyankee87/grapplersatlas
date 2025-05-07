import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, MapPin, DollarSign, Users, Wifi, Building2 } from 'lucide-react';
import { City, Gym } from '../db/schema';

const CityDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [city, setCity] = useState<City | null>(null);
  const [gyms, setGyms] = useState<Gym[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCityData = async () => {
      try {
        // Fetch city details
        const cityResponse = await fetch(`/api/cities/${id}`);
        if (!cityResponse.ok) {
          throw new Error('Failed to fetch city details');
        }
        const cityData = await cityResponse.json();
        setCity(cityData);

        // Fetch gyms for the city
        const gymsResponse = await fetch(`/api/cities/${id}/gyms`);
        if (!gymsResponse.ok) {
          throw new Error('Failed to fetch gyms');
        }
        const gymsData = await gymsResponse.json();
        setGyms(gymsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchCityData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !city) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500 text-center">
          <h2 className="text-2xl font-semibold mb-2">Error</h2>
          <p>{error || 'City not found'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Hero Section */}
        <div className="relative h-96 rounded-lg overflow-hidden mb-8">
          <img
            src={city.image || '/placeholder-city.jpg'}
            alt={city.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <h1 className="text-4xl font-bold text-white mb-2">{city.name}</h1>
            <p className="text-xl text-white/90">{city.country}</p>
          </div>
        </div>

        {/* City Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg p-4 shadow-md">
            <div className="flex items-center mb-2">
              <Users className="h-5 w-5 text-blue-500 mr-2" />
              <span className="font-medium">Gyms</span>
            </div>
            <p className="text-2xl font-bold">{city.gym_count}</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-md">
            <div className="flex items-center mb-2">
              <DollarSign className="h-5 w-5 text-green-500 mr-2" />
              <span className="font-medium">Monthly Cost</span>
            </div>
            <p className="text-2xl font-bold">${city.monthly_cost || 'N/A'}</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-md">
            <div className="flex items-center mb-2">
              <Wifi className="h-5 w-5 text-purple-500 mr-2" />
              <span className="font-medium">WiFi Speed</span>
            </div>
            <p className="text-2xl font-bold">{city.wifi_speed ? `${city.wifi_speed} Mbps` : 'N/A'}</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-md">
            <div className="flex items-center mb-2">
              <Building2 className="h-5 w-5 text-orange-500 mr-2" />
              <span className="font-medium">Coworking</span>
            </div>
            <p className="text-2xl font-bold">{city.coworking_spaces ? 'Yes' : 'No'}</p>
          </div>
        </div>

        {/* Description */}
        <div className="bg-white rounded-lg p-6 shadow-md mb-8">
          <h2 className="text-2xl font-bold mb-4">About {city.name}</h2>
          <p className="text-gray-600">{city.description || 'No description available'}</p>
        </div>

        {/* Gyms Section */}
        <div className="bg-white rounded-lg p-6 shadow-md">
          <h2 className="text-2xl font-bold mb-6">BJJ Gyms in {city.name}</h2>
          {gyms.length === 0 ? (
            <p className="text-gray-500">No gyms found in this city.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {gyms.map((gym) => (
                <motion.div
                  key={gym.id}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                  whileHover={{ y: -5 }}
                >
                  <h3 className="text-xl font-semibold mb-2">{gym.name}</h3>
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">{gym.address}</span>
                  </div>
                  {gym.rating && (
                    <div className="flex items-center text-gray-600 mb-2">
                      <Star className="h-4 w-4 mr-1 text-yellow-400" />
                      <span className="text-sm">{gym.rating}</span>
                    </div>
                  )}
                  {gym.website && (
                    <a
                      href={gym.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-600 text-sm"
                    >
                      Visit Website
                    </a>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default CityDetailPage;