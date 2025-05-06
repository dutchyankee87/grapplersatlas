import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { City } from '../../types';

interface CityMapProps {
  city: City;
}

const CityMap: React.FC<CityMapProps> = ({ city }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!mapRef.current) {
      return;
    }

    const initMap = async () => {
      try {
        const loader = new Loader({
          apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
          version: 'weekly',
          libraries: ['places']
        });

        const google = await loader.load();
        const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;

        const map = new Map(mapRef.current as HTMLElement, {
          center: { lat: city.coordinates.lat, lng: city.coordinates.lng },
          zoom: 12,
          styles: [
            {
              featureType: "poi",
              elementType: "labels",
              stylers: [{ visibility: "off" }]
            }
          ]
        });

        // Add city center marker
        new google.maps.Marker({
          position: { lat: city.coordinates.lat, lng: city.coordinates.lng },
          map,
          title: city.name,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 10,
            fillColor: '#DC2626',
            fillOpacity: 0.7,
            strokeWeight: 2,
            strokeColor: '#ffffff'
          }
        });

        setIsLoading(false);
      } catch (error) {
        console.error('Error loading Google Maps:', error);
        setError(`Failed to load the map: ${error instanceof Error ? error.message : 'Unknown error'}`);
        setIsLoading(false);
      }
    };

    initMap();
  }, [city]);

  if (error) {
    return (
      <div className="h-[400px] bg-gray-100 rounded-lg flex items-center justify-center">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="relative h-[400px] rounded-lg overflow-hidden">
      {isLoading && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-4 border-blue-900 border-t-transparent"></div>
        </div>
      )}
      <div ref={mapRef} className="w-full h-full" />
    </div>
  );
};

export default CityMap; 