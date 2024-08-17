import React from 'react';
import { Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { TSolverSteps } from 'utils/Interfaces';
import SudokuCell from './SudokuCell';
/** Component for SudokuBoard
 *  Renders a sudoku board
 *
 * Props:
 * - board: Current board state (2D array from App's state)
 * - highlightedCell: the current cell to be highlighted
 *
 * State: None
 *
 * App -> SudokuBoard
 */

interface IBoardProps {
  board: [] | number[][];
  highlightedCell: TSolverSteps | null;
}
// const StyledTableCell = styled(TableCell)(
//   ({ borderRight, borderBottom }) => ({
//     border: "1px solid #ddd",
//     width: "50px",
//     height: "50px",
//     padding: 0,
//     borderRight: borderRight ? "2px solid black" : undefined,
//     borderBottom: borderBottom ? "2px solid black" : undefined,
//   })
// );

function SudokuBoard({ board, highlightedCell }: IBoardProps) {
  return (
    <Grid
      container
      spacing={0}
      sx={{ width: { xs: '90vw', md: '40vw' }, margin: 0 }}
    >
      {board.map((row, rowIndex) => row.map((cell, cellIndex) => (
        <Grid
          item
          xs={12}
          sm={4}
          md={1.33}
          key={`${rowIndex}-${cellIndex}`}
          sx={{
            border: '1px solid #ddd',
            aspectRatio: '1/1',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor:
                highlightedCell
                && highlightedCell.row === rowIndex
                && highlightedCell.col === cellIndex
                  ? highlightedCell.actionType === 'conflict'
                    ? 'red'
                    : highlightedCell.actionType === 'unassign'
                      ? 'green'
                      : highlightedCell.actionType === 'assign'
                        ? 'yellow'
                        : ''
                  : '',
            borderRight: cellIndex % 3 === 2 ? '2px solid black' : '',
            borderBottom: rowIndex % 3 === 2 ? '2px solid black' : '',
          }}
        >
          <SudokuCell
            value={cell}
            isHighlighted={
                highlightedCell
                && highlightedCell.row === rowIndex
                && highlightedCell.col === cellIndex
              }
            highlightColor={
                highlightedCell?.actionType === 'conflict'
                  ? 'red'
                  : highlightedCell?.actionType === 'unassign'
                    ? 'green'
                    : highlightedCell?.actionType === 'assign'
                      ? 'yellow'
                      : ''
              }
          />
        </Grid>
      )))}
    </Grid>
  );
}

export default SudokuBoard;
