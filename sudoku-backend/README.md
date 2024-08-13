![Logo](/frontend/public/logo.png)
# Sudoku Solver
Conflict-Driven Clause Learning (CDCL) algorithm for solving Sudoku puzzles. 

## Overview

The Sudoku solver combines the Conflict-Driven Clause Learning (CDCL) algorithm with a user-friendly interface to efficiently solve puzzles of varying difficulty.  It streamlines the solving process through unit propagation - employing minimum remaining values and degree heuristics - learning from conflicts to efficiently find the best solution path. Users can interact with the site by selecting puzzles, viewing real-time solving steps, and controlling the solving process. 



## Tech Stack

**Client:** React, Material-UI, AJAX 

**Server:** Node, Express, axios, CORS, Jest


## Setup

Clone the repository: git clone [https://github.com/sarahgraup/sudokuAlgorithm.git]

### Installation 

Install Sudoku Solver using npm

```bash
  cd frontend
  npm install
  cd ..
  cd backend
  npm install
```


    
### Deployment

To deploy this project run

```bash
  cd frontend
  npm start
  cd..
  cd backend
  node server
```


## Features

- Select puzzle difficulty and view real-time solving steps.
- Interactive control panel for start, pause, and resume solving actions.
- Utilizes CDCL algorithm for efficient solving and learning from past conflicts.

## Roadmap

- User Interface Improvements: Responsive design updates and theme customization options.
- Algorithm Optimization: Integrate advanced solving techniques for better performance.
- Custom Puzzle Input: Allow users to input their own puzzles for solving.
- Real-Time Solving with Socket.io: Implement real-time puzzle solving and display using Socket.io, enhancing interactive user experience.
# sudoku-backend
