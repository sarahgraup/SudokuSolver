export const CSolverStatus = {
  stop: "stopped",
  run: "running",
  resume: "resumed",
  pause: "paused",
  start: "start",
  forward: "forward",
  backward: "backward",
};

export const paragraph = `This is a Sudoku solver that employs the Conflict-Driven Clause Learning (CDCL) algorithm, traditionally used in computational logic for solving Boolean satisfiability problems.
   It simplifies puzzles through unit propagation, strategically selects cells using minimum remaining values and degree heuristics, and minimizes conflicts by choosing the least constraining values. 
   The solver learns from past conflicts to avoid future dead ends, efficiently finding the best path to solve the puzzle.`;
   