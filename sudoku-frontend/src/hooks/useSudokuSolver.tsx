import React, { useState, useCallback, useEffect } from 'react';
import { CSolverStatus } from 'utils/constants';
import {
  TSolverSteps,
  IPuzzleSelection,
  TSolverAction,
  IPuzzleDifficulty,
  TDifficulty,
} from 'utils/Interfaces';
import SudokuApi from 'Api/SudokuApi';


const useSudokuSolver = () => {
  const [board, setBoard] = useState<number[][] | []>([]);
  const [solverStatus, setSolverStatus] = useState<string>(CSolverStatus.stop);
  const [highlightedCell, setHighlightedCell] = useState<TSolverAction | null>(null);
  const [currentStep, setCurrentStep] = useState<number | null>(null);
  const [solverSteps, setSolverSteps] = useState<TSolverSteps[] | []>([]);
  const [selectedPuzzle, setSelectedPuzzle] = useState<IPuzzleSelection>({
    difficulty: undefined,
    filename: '',
  });
  const [puzzles, setPuzzles] = useState<IPuzzleDifficulty>({ easy: [], medium: [], hard: [] });

  const loadPuzzle = async ({ difficulty, filename }: IPuzzleSelection) => {
    try {
      const res = await SudokuApi.initializeBoard(difficulty, filename);
      setBoard(res.board);
      setSelectedPuzzle({ difficulty, filename });
      setSolverStatus(CSolverStatus.stop);
      setCurrentStep(null);
    }
    catch (err) {
      console.error('failed to load puzzle', err);
    }
  };

  const fetchAndSetSolverSteps = async (puzzleSelection: IPuzzleSelection) => {
    try {
      const { difficulty, filename } = puzzleSelection;
      const res = await SudokuApi.getActions(difficulty, filename);
      setSolverSteps(res.steps || []);
    }
    catch (err) {
      console.error('failed to solve puzzle', err);
      setSolverStatus(CSolverStatus.stop);
    }
  };

  const updateBoardAndStep = useCallback(
    (newStep: number) => {
      const currentSolverStep = solverSteps[newStep];
      const {
        actionType, row, col, boardState,
      } = currentSolverStep;
      if (boardState) setBoard(boardState.map((row) => [...row]));
      setCurrentStep(newStep);
      setHighlightedCell({ row, col, actionType });
    },
    [solverSteps],
  );

  useEffect(() => {
    let timer: number | NodeJS.Timeout | undefined;

    if (solverStatus === CSolverStatus.run && currentStep === null && solverSteps.length > 0) {
      setCurrentStep(0);
      updateBoardAndStep(0);
    }
    else if (solverStatus === CSolverStatus.run || solverStatus === CSolverStatus.resume) {
      timer = setInterval(() => {
        if (
          solverSteps.length > 0
          && currentStep !== null
          && (solverStatus === CSolverStatus.run || solverStatus === CSolverStatus.resume)
        ) {
          if (currentStep < solverSteps.length - 1) {
            updateBoardAndStep(currentStep + 1);
          }
          else {
            clearInterval(timer);
            setSolverStatus(CSolverStatus.stop);
          }
        }
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [currentStep, solverSteps, solverStatus, updateBoardAndStep]);

  const controlSolver = async (action: string) => {
    if (action === CSolverStatus.start) {
      await fetchAndSetSolverSteps(selectedPuzzle);
      setSolverStatus(CSolverStatus.run);
    }
    else if (action === CSolverStatus.pause) {
      setSolverStatus(CSolverStatus.pause);
    }
    else if (action === CSolverStatus.resume) {
      setSolverStatus(CSolverStatus.resume);
    }
  };

  const handleStepChange = (direction: string) => {
    if (
      direction === CSolverStatus.forward
      && currentStep
      && currentStep < solverSteps.length - 1
    ) {
      setSolverStatus(CSolverStatus.pause);
      updateBoardAndStep(currentStep + 1);
    }
    else if (direction === 'backward' && currentStep && currentStep > 0) {
      setSolverStatus(CSolverStatus.pause);
      updateBoardAndStep(currentStep - 1);
    }
  };

  useEffect(() => {
    const fetchPuzzles = async () => {
      try {
        const resp = await SudokuApi.getPuzzles();
        setPuzzles(resp.puzzles);
        if (resp.puzzles && Object.keys(resp.puzzles).length > 0) {
          const difficulty = Object.keys(resp.puzzles)[0] as TDifficulty;
          const filename = resp.puzzles[difficulty][0];
          loadPuzzle({ difficulty, filename });
        }
      }
      catch (err) {
        console.error('failed to fetch puzzles', err);
      }
    };
    fetchPuzzles();
  }, []);

  return {
    board,
    solverStatus,
    highlightedCell,
    currentStep,
    solverSteps,
    puzzles,
    setPuzzles,
    loadPuzzle,
    controlSolver,
    handleStepChange,
  };
};

export default useSudokuSolver;
