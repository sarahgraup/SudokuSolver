import React from 'react';
import { Grid } from '@mui/material';
import { useSudokuContext } from 'SudokuSolverContext';
import SudokuBoard from '../SudokuBoard/SudokuBoard';
import ControlPanel from '../Controls/ControlPanel';
import SolverStepsAnimation from '../utils/SolverStepsAnimation';


function SudokuBoardPanel() {
  const {
    board, highlightedCell, currentStep, solverSteps, controlSolver, handleStepChange,
  } = useSudokuContext();

  return (
    <Grid
      item
      xs={6}
      md={12}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} spacing={2} />
        <ControlPanel
          onStart={() => controlSolver('start')}
          onPause={() => controlSolver('pause')}
          onResume={() => controlSolver('resume')}
          onStepForward={() => handleStepChange('forward')}
          onStepBackward={() => handleStepChange('backward')}
        />
        <Grid
          container
          direction='column'
          justifyContent='center'
          alignItems='center'
          flexGrow='1'
          gap='20px'
        >
          <SudokuBoard board={board} highlightedCell={highlightedCell} />
          <SolverStepsAnimation currentStep={currentStep} solverSteps={solverSteps} />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default SudokuBoardPanel;
