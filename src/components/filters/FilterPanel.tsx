import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Filter } from 'lucide-react';
import { FilterType } from '../../types';

interface FilterPanelProps {
  filters: FilterType;
  setFilters: React.Dispatch<React.SetStateAction<FilterType>>;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ filters, setFilters }) => {
  const [expandedSections, setExpandedSections] = useState({
    bjj: true,
    travel: false,
    community: false,
    work: false,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleRangeChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof FilterType
  ) => {
    const value = parseInt(e.target.value);
    setFilters(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    category: string,
    field: string
  ) => {
    const { checked } = e.target;
    
    setFilters(prev => {
      // Create deep copy to avoid mutating nested objects
      const newFilters = { ...prev };
      
      if (category === 'trainingStyles') {
        newFilters.trainingStyles = {
          ...newFilters.trainingStyles,
          [field]: checked,
        };
      } else if (category === 'classAvailability') {
        newFilters.classAvailability = {
          ...newFilters.classAvailability,
          [field]: checked,
        };
      } else {
        // For top-level boolean fields
        newFilters[field as keyof FilterType] = checked;
      }
      
      return newFilters;
    });
  };

  const handleWeatherChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    const weatherType = value as 'tropical' | 'temperate' | 'mediterranean' | 'desert' | 'cold';
    
    setFilters(prev => {
      const currentWeatherTypes = prev.weatherTypes || [];
      const newWeatherTypes = checked
        ? [...currentWeatherTypes, weatherType]
        : currentWeatherTypes.filter(type => type !== weatherType);
      
      return {
        ...prev,
        weatherTypes: newWeatherTypes.length > 0 ? newWeatherTypes : undefined,
      };
    });
  };

  const resetFilters = () => {
    setFilters({});
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-blue-900 flex items-center">
          <Filter size={20} className="mr-2" />
          Filters
        </h2>
        <button
          onClick={resetFilters}
          className="text-sm text-red-600 hover:text-red-800"
        >
          Reset all
        </button>
      </div>

      {/* BJJ-Specific Filters */}
      <div className="mb-4">
        <button
          className="flex justify-between items-center w-full py-2 text-left font-medium text-gray-800"
          onClick={() => toggleSection('bjj')}
        >
          BJJ-Specific Filters
          {expandedSections.bjj ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
        
        {expandedSections.bjj && (
          <div className="mt-2 space-y-4 pl-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gym Density (Min: {filters.gymDensityMin || 1})
              </label>
              <input
                type="range"
                min="1"
                max="10"
                step="1"
                value={filters.gymDensityMin || 1}
                onChange={(e) => handleRangeChange(e, 'gymDensityMin')}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Belt-Friendly Culture (Min: {filters.beltFriendlinessMin || 1})
              </label>
              <input
                type="range"
                min="1"
                max="10"
                step="1"
                value={filters.beltFriendlinessMin || 1}
                onChange={(e) => handleRangeChange(e, 'beltFriendlinessMin')}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Instructor Quality (Min: {filters.instructorQualityMin || 1})
              </label>
              <input
                type="range"
                min="1"
                max="10"
                step="1"
                value={filters.instructorQualityMin || 1}
                onChange={(e) => handleRangeChange(e, 'instructorQualityMin')}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Drop-In Friendliness (Min: {filters.dropInFriendlinessMin || 1})
              </label>
              <input
                type="range"
                min="1"
                max="10"
                step="1"
                value={filters.dropInFriendlinessMin || 1}
                onChange={(e) => handleRangeChange(e, 'dropInFriendlinessMin')}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Training Styles
              </label>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    id="gi"
                    type="checkbox"
                    checked={!!filters.trainingStyles?.gi}
                    onChange={(e) => handleCheckboxChange(e, 'trainingStyles', 'gi')}
                    className="h-4 w-4 text-blue-900 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="gi" className="ml-2 text-sm text-gray-700">
                    Gi
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="nogi"
                    type="checkbox"
                    checked={!!filters.trainingStyles?.noGi}
                    onChange={(e) => handleCheckboxChange(e, 'trainingStyles', 'noGi')}
                    className="h-4 w-4 text-blue-900 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="nogi" className="ml-2 text-sm text-gray-700">
                    No-Gi
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="mma"
                    type="checkbox"
                    checked={!!filters.trainingStyles?.mma}
                    onChange={(e) => handleCheckboxChange(e, 'trainingStyles', 'mma')}
                    className="h-4 w-4 text-blue-900 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="mma" className="ml-2 text-sm text-gray-700">
                    MMA
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="selfDefense"
                    type="checkbox"
                    checked={!!filters.trainingStyles?.selfDefense}
                    onChange={(e) => handleCheckboxChange(e, 'trainingStyles', 'selfDefense')}
                    className="h-4 w-4 text-blue-900 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="selfDefense" className="ml-2 text-sm text-gray-700">
                    Self-Defense
                  </label>
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Class Availability
              </label>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    id="morning"
                    type="checkbox"
                    checked={!!filters.classAvailability?.morning}
                    onChange={(e) => handleCheckboxChange(e, 'classAvailability', 'morning')}
                    className="h-4 w-4 text-blue-900 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="morning" className="ml-2 text-sm text-gray-700">
                    Morning
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="afternoon"
                    type="checkbox"
                    checked={!!filters.classAvailability?.afternoon}
                    onChange={(e) => handleCheckboxChange(e, 'classAvailability', 'afternoon')}
                    className="h-4 w-4 text-blue-900 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="afternoon" className="ml-2 text-sm text-gray-700">
                    Afternoon
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="evening"
                    type="checkbox"
                    checked={!!filters.classAvailability?.evening}
                    onChange={(e) => handleCheckboxChange(e, 'classAvailability', 'evening')}
                    className="h-4 w-4 text-blue-900 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="evening" className="ml-2 text-sm text-gray-700">
                    Evening
                  </label>
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Competition Opportunities (Min: {filters.competitionOpportunitiesMin || 1})
              </label>
              <input
                type="range"
                min="1"
                max="10"
                step="1"
                value={filters.competitionOpportunitiesMin || 1}
                onChange={(e) => handleRangeChange(e, 'competitionOpportunitiesMin')}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Monthly Training Cost (Max: ${filters.monthlyCostMax || 200})
              </label>
              <input
                type="range"
                min="50"
                max="200"
                step="10"
                value={filters.monthlyCostMax || 200}
                onChange={(e) => handleRangeChange(e, 'monthlyCostMax')}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>
        )}
      </div>

      {/* Travel & Lifestyle Filters */}
      <div className="mb-4 border-t pt-2">
        <button
          className="flex justify-between items-center w-full py-2 text-left font-medium text-gray-800"
          onClick={() => toggleSection('travel')}
        >
          Travel & Lifestyle Filters
          {expandedSections.travel ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
        
        {expandedSections.travel && (
          <div className="mt-2 space-y-4 pl-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cost of Living (Max: {filters.costOfLivingMax || 10})
              </label>
              <input
                type="range"
                min="1"
                max="10"
                step="1"
                value={filters.costOfLivingMax || 10}
                onChange={(e) => handleRangeChange(e, 'costOfLivingMax')}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Visa Friendliness (Min: {filters.visaFriendlinessMin || 1})
              </label>
              <input
                type="range"
                min="1"
                max="10"
                step="1"
                value={filters.visaFriendlinessMin || 1}
                onChange={(e) => handleRangeChange(e, 'visaFriendlinessMin')}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Safety (Min: {filters.safetyMin || 1})
              </label>
              <input
                type="range"
                min="1"
                max="10"
                step="1"
                value={filters.safetyMin || 1}
                onChange={(e) => handleRangeChange(e, 'safetyMin')}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            
            <div className="flex items-center">
              <input
                id="englishFriendly"
                type="checkbox"
                checked={!!filters.englishFriendly}
                onChange={(e) => handleCheckboxChange(e, '', 'englishFriendly')}
                className="h-4 w-4 text-blue-900 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="englishFriendly" className="ml-2 text-sm text-gray-700">
                English-Friendly Gyms
              </label>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Weather Type
              </label>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    id="tropical"
                    type="checkbox"
                    value="tropical"
                    checked={filters.weatherTypes?.includes('tropical') || false}
                    onChange={handleWeatherChange}
                    className="h-4 w-4 text-blue-900 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="tropical" className="ml-2 text-sm text-gray-700">
                    Tropical
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="temperate"
                    type="checkbox"
                    value="temperate"
                    checked={filters.weatherTypes?.includes('temperate') || false}
                    onChange={handleWeatherChange}
                    className="h-4 w-4 text-blue-900 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="temperate" className="ml-2 text-sm text-gray-700">
                    Temperate
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="mediterranean"
                    type="checkbox"
                    value="mediterranean"
                    checked={filters.weatherTypes?.includes('mediterranean') || false}
                    onChange={handleWeatherChange}
                    className="h-4 w-4 text-blue-900 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="mediterranean" className="ml-2 text-sm text-gray-700">
                    Mediterranean
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="desert"
                    type="checkbox"
                    value="desert"
                    checked={filters.weatherTypes?.includes('desert') || false}
                    onChange={handleWeatherChange}
                    className="h-4 w-4 text-blue-900 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="desert" className="ml-2 text-sm text-gray-700">
                    Desert
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="cold"
                    type="checkbox"
                    value="cold"
                    checked={filters.weatherTypes?.includes('cold') || false}
                    onChange={handleWeatherChange}
                    className="h-4 w-4 text-blue-900 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="cold" className="ml-2 text-sm text-gray-700">
                    Cold
                  </label>
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Healthcare Access (Min: {filters.healthcareMin || 1})
              </label>
              <input
                type="range"
                min="1"
                max="10"
                step="1"
                value={filters.healthcareMin || 1}
                onChange={(e) => handleRangeChange(e, 'healthcareMin')}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>
        )}
      </div>

      {/* Community Vibe */}
      <div className="mb-4 border-t pt-2">
        <button
          className="flex justify-between items-center w-full py-2 text-left font-medium text-gray-800"
          onClick={() => toggleSection('community')}
        >
          Community Vibe
          {expandedSections.community ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
        
        {expandedSections.community && (
          <div className="mt-2 space-y-4 pl-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                BJJ Community (Min: {filters.bjjCommunityMin || 1})
              </label>
              <input
                type="range"
                min="1"
                max="10"
                step="1"
                value={filters.bjjCommunityMin || 1}
                onChange={(e) => handleRangeChange(e, 'bjjCommunityMin')}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Social Life (Min: {filters.socialLifeMin || 1})
              </label>
              <input
                type="range"
                min="1"
                max="10"
                step="1"
                value={filters.socialLifeMin || 1}
                onChange={(e) => handleRangeChange(e, 'socialLifeMin')}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            
            <div className="flex items-center">
              <input
                id="recoveryFacilities"
                type="checkbox"
                checked={!!filters.recoveryFacilities}
                onChange={(e) => handleCheckboxChange(e, '', 'recoveryFacilities')}
                className="h-4 w-4 text-blue-900 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="recoveryFacilities" className="ml-2 text-sm text-gray-700">
                Has Recovery Facilities
              </label>
            </div>
          </div>
        )}
      </div>

      {/* Remote Work Friendly */}
      <div className="border-t pt-2">
        <button
          className="flex justify-between items-center w-full py-2 text-left font-medium text-gray-800"
          onClick={() => toggleSection('work')}
        >
          Remote Work Friendly
          {expandedSections.work ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
        
        {expandedSections.work && (
          <div className="mt-2 space-y-4 pl-2">
            <div className="flex items-center">
              <input
                id="remoteWorkFriendly"
                type="checkbox"
                checked={!!filters.remoteWorkFriendly}
                onChange={(e) => handleCheckboxChange(e, '', 'remoteWorkFriendly')}
                className="h-4 w-4 text-blue-900 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remoteWorkFriendly" className="ml-2 text-sm text-gray-700">
                Remote Work Friendly
              </label>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Minimum WiFi Speed ({filters.wifiSpeedMin || 10} Mbps)
              </label>
              <input
                type="range"
                min="10"
                max="100"
                step="5"
                value={filters.wifiSpeedMin || 10}
                onChange={(e) => handleRangeChange(e, 'wifiSpeedMin')}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            
            <div className="flex items-center">
              <input
                id="coworkingSpaces"
                type="checkbox"
                checked={!!filters.coworkingSpaces}
                onChange={(e) => handleCheckboxChange(e, '', 'coworkingSpaces')}
                className="h-4 w-4 text-blue-900 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="coworkingSpaces" className="ml-2 text-sm text-gray-700">
                Has Coworking Spaces
              </label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterPanel;