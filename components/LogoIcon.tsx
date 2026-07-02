import React from 'react';

interface LogoIconProps {
  className?: string;
}

export const LogoIcon: React.FC<LogoIconProps> = ({ className = "logo-icon" }) => (
  <img 
    src="/logo.png?v=9" 
    alt="SiteNest Logo"
    className={className}
    style={{ objectFit: 'contain' }}
  />
);
