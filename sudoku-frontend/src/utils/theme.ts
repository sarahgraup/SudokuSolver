import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';


declare module '@mui/material/styles' {
  interface Theme {
    sudoku: {
      cell: {
        root: React.CSSProperties;
        highlighted: React.CSSProperties;
        conflict: React.CSSProperties;
        unassign: React.CSSProperties;
        assign: React.CSSProperties;
      };
    };
  }
  interface ThemeOptions {
    sudoku?: {
      cell?: {
        root?: React.CSSProperties;
        highlighted?: React.CSSProperties;
        conflict?: React.CSSProperties;
        unassign?: React.CSSProperties;
        assign?: React.CSSProperties;
      };
    };
  }
}
// Define the custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#121213',
      dark: '#F7F6F0',
    },
    secondary: {
      main: '#a6fb00',
    },
    error: {
      main: red[300],
    },
  },
  typography: {
    fontFamily: "'Montserrat', sans-serif",
    fontWeightLight: 200,
    htmlFontSize: 18,
    h1: {
      fontSize: '3rem',
      fontWeight: 200,
      letterSpacing: '0.1em',
      // lineHeight: '5rem',
    },
    body1: {
      letterSpacing: '0.1em',
    },
  },
  components: {
    MuiTable: {
      styleOverrides: {
        root: {
          maxWidth: 450,
          padding: 0,
          borderCollapse: 'collapse',
          border: '2px solid black',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          border: '1px solid #ddd',
          width: 50,
          height: 50,
          padding: 0,
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:nth-of-type(3n)': {
            '& .MuiTableCell-root': {
              borderBottom: '2px solid black',
            },
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          // You can define global button styles here
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          // display: 'flex',
          // flexDirection: 'column',
          // alignItems: 'center',
          // gap: '20px',
          // padding: '1em',
          // minHeight: '100vh',
          // overflow: 'hidden',
          fontFamily: "'Montserrat', sans-serif",
        },
        '@media (max-width: 600px)': {
          body: {
            padding: '0.5em',
            fontSize: '0.65em',
          },
          '.App-header h1': {
            fontSize: '1.5em',
          },
          '.App-header p': {
            fontSize: '0.7em',
          },
          '.control-panel .MuiButton-root': {
            padding: '0.2em 0.4em',
            fontSize: '0.65rem',
          },
          '.control-panel': {
            gap: '5px',
            marginLeft: '0.5em',
            marginRight: '0.5em',
          },
        },
      },
    },
  },
  sudoku: {
    cell: {
      root: {
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      },
      highlighted: {
        // Base highlighted style
      },
      conflict: {
        backgroundColor: 'red',
      },
      unassign: {
        backgroundColor: 'yellow',
      },
      assign: {
        backgroundColor: 'green',
      },
    },
  },
});

export default theme;
