import React, { memo } from 'react';
import { useScreenReader } from '../../hooks/useAccessibility';

// Composant pour les annonces aux lecteurs d'écran
const ScreenReaderAnnouncements = memo(() => {
  const { announcements } = useScreenReader();

  // Ne pas rendre si aucune annonce
  if (!announcements.length) return null;

  return (
    <>
      {announcements.map(({ id, message, priority }) => (
        <div
          key={id}
          role="status"
          aria-live={priority}
          aria-atomic="true"
          className="sr-only"
        >
          {message}
        </div>
      ))}
    </>
  );
});

ScreenReaderAnnouncements.displayName = 'ScreenReaderAnnouncements';

export default ScreenReaderAnnouncements; 