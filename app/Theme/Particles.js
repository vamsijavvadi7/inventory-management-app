// components/Particles.js
import { useEffect, useRef } from 'react';
import { keyframes } from '@emotion/react';
import { styled } from '@mui/material/styles';

// Keyframes for particles animation
const particlesAnimation = keyframes`
  0% { transform: translateY(0); opacity: 1; }
  50% { transform: translateY(-50px); opacity: 0.7; }
  100% { transform: translateY(0); opacity: 0; }
`;

const Particle = styled('div')(({ theme }) => ({
  position: 'absolute',
  borderRadius: '50%',
  backgroundColor: 'white',
  width: '8px',
  height: '8px',
  pointerEvents: 'none',
  animation: `${particlesAnimation} 10s infinite`,
}));

const ParticlesContainer = styled('div')({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  pointerEvents: 'none',
  overflow: 'hidden',
});

const Particles = ({ trigger }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (trigger) {
      const container = containerRef.current;
      const numberOfParticles = 100;

      const createParticle = () => {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        container.appendChild(particle);
        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.top = `${Math.random() * 100}vh`;
        particle.style.animationDuration = `${Math.random() * 3 + 2}s`;
        setTimeout(() => {
          container.removeChild(particle);
        }, 3000);
      };

      for (let i = 0; i < numberOfParticles; i++) {
        createParticle();
      }
    }
  }, [trigger]);

  return <ParticlesContainer ref={containerRef} />;
};

export default Particles;
