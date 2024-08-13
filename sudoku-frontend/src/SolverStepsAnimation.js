import "./SolverStepsAnimation.css";

/**Solver Steps Animation
 * 
 * Describes each step of sudoku solving process including assignments, 
 * conflicts, reason for conflict, and backtracking
 * 
 * Props:
 *  - currentStep: the current step to describe.
 *  - solverSteps: array of steps solver takes including assignments, conflicts, reason and backtracking
 * 
 * State: none
 * 
   App -> SolverStepsAnimation
 * 
 */

function SolverStepsAnimation({ currentStep, solverSteps }) {
  if (currentStep === null || !solverSteps || solverSteps.length === 0)
    return null;

  const step = solverSteps[currentStep];

  let actionText = "";

  if (step.actionType === "conflict") {
    actionText = `Oh no, there is a conflict- ${step.reason} at Row: ${
      step.row + 1
    }, Col: ${step.col + 1}, Value: ${step.value}. We must backtrack.`;
  } else if (step.actionType === "assign") {
    actionText = `${
      step.actionType.charAt(0).toUpperCase() + step.actionType.slice(1)
    } at Row: ${step.row + 1}, Col: ${step.col + 1}, Value: ${step.value}.`;
  } else if (step.actionType === "unassign") {
    actionText = `We must assign Row: ${step.row + 1}, Col: ${
      step.col + 1
    }, to a new value.`;
  } else {
    actionText = `Performing ${step.action} at Row: ${step.row + 1}, Col: ${
      step.col + 1
    }.`;
  }

  return <div className="solver-steps-animation">{actionText}</div>;
}

export default SolverStepsAnimation;
