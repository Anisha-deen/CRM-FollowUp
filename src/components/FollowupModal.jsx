import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    MenuItem,
    Grid,
    Box
} from '@mui/material';

const FollowupModal = ({ open, onClose, onSave, followup }) => {
    const [formData, setFormData] = useState({
        lead_name: '',
        type: 'Call',
        date: '',
        time: '',
        status: 'Pending',
        assigned_to: '',
        outcome: ''
    });

    useEffect(() => {
        if (followup) {
            setFormData({
                lead_name: followup.lead_name || '',
                type: followup.type || 'Call',
                date: followup.date || '',
                time: followup.time || '',
                status: followup.status || 'Pending',
                assigned_to: followup.assigned_to || '',
                outcome: followup.outcome || ''
            });
        } else {
            setFormData({
                lead_name: '',
                type: 'Call',
                date: new Date().toISOString().split('T')[0],
                time: '',
                status: 'Pending',
                assigned_to: '',
                outcome: ''
            });
        }
    }, [followup, open]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = () => {
        onSave(formData);
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
        >
            <DialogTitle sx={{ fontWeight: 700 }}>
                {followup ? 'Edit Follow-up' : 'New Follow-up'}
            </DialogTitle>
            <DialogContent dividers>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Lead Name"
                            name="lead_name"
                            value={formData.lead_name}
                            onChange={handleChange}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            select
                            fullWidth
                            label="Type"
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            variant="outlined"
                        >
                            <MenuItem value="Call">Call</MenuItem>
                            <MenuItem value="Email">Email</MenuItem>
                            <MenuItem value="Meeting">Meeting</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            select
                            fullWidth
                            label="Status"
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            variant="outlined"
                        >
                            <MenuItem value="Pending">Pending</MenuItem>
                            <MenuItem value="Completed">Completed</MenuItem>
                            <MenuItem value="Missed">Missed</MenuItem>
                            <MenuItem value="Scheduled">Scheduled</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            type="date"
                            label="Date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            InputLabelProps={{ shrink: true }}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            type="time"
                            label="Time"
                            name="time"
                            value={formData.time}
                            onChange={handleChange}
                            InputLabelProps={{ shrink: true }}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Assigned To"
                            name="assigned_to"
                            value={formData.assigned_to}
                            onChange={handleChange}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            multiline
                            rows={3}
                            label="Outcome / Notes"
                            name="outcome"
                            value={formData.outcome}
                            onChange={handleChange}
                            variant="outlined"
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions sx={{ p: 2.5 }}>
                <Button onClick={onClose} color="inherit">
                    Cancel
                </Button>
                <Button
                    onClick={handleSubmit}
                    variant="contained"
                    color="primary"
                >
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default FollowupModal;
