import React, {
  createContext, useContext, ReactNode, useEffect,
} from 'react';
import useSudokuSolver from 'hooks/useSudokuSolver';
import {
  TSolverSteps, IPuzzleSelection, TSolverAction, IPuzzleDifficulty,
} from 'utils/Interfaces';
import SudokuApi from 'Api/SudokuApi';


interface SudokuContextType {
  board: number[][];
  solverStatus: string;
  highlightedCell: TSolverAction | null;
  currentStep: number | null;
  solverSteps: TSolverSteps[];
  puzzles: IPuzzleDifficulty;
  loadPuzzle: (selection: IPuzzleSelection) => Promise<void>;
  controlSolver: (action: string) => Promise<void>;
  handleStepChange: (direction: string) => void;
}

const SudokuContext = createContext<SudokuContextType | null>(null);

interface SudokuProviderProps {
  children: ReactNode;
}

function SudokuProvider({ children }: SudokuProviderProps) {
  const sudokuState = useSudokuSolver();

  useEffect(() => {
    const fetchPuzzles = async () => {
      try {
        const resp = await SudokuApi.getPuzzles();
        sudokuState.setPuzzles(resp.puzzles);

        if (resp.puzzles && Object.keys(resp.puzzles).length > 0) {
          const difficulty = Object.keys(resp.puzzles)[0] as keyof IPuzzleDifficulty;
          const filename = resp.puzzles[difficulty][0];
          sudokuState.loadPuzzle({ difficulty, filename });
        }
      }
      catch (err) {
        console.error('Failed to fetch puzzles', err);
      }
    };
    fetchPuzzles();
  }, []);

  return <SudokuContext.Provider value={sudokuState}>{children}</SudokuContext.Provider>;
}

const useSudokuContext = (): SudokuContextType => {
  const context = useContext(SudokuContext);
  if (!context) {
    throw new Error('useSudokuContext must be used within a SudokuProvider');
  }
  return context;
};

export { useSudokuContext, SudokuProvider };


