import React from 'react';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Sidebar from '../Shared/SidebarAdmin/Sidebar';
import DashboardOverview from './DashboardOverview';

const Dashboard: React.FC = () => {
  const bookings = [
    { name: 'Rachel Rajan', id: '197431', seat: 'TVM-19-TH-019', office: 'Techno Park', date: '05-08-2024', status: 'Open' },
    { name: 'Rachel Rajan', id: '197431', seat: 'TVM-19-TH-019', office: 'Techno Park', date: '05-08-2024', status: 'Open' },
    { name: 'Rachel Rajan', id: '197431', seat: 'TVM-19-TH-019', office: 'Techno Park', date: '05-08-2024', status: 'Open' },
    { name: 'Rachel Rajan', id: '197431', seat: 'TVM-19-TH-019', office: 'Techno Park', date: '05-08-2024', status: 'Open' },
    { name: 'Rachel Rajan', id: '197431', seat: 'TVM-19-TH-019', office: 'Techno Park', date: '05-08-2024', status: 'Open' },
  ];

  return (
    <Box sx={{ display: 'flex', backgroundColor: '#F4F6F8', minHeight: '100vh' }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4" gutterBottom sx={{ color: '#1A202C', fontWeight: 600, letterSpacing: '0.5px' }}>
          Dashboard
        </Typography>
        <DashboardOverview />
        <Box mt={4}>
          <Typography variant="h6" sx={{ color: '#1A202C', fontWeight: 500 }}>
            Recent Bookings
          </Typography>
          <TableContainer component={Paper} sx={{ boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', borderRadius: '8px' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600, color: '#2D3748' }}>Employee Name</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#2D3748' }}>EXP ID</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#2D3748' }}>Seat Number</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#2D3748' }}>Office</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#2D3748' }}>Date</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#2D3748' }}>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bookings.map((booking, index) => (
                  <TableRow 
                    key={index} 
                    sx={{ '&:hover': { backgroundColor: '#EDF2F7' } }}
                  >
                    <TableCell sx={{ color: '#4A5568' }}>{booking.name}</TableCell>
                    <TableCell sx={{ color: '#4A5568' }}>{booking.id}</TableCell>
                    <TableCell sx={{ color: '#4A5568' }}>{booking.seat}</TableCell>
                    <TableCell sx={{ color: '#4A5568' }}>{booking.office}</TableCell>
                    <TableCell sx={{ color: '#4A5568' }}>{booking.date}</TableCell>
                    <TableCell sx={{ color: '#3182CE', fontWeight: 500 }}>
                      <a href="#" style={{ textDecoration: 'none', color: '#3182CE' }}>{booking.status}</a>
                    </TableCell>
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
