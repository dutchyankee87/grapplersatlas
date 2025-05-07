import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin, DollarSign, Users, Star } from 'lucide-react';
import { City } from '../../types';

interface CityCardProps {
  city: City;
}

const CityCard: React.FC<CityCardProps> = ({ city }) => {
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
    <Link to={`/city/${city.id}`}>
      <motion.div 
        className="bg-white rounded-lg shadow-md overflow-hidden"
        whileHover={{ y: -5 }}
        transition={{ duration: 0.2 }}
      >
        <div className="relative h-48">
          <motion.img
            src={city.image}
            alt={city.name}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          />
          <motion.div 
            className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
          <motion.div 
            className="absolute bottom-4 left-4 text-white"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-xl font-bold">{city.name}</h3>
            <p className="text-sm opacity-90">{city.country}</p>
          </motion.div>
        </div>

        <div className="p-4">
          <motion.div 
            className="flex items-center justify-between mb-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center text-gray-600">
              <MapPin size={16} className="mr-1" />
              <span className="text-sm">{city.gymCount} Gyms</span>
            </div>
            <div className="flex items-center text-gray-600">
              <DollarSign size={16} className="mr-1" />
              <span className="text-sm">${city.monthlyCost}/mo</span>
            </div>
          </motion.div>

          <motion.div 
            className="space-y-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Training Quality</span>
              {renderRating(city.trainingQuality)}
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Community</span>
              {renderRating(city.bjjCommunity)}
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Cost of Living</span>
              {renderRating(city.costOfLiving)}
            </div>
          </motion.div>

          <motion.div 
            className="mt-4 flex items-center justify-between"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center text-gray-600">
              <Users size={16} className="mr-1" />
              <span className="text-sm">{city.population} People</span>
            </div>
            <div className="flex items-center text-yellow-500">
              <Star size={16} className="mr-1" />
              <span className="text-sm">{city.rating.toFixed(1)}</span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </Link>
  );
};

export default CityCard;