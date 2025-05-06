import React from 'react';
import { Link } from 'react-router-dom';
import { City } from '../../types';
import { MapPin, DollarSign, Briefcase, Trophy, Users } from 'lucide-react';

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

interface CityCardProps {
  city: City;
}

const CityCard: React.FC<CityCardProps> = ({ city }) => {
  // Normalize ratings to a 1-5 scale for belt ratings
  const gymRating = Math.ceil(city.gymDensity / 2);
  const instructorRating = Math.ceil(city.instructorQuality / 2);
  const comunityRating = Math.ceil(city.bjjCommunity / 2);

  return (
    <Link to={`/city/${city.id}`} className="group">
      <div className="rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 bg-white h-full flex flex-col">
        <div className="relative h-48 overflow-hidden">
          <img
            src={city.image}
            alt={city.name}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
          />
          {city.featured && (
            <div className="absolute top-4 right-4 bg-red-600 text-white px-2 py-1 text-xs font-bold rounded">
              Featured
            </div>
          )}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
            <h3 className="text-white text-xl font-bold">{city.name}</h3>
            <div className="flex items-center text-white">
              <MapPin size={14} className="mr-1" />
              <span className="text-sm">{city.country}</span>
            </div>
          </div>
        </div>
        
        <div className="p-4 flex-grow">
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{city.description}</p>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Trophy size={16} className="text-blue-900 mr-2" />
                <span className="text-sm text-gray-700">Gyms</span>
              </div>
              <BeltRating rating={gymRating} />
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Users size={16} className="text-blue-900 mr-2" />
                <span className="text-sm text-gray-700">Instructors</span>
              </div>
              <BeltRating rating={instructorRating} />
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Users size={16} className="text-blue-900 mr-2" />
                <span className="text-sm text-gray-700">Community</span>
              </div>
              <BeltRating rating={comunityRating} />
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <DollarSign size={16} className="text-blue-900 mr-2" />
                <span className="text-sm text-gray-700">Monthly Cost</span>
              </div>
              <span className="font-bold text-gray-900">${city.monthlyCost}/mo</span>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Briefcase size={16} className="text-blue-900 mr-2" />
                <span className="text-sm text-gray-700">Remote Work</span>
              </div>
              <span className={`text-sm font-medium ${city.remoteWorkFriendly ? 'text-green-600' : 'text-red-600'}`}>
                {city.remoteWorkFriendly ? 'Friendly' : 'Limited'}
              </span>
            </div>
          </div>
        </div>
        
        <div className="px-4 pb-4">
          <button className="w-full bg-blue-900 hover:bg-blue-800 text-white rounded-md py-2 transition-colors duration-300">
            View Details
          </button>
        </div>
      </div>
    </Link>
  );
};

export default CityCard;