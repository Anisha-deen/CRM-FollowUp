import React from 'react';
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Box, useMediaQuery, alpha, Typography } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import AssignmentIcon from '@mui/icons-material/Assignment';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import BusinessIcon from '@mui/icons-material/Business';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import SecurityIcon from '@mui/icons-material/Security';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

const drawerWidth = 240; // Standard consolidated width

const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'Leads', icon: <PeopleIcon />, path: '/leads' },
    { text: 'Followups', icon: <AssignmentIcon />, path: '/followups' },
    { text: 'Budgets', icon: <MonetizationOnIcon />, path: '/budgets' },
    { text: 'Clients', icon: <BusinessIcon />, path: '/clients' },
    { text: 'Users', icon: <SupervisedUserCircleIcon />, path: '/users' },
    { text: 'Roles', icon: <SecurityIcon />, path: '/roles' },
];

const Sidebar = ({ isOpen, handleDrawerToggle }) => {
    const location = useLocation();
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
    const ismobile = useMediaQuery(theme.breakpoints.up('xs'));

    const drawerContent = (
        <Box sx={{
            height: '100%',
            backgroundColor: theme.palette.background.default,
            color: 'text.secondary',
            display: 'flex',
            flexDirection: 'column',
            borderRight: '1px solid',
            borderColor: 'divider',
        }}>
            {/* Sidebar Branding / Logo */}
            <Box sx={{
                height: 64,
                display: 'flex',
                alignItems: 'center',
                px: 3,
                borderBottom: '1px solid',
                borderColor: 'divider'
            }}>
                <Box sx={{
                    width: 32,
                    height: 32,
                    borderRadius: '8px',
                    bgcolor: 'primary.main',
                    mr: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'common.white',
                    fontWeight: 800,
                    fontSize: '1.2rem',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}>
                    C
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1.1rem', color: 'text.primary', letterSpacing: '-0.01em' }}>
                    CRM SYSTEM
                </Typography>
            </Box>

            {/* Navigation Items */}
            <Box sx={{ overflowY: 'auto', py: 3, px: 2, flexGrow: 1 }}>
                <List sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                    {menuItems.map((item) => {
                        const isActive = location.pathname.startsWith(item.path);
                        return (
                            <ListItem key={item.text} disablePadding>
                                <ListItemButton
                                    component={Link}
                                    to={item.path}
                                    onClick={!isDesktop ? handleDrawerToggle : undefined}
                                    selected={isActive}
                                    sx={{
                                        borderRadius: '12px',
                                        px: 2,
                                        py: 1.5,
                                        transition: 'all 0.2s ease-in-out',
                                        '&.Mui-selected': {
                                            backgroundColor: theme.palette.sidebar.activeBg,
                                            color: theme.palette.sidebar.activeText,
                                            '&:hover': {
                                                backgroundColor: alpha(theme.palette.sidebar.activeBg, 0.8),
                                            },
                                        },
                                        '&:hover': {
                                            backgroundColor: alpha(theme.palette.text.primary, 0.04),
                                            color: theme.palette.text.primary,
                                        },
                                    }}
                                >
                                    <ListItemIcon sx={{
                                        minWidth: 42,
                                        color: isActive ? theme.palette.primary.main : theme.palette.text.secondary,
                                        transition: 'color 0.2s',
                                        '& .MuiSvgIcon-root': {
                                            fontSize: '1.4rem'
                                        }
                                    }}>
                                        {item.icon}
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={item.text}
                                        primaryTypographyProps={{
                                            fontWeight: isActive ? 600 : 500,
                                            fontSize: '0.95rem',
                                        }}
                                    />
                                </ListItemButton>
                            </ListItem>
                        );
                    })}
                </List>
            </Box>
        </Box>
    );

    return (
        <Box
            component="nav"
            sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
            aria-label="mailbox folders"
        >
            {/* Mobile Drawer */}
            <Drawer
                variant="temporary"
                open={isOpen}
                onClose={handleDrawerToggle}
                ModalProps={{ keepMounted: true }}
                sx={{
                    display: { xs: 'block', md: 'none' },
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box',
                        width: drawerWidth,
                        borderRight: 'none',
                        boxShadow: '4px 0 24px rgba(0,0,0,0.1)'
                    },
                }}
            >
                {drawerContent}
            </Drawer>

            {/* Desktop Drawer (Permanent) */}
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: 'none', md: 'block' },
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box',
                        width: drawerWidth,
                        borderRight: '1px solid',
                        borderColor: 'divider',
                        boxShadow: 'none',
                        backgroundColor: 'background.paper'
                    },
                }}
                open
            >
                {drawerContent}
            </Drawer>
        </Box>
    );
};

export default Sidebar;
