import { IPuzzleSelection } from './Interfaces';


// const baseUrl = 'http://localhost:3001';
const baseUrl = process.env.REACT_APP_BASE_URL as string;

const solve = {
  actions: (difficulty: IPuzzleSelection['difficulty'], filename: IPuzzleSelection['filename']) => `${baseUrl}/solve/${difficulty}/${filename}`,
};

const puzzles = {
  list: `${baseUrl}/puzzles`,
  initalize: (difficulty: IPuzzleSelection['difficulty'], filename: IPuzzleSelection['filename']) => `${baseUrl}/puzzles/${difficulty}/${filename}`,
};

export {
  solve, puzzles,
};
