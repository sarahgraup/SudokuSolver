export interface TSolverSteps {
  actionType: string;
  row: number;
  col: number;
  boardState?: number[][] | undefined;
}

export interface TSolverAction extends TSolverSteps {
  value?: number;
  reason?: string;
}

export interface IPuzzleSelection {
  difficulty?: TDifficulty;
  filename: string;
}

export interface IPuzzleDifficulty {
  easy: string[];
  medium: string[];
  hard: string[];
}

export type TDifficulty = 'easy' | 'medium' | 'hard';
