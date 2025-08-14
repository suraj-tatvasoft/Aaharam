import { useEffect } from 'react';

export const useThemeColor = (color: string) => {
  useEffect(() => {
    // Create or update the theme-color meta tag
    let themeColorMeta = document.querySelector('meta[name="theme-color"]');
    
    if (!themeColorMeta) {
      themeColorMeta = document.createElement('meta');
      themeColorMeta.setAttribute('name', 'theme-color');
      document.head.appendChild(themeColorMeta);
    }
    
    themeColorMeta.setAttribute('content', color);

    // Cleanup function to remove the meta tag when component unmounts
    return () => {
      if (themeColorMeta) {
        document.head.removeChild(themeColorMeta);
      }
    };
  }, [color]);

  return null;
};
