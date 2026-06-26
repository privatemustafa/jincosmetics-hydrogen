import {json, type MetaArgs, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {useLoaderData} from '@remix-run/react';
import {getSeoMeta} from '@shopify/hydrogen';

import {JinProductsPage} from '~/components/jin/JinProductsPage';
import {JIN_VARIANTS_QUERY, mapJinVariants} from '~/lib/jin-products';
import {routeHeaders} from '~/data/cache';

export const headers = routeHeaders;

export async function loader({context, request}: LoaderFunctionArgs) {
  const variantData = await context.storefront
    .query(JIN_VARIANTS_QUERY)
    .catch(() => null);

  const variants = variantData
    ? mapJinVariants([
        variantData.cleanser,
        variantData.moi,
        variantData.mist,
        variantData.serum,
      ])
    : {};

  return json({
    variants,
    seo: {
      title: 'Products | Jin Cosmetics',
      description:
        'Shop the Jin Cosmetics collection — Balancing Gel Cleanser, Moi Day Creme, Prana Rose Mist & Aquaporin Moisture Serum.',
      url: request.url,
    },
  });
}

export const meta = ({data}: MetaArgs<typeof loader>) => {
  return getSeoMeta(data?.seo);
};

export default function AllProducts() {
  const {variants} = useLoaderData<typeof loader>();
  return <JinProductsPage variants={variants} />;
}
