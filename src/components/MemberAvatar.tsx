import React from 'react';

interface MemberAvatarProps {
  colorClass: string;
  devType: string;
}

export const MemberAvatar: React.FC<MemberAvatarProps> = ({ colorClass, devType }) => {
  const isFront = devType === 'front';
  const isBack = devType === 'back';
  const isDevops = devType === 'devops';
  
  return (
    <svg className={`team-avatar-svg ${colorClass}`} viewBox="0 0 100 133" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={`grad-${devType}`} x1="0" y1="0" x2="100" y2="133" gradientUnits="userSpaceOnUse">
          {isFront && (
            <>
              <stop stopColor="#ff5e00" />
              <stop offset="1" stopColor="#ff007f" />
            </>
          )}
          {isBack && (
            <>
              <stop stopColor="#00f0ff" />
              <stop offset="1" stopColor="#8a2be2" />
            </>
          )}
          {isDevops && (
            <>
              <stop stopColor="#ff007f" />
              <stop offset="1" stopColor="#00f0ff" />
            </>
          )}
          {!isFront && !isBack && !isDevops && (
            <>
              <stop stopColor="#8a2be2" />
              <stop offset="1" stopColor="#ff5e00" />
            </>
          )}
        </linearGradient>
      </defs>
      
      {/* Background patterns */}
      <rect width="100" height="133" fill="#0d0f19" />
      <circle cx="50" cy="66" r="40" stroke={`url(#grad-${devType})`} strokeWidth="1" strokeDasharray="3 3" opacity="0.3" />
      <circle cx="50" cy="66" r="30" stroke={`url(#grad-${devType})`} strokeWidth="0.5" opacity="0.2" />
      
      {/* Abstract Tech Face / Avatar representation */}
      {isFront && (
        <>
          <polygon points="50,25 75,50 50,75 25,50" fill="url(#grad-front)" opacity="0.2"/>
          <circle cx="50" cy="50" r="15" fill="none" stroke="url(#grad-front)" strokeWidth="2" />
          <path d="M35,90 Q50,70 65,90" stroke="url(#grad-front)" strokeWidth="3" strokeLinecap="round" />
          <line x1="25" y1="105" x2="75" y2="105" stroke="url(#grad-front)" strokeWidth="1" />
        </>
      )}
      {isBack && (
        <>
          <rect x="30" y="30" width="40" height="40" rx="10" fill="url(#grad-back)" opacity="0.2"/>
          <rect x="40" y="40" width="20" height="20" rx="5" fill="none" stroke="url(#grad-back)" strokeWidth="2" />
          <path d="M25,95 Q50,80 75,95" stroke="url(#grad-back)" strokeWidth="3" strokeLinecap="round" />
          <line x1="50" y1="60" x2="50" y2="85" stroke="url(#grad-back)" strokeWidth="1" />
        </>
      )}
      {isDevops && (
        <>
          <path d="M50,20 L80,35 L80,70 L50,85 L20,70 L20,35 Z" fill="url(#grad-devops)" opacity="0.2" />
          <path d="M50,30 L70,40 L70,60 L50,70 L30,60 L30,40 Z" fill="none" stroke="url(#grad-devops)" strokeWidth="2" />
          <path d="M20,95 Q50,75 80,95" stroke="url(#grad-devops)" strokeWidth="3" strokeLinecap="round" />
        </>
      )}
      {!isFront && !isBack && !isDevops && (
        <>
          <circle cx="50" cy="45" r="20" fill="url(#grad-smm)" opacity="0.2"/>
          <path d="M50,25 A20,20 0 0,0 30,45" fill="none" stroke="url(#grad-smm)" strokeWidth="2" />
          <circle cx="50" cy="45" r="8" fill="none" stroke="url(#grad-smm)" strokeWidth="1.5" />
          <path d="M30,95 Q50,70 70,95" stroke="url(#grad-smm)" strokeWidth="3" strokeLinecap="round" />
        </>
      )}
    </svg>
  );
};
