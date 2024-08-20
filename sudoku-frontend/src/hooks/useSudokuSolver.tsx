import React, { useState, useCallback, useEffect } from 'react';
import { CSolverStatus } from 'utils/constants';
import {
  TSolverSteps,
  IPuzzleSelection,
  TSolverAction,
  TDifficulty,
} from 'utils/Interfaces';
import { useQueryClient } from '@tanstack/react-query';
import {
  useGetActions, useGetPuzzles, useInitializePuzzle,
} from 'utils/queries';


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
  const queryClient = useQueryClient();

  const { data: puzzles, error: puzzlesError, isLoading: puzzlesIsLoading } = useGetPuzzles();

  const {
    data: puzzleData,
    error: puzzleError,
    isLoading: isPuzzleLoading,
  } = useInitializePuzzle(selectedPuzzle);

  const {
    data: fetchedSolverSteps, error: solveError, isLoading: isSolving, refetch: solvePuzzle,
  } = useGetActions(selectedPuzzle);

  useEffect(() => {
    if (puzzles && Object.keys(puzzles).length > 0) {
      const difficulty = (Object.keys(puzzles) as TDifficulty[])[0];
      const filename = puzzles[difficulty][0];
      loadPuzzle({ difficulty, filename });
    }
  }, [puzzles]);

  const loadPuzzle = useCallback(({ difficulty, filename }: IPuzzleSelection) => {
    queryClient.invalidateQueries({ queryKey: ['solve', difficulty, filename] });
    setSelectedPuzzle({ difficulty, filename });
    setSolverStatus(CSolverStatus.stop);
    setCurrentStep(null);
  }, []);

  useEffect(() => {
    if (puzzleData && puzzleData.board) {
      setBoard(puzzleData.board);
    }
  }, [puzzleData]);

  const updateBoardAndStep = useCallback(
    (newStep: number) => {
      if (fetchedSolverSteps && fetchedSolverSteps[newStep]) {
        const currentSolverStep = fetchedSolverSteps[newStep];
        const {
          actionType, row, col, boardState,
        } = currentSolverStep;
        if (boardState) setBoard(boardState.map((row) => [...row]));
        setCurrentStep(newStep);
        setHighlightedCell({ row, col, actionType });
      }
    },
    [fetchedSolverSteps],
  );

  useEffect(() => {
    let timer: number | NodeJS.Timeout | undefined;

    if (solverStatus === CSolverStatus.run && currentStep === null && fetchedSolverSteps && fetchedSolverSteps.length > 0) {
      setCurrentStep(0);
      updateBoardAndStep(0);
    }
    else if (solverStatus === CSolverStatus.run || solverStatus === CSolverStatus.resume) {
      timer = setInterval(() => {
        if (fetchedSolverSteps
          && fetchedSolverSteps.length > 0
          && currentStep !== null
          && (solverStatus === CSolverStatus.run || solverStatus === CSolverStatus.resume)
        ) {
          if (currentStep < fetchedSolverSteps.length - 1) {
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
  }, [currentStep, fetchedSolverSteps, solverStatus, updateBoardAndStep]);

  useEffect(() => {
    if (fetchedSolverSteps) {
      setSolverSteps(fetchedSolverSteps);
    }
  }, [fetchedSolverSteps]);

  const controlSolver = useCallback(async (action: string) => {
    if (action === CSolverStatus.start) {
      try {
        setSolverStatus(CSolverStatus.run);
        const result = await solvePuzzle();
        if (result.data) {
          setSolverSteps(result.data);
          setCurrentStep(0);
        }
        else {
          console.error('solving did not produce any steps');
          setSolverStatus(CSolverStatus.stop);
        }
      }
      catch (error) {
        console.error('error solving puzzle', error);
        setSolverStatus(CSolverStatus.stop);
      }
    }
    else if (action === CSolverStatus.pause) {
      setSolverStatus(CSolverStatus.pause);
    }
    else if (action === CSolverStatus.resume) {
      setSolverStatus(CSolverStatus.resume);
    }
  }, [solvePuzzle, setSolverStatus, setCurrentStep]);

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

  return {
    board,
    solverStatus,
    highlightedCell,
    currentStep,
    fetchedSolverSteps,
    puzzles,
    puzzlesError,
    puzzlesIsLoading,
    selectedPuzzle,
    loadPuzzle,
    controlSolver,
    handleStepChange,
  };
};

export default useSudokuSolver;
