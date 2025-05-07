import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Users, Award, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const featuredCities = [
    {
      id: 1,
      name: 'Rio de Janeiro',
      country: 'Brazil',
      image: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325',
      rating: 4.8,
      gymCount: 120,
    },
    {
      id: 2,
      name: 'San Diego',
      country: 'USA',
      image: 'https://images.unsplash.com/photo-1585421514283-4f8e9d7a3c8c',
      rating: 4.7,
      gymCount: 85,
    },
    {
      id: 3,
      name: 'Tokyo',
      country: 'Japan',
      image: 'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc',
      rating: 4.6,
      gymCount: 95,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] bg-blue-900">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b"
            alt="BJJ Training"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Find Your Perfect BJJ Training Spot
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Discover the best Brazilian Jiu-Jitsu academies and training partners around the world.
            </p>
            <div className="max-w-xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search cities..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 pl-12 rounded-lg bg-white/10 text-white placeholder-gray-300 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-300" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Cities Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Cities</h2>
            <p className="text-lg text-gray-600">
              Explore the most popular BJJ destinations around the world
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredCities.map((city) => (
              <motion.div
                key={city.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <div className="relative h-48">
                  <img
                    src={city.image}
                    alt={city.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold">{city.name}</h3>
                    <p className="text-sm">{city.country}</p>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <Star className="text-yellow-400 mr-1" />
                      <span className="text-gray-700">{city.rating}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Users className="mr-1" />
                      <span>{city.gymCount} gyms</span>
                    </div>
                  </div>
                  <Link
                    to={`/cities/${city.id}`}
                    className="block w-full text-center bg-blue-900 text-white py-2 rounded-md hover:bg-blue-800 transition-colors"
                  >
                    Explore City
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center"
            >
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="text-blue-900" size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Find Training Spots</h3>
              <p className="text-gray-600">
                Discover BJJ academies and training partners in cities around the world
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-center"
            >
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-blue-900" size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Join the Community</h3>
              <p className="text-gray-600">
                Connect with fellow grapplers and share your BJJ journey
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="text-center"
            >
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="text-blue-900" size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Track Progress</h3>
              <p className="text-gray-600">
                Monitor your training and achievements across different academies
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;