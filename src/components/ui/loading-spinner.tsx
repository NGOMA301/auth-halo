import React from 'react';
import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'geometric' | 'pulse' | 'minimal';
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  variant = 'geometric',
  className
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  if (variant === 'geometric') {
    return (
      <div className={cn('relative', sizeClasses[size], className)}>
        <div className="absolute inset-0 border-2 border-loading-primary border-t-transparent rounded-full animate-geometric-spin" />
        <div className="absolute inset-1 border border-loading-secondary border-t-transparent rounded-full animate-geometric-spin" style={{ animationDirection: 'reverse', animationDuration: '1s' }} />
        <div className="absolute inset-2 w-2 h-2 bg-loading-accent rounded-full animate-pulse-fade" />
      </div>
    );
  }

  if (variant === 'pulse') {
    return (
      <div className={cn('flex space-x-1', className)}>
        <div className={cn('bg-loading-primary rounded-full animate-pulse-fade', size === 'sm' ? 'w-1 h-1' : size === 'md' ? 'w-2 h-2' : 'w-3 h-3')} />
        <div className={cn('bg-loading-secondary rounded-full animate-pulse-fade', size === 'sm' ? 'w-1 h-1' : size === 'md' ? 'w-2 h-2' : 'w-3 h-3')} style={{ animationDelay: '0.2s' }} />
        <div className={cn('bg-loading-accent rounded-full animate-pulse-fade', size === 'sm' ? 'w-1 h-1' : size === 'md' ? 'w-2 h-2' : 'w-3 h-3')} style={{ animationDelay: '0.4s' }} />
      </div>
    );
  }

  return (
    <div className={cn('border-2 border-muted border-t-primary rounded-full animate-spin', sizeClasses[size], className)} />
  );
};

export const FullPageLoader: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="text-center space-y-6 animate-slide-fade-in">
        <LoadingSpinner size="lg" variant="geometric" />
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Loading</h3>
          <p className="text-muted-foreground text-sm">Please wait while we prepare your experience</p>
        </div>
      </div>
    </div>
  );
};