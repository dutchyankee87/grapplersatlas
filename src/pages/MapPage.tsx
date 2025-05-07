import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { Loader } from '@googlemaps/js-api-loader';
import { City } from '../types';

const MapPage = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [selectedRegion, setSelectedRegion] = useState<string>('All Regions');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cities, setCities] = useState<City[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch('/api/cities');
        if (!response.ok) {
          throw new Error(`Failed to fetch cities: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        setCities(data);
      } catch (err) {
        console.error('Error fetching cities:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch cities');
      }
    };

    fetchCities();
  }, []);

  useEffect(() => {
    // Ensure the map container exists
    if (!mapRef.current) {
      setError('Map container not found');
      setIsLoading(false);
      return;
    }

    const initMap = async () => {
      console.log('API Key:', import.meta.env.VITE_GOOGLE_MAPS_API_KEY);
      const loader = new Loader({
        apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        version: 'weekly',
      });

      try {
        await loader.load();
        const googleMaps = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
        const Map = googleMaps.Map;

        // Create map
        const map = new Map(mapRef.current as HTMLElement, {
          center: { lat: 0, lng: 0 }, // Default center
          zoom: 2,
          minZoom: 2,
          styles: [
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [{ color: '#e9e9e9' }, { lightness: 17 }]
            },
            {
              featureType: 'landscape',
              elementType: 'geometry',
              stylers: [{ color: '#f5f5f5' }, { lightness: 20 }]
            },
            {
              featureType: 'road',
              elementType: 'geometry',
              stylers: [{ visibility: 'off' }]
            },
            {
              featureType: 'poi',
              elementType: 'geometry',
              stylers: [{ visibility: 'off' }]
            },
            {
              featureType: 'transit',
              elementType: 'geometry',
              stylers: [{ visibility: 'off' }]
            },
            {
              featureType: 'administrative',
              elementType: 'geometry.stroke',
              stylers: [{ color: '#fefefe' }, { lightness: 17 }, { weight: 1.2 }]
            }
          ],
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false
        });

        // Calculate bounds after map is initialized
        const bounds = new google.maps.LatLngBounds();
        cities.forEach(city => {
          if (city.coordinates) {
            const [lng, lat] = city.coordinates.replace(/[()]/g, '').split(',').map(Number);
            bounds.extend({ lat, lng });
          }
        });

        // Add markers
        cities.forEach(city => {
          if (city.coordinates) {
            const [lng, lat] = city.coordinates.replace(/[()]/g, '').split(',').map(Number);
            const marker = new google.maps.Marker({
              position: { lat, lng },
              map,
              title: city.name,
              icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 8 + (city.gym_count / 20), // Scale based on gym count
                fillColor: '#DC2626',
                fillOpacity: 0.7,
                strokeWeight: 1,
                strokeColor: '#ffffff'
              }
            });

            const contentString = `
              <div class="p-4 min-w-[200px]">
                <div class="font-semibold text-lg text-blue-900">${city.name}</div>
                <div class="text-gray-600">${city.country}</div>
                <div class="mt-2">
                  <div class="text-sm">
                    <span class="font-medium">Gyms:</span> 
                    <span class="text-red-600">${city.gym_count}</span>
                  </div>
                  <div class="text-sm">
                    <span class="font-medium">Rating:</span> 
                    <span>${city.rating || '0'}</span>
                  </div>
                </div>
                <button 
                  class="mt-3 bg-blue-900 text-white px-4 py-1 rounded text-sm hover:bg-blue-800 transition-colors w-full"
                  onclick="window.location.href='/city/${city.id}'"
                >
                  View Details
                </button>
              </div>
            `;

            const infoWindow = new google.maps.InfoWindow({
              content: contentString,
              maxWidth: 300
            });

            marker.addListener('click', () => {
              navigate(`/city/${city.id}`);
            });

            marker.addListener('mouseover', () => {
              infoWindow.open(map, marker);
            });

            marker.addListener('mouseout', () => {
              infoWindow.close();
            });
          }
        });

        // Fit map to bounds
        map.fitBounds(bounds);
        setIsLoading(false);

      } catch (error) {
        console.error('Error loading Google Maps:', error);
        setError(`Failed to load the map: ${error instanceof Error ? error.message : 'Unknown error'}`);
        setIsLoading(false);
      }
    };

    if (cities.length > 0) {
      initMap();
    }
  }, [navigate, cities]);

  const handleRegionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRegion(event.target.value);
    // TODO: Filter markers based on selected region
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-blue-900 mb-2">BJJ Hotspots Map</h1>
          <p className="text-gray-600">
            Explore BJJ cities around the world and discover training hotspots.
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="relative w-full h-[600px] rounded-lg overflow-hidden">
            {isLoading && (
              <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-900 border-t-transparent"></div>
              </div>
            )}
            {error && (
              <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                <div className="text-red-600">{error}</div>
              </div>
            )}
            <div ref={mapRef} className="w-full h-full" />
          </div>
          
          <div className="mt-6 flex justify-between">
            <div className="flex items-center">
              <div className="mr-8">
                <div className="text-sm font-medium text-gray-700 mb-1">Gym Density Scale</div>
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-red-600 opacity-30 mr-2"></div>
                  <span className="text-xs text-gray-600">Low</span>
                  <div className="mx-2 h-1 w-6 bg-gradient-to-r from-red-300 to-red-600"></div>
                  <div className="w-6 h-6 rounded-full bg-red-600 opacity-70 mr-2"></div>
                  <span className="text-xs text-gray-600">High</span>
                </div>
              </div>
              
              <div>
                <div className="text-sm font-medium text-gray-700 mb-1">Region Filter</div>
                <select 
                  className="text-sm border-gray-300 rounded-md"
                  value={selectedRegion}
                  onChange={handleRegionChange}
                >
                  <option>All Regions</option>
                  <option>Asia</option>
                  <option>Europe</option>
                  <option>North America</option>
                  <option>South America</option>
                </select>
              </div>
            </div>
            
            <div>
              <Link 
                to="/cities"
                className="bg-blue-900 hover:bg-blue-800 text-white px-4 py-2 rounded-md transition-colors duration-300"
              >
                List View
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapPage;