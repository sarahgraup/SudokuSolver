import React from 'react';
import {
  ThemeProvider, CssBaseline, Grid, Box, Typography, Divider,
} from '@mui/material';
import theme from 'utils/theme';
import { SudokuProvider } from 'SudokuSolverContext';
import InstructionsPanel from 'components/InstructionsPanel';
import SudokuBoardPanel from 'components/SudokuBoardPanel';
import Header from 'components/Header';

/** App for Sudoku Solver
 *
 * add which is the guess and then it will be revised
 * highlights all guesses that are going to be revised
 * State:
 *  - board: current Sudoky board (2d array)
 *  - Solverstatus: indicates if solver is  (running, paused, stopped).
 *  - currentStep: current step for stepping through the solution.
 *  - solverSteps: array of steps solver takes including assignments, conflicts and backtracking
 *  - puzzles: difficulty and puzzle list.
 *  - selectedPuzzle: specific puzzle selected for solving
 *  - highlightedCell: the current cell to be highlighted
 *
 * Props: none
 *
 */

function App() {
  return (
    <SudokuProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Grid
          container
          padding={2}
          xs={12}
          sx={{ flexGrow: 1 }}
        >
          <Header />
          <Divider
            orientation='horizontal'
            variant='fullWidth'
            sx={{
              width: '100%',
              borderColor: 'grey.500',
              borderWidth: '1px',
              margin: '1em',
            }}
          />
          <Grid container marginLeft={8} marginRight={8} marginTop={2}>
            <Grid item xs={12} md={7} sx={{ order: { xs: 2, md: 1 } }}>
              <SudokuBoardPanel />
            </Grid>
            <Grid item xs={12} md={5} padding={4} sx={{ order: { xs: 1, md: 2 } }}>
              <InstructionsPanel />
            </Grid>
          </Grid>
        </Grid>
      </ThemeProvider>
    </SudokuProvider>
  );
}

export default App;
