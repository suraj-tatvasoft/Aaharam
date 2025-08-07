import React from 'react';

/**
 * A common indicator bar for use at the bottom of pages (e.g., onboarding, login, splash, analytics, preference selection).
 * Customizable via props if needed in the future.
 */
const IndicatorBar: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`mx-auto h-1.5 w-24 rounded-full bg-black ${className}`.trim()} />
);

export default IndicatorBar;
