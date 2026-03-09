import React, { useEffect, useRef } from 'react';
import { useTheme } from '@/hooks/use-theme';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

const BackgroundEffect: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let nodes: Node[] = [];
    let mouseX = -1000;
    let mouseY = -1000;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initNodes();
    };

    const initNodes = () => {
      nodes = [];
      const isMobile = canvas.width < 768;
      const nodeCount = isMobile 
        ? Math.floor((canvas.width * canvas.height) / 50000) 
        : Math.floor((canvas.width * canvas.height) / 25000);
      for (let i = 0; i < Math.min(nodeCount, isMobile ? 30 : 80); i++) {
        nodes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          radius: Math.random() * 2 + 1.5,
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    const getColors = () => {
      const isDark = theme === 'dark';
      
      return {
        nodeColor: isDark ? 'rgba(100, 149, 237, 0.6)' : 'rgba(59, 130, 246, 0.5)',
        lineColor: isDark ? 'rgba(100, 149, 237, 0.15)' : 'rgba(59, 130, 246, 0.12)',
        activeLineColor: isDark ? 'rgba(139, 92, 246, 0.4)' : 'rgba(99, 102, 241, 0.3)',
        glowColor: isDark ? 'rgba(139, 92, 246, 0.8)' : 'rgba(99, 102, 241, 0.6)',
      };
    };

    const animate = () => {
      const colors = getColors();
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw nodes
      nodes.forEach((node, i) => {
        // Move nodes
        node.x += node.vx;
        node.y += node.vy;

        // Bounce off edges
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

        // Keep in bounds
        node.x = Math.max(0, Math.min(canvas.width, node.x));
        node.y = Math.max(0, Math.min(canvas.height, node.y));

        // Mouse interaction - attract nodes slightly
        const dx = mouseX - node.x;
        const dy = mouseY - node.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200 && dist > 0) {
          node.vx += (dx / dist) * 0.02;
          node.vy += (dy / dist) * 0.02;
        }

        // Limit velocity
        const maxVel = 0.8;
        node.vx = Math.max(-maxVel, Math.min(maxVel, node.vx));
        node.vy = Math.max(-maxVel, Math.min(maxVel, node.vy));

        // Draw connections
        for (let j = i + 1; j < nodes.length; j++) {
          const other = nodes[j];
          const dx2 = node.x - other.x;
          const dy2 = node.y - other.y;
          const distance = Math.sqrt(dx2 * dx2 + dy2 * dy2);

          if (distance < 180) {
            const opacity = (1 - distance / 180);
            
            // Check if line is near mouse
            const midX = (node.x + other.x) / 2;
            const midY = (node.y + other.y) / 2;
            const mouseDist = Math.sqrt((mouseX - midX) ** 2 + (mouseY - midY) ** 2);
            const isActive = mouseDist < 150;

            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            
            if (isActive) {
              ctx.strokeStyle = colors.activeLineColor.replace('0.4', String(opacity * 0.5));
              ctx.lineWidth = 1.5;
            } else {
              ctx.strokeStyle = colors.lineColor.replace('0.15', String(opacity * 0.15));
              ctx.lineWidth = 1;
            }
            ctx.stroke();
          }
        }

        // Draw node
        const nodeMouseDist = Math.sqrt((mouseX - node.x) ** 2 + (mouseY - node.y) ** 2);
        const isNodeActive = nodeMouseDist < 150;

        ctx.beginPath();
        ctx.arc(node.x, node.y, isNodeActive ? node.radius * 1.5 : node.radius, 0, Math.PI * 2);
        
        if (isNodeActive) {
          // Glow effect
          ctx.shadowBlur = 15;
          ctx.shadowColor = colors.glowColor;
          ctx.fillStyle = colors.glowColor;
        } else {
          ctx.shadowBlur = 0;
          ctx.fillStyle = colors.nodeColor;
        }
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationId = requestAnimationFrame(animate);
    };

    resize();
    animate();

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [theme]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 0 }}
      />
      {/* Subtle gradient overlays */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-primary/3 to-transparent" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-accent/3 to-transparent" />
      </div>
    </>
  );
};

export default BackgroundEffect;
