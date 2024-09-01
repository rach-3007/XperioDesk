// UserRolesTable.tsx
import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem } from '@mui/material';
import axiosInstance from '../../Config/AxiosConfig'; // Adjust the import path based on your project structure

interface UserRole {
  id: number;
  name: string;
  email: string;
  role: string;
}
interface UserRolesTableProps {
  searchTerm: string;
}

const UserRolesTable: React.FC<UserRolesTableProps> = ({ searchTerm }) => {
  const [roles, setRoles] = useState<UserRole[]>([]);
  const [filteredRoles, setFilteredRoles] = useState<UserRole[]>([]);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axiosInstance.get('/api/users-with-roles');
        setRoles(response.data);
        setFilteredRoles(response.data); // Initialize with all users
      } catch (error) {
        console.error('Error fetching roles:', error);
      }
    };

    fetchRoles();
  }, []);

  // Filter roles based on the search term
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredRoles(roles); // If search term is empty, show all roles
    } else {
      const lowercasedTerm = searchTerm.toLowerCase();
      const filtered = roles.filter((role) =>
        role.name.toLowerCase().includes(lowercasedTerm) || role.email.toLowerCase().includes(lowercasedTerm)
      );
      setFilteredRoles(filtered);
    }
  }, [searchTerm, roles]);
  const handleRoleChange = async (index: number, newRole: string) => {
    const updatedRoles = roles.map((role, i) =>
      i === index ? { ...role, role: newRole } : role
    );
    setRoles(updatedRoles);

    // Update the role in the backend
    try {
      const user = updatedRoles[index];
      await axiosInstance.put(`/api/users/${user.id}/update-role`, { role: newRole });
      console.log('Role updated successfully');
    } catch (error) {
      console.error('Error updating role:', error);
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>User Role</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {filteredRoles.map((role, index) => (
            <TableRow key={role.id}>
              <TableCell>{role.name}</TableCell>
              <TableCell>{role.email}</TableCell>
              <TableCell>
                <Select
                  value={role.role}
                  onChange={(e) => handleRoleChange(index, e.target.value as string)}
                >
                  <MenuItem value="Admin">Admin</MenuItem>
                  <MenuItem value="User">User</MenuItem>
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
