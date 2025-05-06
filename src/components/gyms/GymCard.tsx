import React from 'react';
import { MapPin, Star, Globe } from 'lucide-react';
import { Gym } from '../../types/gym';

interface GymCardProps {
  gym: Gym;
  onClick: () => void;
}

const GymCard: React.FC<GymCardProps> = ({ gym, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
    >
      <div className="p-6">
        <h3 className="text-xl font-bold text-blue-900 mb-2">{gym.name || 'Unnamed Gym'}</h3>
        
        <div className="space-y-3">
          <div className="flex items-center text-gray-600">
            <MapPin size={16} className="mr-2" />
            <span className="text-sm">{gym.address || 'Address not available'}</span>
          </div>

          {gym.rating > 0 && (
            <div className="flex items-center">
              <Star size={16} className="text-yellow-400 mr-2" />
              <span className="font-medium">{gym.rating}</span>
              <span className="text-gray-500 text-sm ml-1">/ 5</span>
            </div>
          )}

          {gym.website && (
            <a 
              href={gym.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm"
              onClick={(e) => e.stopPropagation()}
            >
              <Globe size={14} className="mr-1" />
              Visit Website
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default GymCard; 