import "./SudokuBoard.css";
import SudokuCell from "./SudokuCell";
import { Table, TableBody, TableRow, TableCell } from "@mui/material";
import { styled } from "@mui/material/styles";
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

//styled TableCell for custom border styling
const StyledTableCell = styled(TableCell)(
  ({ borderRight, borderBottom }) => ({
    border: "1px solid #ddd",
    width: "50px",
    height: "50px",
    padding: 0,
    borderRight: borderRight ? "2px solid black" : undefined,
    borderBottom: borderBottom ? "2px solid black" : undefined,
  })
);

function SudokuBoard({ board, highlightedCell }) {
  const isBoldBorder = (index) => (index + 1) % 3 === 0 && index < 8;

  return (
    <Table
      className="SudokuBoard"
      style={{ maxWidth: 450, margin: "auto", borderCollapse: "collapse" }}
    >
      <TableBody>
        {board.map((row, rowIndex) => (
          <TableRow key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <StyledTableCell
                key={`${rowIndex}-${cellIndex}`}
                align="center"
                borderRight={isBoldBorder(cellIndex)}
                borderBottom={isBoldBorder(rowIndex)}
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
              </StyledTableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default SudokuBoard;
