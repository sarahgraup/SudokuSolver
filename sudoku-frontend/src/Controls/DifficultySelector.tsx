import React, { useState } from 'react';
import {
  FormControl, Select, MenuItem, Box, SelectChangeEvent,
  InputLabel,
} from '@mui/material';
import { IPuzzleSelection, IPuzzleDifficulty, TDifficulty } from 'utils/Interfaces';
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
interface ISelectionProps {
  onSelectPuzzle: ({ difficulty, filename }: IPuzzleSelection) => void;
  puzzles: IPuzzleDifficulty;

}

function DifficultySelector({ onSelectPuzzle, puzzles }: ISelectionProps) {
  const [selectedPuzzleVal, setSelectedPuzzleVal] = useState<string>('');
  const [activeDifficulty, setActiveDifficulty] = useState<TDifficulty | null>(null);

  const handleChange = (difficulty: TDifficulty) => (evt: SelectChangeEvent<string>) => {
    const newFilename = evt.target.value;
    setActiveDifficulty(difficulty);
    setSelectedPuzzleVal(newFilename);
    onSelectPuzzle({ difficulty, filename: evt.target.value });
  };

  const renderDifficultyValue = (difficulty:TDifficulty) => (value:string | undefined) => {
    if (activeDifficulty === difficulty && typeof value === 'string' && value) {
      return value.slice(0, -4);
    }
    return difficulty.toUpperCase();
  };

  return (
    <Box sx={{ minWidth: 200, display: 'flex', gap: 2 }}>
      {(['easy', 'medium', 'hard'] as TDifficulty[]).map((difficulty) => (
        <FormControl variant='outlined' key={difficulty} fullWidth>
          <InputLabel id={`${difficulty}-label`}>{difficulty.toUpperCase()}</InputLabel>
          <Select
            labelId={`${difficulty}-label`}
            value={activeDifficulty === difficulty ? selectedPuzzleVal : ''}
            variant='outlined'
            onChange={handleChange(difficulty)}
            renderValue={renderDifficultyValue(difficulty)}
            label={difficulty.toUpperCase()}
          >
            <MenuItem disabled value=''>
              <em>{difficulty.toUpperCase()}</em>
            </MenuItem>
            {puzzles[difficulty]?.map((puzzle) => (
              <MenuItem key={puzzle} value={puzzle}>
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

