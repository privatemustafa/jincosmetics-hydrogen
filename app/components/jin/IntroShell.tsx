import {useEffect, useRef} from 'react';

type Props = {
  onComplete?: () => void;
};

export function IntroShell({onComplete}: Props) {
  const started = useRef(false);
  const completed = useRef(false);

  useEffect(() => {
    const scrollY = window.scrollY;
    document.documentElement.classList.add('intro-active');

    const blockScroll = (event: Event) => {
      event.preventDefault();
    };

    document.addEventListener('touchmove', blockScroll, {passive: false});
    document.addEventListener('wheel', blockScroll, {passive: false});

    return () => {
      document.documentElement.classList.remove('intro-active');
      document.removeEventListener('touchmove', blockScroll);
      document.removeEventListener('wheel', blockScroll);
      window.scrollTo(0, scrollY);
    };
  }, []);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    const intro = document.getElementById('intro');
    const canvas = document.getElementById('introCanvas') as HTMLCanvasElement | null;
    if (!intro || !canvas) return;

    let stop = () => {};
    let fallback = 0;

    const finish = () => {
      if (completed.current) return;
      completed.current = true;
      intro.classList.add('is-hidden');
      document.documentElement.classList.remove('intro-active');
      onComplete?.();
    };

    import('~/lib/intro-sphere.client.js').then(({initIntroSphere}) => {
      stop = initIntroSphere({
        intro,
        canvas,
        glow: document.getElementById('introGlow'),
        shadow: document.getElementById('introShadow'),
        counter: document.getElementById('introCounter'),
        logoStage: document.getElementById('introLogoStage'),
        onComplete: finish,
      });

      fallback = window.setTimeout(() => {
        if (!intro.classList.contains('is-hidden')) {
          stop();
          finish();
        }
      }, 12000);
    });

    return () => {
      window.clearTimeout(fallback);
      stop();
    };
  }, [onComplete]);

  return (
    <div className="intro" id="intro" aria-hidden="true">
      <div className="intro__loader" id="introLoader">
        <canvas className="intro__canvas" id="introCanvas" aria-hidden="true" />
        <div className="intro__logo-stage" id="introLogoStage" aria-hidden="true">
          <img
            src="/images/logo-jin-latin.png"
            alt="Jin"
            className="intro__logo-mark intro__logo-mark--latin"
            width={77}
            height={52}
          />
          <img
            src="/images/logo-jin-katakana.png"
            alt="ジン"
            className="intro__logo-mark intro__logo-mark--katakana"
            width={77}
            height={40}
          />
        </div>
        <div className="intro__glow" id="introGlow" aria-hidden="true" />
        <div className="intro__shadow" id="introShadow" aria-hidden="true" />
        <div className="intro__counter" id="introCounter" aria-live="polite">
          0%
        </div>
      </div>
    </div>
  );
}
