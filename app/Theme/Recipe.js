import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Fade from '@mui/material/Fade';
import { suggestRecipe } from '../AiModule/AiRecipe';
import { keyframes } from '@emotion/react';
import IconButton from '@mui/material/IconButton';
import Loader from './Loading';
// Styled components for animations and styling
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const rotateIn = keyframes`
  from {
    transform: rotateY(90deg);
    opacity: 0;
  }
  to {
    transform: rotateY(0deg);
    opacity: 1;
  }
`;

const slideUp = keyframes`
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const RecipePage = ({ inventory }) => {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // Added error state
  const [animationTrigger, setAnimationTrigger] = useState(false);

  const handleGetRecipe = async () => {
    setLoading(true);
    setAnimationTrigger(false);
    setError(null); // Reset error state
    try {
      const items = inventory;
      const response = await suggestRecipe(items); // Await promise
      const recipeData = JSON.parse(response); // Parse JSON string into object
      setRecipe(recipeData);
      setAnimationTrigger(true);
    } catch (err) {
      setError('Failed to fetch recipe. Please try again.'); // Handle errors
    }
    setLoading(false);
  };

  const Container = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#3C3C3C',
    padding: theme.spacing(2),
  }));

  const RecipeBox = styled(Box)(({ theme }) => ({
    background: 'linear-gradient(180deg, #ffffff 0%, #f0f0f0 100%)',
    padding: theme.spacing(4),
    borderRadius: '12px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    maxWidth: '700px',
    width: '100%',
    textAlign: 'left',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    '&:hover': {
      transform: 'rotateY(3deg)',
      boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
    },
    border: '1px solid #ddd',
    position: 'relative',
    overflow: 'hidden',
    animation: `${rotateIn} 1s ease-out`,
  }));

  const GoldenButton = styled(IconButton)(({ theme }) => ({
    backgroundColor: 'white',
    color: 'black',
    borderRadius: '4px',
    padding: '10px',
    marginBottom: '5px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
    backgroundImage: 'linear-gradient(135deg, #FFD700, #FFA500)',
    '&:hover': {
      backgroundColor: 'darkgoldenrod',
      transform: 'scale(1.1)',
      boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.4)',
    },
    '&:active': {
      transform: 'scale(1)',
      boxShadow: '0px 3px 7px rgba(0, 0, 0, 0.2)',
    },
    [theme.breakpoints.down('sm')]: {
      padding: '6px', // Smaller padding for mobile screens
      fontSize: '0.875rem', // Smaller font size for icons in mobile screens
    },
  }));

  const Heading = styled(Typography)(({ theme }) => ({
    marginBottom: theme.spacing(2),
    fontWeight: 700,
    background: 'linear-gradient(135deg, #FFD700, #FFA500)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    color: 'transparent',
    animation: `${slideUp} 1s ease-out`,
  }));

  const SectionTitle = styled(Typography)(({ theme }) => ({
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(1),
    fontWeight: 600,
    color: '#333',
    background: 'linear-gradient(90deg, #FFA07A, #FF6347)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    color: 'transparent',
    animation: `${slideUp} 1s ease-out`,
  }));

  const List = styled('ul')(({ theme }) => ({
    paddingLeft: theme.spacing(2),
    marginBottom: theme.spacing(3),
    '& li': {
      marginBottom: theme.spacing(1),
      lineHeight: '1.6',
      background: 'linear-gradient(135deg, #f5f5f5, #e0e0e0)',
      borderRadius: '4px',
      padding: theme.spacing(1),
      animation: `${slideUp} 1s ease-out`,
    },
  }));

  return (
    <Container>
      <Typography variant="h4"  sx={{ 
        animation: `${fadeIn} 1.5s ease`, 
        textAlign: 'center',
        marginBottom: 2,
        background: 'linear-gradient(135deg, #FFD700, #FFA500)', // Gradient from gold to orange
        WebkitBackgroundClip: 'text', 
        WebkitTextFillColor: 'transparent', 
        color: 'transparent', 
      }} gutterBottom>
        Inspiration for Your Next Meal
      </Typography>
      {loading ? <Loader/>:(
        <div>
      <GoldenButton
        size="small"
        edge="end"
        aria-label="add item"
        onClick={handleGetRecipe}
        disabled={loading}
      >
        {loading ? 'Loading...' : 'Suggest My Next Meal'}
      </GoldenButton>
      <Fade in={!!recipe}>
        <RecipeBox>
          {recipe ? (
            <>
              {recipe.title ? (
                <Typography variant="h5" gutterBottom>
                  {recipe.title}
                </Typography>
              ) : (
                <Typography variant="body2">No title available.</Typography>
              )}
              {recipe.ingredients && Object.keys(recipe.ingredients).length > 0 ? (
                <List>
                  {Object.keys(recipe.ingredients).map((key, index) => (
                    <li key={index}>{`${key}: ${recipe.ingredients[key]}`}</li>
                  ))}
                </List>
              ) : (
                <Typography variant="body2">No ingredients available.</Typography>
              )}
              {Array.isArray(recipe.instructions) && recipe.instructions.length > 0 ? (
                <ol>
                  {recipe.instructions.map((instruction, index) => (
                    <li key={index} dangerouslySetInnerHTML={{ __html: `${index+1}. `+instruction }} />
                  ))}
                </ol>
              ) : (
                <Typography variant="body2">No instructions available.</Typography>
              )}
            </>
          ) : (
            <Typography variant="body1">Your recipe will appear here.</Typography>
          )}
        </RecipeBox>
      </Fade></div>)}
    </Container>
  );
};

export default RecipePage;
