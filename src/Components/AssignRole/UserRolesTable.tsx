// UserRolesTable.tsx
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem, Typography } from '@mui/material';

const UserRolesTable: React.FC = () => {
  const [roles, setRoles] = useState([
    { name: 'Amal Rajeev', email: 'amalrajeev2075@gmail.com', status: 'Active', role: 'Admin', seating: 'Permanent' },
    { name: 'Rachel Rajan', email: 'amalrajeev2075@gmail.com', status: 'Blocked', role: 'Admin', seating: 'Permanent' },
    { name: 'Sethu M', email: 'amalrajeev2075@gmail.com', status: 'Active', role: 'User', seating: 'Permanent' },
    { name: 'Dimple', email: 'amalrajeev2075@gmail.com', status: 'Active', role: 'User', seating: 'Permanent' },
    { name: 'Sethu M', email: 'amalrajeev2075@gmail.com', status: 'Active', role: 'User', seating: 'Permanent' },
    { name: 'Sethu M', email: 'amalrajeev2075@gmail.com', status: 'Active', role: 'User', seating: 'Normal' },
  ]);

  const handleRoleChange = (index: number, newRole: string) => {
    const updatedRoles = roles.map((role, i) =>
      i === index ? { ...role, role: newRole } : role
    );
    setRoles(updatedRoles);
  };

  const handleSeatingChange = (index: number, newSeating: string) => {
    const updatedRoles = roles.map((role, i) =>
      i === index ? { ...role, seating: newSeating } : role
    );
    setRoles(updatedRoles);
  };

  const handleStatusToggle = (index: number) => {
    const updatedRoles = roles.map((role, i) =>
      i === index
        ? { ...role, status: role.status === 'Active' ? 'Blocked' : 'Active' }
        : role
    );
    setRoles(updatedRoles);
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>User Role</TableCell>
            <TableCell>Seating Type</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {roles.map((role, index) => (
            <TableRow key={index}>
              <TableCell>{role.name}</TableCell>
              <TableCell>{role.email}</TableCell>
              <TableCell
                onClick={() => handleStatusToggle(index)}
                style={{ cursor: 'pointer' }}
              >
                <Typography sx={{ color: role.status === 'Active' ? 'green' : 'red' }}>
                  {role.status}
                </Typography>
              </TableCell>
              <TableCell>
                <Select
                  value={role.role}
                  onChange={(e) => handleRoleChange(index, e.target.value as string)}
                >
                  <MenuItem value="Admin">Admin</MenuItem>
                  <MenuItem value="User">User</MenuItem>
                </Select>
              </TableCell>
              <TableCell>
                <Select
                  value={role.seating}
                  onChange={(e) => handleSeatingChange(index, e.target.value as string)}
                >
                  <MenuItem value="Permanent">Permanent</MenuItem>
                  <MenuItem value="Normal">Normal</MenuItem>
                </Select>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserRolesTable;
