import React from 'react';
import { Grid, Typography, Divider } from '@mui/material';


function Header() {
  return (
    <Grid
      item
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        marginBottom: "1em",
      }}
    >
      <Typography variant="h1" textAlign="center">
        Sudoku Solver
      </Typography>
    </Grid>
  );
}

export default Header;
