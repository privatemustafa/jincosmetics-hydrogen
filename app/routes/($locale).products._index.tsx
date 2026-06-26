import {json, type MetaArgs, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {useLoaderData} from '@remix-run/react';
import {getSeoMeta} from '@shopify/hydrogen';

import {JinProductsPage} from '~/components/jin/JinProductsPage';
import {jinProductsCacheHeaders, loadJinProducts} from '~/lib/jin-products';
import {routeHeaders} from '~/data/cache';

export const headers = routeHeaders;

export async function loader({context, request}: LoaderFunctionArgs) {
  const products = await loadJinProducts(context.storefront);

  return json(
    {
      products,
      seo: {
        title: 'Products | Jin Cosmetics',
        description:
          'Shop the Jin Cosmetics collection — Balancing Gel Cleanser, Moi Day Creme, Prana Rose Mist & Aquaporin Moisture Serum.',
        url: request.url,
      },
    },
    {headers: jinProductsCacheHeaders},
  );
}

export const meta = ({data}: MetaArgs<typeof loader>) => {
  return getSeoMeta(data?.seo);
};

export default function AllProducts() {
  const {products} = useLoaderData<typeof loader>();
  return <JinProductsPage products={products} />;
}
