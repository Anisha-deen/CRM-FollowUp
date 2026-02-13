import React from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Avatar,
  Box,
  useTheme,
  useMediaQuery
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { alpha } from '@mui/material/styles';

const drawerWidth = 240;

const Navbar = ({ handleDrawerToggle }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { user, logout } = useAuth();
  const ismobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        width: { xs: '100%', md: `calc(100% - ${drawerWidth}px)` },
        ml: { md: `${drawerWidth}px` },
        zIndex: (theme) => theme.zIndex.drawer + 1,

        backgroundColor: "#3D52A0", // Requested solid blue
        color: "#FFFFFF",           // Requested white text
        borderBottom: "1px solid rgba(255, 255, 255, 0.1)", // Subtle white border
        boxShadow: "none"
      }}
    >

      <Toolbar sx={{ height: 64, px: { xs: 2, md: 4 } }}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { md: 'none' } }}
        >
          <MenuIcon />
        </IconButton>

        {/* Brand / Logo Area - Mobile Only */}
        <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center' }}>
          <Box sx={{
            width: 32,
            height: 32,
            borderRadius: '8px',
            bgcolor: 'rgba(255, 255, 255, 0.2)',
            mr: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 800,
            color: 'inherit',
            fontSize: '1.2rem',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            boxShadow: 'none'
          }}>
            C
          </Box>
          <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 700, letterSpacing: '-0.025em', fontSize: '1rem' }}>
            CRM SYSTEM
          </Typography>
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        {/* User Info Section */}
        <Box sx={{ display: { xs: 'none', sm: 'block' }, textAlign: 'right', mr: 2 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#FFFFFF', lineHeight: 1.2 }}>
            {user ? user.name : 'User'}
          </Typography>
          <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)', display: 'block', lineHeight: 1.2 }}>
            {user ? user.role : 'Role'}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar
            sx={{
              bgcolor: "rgba(255, 255, 255, 0.2)", // Translucent white background
              color: "#FFFFFF",
              border: "2px solid #FFFFFF",
              fontWeight: 'bold',
              width: ismobile ? 32 : 40,
              height: ismobile ? 32 : 40,
              fontSize: '1rem'
            }}
          >
            {user?.name?.charAt(0) || 'U'}
          </Avatar>

          <IconButton
            onClick={handleLogout}
            sx={{
              color: '#FFFFFF',
              bgcolor: 'transparent',
              '&:hover': { bgcolor: '#2F4287' }, // Darker blue on hover
              borderRadius: '8px',
              padding: '8px',
              border: '1px solid rgba(255, 255, 255, 0.3)'
            }}
          >
            <LogoutIcon fontSize="small" />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
