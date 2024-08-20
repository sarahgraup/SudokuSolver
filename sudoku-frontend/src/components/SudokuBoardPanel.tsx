import React from 'react';
import { Grid } from '@mui/material';
import { useSudokuContext } from 'SudokuSolverContext';
import SudokuBoard from '../SudokuBoard/SudokuBoard';
import ControlPanel from '../Controls/ControlPanel';
import SolverStepsAnimation from '../utils/SolverStepsAnimation';


function SudokuBoardPanel() {
  const {
    board, highlightedCell, currentStep, fetchedSolverSteps, controlSolver, handleStepChange,
  } = useSudokuContext();

  return (
    <Grid container spacing={4} justifyContent='center' width='100%'>
      <Grid
        item
        xs={12}
        sx={{
          margin: 0,
          padding: '0 !important',
        }}
      >
        <ControlPanel
          onStart={() => controlSolver('start')}
          onPause={() => controlSolver('pause')}
          onResume={() => controlSolver('resume')}
          onStepForward={() => handleStepChange('forward')}
          onStepBackward={() => handleStepChange('backward')}
        />
      </Grid>

      <Grid item xs={12} />
      <Grid
        container
        direction='column'
        justifyContent='flex-start'
        alignItems='center'
      >
        <SudokuBoard board={board} highlightedCell={highlightedCell} />
        <SolverStepsAnimation currentStep={currentStep} solverSteps={fetchedSolverSteps} />
      </Grid>
    </Grid>
  );
}

export default SudokuBoardPanel;
