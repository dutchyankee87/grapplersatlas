import React, { useState } from 'react';
import { Search, MapPin, DollarSign, Users, Star, Map, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cities } from '../data/cities';
import CityList from '../components/cities/CityList';
import FilterPanel from '../components/filters/FilterPanel';
import { FilterType } from '../types';

const HomePage = () => {
  const [filters, setFilters] = useState<FilterType>({});
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-blue-900 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://images.pexels.com/photos/9302141/pexels-photo-9302141.jpeg"
            alt="No-Gi Grappling"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Find Your Perfect Grappling City</h1>
            <p className="text-xl mb-8">
              Discover the best locations around the world for Brazilian Jiu-Jitsu training, competition, and community.
            </p>
            
            <div className="bg-white rounded-lg shadow-xl p-1 flex flex-col sm:flex-row">
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
              <button className="bg-red-600 hover:bg-red-700 text-white rounded-md px-6 py-3 w-full sm:w-auto transition-colors duration-300">
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* All Cities Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-blue-900 mb-4">
              Find Your Next Grappling Destination
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Whether you're looking to train with world champions in Rio, join the growing scene in Bali, 
              or find a BJJ-friendly city for remote work, we've got you covered.
            </p>
          </div>

          <div className="mb-16">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-blue-900">Explore Cities</h3>
              
              {/* Mobile Toggle for Filters */}
              <button
                className="md:hidden flex items-center text-gray-600 hover:text-blue-900"
                onClick={() => setShowMobileFilters(!showMobileFilters)}
              >
                <Filter size={20} className="mr-2" />
                Filters
              </button>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
              {/* Filters Sidebar */}
              <div className={`w-full md:w-80 flex-shrink-0 ${showMobileFilters ? 'block' : 'hidden md:block'}`}>
                <FilterPanel filters={filters} setFilters={setFilters} />
              </div>
              
              {/* City List */}
              <div className="flex-grow">
                <CityList cities={cities} filters={filters} />
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-blue-900">Why Grapplers Atlas?</h3>
              
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-red-600 text-white">
                    <MapPin size={24} />
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-gray-900">BJJ-Focused City Guides</h4>
                  <p className="mt-2 text-gray-600">
                    Detailed information about gym density, training styles, and belt-friendly cultures.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-red-600 text-white">
                    <DollarSign size={24} />
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-gray-900">Cost Insights</h4>
                  <p className="mt-2 text-gray-600">
                    Transparent information about training costs, living expenses, and value for money.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-red-600 text-white">
                    <Users size={24} />
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-gray-900">Community Connection</h4>
                  <p className="mt-2 text-gray-600">
                    Find cities with thriving BJJ communities and connect with fellow traveling grapplers.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-red-600 text-white">
                    <Map size={24} />
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-gray-900">City Comparison</h4>
                  <p className="mt-2 text-gray-600">
                    Compare BJJ scenes in different cities to find your perfect training destination.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="relative h-96 rounded-lg overflow-hidden shadow-xl">
              <img
                src="https://images.pexels.com/photos/9302118/pexels-photo-9302118.jpeg"
                alt="No-Gi Training"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

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
    </div>
  );
};

export default HomePage;