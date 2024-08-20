import React from 'react';
import {
  ThemeProvider, CssBaseline, Grid, Box, Typography, Divider,
} from '@mui/material';
import theme from 'utils/theme';
import { SudokuProvider } from 'SudokuSolverContext';
import InstructionsPanel from 'components/InstructionsPanel';
import SudokuBoardPanel from 'components/SudokuBoardPanel';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Header from 'components/Header';


const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SudokuProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Grid container padding={2} xs={12}>
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
            <Grid container marginLeft={8} marginRight={8} sx={{ marginTop: { lg: 2, xs: 0 } }}>
              <Grid item xs={12} sm={12} lg={7} sx={{ order: { xs: 2, sm: 2, lg: 1 } }}>
                <SudokuBoardPanel />
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                lg={5}
                sx={{ order: { xs: 1, sm: 1, lg: 2 }, padding: { xs: 2, lg: 2 } }}
              >
                <InstructionsPanel />
              </Grid>
            </Grid>
          </Grid>
        </ThemeProvider>
      </SudokuProvider>
    </QueryClientProvider>
  );
}

export default App;
