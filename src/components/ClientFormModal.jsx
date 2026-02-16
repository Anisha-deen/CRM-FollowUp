import React, { useState, useEffect, useRef } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Grid,
    MenuItem,
    InputAdornment,
    Typography,
    Box,
    IconButton
} from '@mui/material';
import {
    Person as PersonIcon,
    CalendarToday as CalendarIcon,
    Description as FileIcon,
    Close as CloseIcon,
    CloudUpload as CloudUploadIcon,
    Business as BusinessIcon
} from '@mui/icons-material';

const ClientFormModal = ({ open, onClose, onSave, leads, clients, initialData, mode }) => {
    const [formData, setFormData] = useState({
        lead_guid: '',
        contract_file: '',
        start_date: new Date().toISOString().split('T')[0]
    });

    const fileInputRef = useRef(null);

    useEffect(() => {
        if (open) {
            if (mode === 'edit' && initialData) {
                setFormData({
                    lead_guid: initialData.lead_guid,
                    contract_file: initialData.contract_file || 'Financial_Report.pdf',
                    start_date: initialData.start_date
                });
            } else {
                setFormData({
                    lead_guid: '',
                    contract_file: '',
                    start_date: new Date().toISOString().split('T')[0]
                });
            }
        }
    }, [open, mode, initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({ ...prev, contract_file: file }));
        }
    };

    const handleSubmit = () => {
        if (formData.lead_guid && formData.start_date) {
            onSave(formData);
        } else {
            alert('Please select a lead and start date.');
        }
    };

    // Filter available leads logic
    const availableLeads = leads.filter(lead => {
        
        if (mode === 'edit' && initialData && lead.lead_guid === initialData.lead_guid) {
            return true;
        }
       
        return !clients.some(c => c.lead_guid === lead.lead_guid);
    });

    // Helper to get display name
    const getFileName = () => {
        if (!formData.contract_file) return '';
        if (formData.contract_file instanceof File) return formData.contract_file.name;
        
        return typeof formData.contract_file === 'string'
            ? formData.contract_file.split('/').pop()
            : '';
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                sx: { borderRadius: 2 }
            }}
        >
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <PersonIcon sx={{ color: mode === 'add' ? 'success.main' : 'primary.main' }} />
                    <Typography variant="h6" fontWeight={700}>
                        {mode === 'add' ? 'Add New Client' : 'Edit Client'}
                    </Typography>
                </Box>
                <IconButton onClick={onClose} size="small">
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent dividers sx={{ borderTop: '1px solid #eee', borderBottom: 'none' }}>
                <Grid container spacing={3}>
                    {/* CLIENT INFORMATION SECTION */}
                    <Grid item xs={12}>
                        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, letterSpacing: 0.5, mb: 2, display: 'block' }}>
                            CLIENT INFORMATION
                        </Typography>

                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    select
                                    fullWidth
                                    label={mode === 'add' ? "Select Lead *" : "Selected Lead"}
                                    name="lead_guid"
                                    value={formData.lead_guid}
                                    onChange={handleChange}
                                    required
                                    disabled={mode === 'edit'}
                                    SelectProps={{
                                        displayEmpty: true,
                                        renderValue: (selected) => {
                                            if (!selected) {
                                                return <Typography color="text.secondary">Search by name or company...</Typography>;
                                            }
                                            const lead = leads.find(l => l.lead_guid === selected);
                                            return lead ? `${lead.client_name} - ${lead.company_name || lead.company}` : selected;
                                        }
                                    }}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <BusinessIcon color="action" />
                                            </InputAdornment>
                                        ),
                                    }}
                                    sx={{ mb: 2 }}
                                >
                                    {availableLeads.length > 0 ? (
                                        availableLeads.map((lead) => (
                                            <MenuItem key={lead.lead_guid} value={lead.lead_guid}>
                                                {lead.client_name} - {lead.company_name || lead.company} ({lead.status})
                                            </MenuItem>
                                        ))
                                    ) : (
                                        <MenuItem disabled value="">
                                            No available leads
                                        </MenuItem>
                                    )}
                                </TextField>
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    type="date"
                                    label="Contract Start Date *"
                                    name="start_date"
                                    value={formData.start_date}
                                    onChange={handleChange}
                                    required
                                    InputLabelProps={{ shrink: true }}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <CalendarIcon color="action" />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </Grid>

                    {/* CONTRACT DOCUMENT SECTION */}
                    <Grid item xs={12}>
                        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, letterSpacing: 0.5, mb: 1, display: 'block', mt: 1 }}>
                            CONTRACT DOCUMENT
                        </Typography>

                        <Box
                            onClick={handleFileClick}
                            sx={{
                                border: '2px dashed #e0e0e0',
                                borderRadius: 2,
                                p: 4,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                transition: 'border-color 0.2s',
                                '&:hover': {
                                    borderColor: 'primary.main',
                                    bgcolor: 'rgba(0,0,0,0.01)'
                                }
                            }}
                        >
                            <input
                                type="file"
                                hidden
                                ref={fileInputRef}
                                onChange={handleFileChange}
                            />

                            {formData.contract_file ? (
                                <>
                                    <FileIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
                                    <Typography variant="subtitle1" fontWeight={600}>
                                        {getFileName()}
                                    </Typography>
                                    <Typography variant="body2" color="primary">
                                        Click to replace file
                                    </Typography>
                                </>
                            ) : (
                                <>
                                    <CloudUploadIcon color="action" sx={{ fontSize: 40, mb: 1 }} />
                                    <Typography variant="body1" fontWeight={600} sx={{ mt: 1 }}>
                                        Click to upload Contract
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        PDF, PNG, or JPG (Max 5MB)
                                    </Typography>
                                </>
                            )}
                        </Box>
                    </Grid>
                </Grid>
            </DialogContent>

            <DialogActions sx={{ p: 2, pt: 0 }}>
                <Button onClick={onClose} color="inherit" sx={{ textTransform: 'none' }}>
                    Cancel
                </Button>
                <Button
                    onClick={handleSubmit}
                    variant="contained"
                    disableElevation
                    sx={{
                        textTransform: 'none',
                        px: 3,
                        bgcolor: '#3B82F6',
                        '&:hover': { bgcolor: '#2563EB' }
                    }}
                >
                    {mode === 'add' ? 'Add Client' : 'Update Client'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ClientFormModal;
