'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export const NebulaCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const particles: Particle[] = [];
    const particleCount = 150;
    let time = 0;

    class Particle {
      x: number = 0;
      y: number = 0;
      size: number = 0;
      vx: number = 0;
      vy: number = 0;
      life: number = 0;
      color: string = '';

      constructor() {
        this.init();
      }

      init() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 1.5 + 0.5;
        this.vx = 0;
        this.vy = 0;
        this.life = Math.random() * 100 + 100;
        
        const colors = ['#00f2ff', '#10b981', '#8b5cf6', '#ffffff'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update(t: number) {
        // Simple flow field math
        const angle = Math.sin(this.x * 0.005 + t) * Math.cos(this.y * 0.005 + t) * Math.PI * 2;
        this.vx += Math.cos(angle) * 0.1;
        this.vy += Math.sin(angle) * 0.1;
        
        // Friction
        this.vx *= 0.95;
        this.vy *= 0.95;

        this.x += this.vx;
        this.y += this.vy;
        this.life -= 0.5;

        if (this.life <= 0 || this.x > width || this.x < 0 || this.y > height || this.y < 0) {
          this.init();
        }
      }

      draw() {
        if (!ctx) return;
        const opacity = Math.min(1, this.life / 50);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = opacity * 0.3;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Add a small trail/glow
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      time += 0.005;
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
      
      // Motion blur effect
      ctx.fillStyle = 'rgba(5, 5, 5, 0.15)';
      ctx.fillRect(0, 0, width, height);

      particles.forEach(p => {
        p.update(time);
        p.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <motion.canvas
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
};
