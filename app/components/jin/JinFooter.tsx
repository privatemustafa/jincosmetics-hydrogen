import {Link} from '~/components/Link';

export function JinFooter() {
  return (
    <>
      <footer className="footer">
        <div className="container footer__grid">
          <div className="footer__brand">
            <img src="/images/logo-jin.png" alt="Jin" className="logo-img logo-img--footer" width={64} height={44} />
            <div className="footer__social">
              <a href="#" aria-label="Instagram" className="glass-pill glass-pill--icon">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <rect x="1" y="1" width="12" height="12" rx="3" stroke="currentColor" strokeWidth="1.2" />
                  <circle cx="7" cy="7" r="2.5" stroke="currentColor" strokeWidth="1.2" />
                </svg>
              </a>
              <a href="#" aria-label="TikTok" className="glass-pill glass-pill--icon">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                  <path d="M9.5 1.5v7.5a3 3 0 11-3-3" stroke="currentColor" strokeWidth="1.2" fill="none" />
                </svg>
              </a>
            </div>
          </div>
          <div className="footer__col">
            <p className="figuration">Shop</p>
            <ul>
              <li><Link to="/products">Balancing Gel Cleanser</Link></li>
              <li><Link to="/products">Moi Day Creme</Link></li>
              <li><Link to="/products">Prana Rose Mist</Link></li>
              <li><Link to="/products">Aquaporin Serum</Link></li>
            </ul>
          </div>
          <div className="footer__col">
            <p className="figuration">Info</p>
            <ul>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/shipping-returns">Shipping &amp; Returns</Link></li>
              <li><a href="mailto:hello@jincosmetic.co">Contact</a></li>
              <li><Link to="/privacy-policy">Privacy Policy</Link></li>
            </ul>
          </div>
          <div className="footer__col footer__studio">
            <div className="footer__studio-card">
              <img src="/images/editorial/studio-interior.jpg" alt="" className="footer__studio-img" loading="lazy" width={1400} height={900} />
              <div className="footer__studio-overlay">
                <p className="figuration">Studio</p>
                <p className="body-sm">London, UK</p>
                <p className="body-sm text-muted">Mon – Sat, 10am – 6pm</p>
              </div>
            </div>
          </div>
        </div>
        <div className="footer__bottom container">
          <p className="body-xs text-muted">© Jin Cosmetics 2026. All rights reserved.</p>
        </div>
      </footer>

      <div className="cookie-banner glass-panel" id="cookieBanner">
        <p className="body-xs">We use cookies to refine your experience.</p>
        <div className="cookie-banner__actions">
          <button type="button" className="link-cta" id="cookieAccept">
            Accept
          </button>
          <button type="button" className="link-cta link-cta--muted" id="cookieDecline">
            Decline
          </button>
        </div>
      </div>
    </>
  );
}
