import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Box,
    Typography,
    Checkbox,
    FormControlLabel,
    Divider,
    IconButton,
    Grid,
    useTheme
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const AVAILABLE_PERMISSIONS = [
    'Dashboard',
    'Organization',
    'Users',
    'Roles',
    'Leads',
    'Followups',
    'Clients',
    'Budgets',
    'Reports'
];

const AddRoleModal = ({ open, onClose, onSave, roleToEdit }) => {
    const theme = useTheme();
    const [roleName, setRoleName] = useState('');
    const [description, setDescription] = useState('');
    const [permissions, setPermissions] = useState({});

    useEffect(() => {
        if (open) {
            if (roleToEdit) {
                setRoleName(roleToEdit.name || '');
                setDescription(roleToEdit.description || '');

                const initialPerms = {};
                AVAILABLE_PERMISSIONS.forEach(module => {
                    const found = roleToEdit.rawPermissions?.find(p => p.module === module);
                    initialPerms[module] = {
                        view: found ? !!parseInt(found.view) : false,
                        edit: found ? !!parseInt(found.edit) : false,
                        delete: found ? !!parseInt(found.delete) : false,
                        full_access: found ? !!parseInt(found.full_access) : false
                    };
                });
                setPermissions(initialPerms);
            } else {
                setRoleName('');
                setDescription('');
                const initialPerms = {};
                AVAILABLE_PERMISSIONS.forEach(module => {
                    initialPerms[module] = { view: false, edit: false, delete: false, full_access: false };
                });
                setPermissions(initialPerms);
            }
        }
    }, [open, roleToEdit]);

    const handleCheckboxChange = (module, field) => (event) => {
        const checked = event.target.checked;
        setPermissions(prev => {
            const newModulePerms = { ...prev[module], [field]: checked };

            if (field === 'full_access' && checked) {
                newModulePerms.view = true;
                newModulePerms.edit = true;
                newModulePerms.delete = true;
            }

            if (field !== 'full_access' && !checked) {
                newModulePerms.full_access = false;
            }

            if (field !== 'full_access' && checked) {
                if (newModulePerms.view && newModulePerms.edit && newModulePerms.delete) {
                    newModulePerms.full_access = true;
                }
            }

            return {
                ...prev,
                [module]: newModulePerms
            };
        });
    };

    const handleSave = () => {
        if (!roleName.trim()) return;

        const permissionsArray = Object.entries(permissions)
            .filter(([module, perms]) => perms.view || perms.edit || perms.delete || perms.full_access)
            .map(([module, perms]) => ({
                module,
                view: perms.view ? 1 : 0,
                edit: perms.edit ? 1 : 0,
                delete: perms.delete ? 1 : 0,
                full_access: perms.full_access ? 1 : 0
            }));

        onSave({
            role_guid: roleToEdit ? roleToEdit.role_guid : undefined,
            name: roleName,
            description,
            permissions: permissionsArray
        });
        onClose();
    };

    const PermissionCard = ({ module }) => {
        const modulePerms = permissions[module] || { view: false, edit: false, delete: false, full_access: false };
        const isActive = modulePerms.view || modulePerms.edit || modulePerms.delete || modulePerms.full_access;

        return (
            <Box sx={{
                p: 1.5,
                borderRadius: '12px',
                border: '2px solid',
                borderColor: isActive ? '#5569ff' : alpha(theme.palette.divider, 0.5),
                bgcolor: isActive ? alpha('#5569ff', 0.02) : 'background.paper',
                transition: 'all 0.2s ease',
                '&:hover': {
                    borderColor: '#5569ff',
                }
            }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="body1" fontWeight={700} sx={{ color: '#1e293b' }}>
                        {module}
                    </Typography>
                    {isActive && <CheckCircleIcon sx={{ color: '#5569ff', fontSize: 18 }} />}
                </Box>

                <Divider sx={{ mb: 1, opacity: 0.5 }} />

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                size="small"
                                checked={modulePerms.full_access}
                                onChange={handleCheckboxChange(module, 'full_access')}
                                sx={{ color: '#cbd5e1', '&.Mui-checked': { color: '#5569ff' } }}
                            />
                        }
                        label={<Typography variant="body2" fontWeight={600} color="#334155">Full Access</Typography>}
                        sx={{ ml: -0.5 }}
                    />

                    <Box sx={{ display: 'flex', gap: 1, ml: -0.5 }}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    size="small"
                                    checked={modulePerms.view}
                                    onChange={handleCheckboxChange(module, 'view')}
                                    sx={{ color: '#cbd5e1', '&.Mui-checked': { color: '#5569ff' } }}
                                />
                            }
                            label={<Typography variant="caption" fontWeight={500} color="#64748b">View</Typography>}
                            sx={{ mr: 1 }}
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    size="small"
                                    checked={modulePerms.edit}
                                    onChange={handleCheckboxChange(module, 'edit')}
                                    sx={{ color: '#cbd5e1', '&.Mui-checked': { color: '#5569ff' } }}
                                />
                            }
                            label={<Typography variant="caption" fontWeight={500} color="#64748b">Edit</Typography>}
                            sx={{ mr: 1 }}
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    size="small"
                                    checked={modulePerms.delete}
                                    onChange={handleCheckboxChange(module, 'delete')}
                                    sx={{ color: '#cbd5e1', '&.Mui-checked': { color: '#5569ff' } }}
                                />
                            }
                            label={<Typography variant="caption" fontWeight={500} color="#64748b">Delete</Typography>}
                        />
                    </Box>
                </Box>
            </Box>
        );
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
            PaperProps={{
                sx: { borderRadius: '16px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }
            }}
        >
            <DialogTitle sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                p: 2,
                px: 3,
                borderBottom: '1px solid',
                borderColor: 'divider'
            }}>
                <Typography variant="h6" fontWeight={700} sx={{ fontFamily: 'Montserrat', color: '#0f172a' }}>
                    {roleToEdit ? 'Edit Role' : 'Add New Role'}
                </Typography>
                <IconButton onClick={onClose} size="small" sx={{ bgcolor: 'action.hover' }}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent sx={{ p: 2, px: 3, bgcolor: '#f8f9fc', mt: 2 }}>
                <Grid container spacing={2}>
                    {/* Role Info Column */}
                    <Grid item xs={12} md={4}>
                        <Box sx={{
                            p: 2,
                            borderRadius: '12px',
                            bgcolor: 'background.paper',
                            border: '1px solid',
                            borderColor: 'divider',
                            height: '100%', ml: 18
                        }}>
                            <Typography variant="caption" fontWeight={700} color="text.secondary" sx={{ display: 'block', mb: 2, textTransform: 'uppercase' }}>
                                Basic Information
                            </Typography>
                            <TextField
                                label="Role Name"
                                fullWidth
                                variant="outlined"
                                size="small"
                                value={roleName}
                                onChange={(e) => setRoleName(e.target.value)}
                                required
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                label="Description"
                                fullWidth
                                multiline
                                rows={3}
                                variant="outlined"
                                size="small"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Enter role description..."
                            />
                        </Box>
                    </Grid>

                    {/* Permissions Grid Column */}
                    <Grid item xs={12} md={8}>
                        <Box sx={{
                            p: 2,
                            borderRadius: '12px',
                            bgcolor: 'background.paper',
                            border: '1px solid',
                            borderColor: 'divider'
                        }}>
                            <Typography variant="caption" fontWeight={700} color="text.secondary" sx={{ display: 'block', mb: 2, textTransform: 'uppercase' }}>
                                Module Access Control
                            </Typography>
                            <Grid container spacing={1.5}>
                                {AVAILABLE_PERMISSIONS.map((module) => (
                                    <Grid item xs={12} sm={6} key={module}>
                                        <PermissionCard module={module} />
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
            </DialogContent>

            <DialogActions sx={{ p: 2, px: 3, borderTop: '1px solid', borderColor: 'divider' }}>
                <Button onClick={onClose} variant="text" color="inherit" sx={{ borderRadius: '8px', fontWeight: 600 }}>
                    Cancel
                </Button>
                <Button
                    onClick={handleSave}
                    variant="contained"
                    disableElevation
                    sx={{
                        bgcolor: '#5569ff',
                        color: '#fff',
                        borderRadius: '8px',
                        px: 3,
                        fontWeight: 700,
                        textTransform: 'none',
                        '&:hover': { bgcolor: '#4455dd' }
                    }}
                >
                    {roleToEdit ? 'Update Role' : 'Save Role'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddRoleModal;
