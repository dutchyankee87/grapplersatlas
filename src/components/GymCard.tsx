import { Gym } from '../types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Phone, Globe, Clock, DollarSign, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface GymCardProps {
  gym: Gym;
}

export const GymCard = ({ gym }: GymCardProps) => {
  return (
    <Card className="w-full max-w-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative h-48 overflow-hidden rounded-t-lg">
        <img 
          src={gym.photos?.[0] || `https://source.unsplash.com/featured/?jiujitsu,gym&sig=${gym.id}`}
          alt={gym.name}
          className="object-cover w-full h-full"
        />
        <Badge className="absolute top-2 right-2 bg-sky-600">
          <DollarSign className="w-4 h-4 mr-1" />
          {gym.monthly_fee ? `$${gym.monthly_fee}/mo` : 'Contact for pricing'}
        </Badge>
      </div>

      <CardHeader>
        <CardTitle className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
          {gym.name}
        </CardTitle>
        <CardDescription className="flex items-center gap-1 text-zinc-600 dark:text-zinc-400">
          <MapPin className="w-4 h-4" />
          {gym.address}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-2">
          {gym.phone && (
            <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
              <Phone className="w-4 h-4" />
              {gym.phone}
            </div>
          )}
          {gym.website && (
            <a 
              href={gym.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-sky-600 hover:text-sky-700 dark:text-sky-400"
            >
              <Globe className="w-4 h-4" />
              Visit Website
            </a>
          )}
        </div>

        {/* Training Styles */}
        {gym.training_styles && (
          <div className="flex flex-wrap gap-2">
            {gym.training_styles.gi && (
              <Badge variant="secondary" className="bg-sky-100 text-sky-700 dark:bg-sky-900 dark:text-sky-300">
                Gi
              </Badge>
            )}
            {gym.training_styles.noGi && (
              <Badge variant="secondary" className="bg-sky-100 text-sky-700 dark:bg-sky-900 dark:text-sky-300">
                No-Gi
              </Badge>
            )}
            {gym.training_styles.mma && (
              <Badge variant="secondary" className="bg-sky-100 text-sky-700 dark:bg-sky-900 dark:text-sky-300">
                MMA
              </Badge>
            )}
            {gym.training_styles.selfDefense && (
              <Badge variant="secondary" className="bg-sky-100 text-sky-700 dark:bg-sky-900 dark:text-sky-300">
                Self-Defense
              </Badge>
            )}
          </div>
        )}

        {/* Amenities */}
        {gym.amenities && gym.amenities.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {gym.amenities.map((amenity) => (
              <Badge 
                key={amenity}
                variant="outline"
                className="bg-zinc-50 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
              >
                {amenity}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>

      <CardFooter className="flex justify-between border-t border-zinc-100 dark:border-zinc-800">
        <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
          <Clock className="w-4 h-4" />
          {gym.opening_hours?.monday || 'Contact for hours'}
        </div>
        
        {gym.rating && (
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm font-medium">{gym.rating}</span>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}; 