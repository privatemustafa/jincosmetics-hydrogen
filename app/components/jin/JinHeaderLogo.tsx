import {useEffect, useState} from 'react';

type Props = {
  animate?: boolean;
  className?: string;
  width?: number;
  height?: number;
};

const FADE_MS = 450;
const HOLD_MS = 1000;

export function JinHeaderLogo({
  animate = false,
  className = 'logo-img',
  width = 52,
  height = 36,
}: Props) {
  const [showKatakana, setShowKatakana] = useState(false);
  const [motionOk, setMotionOk] = useState(false);

  useEffect(() => {
    if (!animate) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    setMotionOk(true);
    const id = window.setInterval(() => {
      setShowKatakana((value) => !value);
    }, HOLD_MS);

    return () => window.clearInterval(id);
  }, [animate]);

  if (!animate || !motionOk) {
    return (
      <img
        src="/images/logo-jin-latin.png"
        alt="Jin"
        className={className}
        width={width}
        height={height}
      />
    );
  }

  const fade = `${FADE_MS}ms ease-in-out`;

  return (
    <span className="header-logo-swap" aria-hidden="true">
      <img
        src="/images/logo-jin-latin.png"
        alt=""
        className={`${className} header-logo-swap__mark header-logo-swap__mark--latin`}
        width={width}
        height={height}
        style={{
          opacity: showKatakana ? 0 : 1,
          transition: `opacity ${fade}`,
        }}
      />
      <img
        src="/images/logo-jin-katakana-mark.png"
        alt=""
        className={`${className} header-logo-swap__mark header-logo-swap__mark--katakana`}
        width={width}
        height={height}
        style={{
          opacity: showKatakana ? 1 : 0,
          transition: `opacity ${fade}`,
        }}
      />
    </span>
  );
}
