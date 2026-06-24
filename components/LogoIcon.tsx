import React from 'react';

interface LogoIconProps {
  className?: string;
}

export const LogoIcon: React.FC<LogoIconProps> = ({ className = "logo-icon" }) => (
  <svg 
    className={className} 
    viewBox="0 0 100 100" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* The 'S' shaped hexagon */}
    <path 
      d="M 80 25 L 50 10 L 20 25 L 20 45 L 50 60 L 80 45 L 80 75 L 50 90 L 20 75" 
      stroke="#FFFFFF" 
      strokeWidth="12" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
    
    {/* The 4 window squares in the center */}
    <rect x="42" y="32" width="6" height="6" fill="#FFFFFF" />
    <rect x="52" y="32" width="6" height="6" fill="#FFFFFF" />
    <rect x="42" y="42" width="6" height="6" fill="#FFFFFF" />
    <rect x="52" y="42" width="6" height="6" fill="#FFFFFF" />
  </svg>
);
