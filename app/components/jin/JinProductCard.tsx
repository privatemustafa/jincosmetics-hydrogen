import {CartForm} from '@shopify/hydrogen';
import type {JinProduct} from '~/lib/jin-products';

type Props = {
  product: JinProduct;
  variantId?: string;
  layout?: 'carousel' | 'grid';
};

export function JinProductCard({product, variantId, layout = 'carousel'}: Props) {
  const layoutClass = layout === 'grid' ? ' product-card--grid' : '';

  return (
    <article
      className={`product-card product-card--${product.cardClass}${layoutClass}`}
      data-product-id={product.id}
    >
      <div className="product-card__visual">
        <div className="product-card__frame">
          <img src={product.image} alt={product.title} loading="lazy" />
        </div>
      </div>
      <div className="product-card__body">
        <p className="product-card__eyebrow">{product.step}</p>
        {layout === 'grid' ? (
          <h2 className="heading-2 text-frost">{product.title}</h2>
        ) : (
          <h3 className="heading-2 text-frost">{product.title}</h3>
        )}
        <p className="body-sm text-muted">{product.description}</p>
        <div className="product-card__footer">
          <span className="product-card__price">{product.price}</span>
          {variantId ? (
            <CartForm
              route="/cart"
              action={CartForm.ACTIONS.LinesAdd}
              inputs={{lines: [{merchandiseId: variantId, quantity: 1}]}}
            >
              {(fetcher) => (
                <button
                  type="submit"
                  className="glass-pill glass-pill--shop"
                  disabled={fetcher.state !== 'idle'}
                >
                  Shop now
                </button>
              )}
            </CartForm>
          ) : (
            <button type="button" className="glass-pill glass-pill--shop" disabled>
              Shop now
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
