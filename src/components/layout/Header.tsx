import React, { useState } from 'react';
import { Menu, X, MapPin, Users, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

type HeaderProps = {
  onJoinClick: () => void;
};

const Header: React.FC<HeaderProps> = ({ onJoinClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 bg-white bg-opacity-90 backdrop-blur-sm shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="relative flex items-center justify-center bg-red-600 text-white p-2 rounded-lg">
                <Award size={20} className="absolute" />
                <Users size={20} className="transform translate-x-1 translate-y-1" />
              </div>
              <span className="text-xl font-bold text-blue-900">Grapplers Atlas</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-900 font-medium">
              Home
            </Link>
            <Link to="/cities" className="text-gray-700 hover:text-blue-900 font-medium">
              Cities
            </Link>
            <Link to="/compare" className="text-gray-700 hover:text-blue-900 font-medium">
              Compare
            </Link>
            <Link to="/map" className="text-gray-700 hover:text-blue-900 font-medium">
              Map
            </Link>
            <button className="flex items-center bg-blue-900 hover:bg-blue-800 text-white px-4 py-2 rounded-md transition-colors duration-300" onClick={onJoinClick}>
              <MapPin size={16} className="mr-2" />
              Join Grapplers Atlas
            </button>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-900 focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg rounded-b-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-900 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/cities"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-900 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Cities
            </Link>
            <Link
              to="/compare"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-900 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Compare
            </Link>
            <Link
              to="/map"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-900 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Map
            </Link>
            <button 
              className="w-full flex items-center justify-center bg-blue-900 text-white px-3 py-2 rounded-md"
              onClick={() => {
                setIsMenuOpen(false);
                onJoinClick();
              }}
            >
              <MapPin size={16} className="mr-2" />
              Join Grapplers Atlas
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;