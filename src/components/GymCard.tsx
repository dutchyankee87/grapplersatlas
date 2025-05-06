import { Gym } from '../types';
import { Card, CardContent, CardMedia, Typography, Box, Chip, Rating } from '@mui/material';
import { MapPin, Phone, Globe, Award } from 'lucide-react';

interface GymCardProps {
  gym: Gym;
}

export function GymCard({ gym }: GymCardProps) {
  return (
    <Card 
      sx={{ 
        maxWidth: 345,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 3
        }
      }}
    >
      <CardMedia
        component="img"
        height="140"
        image={`https://source.unsplash.com/featured/?jiujitsu,gym&sig=${gym.id}`}
        alt={gym.name}
      />
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Typography gutterBottom variant="h5" component="div">
          {gym.name}
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <MapPin size={16} />
          <Typography variant="body2" color="text.secondary">
            {gym.address}
          </Typography>
        </Box>

        {gym.phone && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Phone size={16} />
            <Typography variant="body2" color="text.secondary">
              {gym.phone}
            </Typography>
          </Box>
        )}

        {gym.website && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Globe size={16} />
            <Typography 
              variant="body2" 
              color="primary"
              component="a"
              href={gym.website}
              target="_blank"
              rel="noopener noreferrer"
              sx={{ textDecoration: 'none' }}
            >
              Visit Website
            </Typography>
          </Box>
        )}

        {gym.rating && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Rating value={gym.rating} precision={0.5} readOnly size="small" />
            <Typography variant="body2" color="text.secondary">
              ({gym.rating})
            </Typography>
          </Box>
        )}

        <Box sx={{ mt: 'auto', display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
          {gym.beltLevels?.map((belt) => (
            <Chip
              key={belt}
              label={belt}
              size="small"
              icon={<Award size={14} />}
              sx={{ 
                backgroundColor: belt === 'Black' ? '#000' : 
                              belt === 'Brown' ? '#8B4513' :
                              belt === 'Purple' ? '#800080' :
                              belt === 'Blue' ? '#0000FF' : '#FFFFFF',
                color: ['White', 'Blue'].includes(belt) ? '#000' : '#fff',
                '& .MuiChip-icon': {
                  color: ['White', 'Blue'].includes(belt) ? '#000' : '#fff'
                }
              }}
            />
          ))}
        </Box>
      </CardContent>
    </Card>
  );
} 