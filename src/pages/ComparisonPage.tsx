import React, { useState } from 'react';
import { cities } from '../data/cities';
import { City } from '../types';
import { 
  Search,
  MapPin, 
  DollarSign, 
  Users, 
  Trophy, 
  Shield, 
  Heart, 
  Sun, 
  Globe,
  Briefcase,
  Wifi,
  X
} from 'lucide-react';

const ComparisonPage = () => {
  const [selectedCities, setSelectedCities] = useState<City[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  const handleAddCity = (city: City) => {
    if (selectedCities.length < 3 && !selectedCities.some(c => c.id === city.id)) {
      setSelectedCities([...selectedCities, city]);
      setSearchTerm('');
    }
  };
  
  const handleRemoveCity = (cityId: string) => {
    setSelectedCities(selectedCities.filter(city => city.id !== cityId));
  };
  
  const filteredCities = cities.filter(city => 
    city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    city.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to render rating as a scale bar and percentage
  const renderRating = (rating: number, maxRating: number = 10) => {
    const percentage = (rating / maxRating) * 100;
    
    return (
      <div className="flex items-center gap-2">
        <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-red-600 rounded-full"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <span className="text-sm font-medium text-gray-700">{percentage.toFixed(0)}%</span>
      </div>
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-blue-900 mb-2">Compare BJJ Cities</h1>
          <p className="text-gray-600">
            Select up to 3 cities to compare their BJJ scenes, living costs, and training opportunities.
          </p>
        </div>
        
        {/* City Selection */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-blue-900 mb-4">Select Cities to Compare</h2>
          
          <div className="flex flex-wrap gap-4 mb-6">
            {selectedCities.map(city => (
              <div key={city.id} className="flex items-center bg-blue-50 border border-blue-200 rounded-lg px-3 py-2">
                <img src={city.image} alt={city.name} className="w-8 h-8 rounded-full object-cover mr-2" />
                <span className="text-blue-900 font-medium">{city.name}</span>
                <button 
                  onClick={() => handleRemoveCity(city.id)}
                  className="ml-2 text-gray-500 hover:text-red-600"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
            
            {selectedCities.length < 3 && (
              <div className="relative">
                <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 w-64">
                  <Search size={18} className="text-gray-400 mr-2" />
                  <input
                    type="text"
                    placeholder="Search for a city"
                    className="border-none p-0 focus:ring-0 w-full text-gray-800"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                  />
                </div>
                
                {searchTerm && (
                  <div className="absolute z-10 mt-1 w-64 bg-white rounded-md shadow-lg max-h-60 overflow-y-auto">
                    {filteredCities.length > 0 ? (
                      filteredCities.map(city => (
                        <button
                          key={city.id}
                          className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center"
                          onClick={() => handleAddCity(city)}
                        >
                          <img src={city.image} alt={city.name} className="w-6 h-6 rounded-full object-cover mr-2" />
                          <span>{city.name}, {city.country}</span>
                        </button>
                      ))
                    ) : (
                      <div className="px-4 py-2 text-gray-500">No cities found</div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
          
          {selectedCities.length === 0 && (
            <div className="text-center py-6 text-gray-500">
              Select at least one city to start comparing
            </div>
          )}
        </div>
        
        {/* Comparison Table */}
        {selectedCities.length > 0 && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-blue-900 text-white">
                    <th className="py-3 px-4 text-left font-semibold border-r border-blue-800 w-48">Criteria</th>
                    {selectedCities.map(city => (
                      <th key={city.id} className="py-3 px-4 text-center font-semibold border-r border-blue-800" style={{ minWidth: '200px' }}>
                        <div className="flex flex-col items-center">
                          <img src={city.image} alt={city.name} className="w-10 h-10 rounded-full object-cover mb-2" />
                          <span>{city.name}</span>
                          <span className="text-xs text-blue-200">{city.country}</span>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {/* BJJ Metrics */}
                  <tr className="bg-blue-50">
                    <td colSpan={selectedCities.length + 1} className="py-2 px-4 font-semibold text-blue-900">
                      BJJ Metrics
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 border-t border-r border-gray-200 bg-gray-50 flex items-center">
                      <Trophy size={16} className="text-blue-900 mr-2" />
                      <span>Gym Density</span>
                    </td>
                    {selectedCities.map(city => (
                      <td key={city.id} className="py-3 px-4 border-t border-r border-gray-200 text-center">
                        {renderRating(city.gymDensity)}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-4 border-t border-r border-gray-200 bg-gray-50 flex items-center">
                      <Users size={16} className="text-blue-900 mr-2" />
                      <span>Belt Friendliness</span>
                    </td>
                    {selectedCities.map(city => (
                      <td key={city.id} className="py-3 px-4 border-t border-r border-gray-200 text-center">
                        {renderRating(city.beltFriendliness)}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-4 border-t border-r border-gray-200 bg-gray-50 flex items-center">
                      <Users size={16} className="text-blue-900 mr-2" />
                      <span>Instructor Quality</span>
                    </td>
                    {selectedCities.map(city => (
                      <td key={city.id} className="py-3 px-4 border-t border-r border-gray-200 text-center">
                        {renderRating(city.instructorQuality)}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-4 border-t border-r border-gray-200 bg-gray-50 flex items-center">
                      <Heart size={16} className="text-blue-900 mr-2" />
                      <span>Drop-in Friendliness</span>
                    </td>
                    {selectedCities.map(city => (
                      <td key={city.id} className="py-3 px-4 border-t border-r border-gray-200 text-center">
                        {renderRating(city.dropInFriendliness)}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-4 border-t border-r border-gray-200 bg-gray-50 flex items-center">
                      <Trophy size={16} className="text-blue-900 mr-2" />
                      <span>Competition Opportunities</span>
                    </td>
                    {selectedCities.map(city => (
                      <td key={city.id} className="py-3 px-4 border-t border-r border-gray-200 text-center">
                        {renderRating(city.competitionOpportunities)}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-4 border-t border-r border-gray-200 bg-gray-50 flex items-center">
                      <DollarSign size={16} className="text-blue-900 mr-2" />
                      <span>Monthly Training Cost</span>
                    </td>
                    {selectedCities.map(city => (
                      <td key={city.id} className="py-3 px-4 border-t border-r border-gray-200 text-center font-medium">
                        ${city.monthlyCost}/mo
                      </td>
                    ))}
                  </tr>
                  
                  {/* Training Details */}
                  <tr className="bg-blue-50">
                    <td colSpan={selectedCities.length + 1} className="py-2 px-4 font-semibold text-blue-900">
                      Training Styles
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 border-t border-r border-gray-200 bg-gray-50">Gi Training</td>
                    {selectedCities.map(city => (
                      <td key={city.id} className="py-3 px-4 border-t border-r border-gray-200 text-center">
                        <span className={city.trainingStyles.gi ? 'text-green-600' : 'text-red-600'}>
                          {city.trainingStyles.gi ? 'Available' : 'Limited'}
                        </span>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-4 border-t border-r border-gray-200 bg-gray-50">No-Gi Training</td>
                    {selectedCities.map(city => (
                      <td key={city.id} className="py-3 px-4 border-t border-r border-gray-200 text-center">
                        <span className={city.trainingStyles.noGi ? 'text-green-600' : 'text-red-600'}>
                          {city.trainingStyles.noGi ? 'Available' : 'Limited'}
                        </span>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-4 border-t border-r border-gray-200 bg-gray-50">MMA Training</td>
                    {selectedCities.map(city => (
                      <td key={city.id} className="py-3 px-4 border-t border-r border-gray-200 text-center">
                        <span className={city.trainingStyles.mma ? 'text-green-600' : 'text-red-600'}>
                          {city.trainingStyles.mma ? 'Available' : 'Limited'}
                        </span>
                      </td>
                    ))}
                  </tr>
                  
                  {/* Travel & Lifestyle */}
                  <tr className="bg-blue-50">
                    <td colSpan={selectedCities.length + 1} className="py-2 px-4 font-semibold text-blue-900">
                      Travel & Lifestyle
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 border-t border-r border-gray-200 bg-gray-50 flex items-center">
                      <DollarSign size={16} className="text-blue-900 mr-2" />
                      <span>Cost of Living</span>
                    </td>
                    {selectedCities.map(city => (
                      <td key={city.id} className="py-3 px-4 border-t border-r border-gray-200 text-center">
                        {renderRating(city.costOfLiving)}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-4 border-t border-r border-gray-200 bg-gray-50 flex items-center">
                      <Globe size={16} className="text-blue-900 mr-2" />
                      <span>Visa Friendliness</span>
                    </td>
                    {selectedCities.map(city => (
                      <td key={city.id} className="py-3 px-4 border-t border-r border-gray-200 text-center">
                        {renderRating(city.visaFriendliness)}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-4 border-t border-r border-gray-200 bg-gray-50 flex items-center">
                      <Shield size={16} className="text-blue-900 mr-2" />
                      <span>Safety</span>
                    </td>
                    {selectedCities.map(city => (
                      <td key={city.id} className="py-3 px-4 border-t border-r border-gray-200 text-center">
                        {renderRating(city.safety)}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-4 border-t border-r border-gray-200 bg-gray-50 flex items-center">
                      <Globe size={16} className="text-blue-900 mr-2" />
                      <span>English Friendly</span>
                    </td>
                    {selectedCities.map(city => (
                      <td key={city.id} className="py-3 px-4 border-t border-r border-gray-200 text-center">
                        <span className={city.englishFriendly ? 'text-green-600' : 'text-red-600'}>
                          {city.englishFriendly ? 'Yes' : 'Limited'}
                        </span>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-4 border-t border-r border-gray-200 bg-gray-50 flex items-center">
                      <Sun size={16} className="text-blue-900 mr-2" />
                      <span>Weather</span>
                    </td>
                    {selectedCities.map(city => (
                      <td key={city.id} className="py-3 px-4 border-t border-r border-gray-200 text-center">
                        <div>
                          <span className="text-sm">{city.weather.type}</span>
                          <div className="flex justify-center mt-1">{renderRating(city.weather.score)}</div>
                        </div>
                      </td>
                    ))}
                  </tr>
                  
                  {/* Remote Work */}
                  <tr className="bg-blue-50">
                    <td colSpan={selectedCities.length + 1} className="py-2 px-4 font-semibold text-blue-900">
                      Remote Work
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 border-t border-r border-gray-200 bg-gray-50 flex items-center">
                      <Briefcase size={16} className="text-blue-900 mr-2" />
                      <span>Remote Work Friendly</span>
                    </td>
                    {selectedCities.map(city => (
                      <td key={city.id} className="py-3 px-4 border-t border-r border-gray-200 text-center">
                        <span className={city.remoteWorkFriendly ? 'text-green-600' : 'text-red-600'}>
                          {city.remoteWorkFriendly ? 'Yes' : 'Limited'}
                        </span>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-4 border-t border-r border-gray-200 bg-gray-50 flex items-center">
                      <Wifi size={16} className="text-blue-900 mr-2" />
                      <span>WiFi Speed</span>
                    </td>
                    {selectedCities.map(city => (
                      <td key={city.id} className="py-3 px-4 border-t border-r border-gray-200 text-center">
                        <span className="font-medium">{city.wifiSpeed} Mbps</span>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-4 border-t border-r border-gray-200 bg-gray-50 flex items-center">
                      <Briefcase size={16} className="text-blue-900 mr-2" />
                      <span>Coworking Spaces</span>
                    </td>
                    {selectedCities.map(city => (
                      <td key={city.id} className="py-3 px-4 border-t border-r border-gray-200 text-center">
                        <span className={city.coworkingSpaces ? 'text-green-600' : 'text-red-600'}>
                          {city.coworkingSpaces ? 'Available' : 'Limited'}
                        </span>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ComparisonPage;