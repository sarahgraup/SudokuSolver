export type TSolverSteps  = {
  actionType: string;
  row: number;
  col: number;
  boardState: number[][] | undefined;
}

export interface IPuzzleSelection {
  difficulty: string;
  filename: string;
}