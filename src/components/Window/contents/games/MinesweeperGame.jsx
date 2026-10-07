import React, { useState, useCallback } from 'react';
import './Games.css';

const GRID_WIDTH = 9;
const GRID_HEIGHT = 9;
const MINE_COUNT = 10;

function MinesweeperGame() {
  const [grid, setGrid] = useState(() => createGrid());
  const [gameState, setGameState] = useState('playing');
  const [flagCount, setFlagCount] = useState(0);

  function createGrid() {
    const newGrid = Array(GRID_HEIGHT).fill(null).map(() =>
      Array(GRID_WIDTH).fill(null).map(() => ({
        isMine: false,
        isRevealed: false,
        isFlagged: false,
        neighborMines: 0,
      }))
    );

    // Place mines
    let minesPlaced = 0;
    while (minesPlaced < MINE_COUNT) {
      const x = Math.floor(Math.random() * GRID_WIDTH);
      const y = Math.floor(Math.random() * GRID_HEIGHT);
      if (!newGrid[y][x].isMine) {
        newGrid[y][x].isMine = true;
        minesPlaced++;
      }
    }

    // Calculate neighbor counts
    for (let y = 0; y < GRID_HEIGHT; y++) {
      for (let x = 0; x < GRID_WIDTH; x++) {
        if (!newGrid[y][x].isMine) {
          let count = 0;
          for (let dy = -1; dy <= 1; dy++) {
            for (let dx = -1; dx <= 1; dx++) {
              const ny = y + dy;
              const nx = x + dx;
              if (ny >= 0 && ny < GRID_HEIGHT && nx >= 0 && nx < GRID_WIDTH) {
                if (newGrid[ny][nx].isMine) count++;
              }
            }
          }
          newGrid[y][x].neighborMines = count;
        }
      }
    }

    return newGrid;
  }

  const revealCell = useCallback((x, y, currentGrid) => {
    if (x < 0 || x >= GRID_WIDTH || y < 0 || y >= GRID_HEIGHT) return currentGrid;
    if (currentGrid[y][x].isRevealed || currentGrid[y][x].isFlagged) return currentGrid;

    const newGrid = currentGrid.map(row => row.map(cell => ({ ...cell })));
    newGrid[y][x].isRevealed = true;

    if (newGrid[y][x].neighborMines === 0 && !newGrid[y][x].isMine) {
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          revealCell(x + dx, y + dy, newGrid).forEach((row, ry) =>
            row.forEach((cell, rx) => {
              if (cell.isRevealed) newGrid[ry][rx].isRevealed = true;
            })
          );
        }
      }
    }

    return newGrid;
  }, []);

  const handleCellClick = useCallback((x, y) => {
    if (gameState !== 'playing') return;
    if (grid[y][x].isFlagged) return;

    if (grid[y][x].isMine) {
      // Game over - reveal all mines
      const newGrid = grid.map(row => row.map(cell => ({
        ...cell,
        isRevealed: cell.isMine ? true : cell.isRevealed,
      })));
      setGrid(newGrid);
      setGameState('lost');
      return;
    }

    const newGrid = revealCell(x, y, grid);
    setGrid(newGrid);

    // Check win
    const unrevealedSafe = newGrid.flat().filter(c => !c.isRevealed && !c.isMine).length;
    if (unrevealedSafe === 0) {
      setGameState('won');
    }
  }, [grid, gameState, revealCell]);

  const handleRightClick = useCallback((e, x, y) => {
    e.preventDefault();
    if (gameState !== 'playing') return;
    if (grid[y][x].isRevealed) return;

    const newGrid = grid.map(row => row.map(cell => ({ ...cell })));
    newGrid[y][x].isFlagged = !newGrid[y][x].isFlagged;
    setGrid(newGrid);
    setFlagCount(newGrid.flat().filter(c => c.isFlagged).length);
  }, [grid, gameState]);

  const resetGame = () => {
    setGrid(createGrid());
    setGameState('playing');
    setFlagCount(0);
  };

  const getNumberColor = (num) => {
    const colors = ['', '#0000FF', '#008000', '#FF0000', '#000080', '#800000', '#008080', '#000', '#808080'];
    return colors[num] || '#000';
  };

  return (
    <div className="minesweeper-wrapper">
      <div className="minesweeper-header">
        <div className="mine-counter">💣 {MINE_COUNT - flagCount}</div>
        <button className="reset-button" onClick={resetGame}>
          {gameState === 'won' ? '😎' : gameState === 'lost' ? '😵' : '🙂'}
        </button>
        <div className="mine-counter">🚩 {flagCount}</div>
      </div>
      
      <div className="minesweeper-grid">
        {grid.map((row, y) => (
          <div key={y} className="minesweeper-row">
            {row.map((cell, x) => (
              <button
                key={x}
                className={`minesweeper-cell ${cell.isRevealed ? 'revealed' : ''} ${cell.isMine && cell.isRevealed ? 'mine' : ''}`}
                onClick={() => handleCellClick(x, y)}
                onContextMenu={(e) => handleRightClick(e, x, y)}
              >
                {cell.isFlagged && !cell.isRevealed && '🚩'}
                {cell.isRevealed && cell.isMine && '💣'}
                {cell.isRevealed && !cell.isMine && cell.neighborMines > 0 && (
                  <span style={{ color: getNumberColor(cell.neighborMines) }}>
                    {cell.neighborMines}
                  </span>
                )}
              </button>
            ))}
          </div>
        ))}
      </div>

      {gameState !== 'playing' && (
        <div className="game-over-overlay">
          <div className="game-over-message">
            {gameState === 'won' ? '🎉 You Won!' : '💥 Game Over!'}
            <button onClick={resetGame}>Play Again</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MinesweeperGame;