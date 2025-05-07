import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GymCard from './GymCard';
import { Gym } from '../../types';

interface GymListProps {
  gyms: Gym[];
}

const randomImages = [
  'https://images.pexels.com/photos/2261477/pexels-photo-2261477.jpeg',
  'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg',
  'https://images.pexels.com/photos/718786/pexels-photo-718786.jpeg',
  'https://images.pexels.com/photos/163403/bjj-mat-grappling-163403.jpeg',
  'https://images.pexels.com/photos/1432037/pexels-photo-1432037.jpeg',
  'https://images.pexels.com/photos/290416/pexels-photo-290416.jpeg',
  'https://images.pexels.com/photos/260447/pexels-photo-260447.jpeg',
  'https://images.pexels.com/photos/1432038/pexels-photo-1432038.jpeg',
];

function getRandomImage() {
  return randomImages[Math.floor(Math.random() * randomImages.length)];
}

const GymList: React.FC<GymListProps> = ({ gyms }) => {
  if (gyms.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-semibold text-gray-700">No gyms found</h3>
        <p className="text-gray-500 mt-2">Try adjusting your search criteria to see more results.</p>
      </div>
    );
  }

  // Assign random images to gyms without images
  const gymsWithImages = gyms.map(gym => ({
    ...gym,
    image: gym.image || getRandomImage()
  }));

  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      layout
    >
      <AnimatePresence mode="popLayout">
        {gymsWithImages.map((gym) => (
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