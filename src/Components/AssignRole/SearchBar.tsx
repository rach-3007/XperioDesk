// SearchBar.tsx
import React from 'react';
import { TextField, InputAdornment, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar: React.FC = () => {
  return (
    <Box sx={{maxWidth:'40vw'}}>
    <TextField
      variant="outlined"
      placeholder="Search by Name, DU"
      fullWidth
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
