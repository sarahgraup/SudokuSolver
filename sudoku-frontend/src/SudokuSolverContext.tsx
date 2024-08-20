import React, {
  createContext, useContext, ReactNode, useEffect,
} from 'react';
import useSudokuSolver from 'hooks/useSudokuSolver';
import {
  IPuzzleSelection,
  TSolverAction,
  IPuzzleDifficulty,
  TDifficulty,
} from 'utils/Interfaces';


interface SudokuContextType {
  board: number[][] | [];
  solverStatus: string;
  highlightedCell: TSolverAction | null;
  currentStep: number | null;
  fetchedSolverSteps: TSolverAction[] | undefined;
  puzzles: IPuzzleDifficulty | undefined;
  puzzlesIsLoading: boolean;
  puzzlesError: Error | null;
  selectedPuzzle: IPuzzleSelection;
  loadPuzzle: (selection: IPuzzleSelection) => void;
  controlSolver: (action: string) => void;
  handleStepChange: (direction: string) => void;
}

const SudokuContext = createContext<SudokuContextType | null>(null);

interface SudokuProviderProps {
  children: ReactNode;
}

function SudokuProvider({ children }: SudokuProviderProps) {
  const sudokuState = useSudokuSolver();

  useEffect(() => {
    if (sudokuState.puzzles && Object.keys(sudokuState.puzzles).length > 0) {
      const difficulty = (Object.keys(sudokuState.puzzles) as TDifficulty[])[0];
      const filename = sudokuState.puzzles[difficulty][0];
      sudokuState.loadPuzzle({ difficulty, filename });
    }
  }, [sudokuState.puzzles]);

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
