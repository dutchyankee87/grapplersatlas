import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Users, Award } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="relative flex items-center justify-center bg-red-600 text-white p-2 rounded-lg">
                <Award size={20} className="absolute" />
                <Users size={20} className="transform translate-x-1 translate-y-1" />
              </div>
              <span className="text-xl font-bold">Grapplers Atlas</span>
            </Link>
            <p className="text-gray-300 mb-4">
              The global community for Brazilian Jiu-Jitsu practitioners. Find the best training spots,
              connect with fellow grapplers, and explore the world through BJJ.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/cities" className="text-gray-300 hover:text-white transition-colors">
                  Cities
                </Link>
              </li>
              <li>
                <Link to="/compare" className="text-gray-300 hover:text-white transition-colors">
                  Compare
                </Link>
              </li>
              <li>
                <Link to="/map" className="text-gray-300 hover:text-white transition-colors">
                  Map
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-300">
                <MapPin size={16} className="mr-2" />
                <span>Global Community</span>
              </li>
              <li className="flex items-center text-gray-300">
                <Users size={16} className="mr-2" />
                <span>Join Our Community</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-blue-800 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; {new Date().getFullYear()} Grapplers Atlas. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;