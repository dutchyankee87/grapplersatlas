import { City } from '../../types';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CityCardProps {
  city: City;
}

const CityCard = ({ city }: CityCardProps) => {
  return (
    <Link to={`/city/${city.id}`}>
      <motion.div
        className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
        whileHover={{ y: -5 }}
      >
        <div className="relative h-48">
          <img
            src={city.image || '/placeholder-city.jpg'}
            alt={city.name}
            className="w-full h-full object-cover"
          />
          {city.featured && (
            <div className="absolute top-2 right-2 bg-yellow-400 text-black px-2 py-1 rounded-full text-sm font-semibold">
              Featured
            </div>
          )}
        </div>
        
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-semibold text-gray-800">{city.name}</h3>
            <div className="flex items-center">
              <Star className="h-5 w-5 text-yellow-400" />
              <span className="ml-1 text-gray-600">{city.rating || 'N/A'}</span>
            </div>
          </div>
          
          <p className="text-gray-600 mb-4">{city.country}</p>
          
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex items-center text-gray-600">
              <span className="font-medium">Gyms:</span>
              <span className="ml-1">{city.gym_count}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <span className="font-medium">Monthly Cost:</span>
              <span className="ml-1">${city.monthly_cost || 'N/A'}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <span className="font-medium">WiFi Speed:</span>
              <span className="ml-1">{city.wifi_speed ? `${city.wifi_speed} Mbps` : 'N/A'}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <span className="font-medium">Coworking:</span>
              <span className="ml-1">{city.coworking_spaces ? 'Yes' : 'No'}</span>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {city.training_styles?.gi && (
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">GI</span>
            )}
            {city.training_styles?.noGi && (
              <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs">No-GI</span>
            )}
            {city.training_styles?.mma && (
              <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs">MMA</span>
            )}
            {city.training_styles?.selfDefense && (
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Self Defense</span>
            )}
            {city.english_friendly && (
              <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">English Friendly</span>
            )}
            {city.remote_work_friendly && (
              <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full text-xs">Remote Work</span>
            )}
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default CityCard; 