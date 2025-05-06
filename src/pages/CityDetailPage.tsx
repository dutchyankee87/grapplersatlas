import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { City } from '../types';
import { cities } from '../data/cities';
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
  Clock
} from 'lucide-react';

const CityDetailPage = () => {
  const { cityId } = useParams<{ cityId: string }>();
  const [city, setCity] = useState<City | null>(null);
  
  useEffect(() => {
    if (cityId) {
      const foundCity = cities.find(c => c.id === cityId);
      if (foundCity) {
        setCity(foundCity);
      }
    }
  }, [cityId]);
  
  // Function to render rating dots
  const renderRating = (rating: number, maxRating: number = 10) => {
    const normalizedRating = Math.ceil((rating / maxRating) * 5);
    
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <div 
            key={i} 
            className={`w-3 h-3 rounded-full mr-1 ${
              i < normalizedRating ? 'bg-red-600' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  if (!city) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-600">Loading city information...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="relative h-80 md:h-96">
        <img
          src={city.image}
          alt={city.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{city.name}</h1>
                <div className="flex items-center text-white">
                  <MapPin size={16} className="mr-1" />
                  <span>{city.country}</span>
                </div>
              </div>
              <div className="flex gap-3">
                <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors duration-300 flex items-center">
                  <Heart size={16} className="mr-2" />
                  Save
                </button>
                <Link 
                  to="/compare" 
                  className="bg-blue-900 hover:bg-blue-800 text-white px-4 py-2 rounded-md transition-colors duration-300 flex items-center"
                >
                  Compare
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">About {city.name}</h2>
          <p className="text-gray-700 mb-6">{city.description}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* BJJ Metrics */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">BJJ Details</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-gray-700">
                    <Award size={18} className="text-blue-900 mr-2" />
                    <span>Gym Density</span>
                  </div>
                  {renderRating(city.gymDensity)}
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-gray-700">
                    <Users size={18} className="text-blue-900 mr-2" />
                    <span>Belt Friendliness</span>
                  </div>
                  {renderRating(city.beltFriendliness)}
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-gray-700">
                    <Award size={18} className="text-blue-900 mr-2" />
                    <span>Instructor Quality</span>
                  </div>
                  {renderRating(city.instructorQuality)}
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-gray-700">
                    <Heart size={18} className="text-blue-900 mr-2" />
                    <span>Drop-in Friendliness</span>
                  </div>
                  {renderRating(city.dropInFriendliness)}
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-gray-700">
                    <Calendar size={18} className="text-blue-900 mr-2" />
                    <span>Competition Opportunities</span>
                  </div>
                  {renderRating(city.competitionOpportunities)}
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-gray-700">
                    <DollarSign size={18} className="text-blue-900 mr-2" />
                    <span>Monthly Training Cost</span>
                  </div>
                  <span className="font-bold text-gray-900">${city.monthlyCost}/mo</span>
                </div>
              </div>
            </div>
            
            {/* Training Styles & Availability */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">Training Details</h3>
              
              <div className="mb-4">
                <h4 className="font-medium text-gray-700 mb-2">Training Styles</h4>
                <div className="flex flex-wrap gap-2">
                  {city.trainingStyles.gi && (
                    <span className="bg-blue-100 text-blue-900 px-3 py-1 rounded-full text-sm">Gi</span>
                  )}
                  {city.trainingStyles.noGi && (
                    <span className="bg-blue-100 text-blue-900 px-3 py-1 rounded-full text-sm">No-Gi</span>
                  )}
                  {city.trainingStyles.mma && (
                    <span className="bg-blue-100 text-blue-900 px-3 py-1 rounded-full text-sm">MMA</span>
                  )}
                  {city.trainingStyles.selfDefense && (
                    <span className="bg-blue-100 text-blue-900 px-3 py-1 rounded-full text-sm">Self-Defense</span>
                  )}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Class Availability</h4>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Clock size={16} className="text-blue-900 mr-2" />
                    <span className="text-gray-700 mr-2">Morning:</span>
                    <span className={city.classAvailability.morning ? 'text-green-600' : 'text-red-600'}>
                      {city.classAvailability.morning ? 'Available' : 'Limited'}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Clock size={16} className="text-blue-900 mr-2" />
                    <span className="text-gray-700 mr-2">Afternoon:</span>
                    <span className={city.classAvailability.afternoon ? 'text-green-600' : 'text-red-600'}>
                      {city.classAvailability.afternoon ? 'Available' : 'Limited'}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Clock size={16} className="text-blue-900 mr-2" />
                    <span className="text-gray-700 mr-2">Evening:</span>
                    <span className={city.classAvailability.evening ? 'text-green-600' : 'text-red-600'}>
                      {city.classAvailability.evening ? 'Available' : 'Limited'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Travel & Lifestyle */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">Travel & Lifestyle</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-gray-700">
                    <DollarSign size={18} className="text-blue-900 mr-2" />
                    <span>Cost of Living</span>
                  </div>
                  {renderRating(city.costOfLiving)}
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-gray-700">
                    <Globe size={18} className="text-blue-900 mr-2" />
                    <span>Visa Friendliness</span>
                  </div>
                  {renderRating(city.visaFriendliness)}
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-gray-700">
                    <Shield size={18} className="text-blue-900 mr-2" />
                    <span>Safety</span>
                  </div>
                  {renderRating(city.safety)}
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-gray-700">
                    <Globe size={18} className="text-blue-900 mr-2" />
                    <span>English Friendly</span>
                  </div>
                  <span className={`text-sm font-medium ${city.englishFriendly ? 'text-green-600' : 'text-red-600'}`}>
                    {city.englishFriendly ? 'Yes' : 'Limited'}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-gray-700">
                    <Sun size={18} className="text-blue-900 mr-2" />
                    <span>Weather</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm font-medium mr-2">{city.weather.type}</span>
                    {renderRating(city.weather.score)}
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-gray-700">
                    <Heart size={18} className="text-blue-900 mr-2" />
                    <span>Healthcare</span>
                  </div>
                  {renderRating(city.healthcare)}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Community Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">Community & Lifestyle</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">BJJ Community</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-gray-700">
                    <Users size={18} className="text-blue-900 mr-2" />
                    <span>BJJ Community</span>
                  </div>
                  {renderRating(city.bjjCommunity)}
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-gray-700">
                    <Users size={18} className="text-blue-900 mr-2" />
                    <span>Social Life</span>
                  </div>
                  {renderRating(city.socialLife)}
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-gray-700">
                    <Heart size={18} className="text-blue-900 mr-2" />
                    <span>Recovery Facilities</span>
                  </div>
                  <span className={`text-sm font-medium ${city.recoveryFacilities ? 'text-green-600' : 'text-red-600'}`}>
                    {city.recoveryFacilities ? 'Available' : 'Limited'}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">Remote Work</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-gray-700">
                    <Briefcase size={18} className="text-blue-900 mr-2" />
                    <span>Remote Work Friendly</span>
                  </div>
                  <span className={`text-sm font-medium ${city.remoteWorkFriendly ? 'text-green-600' : 'text-red-600'}`}>
                    {city.remoteWorkFriendly ? 'Yes' : 'Limited'}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-gray-700">
                    <Wifi size={18} className="text-blue-900 mr-2" />
                    <span>WiFi Speed</span>
                  </div>
                  <span className="font-medium text-gray-900">{city.wifiSpeed} Mbps</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-gray-700">
                    <Briefcase size={18} className="text-blue-900 mr-2" />
                    <span>Coworking Spaces</span>
                  </div>
                  <span className={`text-sm font-medium ${city.coworkingSpaces ? 'text-green-600' : 'text-red-600'}`}>
                    {city.coworkingSpaces ? 'Available' : 'Limited'}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="md:col-span-1">
              <div className="bg-blue-900 text-white rounded-lg p-6 h-full flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold mb-2">Ready to Roll?</h3>
                  <p className="mb-4">
                    Find the best gyms in {city.name} and connect with local BJJ practitioners.
                  </p>
                </div>
                <div className="space-y-3">
                  <button className="w-full bg-red-600 hover:bg-red-700 text-white rounded-md py-2 transition-colors duration-300">
                    Find Gyms in {city.name}
                  </button>
                  <button className="w-full bg-white text-blue-900 hover:bg-gray-100 rounded-md py-2 transition-colors duration-300">
                    Connect with Local BJJ Community
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CityDetailPage;