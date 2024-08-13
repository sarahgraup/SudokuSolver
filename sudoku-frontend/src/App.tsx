import React, { useState, useEffect, useCallback } from "react";
import SudokuBoard from "./SudokuBoard/SudokuBoard";
import ControlPanel from "./Controls/ControlPanel";
import DifficultySelector from "./Controls/DifficultySelector";
import SolverStepsAnimation from "./SolverStepsAnimation";
import SudokuApi from "./Api/SudokuApi";
import { CSolverStatus, paragraph } from "utils/constants";
import { TSolverSteps, IPuzzleSelection } from "utils/Interfaces";

import "./App.css";

/**App for Sudoku Solver
 *
 * State:
 *  - board: current Sudoky board (2d array)
 *  - Solverstatus: indicates if solver is  (running, paused, stopped).
 *  - currentStep: current step for stepping through the solution.
 *  - solverSteps: array of steps solver takes including assignments, conflicts and backtracking
 *  - puzzles: difficulty and puzzle list.
 *  - selectedPuzzle: specific puzzle selected for solving
 *  - highlightedCell: the current cell to be highlighted
 *
 * Props: none
 *
 */


function App() {
  const [board, setBoard] = useState<number[][]|[]>([]);
  const [solverStatus, setSolverStatus] = useState<string>(CSolverStatus.stop);
  const [highlightedCell, setHighlightedCell] = useState<object | null>(null);
  const [currentStep, setCurrentStep] = useState<number | null>(null);
  const [solverSteps, setSolverSteps] = useState<TSolverSteps[]|[]>([]);
  const [selectedPuzzle, setSelectedPuzzle] = useState<IPuzzleSelection>({
    difficulty: "",
    filename: "",
  });
  const [puzzles, setPuzzles] = useState({ easy: [], medium: [], hard: [] });


  /**gets puzzle text file from api */
  const loadPuzzle = async({difficulty, filename}: IPuzzleSelection) => {
    try {
      const res = await SudokuApi.initializeBoard(difficulty, filename);

      setBoard(res.board);
      setSelectedPuzzle({ difficulty, filename: filename });
      setSolverStatus(CSolverStatus.stop);
      setCurrentStep(null);
    } catch (err) {
      console.error("failed to load puzzle", err);
    }
  };

  /**gets puzzle txt file based on file name and solves */
  const fetchAndSetSolverSteps = async (selectedPuzzle: IPuzzleSelection) => {
    try {
      const { difficulty, filename } = selectedPuzzle;
      const res = await SudokuApi.getActions(difficulty, filename);
      setSolverSteps(res.steps || []);
    } catch (err) {
      console.error("failed to solve puzzle", err);
      setSolverStatus(CSolverStatus.stop);
    }
  };

  /**updates board and current step */
  const updateBoardAndStep = useCallback(
    (newStep:number) => {
      const currentSolverStep = solverSteps[newStep];

      const { actionType, row, col, boardState } = currentSolverStep;

      if (boardState) {
        setBoard(boardState.map((row) => [...row]));
      }

      setCurrentStep(newStep);
      setHighlightedCell({ row, col, actionType });
    },
    [solverSteps]
  );


  /**
   * updates board and currentstep on 1 second interval
   * after change of currentstep, solversteps, or solverstatus
   * */
  useEffect(() => {
    let timer;

    if (
      solverStatus === CSolverStatus.run &&
      currentStep === null &&
      solverSteps.length > 0
    ) {
      setCurrentStep(0);
      updateBoardAndStep(0);
    } else if (solverStatus === CSolverStatus.run || solverStatus === CSolverStatus.resume) {
      timer = setInterval(() => {
        if (
          solverSteps.length > 0 &&
          currentStep !== null &&
          (solverStatus === CSolverStatus.run || solverStatus === CSolverStatus.resume)
        ) {
          if (currentStep < solverSteps.length - 1) {
            updateBoardAndStep(currentStep + 1);
          } else {
            clearInterval(timer);
            setSolverStatus(CSolverStatus.stop);
          }
        }
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [currentStep, solverSteps, solverStatus, updateBoardAndStep]);



  /**solves puzzle or sets solver status to paused based on user action */
  const controlSolver = async (action:string) => {
    if (action === CSolverStatus.start) {
      await fetchAndSetSolverSteps(selectedPuzzle);

      setSolverStatus(CSolverStatus.run);
    } else if (action === CSolverStatus.pause) {
      setSolverStatus(CSolverStatus.pause);
    } else if (action === CSolverStatus.resume) {
      setSolverStatus(CSolverStatus.resume);
    }
  };

  /**sets step index on user click */
  const handleStepChange = (direction:string) => {
    if (direction === CSolverStatus.forward && currentStep && currentStep < solverSteps.length - 1) {
      setSolverStatus(CSolverStatus.pause);
      updateBoardAndStep(currentStep + 1);
    } else if (direction === "backward" && currentStep && currentStep > 0) {
      setSolverStatus(CSolverStatus.pause);
      updateBoardAndStep(currentStep - 1);
    }
  };

  /**fetches puzzle name on mount */
  useEffect(() => {
    const fetchPuzzles = async () => {
      try {
        const resp = await SudokuApi.getPuzzles("/puzzles");
        setPuzzles(resp.puzzles);

        //automatically load first puzzle up
        if (resp.puzzles && Object.keys(resp.puzzles).length > 0) {
          const difficulty = Object.keys(resp.puzzles)[0];
          const filename = resp.puzzles[difficulty][0];
          loadPuzzle({ difficulty, filename });
        }
      } catch (err) {
        console.error("failed to feth puzzles", err);
      }
    };
    fetchPuzzles();
  }, []);

  /**fetches puzzle data on user click and clears any existing highlights */
  const handleSelectPuzzle = ({ difficulty, filename }: IPuzzleSelection) => {
    loadPuzzle({difficulty, filename});
    setHighlightedCell(null);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Sudoku Solver</h1>
        <p>{paragraph}</p>
        <p>
          Witness the magic as the algorithm intelligently solves a sudoku
          puzzle of your choice!
        </p>
      </header>
      <ControlPanel
        className="control-panel"
        onStart={() => controlSolver("start")}
        onPause={() => controlSolver("pause")}
        onResume={() => controlSolver("resume")}
        onStepForward={() => handleStepChange("forward")}
        onStepBackward={() => handleStepChange("backward")}
      />
      <div className="board-and-animation-container">
        <SudokuBoard board={board} highlightedCell={highlightedCell} />

        <SolverStepsAnimation
          currentStep={currentStep}
          solverSteps={solverSteps}
        />
      </div>
      <DifficultySelector
        className="difficulty-selector"
        onSelectPuzzle={handleSelectPuzzle}
        puzzles={puzzles}
      />
    </div>
  );
}

export default App;
