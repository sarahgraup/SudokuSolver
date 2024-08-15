import React from 'react';
import {
  ThemeProvider, CssBaseline, Grid, Box, Typography, Divider
} from '@mui/material';
import theme from 'utils/theme';
import { SudokuProvider } from 'SudokuSolverContext';
import InstructionsPanel from 'components/InstructionsPanel';
import SudokuBoardPanel from 'components/SudokuBoardPanel';
import Header from 'components/Header';

/** App for Sudoku Solver
 *
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
          spacing={2}
          margin="0"
          padding="1vw"
          xs={12}
          sx={{ flexGrow: 1 }}
          // sx={{ gap: "20px", padding: "1em", minHeight: "100vh", overflow: "hidden" }}
        >
          <Header />
          <Divider
            orientation="horizontal"
            variant="fullWidth"
            sx={{
              width: "100%",
              borderColor: "grey.500",
              borderWidth: "1px",
              margin: '1em'
            }}
          />
          <Grid item xs={12} md={6}>
            <InstructionsPanel />
          </Grid>
          <Grid item xs={12} md={6}>
            <SudokuBoardPanel />
          </Grid>
        </Grid>
      </ThemeProvider>
    </SudokuProvider>
  );
}

export default App;
