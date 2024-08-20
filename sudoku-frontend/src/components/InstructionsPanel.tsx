import React from 'react';
import { Grid, Typography, CircularProgress } from '@mui/material';
import { paragraph } from 'utils/constants';
import { useSudokuContext } from 'SudokuSolverContext';
import DifficultySelector from '../Controls/DifficultySelector';


function InstructionsPanel() {
  const {
    puzzles, loadPuzzle, puzzlesError, puzzlesIsLoading,
  } = useSudokuContext();

  return (
    <Grid container spacing={0} width='100%'>
      <Grid
        item
        xs={12}
        sx={{ paddingX: { xs: 1, md: 2, lg: 4 } }}
      >
        <Typography variant='body1'>{paragraph}</Typography>
        <Typography variant='body1'>
          Witness the magic as the algorithm intelligently solves a sudoku puzzle of your choice!
        </Typography>
      </Grid>
      <Grid item xs={12} paddingTop={2}>
        {puzzlesIsLoading ? (
          <CircularProgress />
        ) : puzzlesError ? (
          <Typography color='error'>
            Error loading puzzles:
            {puzzlesError.message}
          </Typography>
        ) : puzzles ? (
          <DifficultySelector onSelectPuzzle={loadPuzzle} puzzles={puzzles} />

        ) : (<Typography>No puzzles available</Typography>)}

      </Grid>
    </Grid>
  );
}

export default InstructionsPanel;
