import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { City } from '../../types';
import CityCard from './CityCard';

interface CityListProps {
  cities: City[];
  filters: {
    gymDensityMin?: number;
    beltFriendlinessMin?: number;
    instructorQualityMin?: number;
    trainingStyles?: string[];
    classAvailability?: string[];
    competitionOpportunitiesMin?: number;
    monthlyCostMax?: number;
    costOfLivingMax?: number;
    visaFriendlinessMin?: number;
    safetyMin?: number;
    englishFriendly?: boolean;
    healthcareMin?: number;
    bjjCommunityMin?: number;
    socialLifeMin?: number;
    recoveryFacilities?: boolean;
    remoteWorkFriendly?: boolean;
    wifiSpeedMin?: number;
    coworkingSpaces?: boolean;
  };
}

export const CityList = ({ cities, filters }: CityListProps) => {
  const [filteredCities, setFilteredCities] = useState<City[]>(cities);

  useEffect(() => {
    const filtered = cities.filter(city => {
      // Gym density filter
      if (filters.gymDensityMin && Number(city.gym_density) < filters.gymDensityMin) {
        return false;
      }

      // Belt friendliness filter
      if (filters.beltFriendlinessMin && Number(city.belt_friendliness) < filters.beltFriendlinessMin) {
        return false;
      }

      // Instructor quality filter
      if (filters.instructorQualityMin && Number(city.instructor_quality) < filters.instructorQualityMin) {
        return false;
      }

      // Training styles filter
      if (filters.trainingStyles?.length) {
        const hasTrainingStyle = filters.trainingStyles.some(style => {
          switch (style) {
            case 'gi':
              return city.training_styles?.gi;
            case 'noGi':
              return city.training_styles?.noGi;
            case 'mma':
              return city.training_styles?.mma;
            case 'selfDefense':
              return city.training_styles?.selfDefense;
            default:
              return false;
          }
        });
        if (!hasTrainingStyle) return false;
      }

      // Class availability filter
      if (filters.classAvailability?.length) {
        const hasClassTime = filters.classAvailability.some(time => {
          switch (time) {
            case 'morning':
              return city.class_availability?.morning;
            case 'afternoon':
              return city.class_availability?.afternoon;
            case 'evening':
              return city.class_availability?.evening;
            default:
              return false;
          }
        });
        if (!hasClassTime) return false;
      }

      // Competition opportunities filter
      if (filters.competitionOpportunitiesMin && Number(city.competition_opportunities) < filters.competitionOpportunitiesMin) {
        return false;
      }

      // Monthly cost filter
      if (filters.monthlyCostMax && Number(city.monthly_cost) > filters.monthlyCostMax) {
        return false;
      }

      // Cost of living filter
      if (filters.costOfLivingMax && Number(city.cost_of_living) > filters.costOfLivingMax) {
        return false;
      }

      // Visa friendliness filter
      if (filters.visaFriendlinessMin && Number(city.visa_friendliness) < filters.visaFriendlinessMin) {
        return false;
      }

      // Safety filter
      if (filters.safetyMin && Number(city.safety) < filters.safetyMin) {
        return false;
      }

      // English friendly filter
      if (filters.englishFriendly && !city.english_friendly) {
        return false;
      }

      // Healthcare filter
      if (filters.healthcareMin && Number(city.healthcare) < filters.healthcareMin) {
        return false;
      }

      // BJJ community filter
      if (filters.bjjCommunityMin && Number(city.bjj_community) < filters.bjjCommunityMin) {
        return false;
      }

      // Social life filter
      if (filters.socialLifeMin && Number(city.social_life) < filters.socialLifeMin) {
        return false;
      }

      // Recovery facilities filter
      if (filters.recoveryFacilities && !city.recovery_facilities) {
        return false;
      }

      // Remote work friendly filter
      if (filters.remoteWorkFriendly && !city.remote_work_friendly) {
        return false;
      }

      // WiFi speed filter
      if (filters.wifiSpeedMin && Number(city.wifi_speed) < filters.wifiSpeedMin) {
        return false;
      }

      // Coworking spaces filter
      if (filters.coworkingSpaces && !city.coworking_spaces) {
        return false;
      }

      return true;
    });

    setFilteredCities(filtered);
  }, [cities, filters]);

  if (filteredCities.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No cities match your filters</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredCities.map((city, index) => (
        <motion.div
          key={city.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <CityCard city={city} />
        </motion.div>
      ))}
    </div>
  );
};

export default CityList;