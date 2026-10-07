import React, { useState, useEffect, useCallback, useRef } from 'react';
import './Games.css';

const GRAVITY = 0.5;
const JUMP_STRENGTH = -8;
const PIPE_WIDTH = 60;
const PIPE_GAP = 150;
const PIPE_SPEED = 3;

function FlappyBird() {
  const canvasRef = useRef(null);
  const [gameState, setGameState] = useState('start'); // 'start', 'playing', 'gameover'
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  
  const gameRef = useRef({
    bird: { y: 200, velocity: 0 },
    pipes: [],
    frameId: null,
  });

  const jump = useCallback(() => {
    if (gameState === 'start') {
      setGameState('playing');
      gameRef.current.bird = { y: 200, velocity: 0 };
      gameRef.current.pipes = [];
      setScore(0);
    }
    if (gameState === 'playing') {
      gameRef.current.bird.velocity = JUMP_STRENGTH;
    }
    if (gameState === 'gameover') {
      setGameState('start');
    }
  }, [gameState]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.code === 'Space') {
        e.preventDefault();
        jump();
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [jump]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    const gameLoop = () => {
      const { bird, pipes } = gameRef.current;
      
      // Clear canvas
      ctx.fillStyle = '#87CEEB';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw ground
      ctx.fillStyle = '#8B4513';
      ctx.fillRect(0, canvas.height - 50, canvas.width, 50);
      ctx.fillStyle = '#228B22';
      ctx.fillRect(0, canvas.height - 50, canvas.width, 10);

      if (gameState === 'playing') {
        // Update bird
        bird.velocity += GRAVITY;
        bird.y += bird.velocity;
        
        // Generate pipes
        if (pipes.length === 0 || pipes[pipes.length - 1].x < canvas.width - 200) {
          const gapY = Math.random() * (canvas.height - PIPE_GAP - 150) + 75;
          pipes.push({ x: canvas.width, gapY, passed: false });
        }
        
        // Update pipes
        for (let i = pipes.length - 1; i >= 0; i--) {
          pipes[i].x -= PIPE_SPEED;
          
          // Check for score
          if (!pipes[i].passed && pipes[i].x + PIPE_WIDTH < 50) {
            pipes[i].passed = true;
            setScore(s => s + 1);
          }
          
          // Remove off-screen pipes
          if (pipes[i].x + PIPE_WIDTH < 0) {
            pipes.splice(i, 1);
          }
        }
        
        // Collision detection
        const birdRect = { x: 50, y: bird.y, width: 30, height: 30 };
        
        // Ground/ceiling collision
        if (bird.y < 0 || bird.y + 30 > canvas.height - 50) {
          setGameState('gameover');
          setHighScore(h => Math.max(h, score));
        }
        
        // Pipe collision
        for (const pipe of pipes) {
          if (birdRect.x + birdRect.width > pipe.x && birdRect.x < pipe.x + PIPE_WIDTH) {
            if (birdRect.y < pipe.gapY || birdRect.y + birdRect.height > pipe.gapY + PIPE_GAP) {
              setGameState('gameover');
              setHighScore(h => Math.max(h, score));
            }
          }
        }
      }

      // Draw pipes
      ctx.fillStyle = '#228B22';
      for (const pipe of gameRef.current.pipes) {
        // Top pipe
        ctx.fillRect(pipe.x, 0, PIPE_WIDTH, pipe.gapY);
        ctx.fillStyle = '#1a6b1a';
        ctx.fillRect(pipe.x - 5, pipe.gapY - 30, PIPE_WIDTH + 10, 30);
        ctx.fillStyle = '#228B22';
        
        // Bottom pipe
        ctx.fillRect(pipe.x, pipe.gapY + PIPE_GAP, PIPE_WIDTH, canvas.height - pipe.gapY - PIPE_GAP);
        ctx.fillStyle = '#1a6b1a';
        ctx.fillRect(pipe.x - 5, pipe.gapY + PIPE_GAP, PIPE_WIDTH + 10, 30);
        ctx.fillStyle = '#228B22';
      }
      
      // Draw bird
      ctx.fillStyle = '#FFD700';
      ctx.beginPath();
      ctx.ellipse(65, gameRef.current.bird.y + 15, 18, 14, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#FFA500';
      ctx.beginPath();
      ctx.ellipse(75, gameRef.current.bird.y + 15, 8, 5, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#000';
      ctx.beginPath();
      ctx.arc(70, gameRef.current.bird.y + 10, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.arc(71, gameRef.current.bird.y + 9, 2, 0, Math.PI * 2);
      ctx.fill();
      
      // Draw score
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 32px Arial';
      ctx.textAlign = 'center';
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 3;
      ctx.strokeText(score.toString(), canvas.width / 2, 50);
      ctx.fillText(score.toString(), canvas.width / 2, 50);
      
      // Draw start/game over screen
      if (gameState === 'start') {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 36px Arial';
        ctx.fillText('Flappy Pipe', canvas.width / 2, canvas.height / 2 - 40);
        ctx.font = '20px Arial';
        ctx.fillText('Click or Press Space to Start', canvas.width / 2, canvas.height / 2 + 20);
      }
      
      if (gameState === 'gameover') {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#ff4444';
        ctx.font = 'bold 40px Arial';
        ctx.fillText('Game Over!', canvas.width / 2, canvas.height / 2 - 50);
        ctx.fillStyle = '#fff';
        ctx.font = '24px Arial';
        ctx.fillText(`Score: ${score}`, canvas.width / 2, canvas.height / 2);
        ctx.fillText(`High Score: ${highScore}`, canvas.width / 2, canvas.height / 2 + 35);
        ctx.font = '18px Arial';
        ctx.fillText('Click to Restart', canvas.width / 2, canvas.height / 2 + 80);
      }
      
      gameRef.current.frameId = requestAnimationFrame(gameLoop);
    };
    
    gameLoop();
    
    return () => {
      if (gameRef.current.frameId) {
        cancelAnimationFrame(gameRef.current.frameId);
      }
    };
  }, [gameState, score, highScore]);

  return (
    <div className="game-wrapper">
      <canvas
        ref={canvasRef}
        width={400}
        height={500}
        onClick={jump}
        className="game-canvas"
      />
    </div>
  );
}

export default FlappyBird;