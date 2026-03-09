
import React, { ReactNode } from 'react';
import { Button } from "@/components/ui/button";
import { Loader2 } from 'lucide-react';

interface LoadingButtonProps {
  children: ReactNode;
  isLoading?: boolean;
  onClick?: () => void;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  className?: string;
  disabled?: boolean;
}

const LoadingButton: React.FC<LoadingButtonProps> = ({ 
  children, 
  isLoading = false, 
  onClick, 
  variant = "default",
  className = "",
  disabled = false
}) => {
  return (
    <Button 
      onClick={onClick}
      variant={variant}
      disabled={disabled || isLoading}
      className={`transition-all duration-300 ${className}`}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          Loading...
        </>
      ) : (
        children
      )}
    </Button>
  );
};

export default LoadingButton;
