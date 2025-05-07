import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DollarSign, Clock, Star } from 'lucide-react';

interface GymFiltersProps {
  onFilterChange: (filters: GymFilterType) => void;
}

export interface GymFilterType {
  trainingStyles: {
    gi: boolean;
    noGi: boolean;
    mma: boolean;
    selfDefense: boolean;
  };
  priceRange: {
    min: number;
    max: number;
  };
  openMat: boolean;
  rating: number;
}

const GymFilters: React.FC<GymFiltersProps> = ({ onFilterChange }) => {
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

  const handleTrainingStyleChange = (style: keyof typeof filters.trainingStyles) => {
    const newFilters = {
      ...filters,
      trainingStyles: {
        ...filters.trainingStyles,
        [style]: !filters.trainingStyles[style]
      }
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handlePriceRangeChange = (type: 'min' | 'max', value: number) => {
    const newFilters = {
      ...filters,
      priceRange: {
        ...filters.priceRange,
        [type]: value
      }
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleOpenMatChange = () => {
    const newFilters = {
      ...filters,
      openMat: !filters.openMat
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleRatingChange = (rating: number) => {
    const newFilters = {
      ...filters,
      rating
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <motion.div 
      className="bg-white rounded-lg shadow-md p-4"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-lg font-semibold text-blue-900 mb-4">Filters</h3>
      
      {/* Training Styles */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Training Styles</h4>
        <div className="flex flex-col gap-2">
          {Object.entries(filters.trainingStyles).map(([style, isActive]) => (
            <motion.button
              key={style}
              className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors duration-200 ${
                isActive ? 'bg-blue-900 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => handleTrainingStyleChange(style as keyof typeof filters.trainingStyles)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              animate={{
                backgroundColor: isActive ? '#1e3a8a' : '#f3f4f6',
                color: isActive ? '#ffffff' : '#374151'
              }}
            >
              {style.charAt(0).toUpperCase() + style.slice(1).replace(/([A-Z])/g, ' $1')}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Price Range</h4>
        <div className="flex items-center gap-2">
          <motion.div 
            className="flex-1"
            whileHover={{ scale: 1.02 }}
          >
            <input
              type="number"
              value={filters.priceRange.min}
              onChange={(e) => handlePriceRangeChange('min', parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              placeholder="Min"
            />
          </motion.div>
          <span className="text-gray-500">-</span>
          <motion.div 
            className="flex-1"
            whileHover={{ scale: 1.02 }}
          >
            <input
              type="number"
              value={filters.priceRange.max}
              onChange={(e) => handlePriceRangeChange('max', parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              placeholder="Max"
            />
          </motion.div>
        </div>
      </div>

      {/* Open Mat */}
      <div className="mb-6">
        <motion.button
          className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors duration-200 ${
            filters.openMat ? 'bg-blue-900 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          onClick={handleOpenMatChange}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          animate={{
            backgroundColor: filters.openMat ? '#1e3a8a' : '#f3f4f6',
            color: filters.openMat ? '#ffffff' : '#374151'
          }}
        >
          <span>Open Mat Available</span>
          <Clock size={16} />
        </motion.button>
      </div>

      {/* Rating */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-2">Minimum Rating</h4>
        <div className="flex flex-col gap-2">
          {[0, 3, 3.5, 4, 4.5].map((rating) => (
            <motion.button
              key={rating}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors duration-200 ${
                filters.rating === rating ? 'bg-blue-900 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => handleRatingChange(rating)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              animate={{
                backgroundColor: filters.rating === rating ? '#1e3a8a' : '#f3f4f6',
                color: filters.rating === rating ? '#ffffff' : '#374151'
              }}
            >
              <span>{rating === 0 ? 'All Ratings' : `${rating}+ Stars`}</span>
              {rating > 0 && <Star size={16} />}
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default GymFilters; 