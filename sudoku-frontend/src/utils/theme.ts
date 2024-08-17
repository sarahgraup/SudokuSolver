import { createTheme, Theme } from '@mui/material/styles';
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

const theme = createTheme({
  spacing: (factor: number) => `${factor * 8}px`,
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
      '@media (max-width: 600px)': {
        fontSize: '2em',
        lineHeight: '0.2em',
      },
    },
    body1: {
      textAlign: 'center',
      fontSize: '1em',
      letterSpacing: '0.1em',
      lineHeight: '2em',
      '@media (max-width: 600px)': {
        padding: '0.5em',
        lineHeight: '1.5em',
      },
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
    MuiGrid: {
      styleOverrides: {
        root: {
          margin: 0, 
          padding: 0, 
          justifyContent: 'center',
          paddingTop: '0',
          paddingLeft: '0',
          width: '100%',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          margin: '0',
          fontFamily: "'Montserrat', sans-serif",
        },
        '@media (max-width: 600px)': {
          body1: {
            padding: '0.5em',
            fontSize: '0.65em',
            lineHeight: '0.2em',
          },
          h1: {
            fontSize: '1.5em',
            lineHeight: '0.2em',
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
