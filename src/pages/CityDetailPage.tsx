import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { City } from '../types';
import { db } from '../db/config';
import { cities } from '../db/schema';
import { eq } from 'drizzle-orm';
import GymList from '../components/gyms/GymList';
import GymFilters, { GymFilterType } from '../components/gyms/GymFilters';
import { 
  MapPin, 
  DollarSign, 
  Globe, 
  Shield, 
  Sun, 
  Heart, 
  Users, 
  Briefcase, 
  Wifi, 
  Award, 
  Calendar,
  Clock,
  Cloud,
  Laptop
} from 'lucide-react';

const CityDetailPage: React.FC = () => {
  const { cityId } = useParams<{ cityId: string }>();
  const [city, setCity] = useState<City | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<GymFilterType>({
    trainingStyles: {
      gi: false,
      noGi: false,
      mma: false,
      selfDefense: false
    },
    priceRange: {
      min: 0,
      max: 200
    },
    openMat: false,
    rating: 0
  });

  useEffect(() => {
    async function loadCity() {
      if (!cityId) return;
      
      try {
        setLoading(true);
        const result = await db.select().from(cities).where(eq(cities.id, cityId));
        if (result.length > 0) {
          // Convert string fields to numbers where needed
          const cityData = {
            ...result[0],
            gym_density: result[0].gym_density ? Number(result[0].gym_density) : null,
            belt_friendliness: result[0].belt_friendliness ? Number(result[0].belt_friendliness) : null,
            instructor_quality: result[0].instructor_quality ? Number(result[0].instructor_quality) : null,
            drop_in_friendliness: result[0].drop_in_friendliness ? Number(result[0].drop_in_friendliness) : null,
            competition_opportunities: result[0].competition_opportunities ? Number(result[0].competition_opportunities) : null,
            monthly_cost: result[0].monthly_cost ? Number(result[0].monthly_cost) : null,
            cost_of_living: result[0].cost_of_living ? Number(result[0].cost_of_living) : null,
            visa_friendliness: result[0].visa_friendliness ? Number(result[0].visa_friendliness) : null,
            safety: result[0].safety ? Number(result[0].safety) : null,
            weather_score: result[0].weather_score ? Number(result[0].weather_score) : null,
            healthcare: result[0].healthcare ? Number(result[0].healthcare) : null,
            bjj_community: result[0].bjj_community ? Number(result[0].bjj_community) : null,
            social_life: result[0].social_life ? Number(result[0].social_life) : null,
            wifi_speed: result[0].wifi_speed ? Number(result[0].wifi_speed) : null,
            weather_type: result[0].weather_type,
            remote_work_friendly: result[0].remote_work_friendly ? true : false,
          };
          setCity(cityData as City);
        } else {
          setError('City not found');
        }
      } catch (err) {
        setError('Failed to load city data');
        console.error('Error loading city:', err);
      } finally {
        setLoading(false);
      }
    }

    loadCity();
  }, [cityId]);

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading city data...</p>
      </div>
    );
  }

  if (error || !city) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-semibold text-red-600">Error</h3>
        <p className="text-gray-600 mt-2">{error || 'City not found'}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{city.name}</h1>
        <p className="text-gray-600">{city.description}</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <GymList cityId={city.id} />
        </div>
        <div>
          <GymFilters onFilterChange={setFilters} />
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-lg shadow-md p-6 mt-8"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-4">City Information</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <MapPin className="text-blue-900 mr-2" size={20} />
                <span className="text-gray-700">{city.country}</span>
              </div>
              <div className="flex items-center">
                <DollarSign className="text-green-600 mr-2" size={20} />
                <span className="text-gray-700">Monthly Cost: ${city.monthly_cost}</span>
              </div>
              <div className="flex items-center">
                <Shield className="text-blue-900 mr-2" size={20} />
                <span className="text-gray-700">Safety Rating: {city.safety}/10</span>
              </div>
              <div className="flex items-center">
                <Cloud className="text-blue-900 mr-2" size={20} />
                <span className="text-gray-700">
                  Weather: {city.weather_type} ({city.weather_score}/10)
                </span>
              </div>
              <div className="flex items-center">
                <Heart className="text-red-500 mr-2" size={20} />
                <span className="text-gray-700">Healthcare: {city.healthcare}/10</span>
              </div>
              <div className="flex items-center">
                <Users className="text-blue-900 mr-2" size={20} />
                <span className="text-gray-700">BJJ Community: {city.bjj_community}/10</span>
              </div>
              <div className="flex items-center">
                <Briefcase className="text-blue-900 mr-2" size={20} />
                <span className="text-gray-700">
                  Remote Work: {city.remote_work_friendly ? 'Yes' : 'No'}
                </span>
              </div>
              <div className="flex items-center">
                <Wifi className="text-blue-900 mr-2" size={20} />
                <span className="text-gray-700">WiFi Speed: {city.wifi_speed} Mbps</span>
              </div>
              <div className="flex items-center">
                <Award className="text-blue-900 mr-2" size={20} />
                <span className="text-gray-700">Training Quality: {city.instructor_quality}/10</span>
              </div>
              <div className="flex items-center">
                <Calendar className="text-blue-900 mr-2" size={20} />
                <span className="text-gray-700">Visa Friendliness: {city.visa_friendliness}/10</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CityDetailPage;