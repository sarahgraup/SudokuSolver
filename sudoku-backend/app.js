"use strict";

/**Express app for sudoku solver */

const express = require("express");
const cors = require("cors");
const { PORT } = require("./config");
const { Sudoku } = require("./sudoku");
const { NotFoundError, BadRequestError } = require("./expressError");
const app = express();

const fs = require("fs");
const path = require("path");

app.use(express.json());
// app.use(express.urlencoded());

app.use(cors());
// app.use("/sudoku", sudokuRoutes);

const PUZZLES_DIR = path.join(__dirname, "sudokus");

/** GET /sudoku { file } => { board }
 *
 * returns initial state of newly created board or error message
 *
 */
app.get("/puzzles/:difficulty/:filename", async (req, res) => {
  const { difficulty, filename } = req.params;
  const filePath = path.join(PUZZLES_DIR, difficulty, filename);

  try {
    const sudoku = await Sudoku.getSudoku(filePath);
    sudoku.createBoard();
    res.json({
      difficulty: difficulty,
      filename: filename,
      board: sudoku.board,
    }); // Send the initial state of the board
  } catch (error) {
    res.status(500).send("Failed to load the Sudoku puzzle.");
  }
});

/** GET /solve/:difficulty => [steps: {actiontype:..., {row, col, val, boardstate} }, {...}, ...]
 *
 */
app.get("/solve/:difficulty/:filename", async (req, res) => {
  const { difficulty, filename } = req.params;
  const file = path.join(PUZZLES_DIR, difficulty, filename);
  // const file = path.join(__dirname, 'puzzles', `${difficulty}.txt`);

  try {
    const sudoku = await Sudoku.getSudoku(file);
    sudoku.createBoard(); // Ensure the board is initialized
    const solved = sudoku.cdclSolver(); // Solve the Sudoku
    if (solved) {
      return res.json({ steps: sudoku.getActionLog() }); // Send back all steps
    } else {
      res.status(500).send("Failed to solve the Sudoku puzzle.");
    }
  } catch (error) {
    res.status(500).send("Failed to process the Sudoku puzzle.");
  }
});

/**GET /puzzles =>  { easy:[ filename1, 2, ...], medium:[...], hard:[...] }*/
app.get("/puzzles", (req, res) => {
  fs.readdir(PUZZLES_DIR, (err, difficultyLevels) => {
    if (err) {
      return res.status(500).send("Failed to list puzzles.");
    }

    //
    const puzzles = {};
    difficultyLevels.forEach((level) => {
      puzzles[level] = fs.readdirSync(path.join(PUZZLES_DIR, level));
    });

    res.json({ puzzles: puzzles });
  });
});

app.get("/", (req, res) => {
  res.send("Welcome to the Sudoku Solver API");
});

/** 404 handler: matches unmatched routes. */
app.use(function (req, res) {
  throw new NotFoundError();
});

/** Error handler: logs stacktrace and returns JSON error message. */
app.use(function (err, req, res, next) {
  if (process.env.NODE_ENV !== "test") console.error(err.stack);
  const status = err.status || 500;
  const message = err.message;

  return res.status(status).json({
    error: { message, status },
  });
});

module.exports = app;
