import {useCallback, useEffect, useRef} from 'react';
import {useRevalidator} from '@remix-run/react';
import {CartForm} from '@shopify/hydrogen';
import type {FetcherWithComponents} from '@remix-run/react';

import {dispatchLocalAddToCart} from '~/components/jin/JinCartDrawer';
import type {JinProduct} from '~/lib/jin-products';
import {usePrefixPathWithLocale} from '~/lib/utils';

type CartActionData = {
  cart?: unknown;
  userErrors?: Array<{message: string}>;
  errors?: Array<{message: string}>;
};

function JinAddToCartSubmit({
  fetcher,
  product,
}: {
  fetcher: FetcherWithComponents<CartActionData>;
  product: JinProduct;
}) {
  const revalidator = useRevalidator();
  const prevState = useRef(fetcher.state);

  const addLocal = useCallback(() => {
    dispatchLocalAddToCart({
      id: product.id,
      name: product.title,
      price: product.priceValue,
      qty: 1,
      image: product.image,
    });
    window.dispatchEvent(new Event('jin:open-cart'));
  }, [product]);

  useEffect(() => {
    const becameIdle = prevState.current !== 'idle' && fetcher.state === 'idle';
    prevState.current = fetcher.state;

    if (!becameIdle || !fetcher.data) return;

    const userErrors = fetcher.data.userErrors ?? [];
    const errors = fetcher.data.errors ?? [];

    if (userErrors.length || errors.length) {
      console.error('[jin] Shopify cart add failed', userErrors, errors);
      addLocal();
      return;
    }

    if (fetcher.data.cart) {
      revalidator.revalidate();
      window.dispatchEvent(new Event('jin:open-cart'));
    }
  }, [addLocal, fetcher.data, fetcher.state, revalidator]);

  const busy = fetcher.state !== 'idle';

  return (
    <button
      type="submit"
      className="glass-pill glass-pill--shop"
      disabled={busy}
      aria-busy={busy}
    >
      {busy ? 'Adding…' : 'Shop now'}
    </button>
  );
}

export function JinAddToCartButton({product}: {product: JinProduct}) {
  const cartRoute = usePrefixPathWithLocale('/cart');
  const canShopify = Boolean(product.variantId && product.availableForSale);

  const addLocal = useCallback(() => {
    dispatchLocalAddToCart({
      id: product.id,
      name: product.title,
      price: product.priceValue,
      qty: 1,
      image: product.image,
    });
    window.dispatchEvent(new Event('jin:open-cart'));
  }, [product]);

  if (canShopify) {
    return (
      <CartForm
        route={cartRoute}
        action={CartForm.ACTIONS.LinesAdd}
        inputs={{
          lines: [{merchandiseId: product.variantId!, quantity: 1}],
        }}
      >
        {(fetcher) => <JinAddToCartSubmit fetcher={fetcher} product={product} />}
      </CartForm>
    );
  }

  return (
    <button
      type="button"
      className="glass-pill glass-pill--shop"
      onClick={addLocal}
      disabled={!product.availableForSale && !product.priceValue}
    >
      {product.availableForSale === false ? 'Sold out' : 'Shop now'}
    </button>
  );
}
