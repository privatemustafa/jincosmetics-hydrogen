import {useFetchers} from '@remix-run/react';
import {CartForm, type CartReturn} from '@shopify/hydrogen';
import {useMemo} from 'react';

type CartActionData = {
  cart?: CartReturn;
  userErrors?: Array<{message: string; field?: string[] | null}>;
  errors?: Array<{message: string}>;
};

export function useLatestCart(cart: CartReturn | null): CartReturn | null {
  const fetchers = useFetchers();

  const fetcherCart = useMemo(() => {
    for (let i = fetchers.length - 1; i >= 0; i--) {
      const fetcher = fetchers[i];
      const data = fetcher.data as CartActionData | undefined;
      if (!data?.cart || !fetcher.formData) continue;

      const inputs = CartForm.getFormInput(fetcher.formData);
      if (!inputs.action) continue;

      return data.cart;
    }

    return null;
  }, [fetchers]);

  return fetcherCart ?? cart;
}
