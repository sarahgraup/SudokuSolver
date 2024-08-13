## App: manages overall state of app
- Props: None (as it's the top-level component).
- State:
    - Current Sudoku board (2D array).
    - Solver status: indicates if solver is  (running, paused, stopped).
    - Current step: current step for stepping through the solution.
    - solverSteps: array of steps solver takes including assignments, conflicts and backtracking
    - Selected difficulty and puzzle list.
- Functions:
    - Function to load a new puzzle based on difficulty
    - Function to control sudoku solver: start pause stop resume the solver.
    - Function to handle back and forward steps.
- Calls:
    - May call API or service to fetch Sudoku puzzles based on difficulty.

## SudokuBoard: displays sudoku grid
- Props:
    - board: Current board state (2D array from App's state).
- State: None (relies on props for rendering).
- Functions: None (purely for display).
- Calls: None.


## SudokuCell: represents an individual cell in sudoku grid
- props: 
    - value: The value to be displayed in the cell (number or empty).
    - isHighlighted: Indicates whether the cell should be highlighted (e.g., for conflicts, assignments, or backtracking).
    - isEditable: Indicates whether the cell value can be manually edited (useful if you allow users to input their puzzles).
    - onValueChange: Function to handle changes to the cell's value (if it's editable).
- state: none
- function: handlers for events like clicking or typing in cell if cell is interactive
- calls: none

## ControlPanel: provides buttons for controlling the solver
- Props:
    - functions to control solver (onStart, onStop, onPause, onResume functions)
- state:none
- functions: handlers for button clicks that call provided control functions
- calls: none

## DifficultySelector: allows selection of difficulty levels and specific puzzles
- Props: 
    - onSelectDifficulty: function to update selected difficulty puzzle in apps state and load puzzles
- state: none
- function: 
    - handlers to manage dropdown selections
    - function to load selected puzzle into app component
- calls: none

## SolverStepsAnimation: visualizes each step of sudoku solving process including assignments, conflicts, and backtracking
- Props:
    - steps: An array of solver steps to animate.
    - currentStepIndex: Index of the current step in the animation.
- State:
    - animationSpeed: Controls the speed of the animation.
    - isAnimating: Indicates if the animation is currently playing.
- Functions:
    - animateStep: Animates a single step of the solving process.
    - startAnimation: Begins the animation from the current step.
    - stopAnimation: Stops the ongoing animation.
    - setAnimationSpeed: Adjusts the speed of the animation.
- Calls: None.


use usecallback to prevent unnecessary re-renders
animation should provide real time feedback to user such as highlighting cells duirng assignments conflicts and backtracking


allow users to manually input sudoku puzzles and see them solved

