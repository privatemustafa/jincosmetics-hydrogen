import {Link} from '~/components/Link';
import {JinProductCard} from '~/components/jin/JinProductCard';
import type {JinProduct} from '~/lib/jin-products';

type Props = {
  products: JinProduct[];
};

export function JinProductsPage({products}: Props) {
  return (
    <div className="products-page">
      <section className="products-hero watch-in-view">
        <div className="container">
          <p className="figuration text-frost">The Collection</p>
          <h1 className="heading-1 text-frost">
            Four formulations.
            <br />
            One uncompromising ritual.
          </h1>
          <p className="body-md products-hero__lead">
            Clinical in performance, mercury in form. Each product is a deliberate gesture —
            developed with dermatological rigour and housed in frosted glass.
          </p>
        </div>
      </section>

      <section className="products-grid watch-in-view" aria-label="All products">
        <div className="container">
          <div className="products-grid__layout">
            {products.map((product) => (
              <JinProductCard key={product.handle} product={product} layout="grid" />
            ))}
          </div>
        </div>
      </section>

      <section className="products-footer-strip watch-in-view">
        <div className="container products-footer-strip__inner">
          <p className="figuration">The Ritual</p>
          <p className="heading-2 text-frost">Cleanse. Protect. Revive. Restore.</p>
          <Link to="/" className="link-cta link-cta--light">
            Return home
          </Link>
        </div>
      </section>
    </div>
  );
}
