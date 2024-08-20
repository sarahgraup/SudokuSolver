import React from 'react';
import { Box, Typography } from '@mui/material';


interface ISudokuCellProps {
  value: number | null;
  isHighlighted: boolean | null;
  highlightColor: string;
}

function SudokuCell({ value, isHighlighted, highlightColor }: ISudokuCellProps) {
  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: isHighlighted ? highlightColor : 'transparent',
      }}
    >
      <Typography variant='h5'>{value !== 0 ? value : ''}</Typography>
    </Box>
  );
}

export default SudokuCell;
