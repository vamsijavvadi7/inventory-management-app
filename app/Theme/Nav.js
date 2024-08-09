import * as React from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';
import Autocomplete from '@mui/material/Autocomplete';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  background: 'linear-gradient(to right, #333333, #666666)',
  '&:hover': {
    background: 'linear-gradient(to right, #4d4d4d, #7f7f7f)',
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: '250px', // Reduced width for better layout
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(TextField)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
  },
}));

const GoldenButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: 'white',
  color: 'black',
  borderRadius: '4px',
  padding: '10px',
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
  }, [theme.breakpoints.down('sm')]: {
    padding: '6px', // Smaller padding for mobile screens
    fontSize: '0.875rem', // Smaller font size for icons in mobile screens
  },
}));


const PrimarySearchAppBar = ({ inventory, onAddItemOptionChange, setSelectedItem, showRecipeView,closeRecipeView }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [showSearchBar, setShowSearchBar] = useState(false);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const isAddMenuOpen = Boolean(menuAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleAddItemClick = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleAddItemOption = (option) => {
    onAddItemOptionChange(option);
    setMenuAnchorEl(null);
  };

  const handleAddMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleMagicRecipeClick = () => {
    setShowSearchBar(false);
    showRecipeView();
  };

  const handlePantryClick = () => {
    setShowSearchBar(true);
    closeRecipeView()
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handlePantryClick}>
          <p>Pantry</p>
        </MenuItem>
      <MenuItem onClick={handleMagicRecipeClick}>
        <p>Magic Recipe</p>
      </MenuItem>
      
      {/* <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem> */}
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ bgcolor: '#2C2C2C', color: 'white' }}>
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              display: { xs: 'block', sm: 'block' },
              padding: { xs: '2px', sm: 'initial' },
              fontSize: { xs: '12px', sm: 'initial' },
              fontWeight: 'bold',
              color: '#FFA500',
            }}
             
          
          >
            Pantry Pal
          </Typography>
          {showSearchBar && (
            <Box sx={{ flexGrow: 1 }}>
              <Search>
                <Autocomplete
                  disablePortal
                  options={inventory.map((item) => item.name)}
                  onChange={(event, newValue) => setSelectedItem(newValue)}
                  renderInput={(params) => (
                    <StyledInputBase
                      {...params}
                      placeholder="Search for an item..."
                      InputProps={{
                        ...params.InputProps,
                        startAdornment: (
                          <>
                            <SearchIcon />
                            {params.InputProps.startAdornment}
                          </>
                        ),
                      }}
                    />
                  )}
                  sx={{
                    width: '100%',
                    '.MuiOutlinedInput-root': {
                      paddingLeft: `calc(1em + ${2}px)`,
                    },
                  }}
                />
              </Search>
            </Box>
          )}
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            {showSearchBar && (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <GoldenButton
                size="small"
                edge="end"
                aria-label="add item"
                onClick={handleAddItemClick}
              >
                <AddIcon /> Add Item
              </GoldenButton>
              <Menu
                anchorEl={menuAnchorEl}
                open={isAddMenuOpen}
                onClose={handleAddMenuClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <MenuItem onClick={() => handleAddItemOption('text')}>Add by Text</MenuItem>
                <MenuItem onClick={() => handleAddItemOption('image')}>Add by Image</MenuItem>
              </Menu>
            </Box>
              
            )}
            <GoldenButton
              size="small"
              edge="end"
              aria-label="pantry"
              sx={{ display: { xs: 'none',md:'block'} }}
              onClick={handlePantryClick}
            >
              Pantry
            </GoldenButton>
            <GoldenButton
              size="small"
              edge="end"
              aria-label="magic recipe"
              sx={{ display: { xs: 'none',md:'block'} }}
              onClick={handleMagicRecipeClick}
            >
              Magic Recipe
            </GoldenButton>
            {/* <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton> */}
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
};

export default PrimarySearchAppBar;
