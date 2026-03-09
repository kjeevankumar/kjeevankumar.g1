import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedLogoProps {
  onClick?: () => void;
}

const fireParticles = Array.from({ length: 8 }, (_, i) => ({
  id: i,
  x: (i - 4) * 3,
  delay: i * 0.15,
  duration: 0.8 + Math.random() * 0.6,
  size: 3 + Math.random() * 4,
}));

const AnimatedLogo: React.FC<AnimatedLogoProps> = ({ onClick }) => {
  return (
    <motion.button
      onClick={onClick}
      className="relative group flex items-center gap-0.5"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="relative">
        {/* Fire glow base */}
        <motion.div
          className="absolute -inset-3 rounded-xl blur-xl opacity-0 group-hover:opacity-80 transition-opacity duration-300"
          style={{
            background: 'radial-gradient(ellipse at bottom, hsl(var(--primary) / 0.6), hsl(25 95% 53% / 0.4), transparent)',
          }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Fire particles - visible on hover */}
        <div className="absolute -inset-2 overflow-visible pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {fireParticles.map((p) => (
            <motion.div
              key={p.id}
              className="absolute rounded-full"
              style={{
                width: p.size,
                height: p.size,
                left: `calc(50% + ${p.x}px)`,
                bottom: 0,
                background: `radial-gradient(circle, hsl(25 95% 60%), hsl(var(--primary)))`,
                filter: 'blur(0.5px)',
              }}
              animate={{
                y: [0, -20 - Math.random() * 15],
                opacity: [0.9, 0],
                scale: [1, 0.3],
              }}
              transition={{
                duration: p.duration,
                delay: p.delay,
                repeat: Infinity,
                ease: 'easeOut',
              }}
            />
          ))}
        </div>

        {/* Main logo letters */}
        <div className="relative flex items-center">
          <motion.span
            className="text-2xl font-extrabold bg-gradient-to-b from-[hsl(40_95%_60%)] via-[hsl(25_95%_53%)] to-primary bg-clip-text text-transparent"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            J
          </motion.span>

          <motion.span
            className="text-2xl font-extrabold bg-gradient-to-b from-[hsl(40_95%_60%)] via-[hsl(25_95%_53%)] to-accent bg-clip-text text-transparent"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            K
          </motion.span>

          <motion.span
            className="text-2xl font-extrabold text-[hsl(25_95%_53%)]"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: [1, 1.3, 1] }}
            transition={{
              opacity: { duration: 0.4, delay: 0.3 },
              scale: { duration: 1.5, delay: 0.3, repeat: Infinity, ease: 'easeInOut' },
            }}
          >
            .
          </motion.span>
        </div>
      </div>

      {/* Fire underline on hover */}
      <motion.div
        className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full origin-left"
        style={{
          background: 'linear-gradient(90deg, hsl(var(--primary)), hsl(25 95% 53%), hsl(40 95% 60%))',
        }}
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      />
    </motion.button>
  );
};

export default AnimatedLogo;
