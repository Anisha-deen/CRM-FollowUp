import React from 'react';
import { Button, Typography, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import PageContainer from '../components/PageContainer';
import DataTableCard from '../components/DataTableCard';

const Roles = () => {
    return (
        <PageContainer
            title="Roles & Permissions"
            subtitle="Configure user roles and access levels."
            action={
                <Button variant="contained" startIcon={<AddIcon />}>
                    Add Role
                </Button>
            }
        >
            <DataTableCard>
                <Box sx={{ p: 3, textAlign: 'center' }}>
                    <Typography variant="body1" color="text.secondary">
                        No roles defined. Add a new role to get started.
                    </Typography>
                </Box>
            </DataTableCard>
        </PageContainer>
    );
};

export default Roles;
