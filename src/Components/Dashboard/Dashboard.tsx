// Dashboard.tsx
import React from 'react';
import { Box, Container, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Sidebar from '../Shared/SidebarAdmin/Sidebar';
import DashboardOverview from './DashboardOverview';

const Dashboard: React.FC = () => {
  const bookings = [
    { name: 'Rachel Rajan', id: '197431', seat: 'TVM-19-TH-019', office: 'Cell Content', date: '05-08-2024', status: 'Open' },
    { name: 'Rachel Rajan', id: '197431', seat: 'TVM-19-TH-019', office: 'Cell Content', date: '05-08-2024', status: 'Open' },
    { name: 'Rachel Rajan', id: '197431', seat: 'TVM-19-TH-019', office: 'Cell Content', date: '05-08-2024', status: 'Open' },
    { name: 'Rachel Rajan', id: '197431', seat: 'TVM-19-TH-019', office: 'Cell Content', date: '05-08-2024', status: 'Open' },
    { name: 'Rachel Rajan', id: '197431', seat: 'TVM-19-TH-019', office: 'Cell Content', date: '05-08-2024', status: 'Open' },
    
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Typography style={{color:'#27314B'}} variant="h4" gutterBottom>DASHBOARD</Typography>
        <DashboardOverview/>
        <Box mt={4}>
          <Typography style={{color:'#27314B'}} variant="h6">Bookings</Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Employee Name</TableCell>
                  <TableCell>EXP ID</TableCell>
                  <TableCell>Seat Number</TableCell>
                  <TableCell>Office</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bookings.map((booking, index) => (
                  <TableRow key={index}>
                    <TableCell>{booking.name}</TableCell>
                    <TableCell>{booking.id}</TableCell>
                    <TableCell>{booking.seat}</TableCell>
                    <TableCell>{booking.office}</TableCell>
                    <TableCell>{booking.date}</TableCell>
                    <TableCell><a href="#">{booking.status}</a></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
