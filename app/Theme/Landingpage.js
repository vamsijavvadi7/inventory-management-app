'use client';
import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import { keyframes } from '@emotion/react';

// Keyframes for animations
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideIn = keyframes`
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const rotateIn = keyframes`
  from {
    transform: rotateY(-90deg);
    opacity: 0;
  }
  to {
    transform: rotateY(0);
    opacity: 1;
  }
`;

const backgroundAnimation = keyframes`
  from {
    transform: rotateX(0) rotateY(0);
  }
  to {
    transform: rotateX(360deg) rotateY(360deg);
  }
`;

// New keyframes animation for page
const pageAnimation = keyframes`
  from {
    transform: scale(1);
  }
  to {
    transform: scale(1.02);
  }
`;

const LandingPage = () => {
  return (
    <Box 
      width="100vw" 
      height="100vh" 
      display="flex" 
      flexDirection="column" 
      alignItems="center" 
      justifyContent="center" 
      bgcolor="#2C2C2C" // Dark grey background
      padding={3}
      sx={{ 
        position: 'relative', 
        overflowY: 'auto',
        animation: `${fadeIn} 1s ease, ${pageAnimation} 20s ease-in-out infinite`, // Apply new animation here
        transformOrigin: 'center center',
        background: 'linear-gradient(135deg, #2C2C2C, #4A4A4A)', // Black and grey gradient background
      }}
    >
      <Box
        position="absolute"
        top={0}
        left={0}
        width="100%"
        height="100%"
        zIndex={-1}
        sx={{
          background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.6), rgba(50, 50, 50, 0.6))', // Semi-transparent black and grey gradient
          animation: `${backgroundAnimation} 30s linear infinite`,
          transformStyle: 'preserve-3d',
          perspective: '500px',
          overflow: 'hidden'
        }}
      >
        <Box
          position="absolute"
          top="50%"
          left="50%"
          width="200%"
          height="200%"
          bgcolor="rgba(0, 0, 0, 0.4)" // Semi-transparent black circle
          borderRadius="50%"
          transform="translate(-50%, -50%) rotateX(30deg) rotateY(30deg)"
          sx={{
            animation: `${backgroundAnimation} 60s linear infinite`,
            filter: 'blur(4px)' // Increased blur for a softer look
          }}
        />
      </Box>

      <Typography 
        variant="h4" 
        gutterBottom 
        sx={{ 
          animation: `${fadeIn} 1.5s ease`, 
          textAlign: 'center',
          marginBottom: 2,
          background: 'linear-gradient(135deg, #FFD700, #FFA500)', // Gradient from gold to orange
          WebkitBackgroundClip: 'text', 
          WebkitTextFillColor: 'transparent', 
          color: 'transparent', 
          fontSize: { xs: '1.5rem', sm: '2rem' }, // Responsive font size
          lineHeight: { xs: '2rem', sm: '2.5rem' }, // Responsive line height
        }}
      >
        Welcome to Pantry Pal
      </Typography>

      <Typography 
        variant="h6" 
        color="textSecondary" 
        paragraph 
        sx={{ 
          textAlign: 'center', 
          animation: `${fadeIn} 1.5s ease`, 
          marginBottom: 4,
          color: '#D3D3D3', // Light grey color for contrast
          fontSize: { xs: '1rem', sm: '1.25rem' }, // Responsive font size
          lineHeight: { xs: '1.5rem', sm: '1.75rem' }, // Responsive line height
        }}
      >
        Effortlessly manage your pantry with our advanced tracking system. Add items by text or image, modify quantities, and remove items with ease. Discover magical recipes based on the ingredients you have.
      </Typography>
      
      <Stack 
        direction={{ xs: 'column', sm: 'row' }} 
        spacing={2} 
        alignItems="center" 
        justifyContent="center" 
        sx={{ animation: `${fadeIn} 2s ease` }}
      >
        <Box
          bgcolor="linear-gradient(135deg, #434343, #6D6D6D)" // Gradient background for cards
          borderRadius="8px"
          boxShadow="0 4px 8px rgba(0,0,0,0.2)"
          padding={2}
          textAlign="center"
          sx={{
            animation: `${rotateIn} 1s ease`,
            transformStyle: 'preserve-3d',
            perspective: '1000px',
            '&:hover': {
              transform: 'rotateY(10deg)',
              boxShadow: '0 8px 16px rgba(0,0,0,0.3)'
            }
          }}
        >
          <Typography variant="h6" color="gold" gutterBottom>
            Track Inventory Items
          </Typography>
          <Typography color="common.white"> {/* White text color for contrast */}
            Keep a detailed record of your pantry items. Add them by text or image, with AI identifying items from images and adding them.
          </Typography>
        </Box>
        <Box
          bgcolor="linear-gradient(135deg, #434343, #6D6D6D)" // Gradient background for cards
          borderRadius="8px"
          boxShadow="0 4px 8px rgba(0,0,0,0.2)"
          padding={2}
          textAlign="center"
          sx={{
            animation: `${rotateIn} 1s ease`,
            transformStyle: 'preserve-3d',
            perspective: '1000px',
            '&:hover': {
              transform: 'rotateY(10deg)',
              boxShadow: '0 8px 16px rgba(0,0,0,0.3)'
            }
          }}
        >
          <Typography variant="h6" color="gold" gutterBottom>
            Modify & Remove Items
          </Typography>
          <Typography color="common.white"> {/* White text color for contrast */}
            Easily adjust item quantities or delete them with a single click. Manage your pantry with flexibility and precision.
          </Typography>
        </Box>
        <Box
          bgcolor="linear-gradient(135deg, #434343, #6D6D6D)" // Gradient background for cards
          borderRadius="8px"
          boxShadow="0 4px 8px rgba(0,0,0,0.2)"
          padding={2}
          textAlign="center"
          sx={{
            animation: `${rotateIn} 1s ease`,
            transformStyle: 'preserve-3d',
            perspective: '1000px',
            '&:hover': {
              transform: 'rotateY(10deg)',
              boxShadow: '0 8px 16px rgba(0,0,0,0.3)'
            }
          }}
        >
          <Typography variant="h6" color="gold" gutterBottom>
            Magical Recipe Suggestions
          </Typography>
          <Typography color="common.white"> {/* White text color for contrast */}
            Get recipe ideas based on the items you have in your pantry. Let our system inspire you with creative meal suggestions.
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
};

export default LandingPage;
