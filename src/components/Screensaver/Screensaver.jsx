import React, { useEffect, useRef, useState } from 'react';
import './Screensaver.css';

function Screensaver({ type, onExit }) {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const handleExit = () => onExit();
    
    window.addEventListener('mousemove', handleExit);
    window.addEventListener('mousedown', handleExit);
    window.addEventListener('keydown', handleExit);
    window.addEventListener('touchstart', handleExit);

    return () => {
      window.removeEventListener('mousemove', handleExit);
      window.removeEventListener('mousedown', handleExit);
      window.removeEventListener('keydown', handleExit);
      window.removeEventListener('touchstart', handleExit);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [onExit]);

  // Starfield Screensaver
  useEffect(() => {
    if (type !== 'starfield') return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const stars = Array(200).fill(null).map(() => ({
      x: Math.random() * canvas.width - canvas.width / 2,
      y: Math.random() * canvas.height - canvas.height / 2,
      z: Math.random() * canvas.width,
    }));

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      stars.forEach(star => {
        star.z -= 8;
        if (star.z <= 0) {
          star.x = Math.random() * canvas.width - cx;
          star.y = Math.random() * canvas.height - cy;
          star.z = canvas.width;
        }

        const sx = (star.x / star.z) * 300 + cx;
        const sy = (star.y / star.z) * 300 + cy;
        const size = (1 - star.z / canvas.width) * 3;

        ctx.fillStyle = `rgba(255, 255, 255, ${1 - star.z / canvas.width})`;
        ctx.beginPath();
        ctx.arc(sx, sy, size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    animate();
  }, [type]);

  // Matrix Screensaver
  useEffect(() => {
    if (type !== 'matrix') return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#0f0';
      ctx.font = `${fontSize}px monospace`;

      drops.forEach((y, i) => {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        
        ctx.fillStyle = `rgb(0, ${150 + Math.random() * 105}, 0)`;
        ctx.fillText(char, x, y * fontSize);

        if (y * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    animate();
  }, [type]);

  // Pipes Screensaver
  useEffect(() => {
    if (type !== 'pipes') return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const pipes = [];
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
    
    const createPipe = () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      dir: Math.floor(Math.random() * 4),
      color: colors[Math.floor(Math.random() * colors.length)],
      length: 0,
      maxLength: 20 + Math.random() * 100,
    });

    for (let i = 0; i < 5; i++) {
      pipes.push(createPipe());
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.01)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      pipes.forEach((pipe, index) => {
        const speed = 3;
        const oldX = pipe.x;
        const oldY = pipe.y;

        switch (pipe.dir) {
          case 0: pipe.y -= speed; break;
          case 1: pipe.x += speed; break;
          case 2: pipe.y += speed; break;
          case 3: pipe.x -= speed; break;
        }

        ctx.strokeStyle = pipe.color;
        ctx.lineWidth = 4;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(oldX, oldY);
        ctx.lineTo(pipe.x, pipe.y);
        ctx.stroke();

        // Draw joint
        ctx.fillStyle = pipe.color;
        ctx.beginPath();
        ctx.arc(pipe.x, pipe.y, 6, 0, Math.PI * 2);
        ctx.fill();

        pipe.length++;

        if (pipe.length > pipe.maxLength || 
            pipe.x < 0 || pipe.x > canvas.width || 
            pipe.y < 0 || pipe.y > canvas.height) {
          if (Math.random() > 0.3) {
            const dirs = [0, 1, 2, 3].filter(d => Math.abs(d - pipe.dir) !== 2);
            pipe.dir = dirs[Math.floor(Math.random() * dirs.length)];
            pipe.length = 0;
            pipe.maxLength = 20 + Math.random() * 100;
          } else {
            pipes[index] = createPipe();
          }
        } else if (Math.random() > 0.95) {
          const dirs = [0, 1, 2, 3].filter(d => Math.abs(d - pipe.dir) !== 2);
          pipe.dir = dirs[Math.floor(Math.random() * dirs.length)];
          pipe.length = 0;
          pipe.maxLength = 20 + Math.random() * 100;
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    animate();
  }, [type]);

  // Bubbles Screensaver
  useEffect(() => {
    if (type !== 'bubbles') return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const bubbles = Array(30).fill(null).map(() => ({
      x: Math.random() * canvas.width,
      y: canvas.height + Math.random() * 100,
      radius: 20 + Math.random() * 60,
      speed: 0.5 + Math.random() * 2,
      hue: Math.random() * 360,
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: 0.02 + Math.random() * 0.03,
    }));

    const animate = () => {
      ctx.fillStyle = 'rgba(10, 20, 40, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      bubbles.forEach(bubble => {
        bubble.y -= bubble.speed;
        bubble.wobble += bubble.wobbleSpeed;
        bubble.x += Math.sin(bubble.wobble) * 0.5;

        if (bubble.y + bubble.radius < 0) {
          bubble.y = canvas.height + bubble.radius;
          bubble.x = Math.random() * canvas.width;
        }

        // Bubble gradient
        const gradient = ctx.createRadialGradient(
          bubble.x - bubble.radius * 0.3,
          bubble.y - bubble.radius * 0.3,
          0,
          bubble.x,
          bubble.y,
          bubble.radius
        );
        gradient.addColorStop(0, `hsla(${bubble.hue}, 80%, 80%, 0.8)`);
        gradient.addColorStop(0.5, `hsla(${bubble.hue}, 70%, 60%, 0.4)`);
        gradient.addColorStop(1, `hsla(${bubble.hue}, 60%, 50%, 0.1)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);
        ctx.fill();

        // Highlight
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.beginPath();
        ctx.arc(
          bubble.x - bubble.radius * 0.3,
          bubble.y - bubble.radius * 0.3,
          bubble.radius * 0.15,
          0,
          Math.PI * 2
        );
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    ctx.fillStyle = '#0a1428';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    animate();
  }, [type]);

  if (type === 'none') return null;

  return (
    <div className="screensaver">
      <canvas ref={canvasRef} className="screensaver-canvas" />
      <div className="screensaver-hint">Move mouse or press any key to exit</div>
    </div>
  );
}

export default Screensaver;