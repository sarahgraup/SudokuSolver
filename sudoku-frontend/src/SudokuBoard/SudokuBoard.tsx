import React from 'react';
import { Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { TSolverSteps } from 'utils/Interfaces';
import SudokuCell from './SudokuCell';


interface IBoardProps {
  board: [] | number[][];
  highlightedCell: TSolverSteps | null;
}

function SudokuBoard({ board, highlightedCell }: IBoardProps) {
  return (
    <Grid
      container
      spacing={0}
      xs={12}
      md={9}
    >
      {board.map((row, rowIndex) => row.map((cell, cellIndex) => (
        <Grid
          item
          xs={12 / 9}
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
