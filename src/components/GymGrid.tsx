import { Gym } from '../types';
import { Container, Typography, Box } from '@mui/material';
import { GymCard } from './GymCard';

interface GymGridProps {
  gyms: Gym[];
  cityName: string;
}

export function GymGrid({ gyms, cityName }: GymGridProps) {
  if (gyms.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h4" color="text.secondary" gutterBottom>
            No gyms found in {cityName}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Try searching for a different city or check back later for updates.
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        BJJ & MMA Gyms in {cityName}
      </Typography>
      <Box sx={{ 
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
          lg: 'repeat(4, 1fr)'
        },
        gap: 3
      }}>
        {gyms.map((gym) => (
          <Box key={gym.id}>
            <GymCard gym={gym} />
          </Box>
        ))}
      </Box>
    </Container>
  );
} 