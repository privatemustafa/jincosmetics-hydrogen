export const INTRO_SEEN_KEY = 'jin-intro-seen';

export function shouldSkipIntro(): boolean {
  if (typeof window === 'undefined') return false;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return true;
  return sessionStorage.getItem(INTRO_SEEN_KEY) === '1';
}

export function markIntroSeen() {
  if (typeof window === 'undefined') return;
  sessionStorage.setItem(INTRO_SEEN_KEY, '1');
}
