import React from 'react';
import { Grid, Typography } from '@mui/material';
import { paragraph } from 'utils/constants';
import { useSudokuContext } from 'SudokuSolverContext';
import DifficultySelector from '../Controls/DifficultySelector';


function InstructionsPanel() {
  const { puzzles, loadPuzzle } = useSudokuContext();

  return (

    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant='body1'>{paragraph}</Typography>
        <Typography variant='body1'>
          Witness the magic as the algorithm intelligently solves a sudoku puzzle of your choice!
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <DifficultySelector onSelectPuzzle={loadPuzzle} puzzles={puzzles} />
      </Grid>
    </Grid>
  );
}

export default InstructionsPanel;
