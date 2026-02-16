import React, { useState, useEffect, useMemo } from 'react';
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Box, useMediaQuery, Typography, Collapse } from '@mui/material';
import { alpha } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import AssignmentIcon from '@mui/icons-material/Assignment';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import BusinessIcon from '@mui/icons-material/Business';
import SecurityIcon from '@mui/icons-material/Security';
import AssessmentIcon from '@mui/icons-material/Assessment';

import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { useAuth } from '../context/AuthContext';

const drawerWidth = 240;

const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'Leads', icon: <PeopleIcon />, path: '/leads' },
    { text: 'Followups', icon: <AssignmentIcon />, path: '/followups' },
    { text: 'Budgets', icon: <MonetizationOnIcon />, path: '/budgets' },
    { text: 'Clients', icon: <BusinessIcon />, path: '/clients' },
    { text: 'Reports', icon: <AssessmentIcon />, path: '/reports' },
    { text: 'Organization', icon: <BusinessIcon />, path: '/organization' },
    {
        text: 'Roles & Permissions',
        icon: <SecurityIcon />,
        children: [
            { text: 'Users', path: '/users' },
            { text: 'Roles', path: '/roles' }
        ]
    },

];

const Sidebar = ({ isOpen, handleDrawerToggle }) => {
    const location = useLocation();
    const theme = useTheme();
    const { user } = useAuth();
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

    const [openSubmenu, setOpenSubmenu] = useState({});

    // Filter menu items based on permissions
    const filteredMenuItems = useMemo(() => {
        if (!user) return [];

        const hasAccess = (moduleName) => {
            // Super Admin and Admin have access to everything
            if (user.role === 'Super Admin' || user.role === 'Admin') return true;

            // Check permissions array from backend
            // user.permissions: Array of { module: string, view: number, ... }
            return user.permissions?.some(p =>
                p.module.toLowerCase() === moduleName.toLowerCase() &&
                (parseInt(p.view) === 1 || parseInt(p.full_access) === 1)
            );
        };

        return menuItems.map(item => {
            if (item.children) {
                const filteredChildren = item.children.filter(child => hasAccess(child.text));
                if (filteredChildren.length > 0) {
                    return { ...item, children: filteredChildren };
                }
                return null;
            }
            return hasAccess(item.text) ? item : null;
        }).filter(item => item !== null);
    }, [user]);

    // Auto-expand menu if on a child route
    useEffect(() => {
        const newOpenState = { ...openSubmenu };
        filteredMenuItems.forEach(item => {
            if (item.children) {
                const isChildActive = item.children.some(child => location.pathname.startsWith(child.path));
                if (isChildActive) {
                    newOpenState[item.text] = true;
                }
            }
        });
        setOpenSubmenu(newOpenState);
    }, [location.pathname, filteredMenuItems]);

    const handleSubmenuClick = (text) => {
        setOpenSubmenu((prev) => ({ ...prev, [text]: !prev[text] }));
    };

    const renderMenuItem = (item) => {
        const isParent = !!item.children;
        const subOpen = openSubmenu[item.text] || false;
        const isActive = isParent ? false : location.pathname.startsWith(item.path);

        return (
            <React.Fragment key={item.text}>
                <ListItem disablePadding sx={{ display: 'block' }}>
                    <ListItemButton
                        component={isParent ? 'div' : Link}
                        to={isParent ? undefined : item.path}
                        onClick={isParent ? () => handleSubmenuClick(item.text) : (!isDesktop ? handleDrawerToggle : undefined)}
                        selected={isActive}
                        sx={{
                            borderRadius: '12px',
                            px: 2,
                            py: 1.5,
                            mb: 0.5,
                            transition: 'all 0.2s ease-in-out',
                            '&.Mui-selected': {
                                backgroundColor: theme.palette.sidebar?.activeBg || alpha(theme.palette.primary.main, 0.1),
                                color: theme.palette.sidebar?.activeText || theme.palette.primary.main,
                                '&:hover': {
                                    backgroundColor: alpha(theme.palette.primary.main, 0.15),
                                },
                            },
                        }}
                    >
                        <ListItemIcon sx={{
                            minWidth: 42,
                            color: isActive ? theme.palette.primary.main : theme.palette.text.secondary,
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
                        {isParent && (subOpen ? <ExpandLess /> : <ExpandMore />)}
                    </ListItemButton>
                </ListItem>

                {isParent && (
                    <Collapse in={subOpen} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {item.children.map((child) => {
                                const isChildActive = location.pathname.startsWith(child.path);
                                return (
                                    <ListItem key={child.text} disablePadding>
                                        <ListItemButton
                                            component={Link}
                                            to={child.path}
                                            onClick={!isDesktop ? handleDrawerToggle : undefined}
                                            selected={isChildActive}
                                            sx={{
                                                borderRadius: '12px',
                                                pl: 4,
                                                py: 1,
                                                mb: 0.5,
                                                '&.Mui-selected': {
                                                    backgroundColor: alpha(theme.palette.primary.main, 0.08),
                                                    color: theme.palette.primary.main,
                                                }
                                            }}
                                        >
                                            <ListItemText
                                                primary={child.text}
                                                primaryTypographyProps={{
                                                    fontWeight: isChildActive ? 600 : 500,
                                                    fontSize: '0.9rem',
                                                }}
                                            />
                                        </ListItemButton>
                                    </ListItem>
                                );
                            })}
                        </List>
                    </Collapse>
                )}
            </React.Fragment>
        );
    };

    const drawerContent = (
        <Box sx={{
            height: '100%',
            backgroundColor: theme.palette.background.default,
            display: 'flex',
            flexDirection: 'column',
            borderRight: '1px solid',
            borderColor: 'divider',
        }}>
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
                }}>
                    C
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1.1rem', color: 'text.primary' }}>
                    CRM SYSTEM
                </Typography>
            </Box>

            <Box sx={{ overflowY: 'auto', py: 3, px: 2, flexGrow: 1 }}>
                <List sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                    {filteredMenuItems.map((item) => renderMenuItem(item))}
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
