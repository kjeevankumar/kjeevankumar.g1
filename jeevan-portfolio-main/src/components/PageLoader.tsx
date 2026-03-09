
import React, { useState, useEffect } from 'react';

interface PageLoaderProps {
  isLoading: boolean;
  onLoadingComplete: () => void;
}

const PageLoader: React.FC<PageLoaderProps> = ({ isLoading, onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isLoading) {
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            setTimeout(onLoadingComplete, 500);
            return 100;
          }
          return prev + Math.random() * 15;
        });
      }, 100);

      return () => clearInterval(progressInterval);
    }
  }, [isLoading, onLoadingComplete]);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center">
      <div className="w-64 h-1 bg-gray-200 rounded-full mb-8 overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      
      <div className="flex space-x-2 mb-4">
        <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
        <div className="w-3 h-3 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
        <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
      </div>
      
      <p className="text-gray-600 text-lg font-medium">Loading Portfolio...</p>
      <p className="text-gray-400 text-sm mt-2">{Math.round(progress)}%</p>
    </div>
  );
};

export default PageLoader;
