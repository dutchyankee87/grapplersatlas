import React, { useState } from 'react';
import { cities } from '../data/cities';
import CityList from '../components/cities/CityList';
import FilterPanel from '../components/filters/FilterPanel';
import { FilterType } from '../types';
import { ChevronDown, ChevronUp } from 'lucide-react';

const CitiesPage = () => {
  const [filters, setFilters] = useState<FilterType>({});
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  
  // Continent filter
  const continents = Array.from(new Set(cities.map(city => city.continent)));
  const [selectedContinent, setSelectedContinent] = useState<string | undefined>(undefined);
  
  // Update filters when continent is selected
  const handleContinentChange = (continent: string | undefined) => {
    setSelectedContinent(continent);
    setFilters(prev => ({
      ...prev,
      continent: continent,
    }));
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-blue-900 mb-2">Explore BJJ Cities</h1>
          <p className="text-gray-600">
            Discover the perfect cities for your jiu-jitsu journey based on training quality, lifestyle, and community.
          </p>
        </div>
        
        {/* Continent Pills */}
        <div className="mb-6 flex flex-wrap gap-2">
          <button
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
              !selectedContinent
                ? 'bg-blue-900 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            onClick={() => handleContinentChange(undefined)}
          >
            All Continents
          </button>
          
          {continents.map(continent => (
            <button
              key={continent}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
                selectedContinent === continent
                  ? 'bg-blue-900 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              onClick={() => handleContinentChange(continent)}
            >
              {continent}
            </button>
          ))}
        </div>
        
        {/* Mobile Toggle for Filters */}
        <div className="md:hidden mb-4">
          <button
            className="w-full bg-white border border-gray-300 rounded-md py-2 px-4 flex justify-between items-center"
            onClick={() => setShowMobileFilters(!showMobileFilters)}
          >
            <span className="font-medium text-gray-800">Filters</span>
            {showMobileFilters ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters Sidebar */}
          <div className={`w-full md:w-80 flex-shrink-0 ${showMobileFilters ? 'block' : 'hidden md:block'}`}>
            <FilterPanel filters={filters} setFilters={setFilters} />
          </div>
          
          {/* City List */}
          <div className="flex-grow">
            <CityList cities={cities} filters={filters} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CitiesPage;