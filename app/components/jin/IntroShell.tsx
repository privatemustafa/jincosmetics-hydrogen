import {useEffect, useRef, useState} from 'react';

export function IntroShell({enabled}: {enabled: boolean}) {
  const [done, setDone] = useState(false);
  const started = useRef(false);

  useEffect(() => {
    if (!enabled || started.current || done) return;
    started.current = true;

    const intro = document.getElementById('intro');
    const canvas = document.getElementById('introCanvas') as HTMLCanvasElement | null;
    if (!intro || !canvas) return;

    let stop = () => {};
    let fallback = 0;

    import('~/lib/intro-sphere.client.js').then(({initIntroSphere}) => {
      stop = initIntroSphere({
        intro,
        canvas,
        glow: document.getElementById('introGlow'),
        shadow: document.getElementById('introShadow'),
        counter: document.getElementById('introCounter'),
        logoStage: document.getElementById('introLogoStage'),
        onComplete: () => {
          document.querySelector('.hero__img')?.classList.add('is-visible');
          document.querySelector('.hero__tagline')?.classList.add('is-visible');
          setDone(true);
        },
      });

      fallback = window.setTimeout(() => {
        if (!intro.classList.contains('is-hidden')) {
          intro.classList.add('is-hidden');
          stop();
          document.querySelector('.hero__img')?.classList.add('is-visible');
          document.querySelector('.hero__tagline')?.classList.add('is-visible');
          setDone(true);
        }
      }, 12000);
    });

    return () => {
      window.clearTimeout(fallback);
      stop();
    };
  }, [enabled, done]);

  if (done) return null;

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
