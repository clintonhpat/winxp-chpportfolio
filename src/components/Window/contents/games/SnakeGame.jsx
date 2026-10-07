import React, { useState, useEffect, useCallback, useRef } from 'react';
import './Games.css';

const GRID_SIZE = 20;
const CELL_SIZE = 20;
const INITIAL_SPEED = 150;

function SnakeGame() {
  const canvasRef = useRef(null);
  const [gameState, setGameState] = useState('start');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  
  const gameRef = useRef({
    snake: [{ x: 10, y: 10 }],
    direction: { x: 1, y: 0 },
    nextDirection: { x: 1, y: 0 },
    food: { x: 15, y: 10 },
    intervalId: null,
  });

  const generateFood = useCallback(() => {
    const { snake } = gameRef.current;
    let newFood;
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
    } while (snake.some(seg => seg.x === newFood.x && seg.y === newFood.y));
    return newFood;
  }, []);

  const resetGame = useCallback(() => {
    gameRef.current.snake = [{ x: 10, y: 10 }];
    gameRef.current.direction = { x: 1, y: 0 };
    gameRef.current.nextDirection = { x: 1, y: 0 };
    gameRef.current.food = generateFood();
    setScore(0);
    setGameState('playing');
  }, [generateFood]);

  const handleKeyDown = useCallback((e) => {
    if (gameState === 'start' || gameState === 'gameover') {
      if (e.code === 'Space') {
        resetGame();
        return;
      }
    }
    
    const { direction } = gameRef.current;
    
    switch (e.key) {
      case 'ArrowUp':
      case 'w':
        if (direction.y !== 1) gameRef.current.nextDirection = { x: 0, y: -1 };
        break;
      case 'ArrowDown':
      case 's':
        if (direction.y !== -1) gameRef.current.nextDirection = { x: 0, y: 1 };
        break;
      case 'ArrowLeft':
      case 'a':
        if (direction.x !== 1) gameRef.current.nextDirection = { x: -1, y: 0 };
        break;
      case 'ArrowRight':
      case 'd':
        if (direction.x !== -1) gameRef.current.nextDirection = { x: 1, y: 0 };
        break;
      default:
        break;
    }
  }, [gameState, resetGame]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const gameLoop = () => {
      if (gameState !== 'playing') return;

      const { snake, food } = gameRef.current;
      gameRef.current.direction = gameRef.current.nextDirection;
      const { direction } = gameRef.current;

      // Move snake
      const newHead = {
        x: snake[0].x + direction.x,
        y: snake[0].y + direction.y,
      };

      // Check collision with walls
      if (newHead.x < 0 || newHead.x >= GRID_SIZE || newHead.y < 0 || newHead.y >= GRID_SIZE) {
        setGameState('gameover');
        setHighScore(h => Math.max(h, score));
        return;
      }

      // Check collision with self
      if (snake.some(seg => seg.x === newHead.x && seg.y === newHead.y)) {
        setGameState('gameover');
        setHighScore(h => Math.max(h, score));
        return;
      }

      snake.unshift(newHead);

      // Check food collision
      if (newHead.x === food.x && newHead.y === food.y) {
        setScore(s => s + 10);
        gameRef.current.food = generateFood();
      } else {
        snake.pop();
      }
    };

    const render = () => {
      // Clear canvas
      ctx.fillStyle = '#1a1a2e';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw grid
      ctx.strokeStyle = '#2a2a4e';
      for (let i = 0; i <= GRID_SIZE; i++) {
        ctx.beginPath();
        ctx.moveTo(i * CELL_SIZE, 0);
        ctx.lineTo(i * CELL_SIZE, GRID_SIZE * CELL_SIZE);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, i * CELL_SIZE);
        ctx.lineTo(GRID_SIZE * CELL_SIZE, i * CELL_SIZE);
        ctx.stroke();
      }

      // Draw snake
      const { snake, food } = gameRef.current;
      snake.forEach((seg, i) => {
        const gradient = ctx.createRadialGradient(
          seg.x * CELL_SIZE + CELL_SIZE / 2,
          seg.y * CELL_SIZE + CELL_SIZE / 2,
          0,
          seg.x * CELL_SIZE + CELL_SIZE / 2,
          seg.y * CELL_SIZE + CELL_SIZE / 2,
          CELL_SIZE / 2
        );
        gradient.addColorStop(0, i === 0 ? '#4ade80' : '#22c55e');
        gradient.addColorStop(1, i === 0 ? '#22c55e' : '#16a34a');
        ctx.fillStyle = gradient;
        ctx.fillRect(seg.x * CELL_SIZE + 1, seg.y * CELL_SIZE + 1, CELL_SIZE - 2, CELL_SIZE - 2);
      });

      // Draw food
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.arc(
        food.x * CELL_SIZE + CELL_SIZE / 2,
        food.y * CELL_SIZE + CELL_SIZE / 2,
        CELL_SIZE / 2 - 2,
        0,
        Math.PI * 2
      );
      ctx.fill();

      // Draw score
      ctx.fillStyle = '#fff';
      ctx.font = '16px Arial';
      ctx.textAlign = 'left';
      ctx.fillText(`Score: ${score}`, 10, GRID_SIZE * CELL_SIZE + 25);

      // Draw start/game over
      if (gameState === 'start') {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 28px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Snake Classic', canvas.width / 2, canvas.height / 2 - 30);
        ctx.font = '16px Arial';
        ctx.fillText('Press Space or Arrow Keys to Start', canvas.width / 2, canvas.height / 2 + 10);
        ctx.fillText('Use Arrow Keys or WASD to move', canvas.width / 2, canvas.height / 2 + 40);
      }

      if (gameState === 'gameover') {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#ef4444';
        ctx.font = 'bold 32px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Game Over!', canvas.width / 2, canvas.height / 2 - 40);
        ctx.fillStyle = '#fff';
        ctx.font = '20px Arial';
        ctx.fillText(`Score: ${score}`, canvas.width / 2, canvas.height / 2);
        ctx.fillText(`High Score: ${highScore}`, canvas.width / 2, canvas.height / 2 + 30);
        ctx.font = '16px Arial';
        ctx.fillText('Press Space to Restart', canvas.width / 2, canvas.height / 2 + 70);
      }
    };

    const intervalId = setInterval(() => {
      gameLoop();
      render();
    }, INITIAL_SPEED);

    render();

    return () => clearInterval(intervalId);
  }, [gameState, score, highScore, generateFood]);

  return (
    <div className="game-wrapper">
      <canvas
        ref={canvasRef}
        width={GRID_SIZE * CELL_SIZE}
        height={GRID_SIZE * CELL_SIZE + 40}
        className="game-canvas"
      />
    </div>
  );
}

export default SnakeGame;