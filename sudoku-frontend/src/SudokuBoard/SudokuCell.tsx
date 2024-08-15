import React from 'react';
import { Box } from '@mui/material';
/** Component for SudokuCell
 *  Renders a cell for sudoku grid
 *
 * Props:
 *  - value: the value to be displayed in cell (number or empty)
 *  - isHighlighted: Iindicates whether cell should be highlighted (e.g. for conflicts, assignments
 *      backtracking, etc)
 *  - highlightColor: the color to be displayed for the highlighted cell
 *
 * State: none
 *
 * App -> SudokuBoard -> SudokuCell
 */
interface ISudokuCellProps {
  value: number | null;
  isHighlighted: boolean | null;
  highlightColor: string;
}

function SudokuCell({ value, isHighlighted, highlightColor }: ISudokuCellProps) {
  const cellStyle = isHighlighted ? { backgroundColor: highlightColor } : {};
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
      {value !== 0 ? value : ''}
    </Box>
  );
}

export default SudokuCell;
