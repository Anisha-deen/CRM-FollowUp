import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Grid,
    MenuItem,
    InputAdornment
} from '@mui/material';

const BudgetModal = ({ open, onClose, onSave, budget }) => {
    const [formData, setFormData] = useState({
        leadName: '',
        estimatedAmount: '',
        discount: '',
        finalAmount: '',
        status: 'Pending'
    });

    useEffect(() => {
        if (budget) {
            setFormData({
                leadName: budget.leadName,
                estimatedAmount: budget.estimatedAmount,
                discount: budget.discount,
                finalAmount: budget.finalAmount,
                status: budget.status
            });
        } else {
            setFormData({
                leadName: '',
                estimatedAmount: '',
                discount: '',
                finalAmount: '',
                status: 'Pending'
            });
        }
    }, [budget, open]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        let newFormData = { ...formData, [name]: value };

        if (name === 'estimatedAmount' || name === 'discount') {
            const estimated = parseFloat(name === 'estimatedAmount' ? value : formData.estimatedAmount) || 0;
            const discount = parseFloat(name === 'discount' ? value : formData.discount) || 0;
            newFormData.finalAmount = Math.max(0, estimated - discount);
        }

        setFormData(newFormData);
    };

    const handleSubmit = () => {
        onSave({
            ...formData,
            id: budget ? budget.id : undefined,
            estimatedAmount: parseFloat(formData.estimatedAmount),
            discount: parseFloat(formData.discount),
            finalAmount: parseFloat(formData.finalAmount),
        });
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>{budget ? 'Edit Budget' : 'Add New Budget'}</DialogTitle>

            <DialogContent dividers>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Lead Name"
                            name="leadName"
                            value={formData.leadName}
                            onChange={handleChange}
                            variant="outlined"
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Estimated Amount"
                            name="estimatedAmount"
                            type="number"
                            value={formData.estimatedAmount}
                            onChange={handleChange}
                            InputProps={{
                                startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Discount"
                            name="discount"
                            type="number"
                            value={formData.discount}
                            onChange={handleChange}
                            InputProps={{
                                startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Final Amount"
                            name="finalAmount"
                            type="number"
                            value={formData.finalAmount}
                            InputProps={{
                                readOnly: true,
                                startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                            }}
                            variant="filled"
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            select
                            fullWidth
                            label="Status"
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                        >
                            <MenuItem value="Pending">Pending</MenuItem>
                            <MenuItem value="Approved">Approved</MenuItem>
                            <MenuItem value="Rejected">Rejected</MenuItem>
                        </TextField>
                    </Grid>
                </Grid>
            </DialogContent>

            <DialogActions sx={{ p: 2.5 }}>
                <Button onClick={onClose} color="inherit">Cancel</Button>
                <Button onClick={handleSubmit} variant="contained" color="primary">
                    {budget ? 'Update Budget' : 'Create Budget'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default BudgetModal;
