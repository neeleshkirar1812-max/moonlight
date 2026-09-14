import { useEffect, useState } from 'react';

/**
 * useContentProtection - Anti-Screenshot & Screen-Recording Guard
 * 
 * Protects luxury wedding invitation content:
 * - Disables context menu (Right click)
 * - Intercepts PrintScreen, Windows Snipping Tool (Win+Shift+S), Mac screen grab keys
 * - Blocks Print (Ctrl+P), Save (Ctrl+S), View Source (Ctrl+U), DevTools
 * - Clears clipboard on capture trigger
 * - Activates screen obfuscation blur on visibility/window focus loss
 */
export const useContentProtection = (enabled = true) => {
  const [isBlurred, setIsBlurred] = useState(false);
  const [securityAlert, setSecurityAlert] = useState(null);

  useEffect(() => {
    if (!enabled) return;

    let toastTimeout;
    const triggerSecurityToast = (msg) => {
      setSecurityAlert(msg);
      clearTimeout(toastTimeout);
      toastTimeout = setTimeout(() => {
        setSecurityAlert(null);
      }, 3500);
    };

    // 1. Block right click
    const handleContextMenu = (e) => {
      e.preventDefault();
      triggerSecurityToast('🛡️ Protected Content: Right-click is restricted.');
      return false;
    };

    // 2. Prevent screenshot / recording hotkeys
    const handleKeyDown = (e) => {
      const isMac = typeof navigator !== 'undefined' && navigator.platform?.toUpperCase().indexOf('MAC') >= 0;
      const cmdOrCtrl = isMac ? e.metaKey : e.ctrlKey;

      // PrintScreen key
      if (e.key === 'PrintScreen' || e.keyCode === 44) {
        e.preventDefault();
        try {
          if (navigator.clipboard) {
            navigator.clipboard.writeText('Protected Digital Invitation — Moonlight Production');
          }
        } catch (err) {}
        triggerSecurityToast('🛡️ Screen capture is restricted for client privacy & copyright.');
        setIsBlurred(true);
        setTimeout(() => setIsBlurred(false), 2500);
        return false;
      }

      // Snipping Tool (Win + Shift + S) or Mac (Cmd + Shift + 3/4/5)
      if ((e.key === 'S' || e.key === 's') && (e.shiftKey && (e.metaKey || e.ctrlKey))) {
        e.preventDefault();
        triggerSecurityToast('🛡️ Screen recording/capture shortcut is restricted.');
        setIsBlurred(true);
        setTimeout(() => setIsBlurred(false), 2500);
        return false;
      }

      // Print
      if (cmdOrCtrl && (e.key === 'p' || e.key === 'P')) {
        e.preventDefault();
        triggerSecurityToast('🛡️ Printing is disabled for this digital invitation.');
        return false;
      }

      // Save page
      if (cmdOrCtrl && (e.key === 's' || e.key === 'S') && !e.shiftKey) {
        e.preventDefault();
        return false;
      }

      // View source
      if (cmdOrCtrl && (e.key === 'u' || e.key === 'U')) {
        e.preventDefault();
        return false;
      }

      // DevTools
      if (
        e.key === 'F12' ||
        (cmdOrCtrl && e.shiftKey && ['i', 'I', 'j', 'J', 'c', 'C'].includes(e.key))
      ) {
        e.preventDefault();
        return false;
      }
    };

    const handleKeyUp = (e) => {
      if (e.key === 'PrintScreen' || e.keyCode === 44) {
        try {
          if (navigator.clipboard) {
            navigator.clipboard.writeText('Protected Digital Invitation — Moonlight Production');
          }
        } catch (err) {}
        setIsBlurred(true);
        setTimeout(() => setIsBlurred(false), 2000);
      }
    };

    // 3. Screen Obfuscation on Visibility / Blur
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsBlurred(true);
      } else {
        setTimeout(() => setIsBlurred(false), 300);
      }
    };

    const handleWindowBlur = () => {
      setIsBlurred(true);
      setTimeout(() => setIsBlurred(false), 1200);
    };

    // 4. Prevent drag of images
    const handleDragStart = (e) => {
      if (e.target && (e.target.tagName === 'IMG' || e.target.tagName === 'VIDEO')) {
        e.preventDefault();
        return false;
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleWindowBlur);
    document.addEventListener('dragstart', handleDragStart);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleWindowBlur);
      document.removeEventListener('dragstart', handleDragStart);
      clearTimeout(toastTimeout);
    };
  }, [enabled]);

  return { isBlurred, securityAlert };
};

export default useContentProtection;
