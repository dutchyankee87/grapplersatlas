import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Star, Globe, DollarSign, Users, Award, Clock, Dumbbell } from 'lucide-react';
import { Gym } from '../../types';

// Belt rating component that uses belt colors instead of standard stars
const BeltRating: React.FC<{ rating: number }> = ({ rating }) => {
  const fullBelts = Math.floor(rating);
  const emptyBelts = 5 - fullBelts;

  return (
    <div className="flex">
      {[...Array(fullBelts)].map((_, i) => (
        <div key={i} className="w-3 h-3 rounded-full bg-red-600 mr-1"></div>
      ))}
      {[...Array(emptyBelts)].map((_, i) => (
        <div key={i} className="w-3 h-3 rounded-full bg-gray-300 mr-1"></div>
      ))}
    </div>
  );
};

interface GymCardProps {
  gym: Gym;
}

const GymCard: React.FC<GymCardProps> = ({ gym }) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <motion.div 
      className="rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 bg-white h-full flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
    >
      <motion.div 
        className="relative h-48 overflow-hidden"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      >
        <img
          src={imageError ? 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&auto=format&fit=crop&q=80' : gym.image}
          alt={gym.name}
          className="w-full h-full object-cover"
          onError={handleImageError}
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
          <motion.h3 
            className="text-white text-xl font-bold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {gym.name}
          </motion.h3>
          <motion.div 
            className="flex items-center text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <MapPin size={14} className="mr-1" />
            <span className="text-sm">{gym.address}</span>
          </motion.div>
        </div>
      </motion.div>
      
      <motion.div 
        className="p-4 flex-grow"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{gym.description || 'No description available'}</p>
        
        <div className="space-y-3">
          {gym.rating && (
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Star size={16} className="text-blue-900 mr-2" />
                <span className="text-sm text-gray-700">Rating</span>
              </div>
              <BeltRating rating={gym.rating} />
            </div>
          )}
          
          {gym.monthlyFee && (
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <DollarSign size={16} className="text-blue-900 mr-2" />
                <span className="text-sm text-gray-700">Monthly Fee</span>
              </div>
              <span className="font-bold text-gray-900">${gym.monthlyFee}/mo</span>
            </div>
          )}
          
          {gym.dropInFee && (
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <DollarSign size={16} className="text-blue-900 mr-2" />
                <span className="text-sm text-gray-700">Drop-in Fee</span>
              </div>
              <span className="font-bold text-gray-900">${gym.dropInFee}</span>
            </div>
          )}

          {gym.trainingStyles && (
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Dumbbell size={16} className="text-blue-900 mr-2" />
                <span className="text-sm text-gray-700">Training Styles</span>
              </div>
              <div className="flex gap-1">
                {gym.trainingStyles.gi && (
                  <span className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-900">Gi</span>
                )}
                {gym.trainingStyles.noGi && (
                  <span className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-900">No-Gi</span>
                )}
                {gym.trainingStyles.mma && (
                  <span className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-900">MMA</span>
                )}
                {gym.trainingStyles.selfDefense && (
                  <span className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-900">Self-Defense</span>
                )}
              </div>
            </div>
          )}

          {gym.openMat && gym.openMat.available && (
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Clock size={16} className="text-blue-900 mr-2" />
                <span className="text-sm text-gray-700">Open Mat</span>
              </div>
              <span className="text-sm text-green-600 font-medium">Available</span>
            </div>
          )}
          
          {gym.website && (
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Globe size={16} className="text-blue-900 mr-2" />
                <span className="text-sm text-gray-700">Website</span>
              </div>
              <a 
                href={gym.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 text-sm"
              >
                Visit
              </a>
            </div>
          )}
        </div>
      </motion.div>
      
      <motion.div 
        className="px-4 pb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <motion.button 
          className="w-full bg-blue-900 hover:bg-blue-800 text-white rounded-md py-2 transition-colors duration-300"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          View Details
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default GymCard; 