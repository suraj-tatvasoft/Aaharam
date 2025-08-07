import React from 'react';
import mainLogo from '@/assets/main-logo.svg';

const CustomToastIcon: React.FC<{ className?: string }> = ({ className }) => (
  <span className={className} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', height: 32, width: 32 }}>
    <img src={mainLogo} alt="Aaharam Logo" style={{ width: 28, height: 28, borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }} />
  </span>
);

export default CustomToastIcon;
