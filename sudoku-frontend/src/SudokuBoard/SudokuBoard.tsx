import React from "react";
import SudokuCell from "./SudokuCell";
import { Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import { TSolverSteps } from "utils/Interfaces";
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
     <Grid container spacing={0} sx={{ maxWidth: 450, margin: "auto" }}>
       {board.map((row, rowIndex) =>
         row.map((cell, cellIndex) => (
           <Grid
             item
             xs={4}
             key={`${rowIndex}-${cellIndex}`}
             sx={{
               border: "1px solid #ddd",
               width: "50px",
               height: "50px",
               display: "flex",
               justifyContent: "center",
               alignItems: "center",
               backgroundColor:
                 highlightedCell &&
                 highlightedCell.row === rowIndex &&
                 highlightedCell.col === cellIndex
                   ? highlightedCell.actionType === "conflict"
                     ? "red"
                     : highlightedCell.actionType === "unassign"
                     ? "green"
                     : highlightedCell.actionType === "assign"
                     ? "yellow"
                     : ""
                   : "",
               borderRight: cellIndex % 3 === 2 ? "2px solid black" : "",
               borderBottom: rowIndex % 3 === 2 ? "2px solid black" : "",
             }}
           >
             <SudokuCell
               value={cell}
               isHighlighted={
                 highlightedCell &&
                 highlightedCell.row === rowIndex &&
                 highlightedCell.col === cellIndex
               }
               highlightColor={
                 highlightedCell?.actionType === "conflict"
                   ? "red"
                   : highlightedCell?.actionType === "unassign"
                   ? "green"
                   : highlightedCell?.actionType === "assign"
                   ? "yellow"
                   : ""
               }
             />
           </Grid>
         ))
       )}
     </Grid>
   );
}

export default SudokuBoard;