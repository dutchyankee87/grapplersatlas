import React from 'react';
import { City, FilterType } from '../../types';
import CityCard from './CityCard';

interface CityListProps {
  cities: City[];
  filters: FilterType;
}

const CityList: React.FC<CityListProps> = ({ cities, filters }) => {
  // Function to filter cities based on filter criteria
  const filterCities = (cities: City[], filters: FilterType): City[] => {
    return cities.filter(city => {
      // BJJ-specific filters
      if (filters.gymDensityMin && city.gymDensity < filters.gymDensityMin) return false;
      if (filters.beltFriendlinessMin && city.beltFriendliness < filters.beltFriendlinessMin) return false;
      if (filters.instructorQualityMin && city.instructorQuality < filters.instructorQualityMin) return false;
      if (filters.dropInFriendlinessMin && city.dropInFriendliness < filters.dropInFriendlinessMin) return false;
      
      // Training styles
      if (filters.trainingStyles) {
        if (filters.trainingStyles.gi && !city.trainingStyles.gi) return false;
        if (filters.trainingStyles.noGi && !city.trainingStyles.noGi) return false;
        if (filters.trainingStyles.mma && !city.trainingStyles.mma) return false;
        if (filters.trainingStyles.selfDefense && !city.trainingStyles.selfDefense) return false;
      }
      
      // Class availability
      if (filters.classAvailability) {
        if (filters.classAvailability.morning && !city.classAvailability.morning) return false;
        if (filters.classAvailability.afternoon && !city.classAvailability.afternoon) return false;
        if (filters.classAvailability.evening && !city.classAvailability.evening) return false;
      }
      
      if (filters.competitionOpportunitiesMin && city.competitionOpportunities < filters.competitionOpportunitiesMin) return false;
      if (filters.monthlyCostMax && city.monthlyCost > filters.monthlyCostMax) return false;
      
      // Travel & lifestyle filters
      if (filters.costOfLivingMax && city.costOfLiving > filters.costOfLivingMax) return false;
      if (filters.visaFriendlinessMin && city.visaFriendliness < filters.visaFriendlinessMin) return false;
      if (filters.safetyMin && city.safety < filters.safetyMin) return false;
      if (filters.englishFriendly && !city.englishFriendly) return false;
      
      // Weather types
      if (filters.weatherTypes && filters.weatherTypes.length > 0 && !filters.weatherTypes.includes(city.weather.type)) {
        return false;
      }
      
      if (filters.healthcareMin && city.healthcare < filters.healthcareMin) return false;
      if (filters.bjjCommunityMin && city.bjjCommunity < filters.bjjCommunityMin) return false;
      if (filters.socialLifeMin && city.socialLife < filters.socialLifeMin) return false;
      if (filters.recoveryFacilities && !city.recoveryFacilities) return false;
      
      // Remote work filters
      if (filters.remoteWorkFriendly && !city.remoteWorkFriendly) return false;
      if (filters.wifiSpeedMin && city.wifiSpeed < filters.wifiSpeedMin) return false;
      if (filters.coworkingSpaces && !city.coworkingSpaces) return false;
      
      // Continent filter
      if (filters.continent && city.continent !== filters.continent) return false;
      
      return true;
    });
  };

  const filteredCities = filterCities(cities, filters);

  if (filteredCities.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-semibold text-gray-700">No cities match your filters</h3>
        <p className="text-gray-500 mt-2">Try adjusting your filter criteria to see more results.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredCities.map(city => (
        <CityCard key={city.id} city={city} />
      ))}
    </div>
  );
};

export default CityList;