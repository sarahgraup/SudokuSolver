import { useQuery } from '@tanstack/react-query';
import {
  IPuzzleDifficulty,
  IPuzzleSelection,
  ISudokuBoard,
  TSolverAction,
} from './Interfaces';
import { solve, puzzles } from './apiUrls';
import http from './http';


export type TApiListResponse<T = unknown> = {
  data: T[];
  error: Error | null;
};

export type TApiResponse<T = unknown> = {
  data: T;
  error: Error | null;
};

export const actionsQueryKey = ({ difficulty, filename }: IPuzzleSelection) => [
  'actions',
  difficulty,
  filename,
];
interface IActionsResponse {
  steps: TSolverAction[];
}

export function useGetActions({ difficulty, filename }: IPuzzleSelection) {
  return useQuery<IActionsResponse, Error, TSolverAction[]>({
    queryKey: actionsQueryKey({ difficulty, filename }),
    queryFn: () => http.get(solve.actions(difficulty, filename)),
    select: (data) => data.steps,
  });
}

export const puzzleListQueryKey = () => ['puzzles'];
interface IPuzzlesResponse {
  puzzles: IPuzzleDifficulty;
}

export function useGetPuzzles() {
  return useQuery<IPuzzlesResponse, Error, IPuzzleDifficulty>({
    queryKey: puzzleListQueryKey(),
    queryFn: () => http.get(puzzles.list),
    select: (data) => data.puzzles,
  });
}

export const initalizePuzzleQueryKey = ({ difficulty, filename }: IPuzzleSelection) => [
  'solve',
  difficulty,
  filename,
];

export function useInitializePuzzle({ difficulty, filename }: IPuzzleSelection) {
  return useQuery<ISudokuBoard, Error>({
    queryKey: initalizePuzzleQueryKey({ difficulty, filename }),
    queryFn: () => http.get(puzzles.initalize(difficulty, filename)),
    enabled: !!difficulty && !!filename,
  });
}
