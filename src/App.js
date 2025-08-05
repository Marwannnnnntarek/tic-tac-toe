// Import React and useState hook
import React, { useState } from 'react';
// Import the CSS styling
import './App.css';

// A functional component for a single square (cell)
function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value} {/* X, O, or null */}
    </button>
  );
}

// The main Board component that controls game logic and layout
function Board() {
  // useState to track who's turn it is: true = X, false = O
  const [xIsNext, setXIsNext] = useState(true);
  // useState to store the current board state (9 squares)
  const [squares, setSquares] = useState(Array(9).fill(null));

  // Check for a winner using helper function
  const winner = calculateWinner(squares);
  // Check if all squares are filled and no winner (draw)
  const isDraw = !winner && squares.every(square => square !== null);

  // Game status message
  let status;
  if (winner) {
    status = `Winner: ${winner}`; // Display winner
  } else if (isDraw) {
    status = "It's a draw!"; // Display draw
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`; // Indicate whose turn it is
  }

  // Handle a square click
  function handleClick(i) {
    // Do nothing if the square is already filled or game is over
    if (squares[i] || winner || isDraw) return;

    // Copy the current state of squares to make it immutable
    // 2 ways for changing data 1-edit directly the data 2-take a copy of the data and change it
    const nextSquares = squares.slice();
    // Set current player's move
    nextSquares[i] = xIsNext ? 'X' : 'O';
    // Update the board and switch turns
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  // Reset the game
  function resetGame() {
    setSquares(Array(9).fill(null)); // Clear board
    setXIsNext(true); // Start with X
  }

  // Renders a single square by index
  const renderSquare = (i) => (
    <Square key={i} value={squares[i]} onSquareClick={() => handleClick(i)} />
  );

  // Render 3 rows of 3 squares (3x3 board)
  const renderRows = () => {
    const rows = [];
    for (let row = 0; row < 3; row++) {
      const cols = [];
      for (let col = 0; col < 3; col++) {
        cols.push(renderSquare(row * 3 + col));
      }
      rows.push(
        <div key={row} className="board-row">
          {cols}
        </div>
      );
    }
    return rows;
  };

  return (
    <div className="game">
      {/* Game status */}
      <div className="status">{status}</div>
      {/* Game board */}
      {renderRows()}
      {/* Reset button */}
      <button onClick={resetGame} className="reset-button">Reset Game</button>
    </div>
  );
}

// Helper function to determine if there is a winner
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], // Rows
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], // Columns
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], // Diagonals
    [2, 4, 6],
  ];
  // Check each line for a win condition
  for (let [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]; // Return 'X' or 'O'
    }
  }
  return null; // No winner
}

// Export the Board component
export default Board;
