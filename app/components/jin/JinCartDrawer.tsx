import {useEffect, useState} from 'react';
import {CartForm, Money, flattenConnection, type CartReturn} from '@shopify/hydrogen';
import type {CartLine} from '@shopify/hydrogen/storefront-api-types';

type LocalItem = {
  id: string;
  name: string;
  price: number;
  qty: number;
  image: string;
};

const PRODUCT_IMAGES: Record<string, string> = {
  cleanser: '/images/product-cleanser-crop.png',
  moi: '/images/product-moi-crop.png',
  mist: '/images/product-mist-crop.png',
  serum: '/images/product-serum-crop.png',
};

function loadLocalCart(): LocalItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem('jin-local-cart');
    return raw ? (JSON.parse(raw) as LocalItem[]) : [];
  } catch {
    return [];
  }
}

function saveLocalCart(items: LocalItem[]) {
  localStorage.setItem('jin-local-cart', JSON.stringify(items));
}

function updateCartBadge(count: number) {
  document.querySelectorAll('.cart-count').forEach((el) => {
    el.textContent = String(count);
  });
}

export function JinCartDrawer({
  cart,
  onClose,
}: {
  cart: CartReturn | null;
  onClose: () => void;
}) {
  const [localItems, setLocalItems] = useState<LocalItem[]>([]);

  const shopifyLines = cart?.lines ? flattenConnection(cart.lines) : [];
  const useShopify = shopifyLines.length > 0;

  useEffect(() => {
    setLocalItems(loadLocalCart());
  }, []);

  useEffect(() => {
    const onAdd = (event: Event) => {
      const detail = (event as CustomEvent<LocalItem>).detail;
      if (!detail) return;

      setLocalItems((prev) => {
        const existing = prev.find((item) => item.id === detail.id);
        const next = existing
          ? prev.map((item) =>
              item.id === detail.id ? {...item, qty: item.qty + 1} : item,
            )
          : [...prev, {...detail, qty: 1}];
        saveLocalCart(next);
        return next;
      });
    };

    window.addEventListener('jin:add-to-cart', onAdd);
    return () => window.removeEventListener('jin:add-to-cart', onAdd);
  }, []);

  useEffect(() => {
    if (useShopify) {
      updateCartBadge(cart?.totalQuantity ?? 0);
      return;
    }
    const count = localItems.reduce((sum, item) => sum + item.qty, 0);
    updateCartBadge(count);
  }, [useShopify, cart?.totalQuantity, localItems]);

  function removeLocal(index: number) {
    setLocalItems((prev) => {
      const next = prev.filter((_, i) => i !== index);
      saveLocalCart(next);
      return next;
    });
  }

  const localTotal = localItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <>
      <div className="cart-drawer__body" id="cartItems">
        {useShopify ? (
          shopifyLines.map((line) => (
            <JinShopifyLine key={line.id} line={line as CartLine} />
          ))
        ) : localItems.length === 0 ? (
          <p className="cart-empty">
            Your ritual awaits.
            <br />
            Add a product to begin.
          </p>
        ) : (
          localItems.map((item, index) => (
            <div className="cart-item" key={`${item.id}-${index}`}>
              <div className="cart-item__img">
                <img src={item.image || PRODUCT_IMAGES[item.id] || ''} alt={item.name} />
              </div>
              <div className="cart-item__info">
                <p className="cart-item__name">{item.name}</p>
                <p className="cart-item__price">
                  £{item.price} × {item.qty}
                </p>
                <button type="button" className="cart-item__remove" onClick={() => removeLocal(index)}>
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="cart-drawer__footer">
        <div className="cart-total">
          <span className="figuration">Total</span>
          <span className="heading-2" id="cartTotal">
            {useShopify && cart?.cost?.totalAmount ? (
              <Money data={cart.cost.totalAmount} />
            ) : localTotal > 0 ? (
              `£${localTotal}`
            ) : (
              '£0'
            )}
          </span>
        </div>
        {useShopify && cart?.checkoutUrl ? (
          <a href={cart.checkoutUrl} className="btn-primary" onClick={onClose}>
            Checkout
          </a>
        ) : (
          <button type="button" className="btn-primary" disabled>
            Checkout
          </button>
        )}
      </div>
    </>
  );
}

function JinShopifyLine({line}: {line: CartLine}) {
  const {id, quantity, merchandise} = line;
  if (!id || !quantity || !merchandise?.product) return null;

  const imageUrl =
    merchandise.image?.url ||
    PRODUCT_IMAGES[merchandise.product.handle?.split('-')[0] ?? ''] ||
    '';

  return (
    <div className="cart-item">
      <div className="cart-item__img">
        {imageUrl ? <img src={imageUrl} alt={merchandise.product.title} /> : null}
      </div>
      <div className="cart-item__info">
        <p className="cart-item__name">{merchandise.product.title}</p>
        <p className="cart-item__price">
          {line.cost?.totalAmount ? <Money data={line.cost.totalAmount} /> : null} × {quantity}
        </p>
        <CartForm
          route="/cart"
          action={CartForm.ACTIONS.LinesRemove}
          inputs={{lineIds: [id]}}
        >
          <button type="submit" className="cart-item__remove">
            Remove
          </button>
        </CartForm>
      </div>
    </div>
  );
}

export function dispatchLocalAddToCart(detail: LocalItem) {
  window.dispatchEvent(new CustomEvent('jin:add-to-cart', {detail}));
}
