import { FormControl, Select, MenuItem, Box } from "@mui/material";
/** Component for Difficulty Selector
 *  Renders selection of difficulty levels and specified puzzles
 *
 * Props:
 * - onSelectPuzzle: function to update selected puzzle in apps state
 *      and load puzzle
 * - puzzle: object of puzzles
 *
 * State: None
 *
 * Function:
 *  - handlers to managbe dropdown selections
 *  - handleChange: load selected puzzle into app component based on change of user click
 *
 * App -> DifficultySelector
 */

function DifficultySelector({ onSelectPuzzle, puzzles }) {
  //seperate handleChange
  const handleChange = (difficulty) => (evt) => {
    onSelectPuzzle(difficulty, evt.target.value);
  };

  //custom renderValue function
  const renderDifficultyValue = (difficulty) => (value) => {
    if (value.length === 0) {
      return difficulty.toUpperCase();
    }
    return value;
  };

  return (
    <Box sx={{ minWidth: 200, display: "flex", gap: 2 }}>
      {["easy", "medium", "hard"].map((difficulty) => (
        <FormControl key={difficulty} fullWidth>
          <Select
            className="selector"
            displayEmpty
            value=""
            variant="outlined"
            onChange={handleChange(difficulty)}
            renderValue={renderDifficultyValue(difficulty)}
            inputProps={{
              "aria-label": `${difficulty} puzzle selection`,
              id: `${difficulty}-selector`,
            }}
          >
            <MenuItem disabled value="">
              <em>{difficulty.toUpperCase()}</em>
            </MenuItem>
            {puzzles[difficulty]?.map((puzzle, index) => (
              <MenuItem key={index} value={puzzle}>
                {puzzle.slice(0, -4)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ))}
    </Box>
  );
}

export default DifficultySelector;
