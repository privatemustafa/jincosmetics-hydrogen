import {useEffect, useState} from 'react';

const AUTH_KEY = 'jin-preview-auth';
const AUTH_TOKEN = 'jc-preview-v1';
const PASSWORD = 'akin1';

function isAuthed() {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(AUTH_KEY) === AUTH_TOKEN;
}

function grantAuth() {
  localStorage.setItem(AUTH_KEY, AUTH_TOKEN);
}

export function PreviewGate({onUnlock}: {onUnlock?: () => void}) {
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState(false);
  const [unlocking, setUnlocking] = useState(false);
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (isAuthed()) {
      document.documentElement.classList.remove('preview-locked');
      onUnlock?.();
      return;
    }
    document.documentElement.classList.add('preview-locked');
    setVisible(true);
  }, [onUnlock]);

  if (!visible) return null;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(false);

    if (password === PASSWORD) {
      grantAuth();
      setUnlocking(true);
      document.documentElement.classList.remove('preview-locked');
      setTimeout(() => {
        setVisible(false);
        onUnlock?.();
      }, 680);
      return;
    }

    setError(true);
    setPassword('');
  }

  return (
    <div
      id="previewGate"
      className={`preview-gate${unlocking ? ' is-unlocking' : ''}`}
      aria-modal="true"
      role="dialog"
    >
      <div className="preview-gate__scene" aria-hidden="true">
        <div className="preview-gate__mist" />
        <div className="preview-gate__ring preview-gate__ring--a" />
        <div className="preview-gate__ring preview-gate__ring--b" />
        <div className="preview-gate__ring preview-gate__ring--c" />
        <div className="preview-gate__orb preview-gate__orb--1" />
        <div className="preview-gate__orb preview-gate__orb--2" />
      </div>

      <div className={`preview-gate__panel${error ? ' is-error' : ''}${unlocking ? ' is-success' : ''}`}>
        <div className="preview-gate__logo-wrap">
          <img src="/images/logo-jin-latin.png" alt="Jin" className="preview-gate__logo" width={88} height={60} />
        </div>
        <p className="preview-gate__eyebrow figuration">Private Preview</p>
        <h1 className="preview-gate__title">Enter the ritual</h1>
        <p className="preview-gate__copy body-sm">
          This collection is shared in confidence.
          <br />
          Enter your access key to continue.
        </p>

        <form className="preview-gate__form" onSubmit={handleSubmit} autoComplete="off">
          <label className="preview-gate__label figuration" htmlFor="previewGateInput">
            Access key
          </label>
          <div className="preview-gate__field">
            <input
              className="preview-gate__input"
              id="previewGateInput"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoFocus
            />
          </div>
          {!error ? null : (
            <p className="preview-gate__error body-xs">Incorrect access key. Please try again.</p>
          )}
          <button type="submit" className="glass-pill preview-gate__submit">
            Continue
          </button>
        </form>

        <p className="preview-gate__foot body-xs">Jin Cosmetics — confidential preview</p>
      </div>
    </div>
  );
}
