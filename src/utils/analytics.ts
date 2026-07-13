/**
 * Plausible is cookieless, so it needs no consent banner under GDPR/ePrivacy —
 * which also means it measures every visitor, not just the ones who accept a
 * banner. The script is only injected when VITE_PLAUSIBLE_DOMAIN is set, so
 * this is a no-op until analytics is configured.
 */
declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: Record<string, string> }) => void;
  }
}

export const trackEvent = (event: string, props?: Record<string, string>) => {
  window.plausible?.(event, props ? { props } : undefined);
};
