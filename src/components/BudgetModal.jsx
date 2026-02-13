import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    MenuItem,
    InputAdornment,
    Box,
    Typography,
    IconButton,
    useTheme
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import CalculateIcon from '@mui/icons-material/Calculate';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';

const BudgetModal = ({ open, onClose, onSave, budget }) => {
    const theme = useTheme();

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

    // Card wrapper for inputs
    const InputCard = ({ label, icon, children }) => (
        <Box sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: 1.5,
            p: 2,
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: '12px',
            bgcolor: 'background.paper',
            transition: 'all 0.2s',
            boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
            '&:hover': {
                borderColor: theme.palette.primary.main,
                boxShadow: '0 4px 12px rgba(61, 82, 160, 0.08)'
            }
        }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{
                    color: theme.palette.primary.main,
                    display: 'flex',
                    alignItems: 'center',
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                    p: 0.5,
                    borderRadius: '6px'
                }}>
                    {React.cloneElement(icon, { fontSize: 'small' })}
                </Box>
                <Typography variant="caption" fontWeight={600} color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {label}
                </Typography>
            </Box>
            <Box sx={{ flexGrow: 1 }}>
                {children}
            </Box>
        </Box>
    );

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: '16px',
                    width: '100%',
                    maxWidth: '840px',
                    boxShadow: '0 24px 48px rgba(0,0,0,0.2)'
                }
            }}
        >
            <DialogTitle sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                px: 4,
                py: 2.5,
                borderBottom: '1px solid',
                borderColor: 'divider',
                bgcolor: 'background.paper'
            }}>
                <Typography variant="h5" fontWeight={700} sx={{ fontFamily: 'Montserrat' }}>
                    {budget ? 'Edit Budget' : 'Add New Budget'}
                </Typography>
                <IconButton onClick={onClose} size="small" sx={{ bgcolor: 'action.hover' }}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent dividers sx={{ p: 4, bgcolor: '#f8f9fc' }}>
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
                    {/* Row 1 */}
                    <InputCard label="Lead Name" icon={<PersonIcon />}>
                        <TextField
                            fullWidth
                            name="leadName"
                            value={formData.leadName}
                            onChange={handleChange}
                            variant="outlined"
                            placeholder="Enter lead name"
                            sx={{ '& .MuiInputBase-root': { height: '48px' } }}
                        />
                    </InputCard>

                    <InputCard label="Estimated Amount" icon={<MonetizationOnIcon />}>
                        <TextField
                            fullWidth
                            name="estimatedAmount"
                            type="number"
                            value={formData.estimatedAmount}
                            onChange={handleChange}
                            InputProps={{
                                startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                            }}
                            sx={{ '& .MuiInputBase-root': { height: '48px' } }}
                        />
                    </InputCard>

                    {/* Row 2 */}
                    <InputCard label="Discount" icon={<LocalOfferIcon />}>
                        <TextField
                            fullWidth
                            name="discount"
                            type="number"
                            value={formData.discount}
                            onChange={handleChange}
                            InputProps={{
                                startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                            }}
                            sx={{ '& .MuiInputBase-root': { height: '48px' } }}
                        />
                    </InputCard>

                    <InputCard label="Final Amount" icon={<CalculateIcon />}>
                        <TextField
                            fullWidth
                            name="finalAmount"
                            type="number"
                            value={formData.finalAmount}
                            InputProps={{
                                readOnly: true,
                                startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                            }}
                            variant="filled"
                            sx={{ '& .MuiInputBase-root': { height: '48px' } }}
                        />
                    </InputCard>

                    {/* Row 3 */}
                    <InputCard label="Status" icon={<AssignmentTurnedInIcon />}>
                        <TextField
                            select
                            fullWidth
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            sx={{ '& .MuiInputBase-root': { height: '48px' } }}
                        >
                            <MenuItem value="Pending">Pending</MenuItem>
                            <MenuItem value="Approved">Approved</MenuItem>
                            <MenuItem value="Rejected">Rejected</MenuItem>
                        </TextField>
                    </InputCard>

                    {/* Empty placeholder for alignment */}
                    <Box sx={{ display: { xs: 'none', md: 'block' } }} />
                </Box>
            </DialogContent>

            <DialogActions sx={{
                p: 2,
                px: 3,
                borderTop: '1px solid',
                borderColor: 'divider',
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                gap: 2
            }}>
                <Button
                    onClick={onClose}
                    variant="outlined"
                    sx={{
                        borderRadius: '8px',
                        textTransform: 'none',
                        borderColor: '#D0D5DD',
                        color: '#344054',
                        height: 44,
                        px: 2.5,
                        fontWeight: 600,
                        fontSize: '14px',
                        '&:hover': {
                            borderColor: '#D0D5DD',
                            bgcolor: 'rgba(52, 64, 84, 0.04)'
                        }
                    }}
                >
                    Cancel
                </Button>
                <Button
                    onClick={handleSubmit}
                    variant="contained"
                    disableElevation
                    sx={{
                        borderRadius: '8px',
                        bgcolor: '#3D52A0',
                        textTransform: 'none',
                        fontFamily: 'Montserrat',
                        fontWeight: 600,
                        fontSize: '14px',
                        height: 44,
                        px: 2.5,
                        whiteSpace: 'nowrap',
                        '&:hover': { bgcolor: '#334485' }
                    }}
                >
                    {budget ? 'Update Budget' : 'Create Budget'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default BudgetModal;
