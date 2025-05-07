import React, { useState } from 'react';
import { Search, MapPin, DollarSign, Users, Star, Map, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { cities } from '../data/cities';
import CityList from '../components/cities/CityList';
import FilterPanel from '../components/filters/FilterPanel';
import { FilterType } from '../types';

const HomePage = () => {
  const [filters, setFilters] = useState<FilterType>({});
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Section */}
      <motion.section 
        className="relative bg-blue-900 text-white"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="absolute inset-0 overflow-hidden">
          <motion.img
            src="https://images.pexels.com/photos/9302141/pexels-photo-9302141.jpeg"
            alt="No-Gi Grappling"
            className="w-full h-full object-cover opacity-20"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <motion.div 
            className="max-w-3xl"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-4"
              variants={itemVariants}
            >
              Find Your Perfect Grappling City
            </motion.h1>
            <motion.p 
              className="text-xl mb-8"
              variants={itemVariants}
            >
              Discover the best locations around the world for Brazilian Jiu-Jitsu training, competition, and community.
            </motion.p>
            
            <motion.div 
              className="bg-white rounded-lg shadow-xl p-1 flex flex-col sm:flex-row"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex-grow p-2">
                <div className="flex items-center">
                  <Search size={20} className="text-gray-400 mr-2" />
                  <input
                    type="text"
                    placeholder="Search for cities, countries, or gyms"
                    className="w-full border-none focus:ring-0 text-gray-800"
                  />
                </div>
              </div>
              <motion.button 
                className="bg-red-600 hover:bg-red-700 text-white rounded-md px-6 py-3 w-full sm:w-auto transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Search
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* All Cities Section */}
      <motion.section 
        className="py-12 bg-gray-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h2 
              className="text-3xl font-bold text-blue-900 mb-4"
              variants={itemVariants}
            >
              Find Your Next Grappling Destination
            </motion.h2>
            <motion.p 
              className="text-gray-600 max-w-3xl mx-auto"
              variants={itemVariants}
            >
              Whether you're looking to train with world champions in Rio, join the growing scene in Bali, 
              or find a BJJ-friendly city for remote work, we've got you covered.
            </motion.p>
          </motion.div>

          <motion.div 
            className="mb-16"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div 
              className="flex justify-between items-center mb-6"
              variants={itemVariants}
            >
              <h3 className="text-2xl font-bold text-blue-900">Explore Cities</h3>
              
              {/* Mobile Toggle for Filters */}
              <motion.button
                className="md:hidden flex items-center text-gray-600 hover:text-blue-900"
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Filter size={20} className="mr-2" />
                Filters
              </motion.button>
            </motion.div>

            <div className="flex flex-col md:flex-row gap-6">
              {/* Filters Sidebar */}
              <AnimatePresence>
                <motion.div 
                  className={`w-full md:w-80 flex-shrink-0 ${showMobileFilters ? 'block' : 'hidden md:block'}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <FilterPanel filters={filters} setFilters={setFilters} />
                </motion.div>
              </AnimatePresence>
              
              {/* City List */}
              <motion.div 
                className="flex-grow"
                variants={itemVariants}
              >
                <CityList cities={cities} filters={filters} />
              </motion.div>
            </div>
          </motion.div>

          {/* Features Section */}
          <motion.div 
            className="grid md:grid-cols-2 gap-12 items-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div 
              className="space-y-6"
              variants={itemVariants}
            >
              <h3 className="text-2xl font-bold text-blue-900">Why Grapplers Atlas?</h3>
              
              <motion.div 
                className="flex"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex-shrink-0">
                  <motion.div 
                    className="flex items-center justify-center h-12 w-12 rounded-md bg-red-600 text-white"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <MapPin size={24} />
                  </motion.div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-gray-900">BJJ-Focused City Guides</h4>
                  <p className="mt-2 text-gray-600">
                    Detailed information about gym density, training styles, and belt-friendly cultures.
                  </p>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex-shrink-0">
                  <motion.div 
                    className="flex items-center justify-center h-12 w-12 rounded-md bg-red-600 text-white"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <DollarSign size={24} />
                  </motion.div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-gray-900">Cost Insights</h4>
                  <p className="mt-2 text-gray-600">
                    Transparent information about training costs, living expenses, and value for money.
                  </p>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex-shrink-0">
                  <motion.div 
                    className="flex items-center justify-center h-12 w-12 rounded-md bg-red-600 text-white"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Users size={24} />
                  </motion.div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-gray-900">Community Connection</h4>
                  <p className="mt-2 text-gray-600">
                    Find cities with thriving BJJ communities and connect with fellow traveling grapplers.
                  </p>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex-shrink-0">
                  <motion.div 
                    className="flex items-center justify-center h-12 w-12 rounded-md bg-red-600 text-white"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Map size={24} />
                  </motion.div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-gray-900">City Comparison</h4>
                  <p className="mt-2 text-gray-600">
                    Compare BJJ scenes in different cities to find your perfect training destination.
                  </p>
                </div>
              </motion.div>
            </motion.div>
            
            <div className="relative h-96 rounded-lg overflow-hidden shadow-xl">
              <img
                src="https://images.pexels.com/photos/9302141/pexels-photo-9302141.jpeg"
                alt="No-Gi Training"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Call to Action */}
      <section className="bg-blue-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Find Your Perfect Grappling Destination?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join the community of BJJ travelers discovering the best training spots around the world.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link 
              to="/cities" 
              className="bg-red-600 hover:bg-red-700 text-white rounded-md px-8 py-3 font-medium transition-colors duration-300"
            >
              Explore Cities
            </Link>
            <Link 
              to="/map" 
              className="bg-white text-blue-900 hover:bg-gray-100 rounded-md px-8 py-3 font-medium transition-colors duration-300"
            >
              View Map
            </Link>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default HomePage;