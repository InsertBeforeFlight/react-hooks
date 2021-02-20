// useState: tic tac toe
// http://localhost:3000/isolated/exercise/04.js

import * as React from 'react'
import { useLocalStorageState } from '../utils'

const CURRENT_MOVE_KEY = "TTT_CURRENT_MOVE";
const CURRENT_HISTORY_KEY = "TT_CURRENT_HISTORY";

const startingMove = 0;
const startingSquares = [].map(() => null);
const startingHistory = [startingSquares];

function Board({ squares, onSquaresChange, onSquaresReset }) {

  function renderSquare(i) {
    return (
      <button className="square" onClick={() => onSquaresChange(i)}>
        {squares[i]}
      </button>
    )
  }

  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <button className="restart" onClick={onSquaresReset}>
        restart
      </button>
    </div>

  )
}

function History ({ status, history, currentMove, onMoveClick }) {
  return (
    <div className="game-info">
      <div className="status">{status}</div>
      {
        history.map((history, moveIndex) => (
            <li>
              <button
                className="move"
                disabled={moveIndex === currentMove}
                onClick={() => onMoveClick(moveIndex)}
              >
                {moveIndex === startingMove ? "Go to Start" : `Go to Move #${moveIndex + 1}`}
              </button>
            </li>
          ))
      }
    </div>
  )
}

function Game() {
  const [move, setMove] = useLocalStorageState(CURRENT_MOVE_KEY, 0);
  const [history, setHistory] = useLocalStorageState(CURRENT_HISTORY_KEY, startingHistory);

  const squares = history[move];
  const nextValue = calculateNextValue(squares);
  const winner = calculateWinner(squares);
  const status = calculateStatus(winner, squares, nextValue);

  const onSquaresChange = (changedSquareIndex) => {
    if (winner || squares[changedSquareIndex]) return;

    const updatedSquares = [...squares];
    updatedSquares[changedSquareIndex] = nextValue;

    const currentHistory = history.slice(startingMove, move + 1);
    const updatedHistory = [...currentHistory, updatedSquares];
    setHistory(updatedHistory);

    setMove(currentHistory.length);
  }

  const onSquaresReset = () => {
    setMove(startingMove);
    setHistory(startingHistory);
  }

  const onHistoryClick = (moveIndex) => {
    setMove(moveIndex);
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={squares}
          onSquaresChange={onSquaresChange}
          onSquaresReset={onSquaresReset}
        />
      </div>
      <div className="game-info">
        <History
          status={status}
          history={history}
          currentMove={move}
          onMoveClick={onHistoryClick}
        />
      </div>
    </div>
  )
}

// eslint-disable-next-line no-unused-vars
function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`
}

// eslint-disable-next-line no-unused-vars
function calculateNextValue(squares) {
  const xSquaresCount = squares.filter(r => r === 'X').length
  const oSquaresCount = squares.filter(r => r === 'O').length
  return oSquaresCount === xSquaresCount ? 'X' : 'O'
}

// eslint-disable-next-line no-unused-vars
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

function App() {
  return <Game />
}

export default App
