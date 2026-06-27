import {useEffect, useRef} from 'react';

import {markIntroSeen, shouldSkipIntro} from '~/lib/jin-intro';

type Props = {
  onComplete?: () => void;
};

export function IntroShell({onComplete}: Props) {
  const started = useRef(false);
  const completed = useRef(false);

  useEffect(() => {
    document.documentElement.classList.add('intro-active');
    return () => {
      document.documentElement.classList.remove('intro-active');
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
      markIntroSeen();
      intro.classList.add('is-hidden');
      document.documentElement.classList.remove('intro-active');
      onComplete?.();
    };

    if (shouldSkipIntro()) {
      finish();
      return;
    }

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
      }, 10000);
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
            decoding="async"
          />
          <img
            src="/images/logo-jin-katakana-mark.png"
            alt=""
            className="intro__logo-mark intro__logo-mark--katakana"
            width={77}
            height={40}
            decoding="async"
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
