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
  board?: string[];
}

// export interface IPuzzleDifficulty {
//   easy: string[];
//   medium: string[];
//   hard: string[];
// }

export interface ISudokuBoard {
  board: number[][];
}

// export type TDifficulty = 'easy' | 'medium' | 'hard';
// export type TDifficulty = keyof IPuzzleDifficulty;

export interface IPuzzleDifficulty {
  easy: string[];
  medium: string[];
  hard: string[];
}

export type TDifficulty = keyof IPuzzleDifficulty;
