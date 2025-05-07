import { useState, useEffect } from 'react';
import { City } from '../types';
import { CityList } from '../components/cities/CityList';
import { motion } from 'framer-motion';
import { getAllCities } from '../services/gymService';

const CitiesPage = () => {
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    gymDensityMin: 0,
    beltFriendlinessMin: 0,
    instructorQualityMin: 0,
    trainingStyles: [] as string[],
    classAvailability: [] as string[],
    competitionOpportunitiesMin: 0,
    monthlyCostMax: 1000,
    costOfLivingMax: 3000,
    visaFriendlinessMin: 0,
    safetyMin: 0,
    englishFriendly: false,
    healthcareMin: 0,
    bjjCommunityMin: 0,
    socialLifeMin: 0,
    recoveryFacilities: false,
    remoteWorkFriendly: false,
    wifiSpeedMin: 0,
    coworkingSpaces: false,
  });

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const data = await getAllCities();
        setCities(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchCities();
  }, []);

  const handleFilterChange = (key: keyof typeof filters, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500 text-center">
          <h2 className="text-2xl font-semibold mb-2">Error</h2>
          <p>{error}</p>
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
        <h1 className="text-3xl font-bold mb-8">BJJ Cities</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Filters</h2>
              
              {/* Training Filters */}
              <div className="mb-6">
                <h3 className="font-medium mb-2">Training</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.trainingStyles.includes('gi')}
                      onChange={(e) => {
                        const newStyles = e.target.checked
                          ? [...filters.trainingStyles, 'gi']
                          : filters.trainingStyles.filter(s => s !== 'gi');
                        handleFilterChange('trainingStyles', newStyles);
                      }}
                      className="mr-2"
                    />
                    GI
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.trainingStyles.includes('noGi')}
                      onChange={(e) => {
                        const newStyles = e.target.checked
                          ? [...filters.trainingStyles, 'noGi']
                          : filters.trainingStyles.filter(s => s !== 'noGi');
                        handleFilterChange('trainingStyles', newStyles);
                      }}
                      className="mr-2"
                    />
                    No-GI
                  </label>
                </div>
              </div>

              {/* Cost Filters */}
              <div className="mb-6">
                <h3 className="font-medium mb-2">Cost</h3>
                <div className="space-y-2">
                  <div>
                    <label className="block text-sm text-gray-600">Monthly Cost Max</label>
                    <input
                      type="range"
                      min="0"
                      max="2000"
                      step="100"
                      value={filters.monthlyCostMax}
                      onChange={(e) => handleFilterChange('monthlyCostMax', Number(e.target.value))}
                      className="w-full"
                    />
                    <span className="text-sm text-gray-600">${filters.monthlyCostMax}</span>
                  </div>
                </div>
              </div>

              {/* Lifestyle Filters */}
              <div className="mb-6">
                <h3 className="font-medium mb-2">Lifestyle</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.englishFriendly}
                      onChange={(e) => handleFilterChange('englishFriendly', e.target.checked)}
                      className="mr-2"
                    />
                    English Friendly
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.remoteWorkFriendly}
                      onChange={(e) => handleFilterChange('remoteWorkFriendly', e.target.checked)}
                      className="mr-2"
                    />
                    Remote Work Friendly
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <CityList cities={cities} filters={filters} />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CitiesPage;