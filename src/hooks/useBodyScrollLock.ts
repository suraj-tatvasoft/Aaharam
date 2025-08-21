import { useEffect } from 'react';

export const useBodyScrollLock = (isLocked: boolean) => {
  useEffect(() => {
    if (isLocked) {
      // Store the current scroll position
      const scrollY = window.scrollY;
      
      // Apply styles to prevent scrolling and add modal class
      document.body.style.overflow = 'hidden';
      document.body.classList.add('modal-open');
      
      return () => {
        // Restore the original styles and remove modal class
        document.body.style.overflow = 'auto';
        document.body.classList.remove('modal-open');
        
        // Restore the scroll position
        window.scrollTo(0, scrollY);
      };
    }
  }, [isLocked]);
};
