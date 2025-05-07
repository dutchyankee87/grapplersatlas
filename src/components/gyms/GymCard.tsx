import React from 'react';
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
  return (
    <motion.div
      className="bg-white rounded-lg shadow-md overflow-hidden"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      {gym.photos && gym.photos.length > 0 && (
        <div className="relative h-48">
          <img
            src={gym.photos[0]}
            alt={gym.name}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">{gym.name}</h3>
          <div className="flex items-center mt-1">
            <MapPin size={16} className="text-gray-500 mr-1" />
            <p className="text-sm text-gray-600">{gym.address}</p>
          </div>
        </div>

        {gym.description && (
          <p className="text-gray-600 text-sm">{gym.description}</p>
        )}

        <div className="space-y-3">
          {gym.rating && (
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Star size={16} className="text-yellow-400 mr-2" />
                <span className="text-sm text-gray-700">Rating</span>
              </div>
              <div className="flex items-center">
                <span className="text-sm font-medium text-gray-900">{gym.rating}</span>
                {gym.review_count > 0 && (
                  <span className="text-sm text-gray-500 ml-1">({gym.review_count} reviews)</span>
                )}
              </div>
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
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Visit
              </a>
            </div>
          )}

          {gym.monthly_fee && (
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <DollarSign size={16} className="text-green-600 mr-2" />
                <span className="text-sm text-gray-700">Monthly Fee</span>
              </div>
              <span className="text-sm text-gray-900">${gym.monthly_fee}</span>
            </div>
          )}

          {gym.drop_in_fee && (
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <DollarSign size={16} className="text-green-600 mr-2" />
                <span className="text-sm text-gray-700">Drop-in Fee</span>
              </div>
              <span className="text-sm text-gray-900">${gym.drop_in_fee}</span>
            </div>
          )}

          {gym.training_styles && (
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Dumbbell size={16} className="text-blue-900 mr-2" />
                <span className="text-sm text-gray-700">Training Styles</span>
              </div>
              <div className="flex gap-1">
                {gym.training_styles.gi && (
                  <span className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-900">Gi</span>
                )}
                {gym.training_styles.noGi && (
                  <span className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-900">No-Gi</span>
                )}
                {gym.training_styles.mma && (
                  <span className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-900">MMA</span>
                )}
                {gym.training_styles.selfDefense && (
                  <span className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-900">Self-Defense</span>
                )}
              </div>
            </div>
          )}

          {gym.opening_hours && (
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Clock size={16} className="text-blue-900 mr-2" />
                <span className="text-sm text-gray-700">Hours</span>
              </div>
              <span className="text-sm text-gray-900">View Schedule</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default GymCard; 