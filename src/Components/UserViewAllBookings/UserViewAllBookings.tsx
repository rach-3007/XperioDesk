import React from 'react';
import { Box, Typography, Grid, Card, CardContent, Button } from '@mui/material';

const MyBookings: React.FC = () => {
  const bookings = [
    {
      date: 'Monday, 29th July 2024',
      time: 'Full Day',
      seat: 'TVM2-M1-WS-21',
      module: 'Module 2',
      type: 'Desk',
      actions: ['Edit Booking', 'Cancel Booking']
    },
    {
      date: 'Friday, 26th July 2024',
      time: '9:30 AM - 12:30 PM',
      seat: 'TVM2-M1-WS-21',
      module: 'Module 2',
      type: 'Desk',
      actions: ['Book Again']
    },
    {
      date: 'Wednesday, 24th July 2024',
      time: 'Full Day',
      seat: 'TVM2-M1-WS-21',
      module: 'Module 2',
      type: 'Desk',
      actions: ['Edit Booking', 'Cancel Booking']
    },
    {
      date: 'Monday, 29th July 2024',
      time: 'Full Day',
      seat: 'TVM2-M1-WS-21',
      module: 'Module 2',
      type: 'Desk',
      actions: ['Edit Booking', 'Cancel Booking']
    },
  ];

  return (
    <Box sx={{ p: 4, backgroundColor: '#f5f5f5', minHeight: '100vh',display:'flex', flexDirection:'column' }}>
      <Box sx={{ backgroundColor: '#04122E',display:'flex', color: '#fff', p: 2,width:'100%',position:'absolute',top:0,left:0 }}>
        <Typography sx={{pl:4}} variant="h4">My Bookings</Typography>
      </Box>
      <Box sx={{ mt: 10 }}>
        <Typography sx={{display:'flex',color:'#04122E', fontWeight:'1000',fontSize:'1.5rem' }} variant="h6">Seats</Typography>
        <Grid container spacing={3} sx={{ mt: 2 }}>
          {bookings.map((booking, index) => (
            <Grid item xs={12} sm={6} md={6} key={index}>
              <Card sx={{ borderRadius: 2, boxShadow: 1, py:3, px:4 }}>
                <CardContent>
                  <Box sx={{display:'flex' , justifyContent:'space-between',py:1}}>
                  <Typography variant="body2"sx={{ mb: 1 , backgroundColor:'#D9D9D9', borderRadius:10, px:1, fontWeight:'800',fontSize:'1.1rem' }}>
                    {booking.date}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1, backgroundColor:'#D9D9D9',borderRadius:10, px:1, fontWeight:'800',fontSize:'1.1rem'   }}>
                    {booking.time}
                  </Typography>
                  </Box>
                  <Box sx={{display:'flex', justifyContent:'space-between',py:1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 'bold',fontSize:'1.1rem' }}>
                    Selected Seat:
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 'bold',fontSize:'1.1rem' }}>
                    {booking.seat}
                  </Typography>
                  </Box>
                  <Box sx={{display:'flex', justifyContent:'space-between',py:1}}>
                  <Typography variant="body2" sx={{ color:'#716E6E',fontSize:'1.1rem'  }}>
                    {booking.module}
                  </Typography>
                  <Typography variant="body2" sx={{ color:'#716E6E',fontSize:'1.1rem' }} >
                    {booking.type}
                  </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent:'space-between', mt: 2,py:1 }}>
                    {booking.actions.map((action, idx) => (
                      <Button
                        key={idx}
                        variant={action === 'Cancel Booking' ? 'outlined' : 'contained'}
                        sx={{backgroundColor:'#04122E', color:'white',fontSize:'1.1rem' }}
                      >
                        {action}
                      </Button>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default MyBookings;
