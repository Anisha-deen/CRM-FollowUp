import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Box,
    Typography,
    Grid,
    Checkbox,
    FormControlLabel,
    Divider,
    IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const PERMISSION_GROUPS = {
    Organization: ['Manage Organization'],
    Users: ['View Users', 'Create Users', 'Edit Users', 'Delete Users'],
    Leads: ['View Leads', 'Create Leads', 'Edit Leads', 'Delete Leads'],
    Followups: ['Manage Followups'],
    Clients: ['Manage Clients'],
    Budgets: ['View Budgets', 'Approve Budgets'],
    Reports: ['View Reports'],
    Settings: ['Manage Settings']
};

const AddRoleModal = ({ open, onClose, onSave }) => {
    const [roleName, setRoleName] = useState('');
    const [description, setDescription] = useState('');
    const [selectedPermissions, setSelectedPermissions] = useState([]);

    // Reset state when opening
    React.useEffect(() => {
        if (open) {
            setRoleName('');
            setDescription('');
            setSelectedPermissions([]);
        }
    }, [open]);

    const handlePermissionChange = (permission) => {
        setSelectedPermissions(prev =>
            prev.includes(permission)
                ? prev.filter(p => p !== permission)
                : [...prev, permission]
        );
    };

    const handleSave = () => {
        if (!roleName.trim()) return; // Basic validation
        onSave({
            name: roleName,
            description,
            permissions: selectedPermissions,
            usersCount: 0 // New roles start with 0 users
        });
        onClose();
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: '12px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                }
            }}
        >
            <DialogTitle sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                pb: 1
            }}>
                <Typography variant="h6" fontWeight={600}>Add New Role</Typography>
                <IconButton onClick={onClose} size="small">
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent dividers>
                <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    {/* Basic Info */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <TextField
                            label="Role Name"
                            fullWidth
                            variant="outlined"
                            value={roleName}
                            onChange={(e) => setRoleName(e.target.value)}
                            required
                        />
                        <TextField
                            label="Description"
                            fullWidth
                            multiline
                            rows={2}
                            variant="outlined"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Box>

                    <Divider textAlign="left">Permissions</Divider>

                    {/* Permissions Grid - STRICT 3-COLUMN FIXED LAYOUT */}
                    <Box sx={{
                        flexGrow: 1,
                        overflowY: 'auto',
                        pr: 1,
                        display: 'grid',
                        gridTemplateColumns: {
                            xs: '1fr',              // Mobile: 1 column
                            sm: 'repeat(2, 1fr)',   // Tablet: 2 columns
                            md: 'repeat(3, 1fr)'    // Desktop: 3 columns (Strictly enforced)
                        },
                        gap: 2, // 16px gap
                        alignItems: 'start' // Prevent stretching
                    }}>
                        {/* 
                           Explicit Render Order:
                           Row 1: Organization, Users, Leads
                           Row 2: Followups, Clients, Budgets
                           Row 3: Reports, Settings, (empty)
                        */}
                        {['Organization', 'Users', 'Leads', 'Followups', 'Clients', 'Budgets', 'Reports', 'Settings'].map((group) => {
                            const permissions = PERMISSION_GROUPS[group];
                            if (!permissions) return null;

                            return (
                                <Box key={group} sx={{
                                    p: 2,
                                    borderRadius: '10px',
                                    bgcolor: '#f4f6fb',
                                    width: '100%',
                                    height: '180px', // FIXED HEIGHT
                                    display: 'flex',
                                    flexDirection: 'column',
                                    border: '1px solid transparent',
                                    boxSizing: 'border-box', // Ensure padding doesn't add to width
                                    '&:hover': {
                                        borderColor: 'primary.light',
                                        bgcolor: '#eef2fa'
                                    }
                                }}>
                                    <Typography variant="subtitle2" fontWeight={700} gutterBottom sx={{ color: '#3D52A0', mb: 1.5 }}>
                                        {group}
                                    </Typography>
                                    <Box sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: 0.5,
                                        flexGrow: 1,
                                        overflowY: 'auto', // Internal scroll
                                        '&::-webkit-scrollbar': { width: '4px' },
                                        '&::-webkit-scrollbar-thumb': { bgcolor: 'rgba(0,0,0,0.1)', borderRadius: '4px' }
                                    }}>
                                        {permissions.map(perm => (
                                            <FormControlLabel
                                                key={perm}
                                                control={
                                                    <Checkbox
                                                        size="small"
                                                        checked={selectedPermissions.includes(perm)}
                                                        onChange={() => handlePermissionChange(perm)}
                                                        sx={{
                                                            color: '#8697C4',
                                                            '&.Mui-checked': { color: '#3D52A0' },
                                                            py: 0.5
                                                        }}
                                                    />
                                                }
                                                label={<Typography variant="body2" sx={{ fontWeight: 500 }}>{perm}</Typography>}
                                                sx={{ ml: -1, mr: 0, alignItems: 'flex-start', width: '100%' }}
                                            />
                                        ))}
                                    </Box>
                                </Box>
                            );
                        })}
                    </Box>
                </Box>
            </DialogContent>

            <DialogActions sx={{ p: 2.5, gap: 1 }}>
                <Button
                    onClick={onClose}
                    variant="outlined"
                    sx={{
                        color: 'text.secondary',
                        borderColor: 'divider',
                        '&:hover': { borderColor: 'text.secondary', bgcolor: 'transparent' }
                    }}
                >
                    Cancel
                </Button>
                <Button
                    onClick={handleSave}
                    variant="contained"
                    disableElevation
                    sx={{
                        bgcolor: '#3D52A0',
                        color: '#fff',
                        '&:hover': { bgcolor: '#2F3E80' }
                    }}
                >
                    Save Role
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddRoleModal;
