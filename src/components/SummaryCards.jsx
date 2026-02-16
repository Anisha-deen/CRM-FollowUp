import React from 'react';
import { Grid, Card, CardContent, Typography, Box, useTheme } from '@mui/material';

const SummaryCards = ({ items, showChart = false }) => {
    const theme = useTheme();

    return (
        <Grid container spacing={3} sx={{ mb: 4, width: '100%' }}>
            {items.map((item, index) => (
                <Grid key={index} item xs={12} sm={6} md={3}>
                    <Card
                        elevation={0}
                        sx={{
                            height: '100%',
                            minHeight: showChart ? 180 : 176,
                            borderRadius: showChart ? '16px' : '42px',
                            backgroundColor: 'background.paper',
                            boxShadow: theme.shadows[1],
                            transition: 'all 0.3s ease',
                            border: '1px solid',
                            borderColor: 'divider',
                            '&:hover': {
                                transform: 'translateY(-4px)',
                                boxShadow: theme.shadows[4],
                            },
                        }}
                    >
                        <CardContent
                            sx={{
                                p: showChart ? '24px !important' : '18px !important',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: showChart ? 'space-between' : 'flex-start',
                                height: '100%',
                            }}
                        >
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: showChart ? 2 : 1.2 }}>
                                <Box
                                    sx={{
                                        width: showChart ? 56 : 58,
                                        height: showChart ? 56 : 58,
                                        borderRadius: showChart ? '16px' : '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        backgroundColor: item.bgColor || `${item.color}15`,
                                        color: item.color,
                                        mr: 1.4,
                                        flexShrink: 0,
                                    }}
                                >
                                    {item.icon}
                                </Box>

                                <Box sx={{ minWidth: 0, flex: 1 }}>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: '#5f7593',
                                            fontWeight: 600,
                                            mb: showChart ? 0.5 : 0,
                                            fontSize: showChart ? '0.875rem' : '0.9rem',
                                            lineHeight: 1.3,
                                            whiteSpace: 'normal',
                                            wordBreak: 'normal',
                                            overflowWrap: 'normal',
                                        }}
                                    >
                                        {item.title}
                                    </Typography>
                                </Box>
                            </Box>

                            <Typography
                                variant="h4"
                                sx={{
                                    fontWeight: 800,
                                    color: 'text.primary',
                                    fontSize: showChart ? '1.75rem' : { xs: '1.85rem', md: '2rem' },
                                    lineHeight: 1.1,
                                    ml: 0,
                                    mt: showChart ? 0 : 0.35,
                                    whiteSpace: 'nowrap',
                                    textAlign: showChart ? 'left' : (item.valueAlign || 'center')
                                }}
                            >
                                {item.value}
                            </Typography>

                            {showChart ? (
                                <Box sx={{
                                    width: '100%',
                                    height: 60,
                                    minWidth: 0,
                                    borderRadius: 1.5,
                                    backgroundColor: item.color,
                                    opacity: 0.95
                                }} />
                            ) : null}
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};


export default SummaryCards;
