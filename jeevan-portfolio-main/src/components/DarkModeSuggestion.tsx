import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, X } from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';
import { Button } from '@/components/ui/button';

const DarkModeSuggestion: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    // Only show if user is on light mode and hasn't dismissed before
    const hasDismissed = localStorage.getItem('darkModeSuggestionDismissed');
    
    if (!hasDismissed && theme === 'light') {
      // Show after a short delay for better UX
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [theme]);

  const handleSwitchToDark = () => {
    setTheme('dark');
    localStorage.setItem('darkModeSuggestionDismissed', 'true');
    setIsVisible(false);
  };

  const handleDismiss = () => {
    localStorage.setItem('darkModeSuggestionDismissed', 'true');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-20 left-1/2 -translate-x-1/2 z-40 max-w-sm w-[calc(100%-2rem)] sm:max-w-md sm:bottom-6"
        >
          <div className="relative bg-card/95 backdrop-blur-xl border border-border/50 rounded-2xl p-4 shadow-2xl">
            {/* Close button */}
            <button
              onClick={handleDismiss}
              className="absolute top-3 right-3 p-1.5 rounded-full hover:bg-secondary transition-colors"
              aria-label="Dismiss"
            >
              <X className="w-4 h-4 text-muted-foreground" />
            </button>

            <div className="flex items-start gap-4 pr-6">
              {/* Icon */}
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <Moon className="w-6 h-6 text-primary" />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-foreground text-sm mb-1">
                  Try Dark Mode ✨
                </h4>
                <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
                  For the best viewing experience, switch to dark mode. It's easier on the eyes!
                </p>
                
                <div className="flex items-center gap-2">
                  <Button
                    onClick={handleSwitchToDark}
                    size="sm"
                    className="h-8 px-4 text-xs font-medium rounded-xl bg-primary hover:bg-primary/90"
                  >
                    <Moon className="w-3.5 h-3.5 mr-1.5" />
                    Switch to Dark
                  </Button>
                  <Button
                    onClick={handleDismiss}
                    variant="ghost"
                    size="sm"
                    className="h-8 px-3 text-xs text-muted-foreground hover:text-foreground rounded-xl"
                  >
                    Maybe later
                  </Button>
                </div>
              </div>
            </div>

            {/* Subtle gradient accent */}
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent rounded-full" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DarkModeSuggestion;
