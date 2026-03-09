
import React, { useState, useEffect } from 'react';

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  delay?: number;
  suffix?: string;
  decimals?: number;
  isVisible: boolean;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ 
  end, 
  duration = 2000, 
  delay = 0, 
  suffix = '', 
  decimals = 0,
  isVisible 
}) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!isVisible || hasAnimated) return;

    const timer = setTimeout(() => {
      let startTime: number;
      const startValue = 0;
      const endValue = end;

      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentCount = startValue + (endValue - startValue) * easeOutQuart;
        
        setCount(currentCount);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setCount(endValue);
          setHasAnimated(true);
        }
      };

      requestAnimationFrame(animate);
    }, delay);

    return () => clearTimeout(timer);
  }, [isVisible, end, duration, delay, hasAnimated]);

  const formatNumber = (num: number) => {
    return decimals > 0 ? num.toFixed(decimals) : Math.floor(num).toString();
  };

  return (
    <span>
      {formatNumber(count)}{suffix}
    </span>
  );
};

export default AnimatedCounter;
