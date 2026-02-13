import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormControlLabel,
    Switch,
    FormHelperText,
    Box, 
    useTheme,
    useMediaQuery
} from '@mui/material';
const ROLES = [
    'Super Admin',
    'Admin',
    'Manager',
    'Telecaller',
    'Finance'
];

const UserFormModal = ({ open, onClose, onSave, initialData, mode }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: '',
        status: 'Active'
    });
    const theme = useTheme();
const ismobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (open) {
            if (mode === 'edit' && initialData) {
                setFormData({
                    name: initialData.name || '',
                    email: initialData.email || '',
                    password: '', // Password not shown on edit
                    role: initialData.role || '',
                    status: initialData.status || 'Active'
                });
            } else {
                setFormData({
                    name: '',
                    email: '',
                    password: '',
                    role: '',
                    status: 'Active'
                });
            }
            setErrors({});
        }
    }, [open, mode, initialData]);

    const handleChange = (e) => {
        const { name, value, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'status' ? (checked ? 'Active' : 'Inactive') : value
        }));

        // Clear error when user types
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';

        if (mode === 'add' && !formData.password.trim()) {
            newErrors.password = 'Password is required';
        }

        if (!formData.role) newErrors.role = 'Role is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (validate()) {
            onSave(formData);
        }
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
        >
            <DialogTitle sx={{ fontWeight: 700 }}>
                {mode === 'add' ? 'Add New User' : 'Edit User'}
            </DialogTitle>
            <DialogContent dividers>
                <Box component="form" noValidate sx={{ mt: 1 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Full Name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                error={!!errors.name}
                                helperText={errors.name}
                                variant="outlined"
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Email Address"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                error={!!errors.email}
                                helperText={errors.email}
                                variant="outlined"
                                required
                            />
                        </Grid>

                        {/* Password only required for Add mode */}
                        {mode === 'add' && (
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Password"
                                    name="password"
                                    type="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    error={!!errors.password}
                                    helperText={errors.password}
                                    variant="outlined"
                                    required
                                />
                            </Grid>
                        )}

                        <Grid item xs={12} sm={6} width={ismobile?"100%":"44%"}>
                            <FormControl fullWidth error={!!errors.role} required>
                                <InputLabel id="role-select-label">Role</InputLabel>
                                <Select
                                    labelId="role-select-label"
                                    name="role"
                                    value={formData.role}
                                    label="Role"
                                    onChange={handleChange}
                                >
                                    {ROLES.map((role) => (
                                        <MenuItem key={role} value={role}>
                                            {role}
                                        </MenuItem>
                                    ))}
                                </Select>
                                {errors.role && <FormHelperText>{errors.role}</FormHelperText>}
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sx={{ mt: 1 }}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={formData.status === 'Active'}
                                        onChange={handleChange}
                                        name="status"
                                        color="success"
                                    />
                                }
                                label="Active"
                                sx={{ ml: 1 }}
                            />
                        </Grid>
                    </Grid>
                </Box>
            </DialogContent>
            <DialogActions sx={{ p: 2.5 }}>
                <Button
                    onClick={onClose}
                    color="inherit"
                >
                    Cancel
                </Button>
                <Button
                    onClick={handleSubmit}
                    variant="contained"
                    color="primary"
                >
                    Save User
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default UserFormModal;
