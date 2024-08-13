import "./SudokuCell.css";
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

function SudokuCell({ value, isHighlighted, highlightColor }) {
  const cellStyle = isHighlighted ? { backgroundColor: highlightColor } : {};
  return (
    <div
      className={`sudoku-cell ${isHighlighted ? "highlighted" : ""}`}
      style={cellStyle}
    >
      {value || ""}
    </div>
  );
}

export default SudokuCell;
