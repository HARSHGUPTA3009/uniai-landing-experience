
import React from 'react';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="relative w-8 h-8">
        <div className="absolute inset-0 bg-uniai-blue rounded-full opacity-50 blur-sm animate-pulse-light"></div>
        <div className="absolute inset-0.5 bg-uniai-dark rounded-full flex items-center justify-center">
          <div className="w-4 h-4 bg-gradient-to-tr from-uniai-blue to-uniai-light rounded-full"></div>
        </div>
      </div>
      <span className="text-2xl font-bold tracking-tight text-gradient-primary">UniAI</span>
    </div>
  );
};

export default Logo;
