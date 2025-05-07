import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GymCard from './GymCard';
import { Gym } from '../../types';
import { getGyms } from '../../api/gyms';

interface GymListProps {
  cityId?: string;
}

const GymList: React.FC<GymListProps> = ({ cityId }) => {
  const [gyms, setGyms] = useState<Gym[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadGyms() {
      try {
        setLoading(true);
        const data = await getGyms(cityId);
        setGyms(data);
        setError(null);
      } catch (err) {
        setError('Failed to load gyms');
        console.error('Error loading gyms:', err);
      } finally {
        setLoading(false);
      }
    }

    loadGyms();
  }, [cityId]);

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading gyms...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-semibold text-red-600">Error</h3>
        <p className="text-gray-600 mt-2">{error}</p>
      </div>
    );
  }

  if (gyms.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-semibold text-gray-700">No gyms found</h3>
        <p className="text-gray-500 mt-2">Try adjusting your search criteria to see more results.</p>
      </div>
    );
  }

  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      layout
    >
      <AnimatePresence mode="popLayout">
        {gyms.map((gym) => (
          <motion.div
            key={gym.id}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{
              opacity: { duration: 0.2 },
              layout: { duration: 0.3 }
            }}
          >
            <GymCard gym={gym} />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default GymList; 