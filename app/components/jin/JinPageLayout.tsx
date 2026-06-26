import {Suspense, useEffect, useState} from 'react';
import {Await, useLocation, useRouteLoaderData} from '@remix-run/react';
import {CartForm, type CartReturn} from '@shopify/hydrogen';
import {Link} from '~/components/Link';
import {JinCartDrawer} from '~/components/jin/JinCartDrawer';
import type {RootLoader} from '~/root';
import {JinFooter} from '~/components/jin/JinFooter';
import {PreviewGate} from '~/components/jin/PreviewGate';
import {IntroShell} from '~/components/jin/IntroShell';
import {JinClientEffects} from '~/components/jin/JinClientEffects';
import {useCartFetchers} from '~/hooks/useCartFetchers';

export function JinPageLayout({children}: {children: React.ReactNode}) {
  const location = useLocation();
  const path = location.pathname;
  const isHome = path === '/' || /^\/[a-z]{2}-[A-Z]{2}\/?$/i.test(path);
  const isProducts = path.endsWith('/products') || /\/products\/?$/i.test(path);
  const [ready, setReady] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const rootData = useRouteLoaderData<RootLoader>('root');
  const addToCartFetchers = useCartFetchers(CartForm.ACTIONS.LinesAdd);

  useEffect(() => {
    const openCart = () => setCartOpen(true);
    window.addEventListener('jin:open-cart', openCart);
    return () => window.removeEventListener('jin:open-cart', openCart);
  }, []);

  useEffect(() => {
    if (cartOpen || !addToCartFetchers.length) return;
    setCartOpen(true);
  }, [addToCartFetchers, cartOpen]);

  useEffect(() => {
    document.body.classList.toggle('page-products', isProducts);
  }, [isProducts]);

  useEffect(() => {
    document.body.style.overflow = menuOpen || cartOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen, cartOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        setCartOpen(false);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <PreviewGate onUnlock={() => setReady(true)} />
      {ready && isHome && <IntroShell enabled />}
      <header className="header" id="header">
        <div className="header__left">
          <button
            type="button"
            className="glass-pill"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(true)}
          >
            <svg width="18" height="8" viewBox="0 0 18 8" fill="none" aria-hidden="true">
              <line x1="0" y1="1" x2="18" y2="1" stroke="currentColor" strokeWidth="1.5" />
              <line x1="0" y1="7" x2="18" y2="7" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            <span>Menu</span>
          </button>
        </div>

        <Link to="/" className="header__logo" aria-label="Jin Cosmetics home">
          <img src="/images/logo-jin.png" alt="Jin" className="logo-img" width={52} height={36} />
        </Link>

        <div className="header__right">
          <Link to="/#signup" className="glass-pill">
            <span>Sign Up</span>
          </Link>
          <CartCountButton onOpen={() => setCartOpen(true)} />
        </div>
      </header>

      <div
        className={`menu-overlay${menuOpen ? ' is-open' : ''}`}
        id="menuOverlay"
        aria-hidden={!menuOpen}
      >
        <div className="menu-overlay__glass">
          <button
            type="button"
            className="glass-close"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>
          <nav className="menu-nav menu-nav--simple">
            <ul>
              <li>
                <Link to="/" onClick={() => setMenuOpen(false)}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/#about" onClick={() => setMenuOpen(false)}>
                  About
                </Link>
              </li>
              <li>
                <Link to="/products" onClick={() => setMenuOpen(false)}>
                  Products
                </Link>
              </li>
              <li>
                <Link to="/#signup" onClick={() => setMenuOpen(false)}>
                  Sign Up
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <div
        className={`cart-drawer${cartOpen ? ' is-open' : ''}`}
        id="cartDrawer"
        aria-hidden={!cartOpen}
      >
        <button
          type="button"
          className="cart-drawer__backdrop"
          id="cartBackdrop"
          aria-label="Close cart"
          onClick={() => setCartOpen(false)}
        />
        <aside className="cart-drawer__panel glass-panel">
          <div className="cart-drawer__header">
            <h2 className="heading-2">Your Cart</h2>
            <button
              type="button"
              className="glass-close"
              aria-label="Close cart"
              onClick={() => setCartOpen(false)}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>
          </div>
          <Suspense fallback={<p className="cart-empty">Loading cart…</p>}>
            <Await resolve={rootData?.cart}>
              {(cart) => (
                <JinCartDrawer
                  cart={(cart ?? null) as CartReturn | null}
                  onClose={() => setCartOpen(false)}
                />
              )}
            </Await>
          </Suspense>
        </aside>
      </div>

      <main>{children}</main>
      <JinFooter />
      <JinClientEffects />
    </>
  );
}

function CartCountButton({onOpen}: {onOpen: () => void}) {
  const rootData = useRouteLoaderData<RootLoader>('root');

  return (
    <Suspense
      fallback={
        <button type="button" className="glass-pill glass-pill--cart" onClick={onOpen}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M4 4h10l-1.2 6H5.2L4 4Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
            <circle cx="6.5" cy="13" r="1" fill="currentColor" />
            <circle cx="11.5" cy="13" r="1" fill="currentColor" />
          </svg>
          <span className="cart-count">0</span>
          <span>Cart</span>
        </button>
      }
    >
      <Await resolve={rootData?.cart}>
        {(cart) => (
          <button type="button" className="glass-pill glass-pill--cart" onClick={onOpen} aria-label="Open cart">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M4 4h10l-1.2 6H5.2L4 4Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
              <circle cx="6.5" cy="13" r="1" fill="currentColor" />
              <circle cx="11.5" cy="13" r="1" fill="currentColor" />
            </svg>
            <span className="cart-count">{cart?.totalQuantity ?? 0}</span>
            <span>Cart</span>
          </button>
        )}
      </Await>
    </Suspense>
  );
}
