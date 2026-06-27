import type {JinProduct} from '~/lib/jin-products';
import {JinAddToCartButton} from '~/components/jin/JinAddToCartButton';

type Props = {
  product: JinProduct;
  layout?: 'carousel' | 'grid';
  priority?: boolean;
};

export function JinProductCard({product, layout = 'carousel', priority = false}: Props) {
  const layoutClass = layout === 'grid' ? ' product-card--grid' : '';
  const description = layout === 'grid' ? product.gridDescription : product.description;

  return (
    <article
      className={`product-card product-card--${product.cardClass}${layoutClass}`}
      data-product-id={product.id}
      data-name={product.title}
      data-price={product.priceValue}
      data-image={product.image}
    >
      <div className="product-card__visual">
        <div className="product-card__frame">
          <img
            src={product.image}
            alt={product.title}
            width={400}
            height={400}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            fetchPriority={priority ? 'high' : undefined}
          />
        </div>
      </div>
      <div className="product-card__body">
        <p className="product-card__eyebrow">{product.step}</p>
        {layout === 'grid' ? (
          <h2 className="heading-2 text-frost">{product.title}</h2>
        ) : (
          <h3 className="heading-2 text-frost">{product.title}</h3>
        )}
        <p className="body-sm text-muted">{description}</p>
        <div className="product-card__footer">
          <span className="product-card__price">{product.price}</span>
          <JinAddToCartButton product={product} />
        </div>
      </div>
    </article>
  );
}
