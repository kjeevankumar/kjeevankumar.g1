import React, { useEffect, useState, useRef, useCallback } from 'react';

interface Trail {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  rotation: number;
  color: string;
}

const heartColors = ['#ff6b6b', '#ee5a5a', '#ff8787', '#fa5252', '#ff4757', '#ff6b81'];

const CustomCursor: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [trails, setTrails] = useState<Trail[]>([]);
  const trailIdRef = useRef(0);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const addTrail = useCallback((x: number, y: number) => {
    const newTrail: Trail = {
      id: trailIdRef.current++,
      x: x + (Math.random() - 0.5) * 20,
      y: y + (Math.random() - 0.5) * 20,
      size: Math.random() * 12 + 8,
      opacity: 1,
      rotation: (Math.random() - 0.5) * 30,
      color: heartColors[Math.floor(Math.random() * heartColors.length)],
    };
    setTrails(prev => [...prev.slice(-15), newTrail]);
  }, []);

  useEffect(() => {
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      return;
    }

    let lastX = 0;
    let lastY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      const distance = Math.sqrt(Math.pow(e.clientX - lastX, 2) + Math.pow(e.clientY - lastY, 2));
      if (distance > 12) {
        addTrail(e.clientX, e.clientY);
        lastX = e.clientX;
        lastY = e.clientY;
      }

      const target = e.target as HTMLElement;
      const isClickable = 
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        !!target.closest('button') ||
        !!target.closest('a') ||
        target.getAttribute('role') === 'button' ||
        window.getComputedStyle(target).cursor === 'pointer';
      setIsPointer(isClickable);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseDown = () => {
      setIsClicking(true);
      // Burst of hearts on click
      for (let i = 0; i < 5; i++) {
        setTimeout(() => addTrail(mousePos.x, mousePos.y), i * 30);
      }
    };
    const handleMouseUp = () => setIsClicking(false);

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [addTrail, mousePos.x, mousePos.y]);

  // Fade out and float up trails
  useEffect(() => {
    const interval = setInterval(() => {
      setTrails(prev => 
        prev
          .map(trail => ({ 
            ...trail, 
            opacity: trail.opacity - 0.06,
            y: trail.y - 1.5,
          }))
          .filter(trail => trail.opacity > 0)
      );
    }, 40);
    return () => clearInterval(interval);
  }, []);

  if (isMobile || (typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0))) {
    return null;
  }

  return (
    <>
      <style>{`
        @media (pointer: fine) {
          * { cursor: none !important; }
        }
      `}</style>

      {/* Heart trails */}
      {trails.map(trail => (
        <svg
          key={trail.id}
          className="fixed pointer-events-none z-[9997]"
          style={{
            left: trail.x,
            top: trail.y,
            width: trail.size,
            height: trail.size,
            transform: `translate(-50%, -50%) rotate(${trail.rotation}deg) scale(${trail.opacity})`,
            opacity: trail.opacity,
            transition: 'opacity 0.1s ease-out',
            filter: `drop-shadow(0 0 4px ${trail.color})`,
          }}
          viewBox="0 0 24 24"
          fill={trail.color}
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      ))}

      {/* Main cursor - heart */}
      <svg
        className="fixed pointer-events-none z-[9999]"
        style={{
          left: mousePos.x,
          top: mousePos.y,
          width: isClicking ? '28px' : isPointer ? '24px' : '18px',
          height: isClicking ? '28px' : isPointer ? '24px' : '18px',
          transform: 'translate(-50%, -50%)',
          opacity: isVisible ? 1 : 0,
          transition: 'width 0.15s ease, height 0.15s ease, opacity 0.2s ease, filter 0.3s ease',
          filter: isPointer 
            ? 'drop-shadow(0 0 12px #ff6b6b) drop-shadow(0 0 24px rgba(255, 107, 107, 0.5))' 
            : 'drop-shadow(0 0 8px #ff6b6b)',
        }}
        viewBox="0 0 24 24"
        fill="url(#heartGradient)"
      >
        <defs>
          <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff6b6b" />
            <stop offset="50%" stopColor="#ee5a5a" />
            <stop offset="100%" stopColor="#fa5252" />
          </linearGradient>
        </defs>
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>

      {/* Floating mini hearts on hover */}
      {isPointer && (
        <>
          <svg
            className="fixed pointer-events-none z-[9998]"
            style={{
              left: mousePos.x - 20,
              top: mousePos.y - 15,
              width: '10px',
              height: '10px',
              opacity: isVisible ? 0.8 : 0,
              animation: 'floatHeart 1.5s ease-in-out infinite',
              filter: 'drop-shadow(0 0 3px #ff6b6b)',
            }}
            viewBox="0 0 24 24"
            fill="#ff8787"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          <svg
            className="fixed pointer-events-none z-[9998]"
            style={{
              left: mousePos.x + 20,
              top: mousePos.y - 12,
              width: '8px',
              height: '8px',
              opacity: isVisible ? 0.7 : 0,
              animation: 'floatHeart 1.5s ease-in-out infinite 0.3s',
              filter: 'drop-shadow(0 0 3px #ff6b6b)',
            }}
            viewBox="0 0 24 24"
            fill="#ff6b81"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          <svg
            className="fixed pointer-events-none z-[9998]"
            style={{
              left: mousePos.x + 18,
              top: mousePos.y + 18,
              width: '7px',
              height: '7px',
              opacity: isVisible ? 0.6 : 0,
              animation: 'floatHeart 1.5s ease-in-out infinite 0.6s',
              filter: 'drop-shadow(0 0 3px #ff6b6b)',
            }}
            viewBox="0 0 24 24"
            fill="#fa5252"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </>
      )}

      <style>{`
        @keyframes floatHeart {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-8px) scale(1.1); }
        }
      `}</style>
    </>
  );
};

export default CustomCursor;
