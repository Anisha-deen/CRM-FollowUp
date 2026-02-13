import React from 'react';
import { Box, Card, CardContent, Typography, useTheme } from '@mui/material';
import { alpha } from '@mui/material/styles';
import BusinessIcon from '@mui/icons-material/Business';
import PageContainer from '../components/PageContainer';

const Organization = () => {
    const theme = useTheme();

    return (
        <PageContainer
            title="Organization"
            subtitle="View organization information"
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '60vh'
                }}
            >
                <Card
                    sx={{
                        width: { xs: '100%', sm: '80%', md: '600px' },
                        textAlign: 'center',
                        p: 4,
                        borderRadius: '10px',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
                    }}
                >
                    <CardContent>
                        <Box
                            sx={{
                                width: 80,
                                height: 80,
                                borderRadius: '50%',
                                bgcolor: alpha('#3D52A0', 0.1),
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto',
                                mb: 3,
                                color: '#3D52A0'
                            }}
                        >
                            <BusinessIcon sx={{ fontSize: 40 }} />
                        </Box>
                        <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600, fontFamily: 'Montserrat' }}>
                            No organization data available
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ fontFamily: 'Montserrat' }}>
                            Organization information will appear here.
                        </Typography>
                    </CardContent>
                </Card>
            </Box>
        </PageContainer>
    );
};

export default Organization;
