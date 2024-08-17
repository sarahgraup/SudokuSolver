import React from 'react';
import { Grid, Typography} from '@mui/material';


function Header() {
  return (
    <Grid
      item
      sx={{
        display: 'flex',
        width: '100%',
      }}
    >
      <Typography variant='h1' textAlign='center'>
        Sudoku Solver
      </Typography>
    </Grid>
  );
}

export default Header;
