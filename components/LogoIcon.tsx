import React from 'react';

interface LogoIconProps {
  className?: string;
}

export const LogoIcon: React.FC<LogoIconProps> = ({ className = "logo-icon" }) => (
  <img 
    src="/icon.png?v=8" 
    alt="SiteNest Logo"
    className={className}
    style={{ objectFit: 'contain' }}
  />
);
