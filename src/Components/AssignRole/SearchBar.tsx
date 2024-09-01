// SearchBar.tsx
import React from 'react';
import { TextField, InputAdornment, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };

  return (
    <Box sx={{ maxWidth: '40vw' }}>
      <TextField
        variant="outlined"
        placeholder="Search by Name, email"
        fullWidth
        onChange={handleInputChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          sx: { borderRadius: 2, backgroundColor: 'white' },
        }}
        sx={{ marginBottom: 3 }}
      />
    </Box>
  );
};

export default SearchBar;
