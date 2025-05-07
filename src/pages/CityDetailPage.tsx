import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { City } from '../types';
import { cities } from '../data/cities';
import GymList from '../components/gyms/GymList';
import GymFilters, { GymFilterType } from '../components/gyms/GymFilters';
import { 
  MapPin, 
  DollarSign, 
  Globe, 
  Shield, 
  Sun, 
  Heart, 
  Users, 
  Briefcase, 
  Wifi, 
  Award, 
  Calendar,
  Clock
} from 'lucide-react';

// Add mock gym data
const mockGyms = [
  {
    id: '1',
    name: 'Gracie Barra',
    address: '123 Main St',
    description: 'World-renowned BJJ academy with a focus on self-defense and competition. Home to multiple world champions and a welcoming environment for all levels.',
    rating: 4.8,
    monthlyFee: 150,
    dropInFee: 30,
    website: 'https://graciebarra.com',
    image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&auto=format&fit=crop&q=80',
    coordinates: { lat: 0, lng: 0 },
    type: 'bjj' as const,
    classSchedule: {
      'Monday': ['6:00 AM - 7:30 AM', '12:00 PM - 1:30 PM', '6:00 PM - 7:30 PM'],
      'Tuesday': ['6:00 AM - 7:30 AM', '12:00 PM - 1:30 PM', '6:00 PM - 7:30 PM'],
      'Wednesday': ['6:00 AM - 7:30 AM', '12:00 PM - 1:30 PM', '6:00 PM - 7:30 PM'],
      'Thursday': ['6:00 AM - 7:30 AM', '12:00 PM - 1:30 PM', '6:00 PM - 7:30 PM'],
      'Friday': ['6:00 AM - 7:30 AM', '12:00 PM - 1:30 PM', '6:00 PM - 7:30 PM'],
      'Saturday': ['10:00 AM - 12:00 PM'],
      'Sunday': ['10:00 AM - 12:00 PM']
    },
    trainingStyles: {
      gi: true,
      noGi: true,
      mma: false,
      selfDefense: true
    },
    openMat: {
      available: true,
      schedule: {
        'Saturday': '10:00 AM - 12:00 PM',
        'Sunday': '10:00 AM - 12:00 PM'
      }
    }
  },
  {
    id: '2',
    name: 'Alliance BJJ',
    address: '456 Oak Ave',
    description: 'Competition-focused academy with world-class instructors. Known for producing champions and offering intensive training programs.',
    rating: 4.7,
    monthlyFee: 140,
    dropInFee: 25,
    website: 'https://alliancebjj.com',
    image: 'https://images.unsplash.com/photo-1599058917765-a780eda07a3e?w=800&auto=format&fit=crop&q=80',
    coordinates: { lat: 0, lng: 0 },
    type: 'bjj' as const,
    classSchedule: {
      'Monday': ['7:00 AM - 8:30 AM', '11:00 AM - 12:30 PM', '5:00 PM - 6:30 PM', '7:00 PM - 8:30 PM'],
      'Tuesday': ['7:00 AM - 8:30 AM', '11:00 AM - 12:30 PM', '5:00 PM - 6:30 PM', '7:00 PM - 8:30 PM'],
      'Wednesday': ['7:00 AM - 8:30 AM', '11:00 AM - 12:30 PM', '5:00 PM - 6:30 PM', '7:00 PM - 8:30 PM'],
      'Thursday': ['7:00 AM - 8:30 AM', '11:00 AM - 12:30 PM', '5:00 PM - 6:30 PM', '7:00 PM - 8:30 PM'],
      'Friday': ['7:00 AM - 8:30 AM', '11:00 AM - 12:30 PM', '5:00 PM - 6:30 PM'],
      'Saturday': ['9:00 AM - 11:00 AM'],
      'Sunday': ['9:00 AM - 11:00 AM']
    },
    trainingStyles: {
      gi: true,
      noGi: true,
      mma: false,
      selfDefense: false
    },
    openMat: {
      available: true,
      schedule: {
        'Saturday': '9:00 AM - 11:00 AM',
        'Sunday': '9:00 AM - 11:00 AM'
      }
    }
  },
  {
    id: '3',
    name: 'Checkmat BJJ',
    address: '789 Pine Rd',
    description: 'Modern facility with a strong emphasis on technique and fundamentals. Great for beginners and advanced practitioners alike.',
    rating: 4.6,
    monthlyFee: 130,
    dropInFee: 20,
    website: 'https://checkmat.com',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&auto=format&fit=crop&q=80',
    coordinates: { lat: 0, lng: 0 },
    type: 'bjj' as const,
    classSchedule: {
      'Monday': ['6:30 AM - 8:00 AM', '12:00 PM - 1:30 PM', '5:30 PM - 7:00 PM', '7:30 PM - 9:00 PM'],
      'Tuesday': ['6:30 AM - 8:00 AM', '12:00 PM - 1:30 PM', '5:30 PM - 7:00 PM', '7:30 PM - 9:00 PM'],
      'Wednesday': ['6:30 AM - 8:00 AM', '12:00 PM - 1:30 PM', '5:30 PM - 7:00 PM', '7:30 PM - 9:00 PM'],
      'Thursday': ['6:30 AM - 8:00 AM', '12:00 PM - 1:30 PM', '5:30 PM - 7:00 PM', '7:30 PM - 9:00 PM'],
      'Friday': ['6:30 AM - 8:00 AM', '12:00 PM - 1:30 PM', '5:30 PM - 7:00 PM'],
      'Saturday': ['10:30 AM - 12:30 PM'],
      'Sunday': ['10:30 AM - 12:30 PM']
    },
    trainingStyles: {
      gi: true,
      noGi: true,
      mma: false,
      selfDefense: true
    },
    openMat: {
      available: true,
      schedule: {
        'Saturday': '10:30 AM - 12:30 PM',
        'Sunday': '10:30 AM - 12:30 PM'
      }
    }
  },
  {
    id: '4',
    name: 'Art of Jiu Jitsu',
    address: '321 Cedar Ln',
    description: 'Beautiful academy with a focus on the art and philosophy of BJJ. Perfect for those seeking a holistic approach to training.',
    rating: 4.9,
    monthlyFee: 160,
    dropInFee: 35,
    website: 'https://artofjiujitsu.com',
    image: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=800&auto=format&fit=crop&q=80',
    coordinates: { lat: 0, lng: 0 },
    type: 'bjj' as const,
    classSchedule: {
      'Monday': ['7:00 AM - 8:30 AM', '12:00 PM - 1:30 PM', '5:00 PM - 6:30 PM', '7:00 PM - 8:30 PM'],
      'Tuesday': ['7:00 AM - 8:30 AM', '12:00 PM - 1:30 PM', '5:00 PM - 6:30 PM', '7:00 PM - 8:30 PM'],
      'Wednesday': ['7:00 AM - 8:30 AM', '12:00 PM - 1:30 PM', '5:00 PM - 6:30 PM', '7:00 PM - 8:30 PM'],
      'Thursday': ['7:00 AM - 8:30 AM', '12:00 PM - 1:30 PM', '5:00 PM - 6:30 PM', '7:00 PM - 8:30 PM'],
      'Friday': ['7:00 AM - 8:30 AM', '12:00 PM - 1:30 PM', '5:00 PM - 6:30 PM'],
      'Saturday': ['9:00 AM - 11:00 AM'],
      'Sunday': ['9:00 AM - 11:00 AM']
    },
    trainingStyles: {
      gi: true,
      noGi: true,
      mma: false,
      selfDefense: true
    },
    openMat: {
      available: true,
      schedule: {
        'Saturday': '9:00 AM - 11:00 AM',
        'Sunday': '9:00 AM - 11:00 AM'
      }
    }
  },
  {
    id: '5',
    name: 'Marcelo Garcia Academy',
    address: '555 BJJ Way',
    description: 'Legendary academy founded by Marcelo Garcia. Known for its innovative techniques and world-class instruction.',
    rating: 4.9,
    monthlyFee: 170,
    dropInFee: 40,
    website: 'https://marcelogarciajj.com',
    image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&auto=format&fit=crop&q=80',
    coordinates: { lat: 0, lng: 0 },
    type: 'bjj' as const,
    classSchedule: {
      'Monday': ['7:00 AM - 8:30 AM', '12:00 PM - 1:30 PM', '5:00 PM - 6:30 PM', '7:00 PM - 8:30 PM'],
      'Tuesday': ['7:00 AM - 8:30 AM', '12:00 PM - 1:30 PM', '5:00 PM - 6:30 PM', '7:00 PM - 8:30 PM'],
      'Wednesday': ['7:00 AM - 8:30 AM', '12:00 PM - 1:30 PM', '5:00 PM - 6:30 PM', '7:00 PM - 8:30 PM'],
      'Thursday': ['7:00 AM - 8:30 AM', '12:00 PM - 1:30 PM', '5:00 PM - 6:30 PM', '7:00 PM - 8:30 PM'],
      'Friday': ['7:00 AM - 8:30 AM', '12:00 PM - 1:30 PM', '5:00 PM - 6:30 PM'],
      'Saturday': ['9:00 AM - 11:00 AM'],
      'Sunday': ['9:00 AM - 11:00 AM']
    },
    trainingStyles: {
      gi: true,
      noGi: true,
      mma: false,
      selfDefense: false
    },
    openMat: {
      available: true,
      schedule: {
        'Saturday': '9:00 AM - 11:00 AM',
        'Sunday': '9:00 AM - 11:00 AM'
      }
    }
  },
  {
    id: '6',
    name: 'Unity Jiu-Jitsu',
    address: '777 Unity St',
    description: 'Competition powerhouse with a strong team atmosphere. Known for producing world champions and elite competitors.',
    rating: 4.8,
    monthlyFee: 155,
    dropInFee: 35,
    website: 'https://unityjiujitsu.com',
    image: 'https://images.unsplash.com/photo-1599058917765-a780eda07a3e?w=800&auto=format&fit=crop&q=80',
    coordinates: { lat: 0, lng: 0 },
    type: 'bjj' as const,
    classSchedule: {
      'Monday': ['6:00 AM - 7:30 AM', '12:00 PM - 1:30 PM', '6:00 PM - 7:30 PM'],
      'Tuesday': ['6:00 AM - 7:30 AM', '12:00 PM - 1:30 PM', '6:00 PM - 7:30 PM'],
      'Wednesday': ['6:00 AM - 7:30 AM', '12:00 PM - 1:30 PM', '6:00 PM - 7:30 PM'],
      'Thursday': ['6:00 AM - 7:30 AM', '12:00 PM - 1:30 PM', '6:00 PM - 7:30 PM'],
      'Friday': ['6:00 AM - 7:30 AM', '12:00 PM - 1:30 PM', '6:00 PM - 7:30 PM'],
      'Saturday': ['10:00 AM - 12:00 PM'],
      'Sunday': ['10:00 AM - 12:00 PM']
    },
    trainingStyles: {
      gi: true,
      noGi: true,
      mma: false,
      selfDefense: false
    },
    openMat: {
      available: true,
      schedule: {
        'Saturday': '10:00 AM - 12:00 PM',
        'Sunday': '10:00 AM - 12:00 PM'
      }
    }
  },
  {
    id: '7',
    name: 'Atos Jiu-Jitsu',
    address: '888 Atos Ave',
    description: 'World-class training facility with a focus on competition and technical excellence. Home to multiple world champions.',
    rating: 4.7,
    monthlyFee: 145,
    dropInFee: 30,
    website: 'https://atosjiujitsu.com',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&auto=format&fit=crop&q=80',
    coordinates: { lat: 0, lng: 0 },
    type: 'bjj' as const,
    classSchedule: {
      'Monday': ['7:00 AM - 8:30 AM', '11:00 AM - 12:30 PM', '5:00 PM - 6:30 PM', '7:00 PM - 8:30 PM'],
      'Tuesday': ['7:00 AM - 8:30 AM', '11:00 AM - 12:30 PM', '5:00 PM - 6:30 PM', '7:00 PM - 8:30 PM'],
      'Wednesday': ['7:00 AM - 8:30 AM', '11:00 AM - 12:30 PM', '5:00 PM - 6:30 PM', '7:00 PM - 8:30 PM'],
      'Thursday': ['7:00 AM - 8:30 AM', '11:00 AM - 12:30 PM', '5:00 PM - 6:30 PM', '7:00 PM - 8:30 PM'],
      'Friday': ['7:00 AM - 8:30 AM', '11:00 AM - 12:30 PM', '5:00 PM - 6:30 PM'],
      'Saturday': ['9:00 AM - 11:00 AM'],
      'Sunday': ['9:00 AM - 11:00 AM']
    },
    trainingStyles: {
      gi: true,
      noGi: true,
      mma: false,
      selfDefense: true
    },
    openMat: {
      available: true,
      schedule: {
        'Saturday': '9:00 AM - 11:00 AM',
        'Sunday': '9:00 AM - 11:00 AM'
      }
    }
  },
  {
    id: '8',
    name: 'Fight Sports',
    address: '999 Fight Rd',
    description: 'Comprehensive martial arts academy offering BJJ, MMA, and striking classes. Great for cross-training athletes.',
    rating: 4.6,
    monthlyFee: 140,
    dropInFee: 25,
    website: 'https://fightsports.com',
    image: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=800&auto=format&fit=crop&q=80',
    coordinates: { lat: 0, lng: 0 },
    type: 'bjj' as const,
    classSchedule: {
      'Monday': ['6:30 AM - 8:00 AM', '12:00 PM - 1:30 PM', '5:30 PM - 7:00 PM', '7:30 PM - 9:00 PM'],
      'Tuesday': ['6:30 AM - 8:00 AM', '12:00 PM - 1:30 PM', '5:30 PM - 7:00 PM', '7:30 PM - 9:00 PM'],
      'Wednesday': ['6:30 AM - 8:00 AM', '12:00 PM - 1:30 PM', '5:30 PM - 7:00 PM', '7:30 PM - 9:00 PM'],
      'Thursday': ['6:30 AM - 8:00 AM', '12:00 PM - 1:30 PM', '5:30 PM - 7:00 PM', '7:30 PM - 9:00 PM'],
      'Friday': ['6:30 AM - 8:00 AM', '12:00 PM - 1:30 PM', '5:30 PM - 7:00 PM'],
      'Saturday': ['10:30 AM - 12:30 PM'],
      'Sunday': ['10:30 AM - 12:30 PM']
    },
    trainingStyles: {
      gi: true,
      noGi: true,
      mma: true,
      selfDefense: true
    },
    openMat: {
      available: true,
      schedule: {
        'Saturday': '10:30 AM - 12:30 PM',
        'Sunday': '10:30 AM - 12:30 PM'
      }
    }
  },
  {
    id: '9',
    name: 'Renzo Gracie Academy',
    address: '111 Gracie Blvd',
    description: 'Historic academy with a rich legacy in BJJ. Known for its tough training and high-level instruction.',
    rating: 4.8,
    monthlyFee: 150,
    dropInFee: 30,
    website: 'https://renzogracie.com',
    image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&auto=format&fit=crop&q=80',
    coordinates: { lat: 0, lng: 0 },
    type: 'bjj' as const,
    classSchedule: {
      'Monday': ['7:00 AM - 8:30 AM', '12:00 PM - 1:30 PM', '5:00 PM - 6:30 PM', '7:00 PM - 8:30 PM'],
      'Tuesday': ['7:00 AM - 8:30 AM', '12:00 PM - 1:30 PM', '5:00 PM - 6:30 PM', '7:00 PM - 8:30 PM'],
      'Wednesday': ['7:00 AM - 8:30 AM', '12:00 PM - 1:30 PM', '5:00 PM - 6:30 PM', '7:00 PM - 8:30 PM'],
      'Thursday': ['7:00 AM - 8:30 AM', '12:00 PM - 1:30 PM', '5:00 PM - 6:30 PM', '7:00 PM - 8:30 PM'],
      'Friday': ['7:00 AM - 8:30 AM', '12:00 PM - 1:30 PM', '5:00 PM - 6:30 PM'],
      'Saturday': ['9:00 AM - 11:00 AM'],
      'Sunday': ['9:00 AM - 11:00 AM']
    },
    trainingStyles: {
      gi: true,
      noGi: true,
      mma: true,
      selfDefense: true
    },
    openMat: {
      available: true,
      schedule: {
        'Saturday': '9:00 AM - 11:00 AM',
        'Sunday': '9:00 AM - 11:00 AM'
      }
    }
  },
  {
    id: '10',
    name: 'BJJ Revolution Team',
    address: '222 Revolution St',
    description: 'Modern academy with a focus on technique and competition. Great for all levels of practitioners.',
    rating: 4.5,
    monthlyFee: 135,
    dropInFee: 25,
    website: 'https://bjjrevolution.com',
    image: 'https://images.unsplash.com/photo-1599058917765-a780eda07a3e?w=800&auto=format&fit=crop&q=80',
    coordinates: { lat: 0, lng: 0 },
    type: 'bjj' as const,
    classSchedule: {
      'Monday': ['6:00 AM - 7:30 AM', '12:00 PM - 1:30 PM', '6:00 PM - 7:30 PM'],
      'Tuesday': ['6:00 AM - 7:30 AM', '12:00 PM - 1:30 PM', '6:00 PM - 7:30 PM'],
      'Wednesday': ['6:00 AM - 7:30 AM', '12:00 PM - 1:30 PM', '6:00 PM - 7:30 PM'],
      'Thursday': ['6:00 AM - 7:30 AM', '12:00 PM - 1:30 PM', '6:00 PM - 7:30 PM'],
      'Friday': ['6:00 AM - 7:30 AM', '12:00 PM - 1:30 PM', '6:00 PM - 7:30 PM'],
      'Saturday': ['10:00 AM - 12:00 PM'],
      'Sunday': ['10:00 AM - 12:00 PM']
    },
    trainingStyles: {
      gi: true,
      noGi: true,
      mma: false,
      selfDefense: true
    },
    openMat: {
      available: true,
      schedule: {
        'Saturday': '10:00 AM - 12:00 PM',
        'Sunday': '10:00 AM - 12:00 PM'
      }
    }
  },
  {
    id: '11',
    name: 'GF Team',
    address: '333 GF Ave',
    description: 'International team with a strong competition focus. Known for producing world champions and elite competitors.',
    rating: 4.7,
    monthlyFee: 145,
    dropInFee: 30,
    website: 'https://gfteam.com',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&auto=format&fit=crop&q=80',
    coordinates: { lat: 0, lng: 0 },
    type: 'bjj' as const,
    classSchedule: {
      'Monday': ['7:00 AM - 8:30 AM', '11:00 AM - 12:30 PM', '5:00 PM - 6:30 PM', '7:00 PM - 8:30 PM'],
      'Tuesday': ['7:00 AM - 8:30 AM', '11:00 AM - 12:30 PM', '5:00 PM - 6:30 PM', '7:00 PM - 8:30 PM'],
      'Wednesday': ['7:00 AM - 8:30 AM', '11:00 AM - 12:30 PM', '5:00 PM - 6:30 PM', '7:00 PM - 8:30 PM'],
      'Thursday': ['7:00 AM - 8:30 AM', '11:00 AM - 12:30 PM', '5:00 PM - 6:30 PM', '7:00 PM - 8:30 PM'],
      'Friday': ['7:00 AM - 8:30 AM', '11:00 AM - 12:30 PM', '5:00 PM - 6:30 PM'],
      'Saturday': ['9:00 AM - 11:00 AM'],
      'Sunday': ['9:00 AM - 11:00 AM']
    },
    trainingStyles: {
      gi: true,
      noGi: true,
      mma: false,
      selfDefense: false
    },
    openMat: {
      available: true,
      schedule: {
        'Saturday': '9:00 AM - 11:00 AM',
        'Sunday': '9:00 AM - 11:00 AM'
      }
    }
  },
  {
    id: '12',
    name: 'Nova União',
    address: '444 Nova St',
    description: 'Historic team with a strong focus on both gi and no-gi training. Known for its technical excellence.',
    rating: 4.6,
    monthlyFee: 140,
    dropInFee: 25,
    website: 'https://novauniao.com',
    image: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=800&auto=format&fit=crop&q=80',
    coordinates: { lat: 0, lng: 0 },
    type: 'bjj' as const,
    classSchedule: {
      'Monday': ['6:30 AM - 8:00 AM', '12:00 PM - 1:30 PM', '5:30 PM - 7:00 PM', '7:30 PM - 9:00 PM'],
      'Tuesday': ['6:30 AM - 8:00 AM', '12:00 PM - 1:30 PM', '5:30 PM - 7:00 PM', '7:30 PM - 9:00 PM'],
      'Wednesday': ['6:30 AM - 8:00 AM', '12:00 PM - 1:30 PM', '5:30 PM - 7:00 PM', '7:30 PM - 9:00 PM'],
      'Thursday': ['6:30 AM - 8:00 AM', '12:00 PM - 1:30 PM', '5:30 PM - 7:00 PM', '7:30 PM - 9:00 PM'],
      'Friday': ['6:30 AM - 8:00 AM', '12:00 PM - 1:30 PM', '5:30 PM - 7:00 PM'],
      'Saturday': ['10:30 AM - 12:30 PM'],
      'Sunday': ['10:30 AM - 12:30 PM']
    },
    trainingStyles: {
      gi: true,
      noGi: true,
      mma: false,
      selfDefense: true
    },
    openMat: {
      available: true,
      schedule: {
        'Saturday': '10:30 AM - 12:30 PM',
        'Sunday': '10:30 AM - 12:30 PM'
      }
    }
  }
];

const CityDetailPage = () => {
  const { cityId } = useParams<{ cityId: string }>();
  const [city, setCity] = useState<City | null>(null);
  const [filteredGyms, setFilteredGyms] = useState(mockGyms);
  
  useEffect(() => {
    if (cityId) {
      const foundCity = cities.find(c => c.id === cityId);
      if (foundCity) {
        setCity(foundCity);
      }
    }
  }, [cityId]);

  const handleFilterChange = (filters: GymFilterType) => {
    let filtered = [...mockGyms];

    // Filter by training styles
    if (filters.trainingStyles) {
      const activeStyles = Object.entries(filters.trainingStyles)
        .filter(([_, value]) => value)
        .map(([key]) => key);

      if (activeStyles.length > 0) {
        filtered = filtered.filter(gym => 
          activeStyles.every(style => gym.trainingStyles[style as keyof typeof gym.trainingStyles])
        );
      }
    }

    // Filter by price range
    if (filters.priceRange) {
      filtered = filtered.filter(gym => 
        gym.monthlyFee >= (filters.priceRange?.min || 0) && 
        gym.monthlyFee <= (filters.priceRange?.max || Infinity)
      );
    }

    // Filter by open mat
    if (filters.openMat) {
      filtered = filtered.filter(gym => gym.openMat.available);
    }

    // Filter by rating
    if (filters.rating && filters.rating > 0) {
      filtered = filtered.filter(gym => gym.rating >= filters.rating!);
    }

    setFilteredGyms(filtered);
  };

  // Function to render rating as a scale bar and percentage
  const renderRating = (rating: number, maxRating: number = 10) => {
    const percentage = (rating / maxRating) * 100;
    
    return (
      <div className="flex items-center gap-2">
        <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-red-600 rounded-full"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <span className="text-sm font-medium text-gray-700">{percentage.toFixed(0)}%</span>
      </div>
    );
  };

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

  if (!city) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-600">Loading city information...</p>
      </div>
    );
  }

  return (
    <motion.div 
      className="bg-gray-50 min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Section */}
      <motion.div 
        className="relative h-80 md:h-96"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <img
          src={city.image}
          alt={city.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-8">
            <motion.div 
              className="flex flex-col md:flex-row md:items-end justify-between gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{city.name}</h1>
                <div className="flex items-center text-white">
                  <MapPin size={16} className="mr-1" />
                  <span>{city.country}</span>
                </div>
              </div>
              <div className="flex gap-3">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors duration-300 flex items-center"
                >
                  <Heart size={16} className="mr-2" />
                  Save
                </motion.button>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link 
                    to="/compare" 
                    className="bg-blue-900 hover:bg-blue-800 text-white px-4 py-2 rounded-md transition-colors duration-300 flex items-center"
                  >
                    Compare
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div 
          className="bg-white rounded-lg shadow-md p-6 mb-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h2 
            className="text-2xl font-bold text-blue-900 mb-4"
            variants={itemVariants}
          >
            About {city.name}
          </motion.h2>
          <motion.p 
            className="text-gray-700 mb-6"
            variants={itemVariants}
          >
            {city.description}
          </motion.p>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
          >
            {/* BJJ Metrics */}
            <motion.div 
              className="bg-gray-50 rounded-lg p-4"
              variants={itemVariants}
            >
              <h3 className="text-lg font-semibold text-blue-900 mb-3">BJJ Details</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-gray-700">
                    <Award size={18} className="text-blue-900 mr-2" />
                    <span>Gym Density</span>
                  </div>
                  {renderRating(city.gymDensity)}
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-gray-700">
                    <Users size={18} className="text-blue-900 mr-2" />
                    <span>Belt Friendliness</span>
                  </div>
                  {renderRating(city.beltFriendliness)}
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-gray-700">
                    <Award size={18} className="text-blue-900 mr-2" />
                    <span>Instructor Quality</span>
                  </div>
                  {renderRating(city.instructorQuality)}
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-gray-700">
                    <Heart size={18} className="text-blue-900 mr-2" />
                    <span>Drop-in Friendliness</span>
                  </div>
                  {renderRating(city.dropInFriendliness)}
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-gray-700">
                    <Calendar size={18} className="text-blue-900 mr-2" />
                    <span>Competition Opportunities</span>
                  </div>
                  {renderRating(city.competitionOpportunities)}
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-gray-700">
                    <DollarSign size={18} className="text-blue-900 mr-2" />
                    <span>Monthly Training Cost</span>
                  </div>
                  <span className="font-bold text-gray-900">${city.monthlyCost}/mo</span>
                </div>
              </div>
            </motion.div>
            
            {/* Training Styles & Availability */}
            <motion.div 
              className="bg-gray-50 rounded-lg p-4"
              variants={itemVariants}
            >
              <h3 className="text-lg font-semibold text-blue-900 mb-3">Training Details</h3>
              
              <div className="mb-4">
                <h4 className="font-medium text-gray-700 mb-2">Training Styles</h4>
                <div className="flex flex-wrap gap-2">
                  {city.trainingStyles.gi && (
                    <span className="bg-blue-100 text-blue-900 px-3 py-1 rounded-full text-sm">Gi</span>
                  )}
                  {city.trainingStyles.noGi && (
                    <span className="bg-blue-100 text-blue-900 px-3 py-1 rounded-full text-sm">No-Gi</span>
                  )}
                  {city.trainingStyles.mma && (
                    <span className="bg-blue-100 text-blue-900 px-3 py-1 rounded-full text-sm">MMA</span>
                  )}
                  {city.trainingStyles.selfDefense && (
                    <span className="bg-blue-100 text-blue-900 px-3 py-1 rounded-full text-sm">Self-Defense</span>
                  )}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Class Availability</h4>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Clock size={16} className="text-blue-900 mr-2" />
                    <span className="text-gray-700 mr-2">Morning:</span>
                    <span className={city.classAvailability.morning ? 'text-green-600' : 'text-red-600'}>
                      {city.classAvailability.morning ? 'Available' : 'Limited'}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Clock size={16} className="text-blue-900 mr-2" />
                    <span className="text-gray-700 mr-2">Afternoon:</span>
                    <span className={city.classAvailability.afternoon ? 'text-green-600' : 'text-red-600'}>
                      {city.classAvailability.afternoon ? 'Available' : 'Limited'}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Clock size={16} className="text-blue-900 mr-2" />
                    <span className="text-gray-700 mr-2">Evening:</span>
                    <span className={city.classAvailability.evening ? 'text-green-600' : 'text-red-600'}>
                      {city.classAvailability.evening ? 'Available' : 'Limited'}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Travel & Lifestyle */}
            <motion.div 
              className="bg-gray-50 rounded-lg p-4"
              variants={itemVariants}
            >
              <h3 className="text-lg font-semibold text-blue-900 mb-3">Travel & Lifestyle</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-gray-700">
                    <DollarSign size={18} className="text-blue-900 mr-2" />
                    <span>Cost of Living</span>
                  </div>
                  {renderRating(city.costOfLiving)}
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-gray-700">
                    <Globe size={18} className="text-blue-900 mr-2" />
                    <span>Visa Friendliness</span>
                  </div>
                  {renderRating(city.visaFriendliness)}
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-gray-700">
                    <Shield size={18} className="text-blue-900 mr-2" />
                    <span>Safety</span>
                  </div>
                  {renderRating(city.safety)}
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-gray-700">
                    <Globe size={18} className="text-blue-900 mr-2" />
                    <span>English Friendly</span>
                  </div>
                  <span className={`text-sm font-medium ${city.englishFriendly ? 'text-green-600' : 'text-red-600'}`}>
                    {city.englishFriendly ? 'Yes' : 'Limited'}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-gray-700">
                    <Sun size={18} className="text-blue-900 mr-2" />
                    <span>Weather</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm font-medium mr-2">{city.weather.type}</span>
                    {renderRating(city.weather.score)}
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-gray-700">
                    <Heart size={18} className="text-blue-900 mr-2" />
                    <span>Healthcare</span>
                  </div>
                  {renderRating(city.healthcare)}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Gyms Section */}
        <motion.div 
          className="bg-white rounded-lg shadow-md p-6 mb-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h2 
            className="text-2xl font-bold text-blue-900 mb-4"
            variants={itemVariants}
          >
            BJJ Gyms in {city.name}
          </motion.h2>
          <div className="flex flex-col md:flex-row gap-6">
            {/* Filters Sidebar */}
            <motion.div 
              className="w-full md:w-64 flex-shrink-0"
              variants={itemVariants}
            >
              <GymFilters onFilterChange={handleFilterChange} />
            </motion.div>
            
            {/* Gym List */}
            <motion.div 
              className="flex-1"
              variants={itemVariants}
            >
              <GymList gyms={filteredGyms} />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CityDetailPage;