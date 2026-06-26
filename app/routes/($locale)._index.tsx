import {json, type MetaArgs, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {useLoaderData} from '@remix-run/react';
import {getSeoMeta} from '@shopify/hydrogen';

import {JinHomePage} from '~/components/jin/JinHomePage';
import {JIN_VARIANTS_QUERY, mapJinVariants} from '~/lib/jin-products';
import {routeHeaders} from '~/data/cache';

export const headers = routeHeaders;

export async function loader({params, context, request}: LoaderFunctionArgs) {
  const {language, country} = context.storefront.i18n;

  if (
    params.locale &&
    params.locale.toLowerCase() !== `${language}-${country}`.toLowerCase()
  ) {
    throw new Response(null, {status: 404});
  }

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
      title: 'Jin Cosmetics | Luxury Skincare Rituals',
      description:
        'Jin Cosmetics — mercury-toned luxury skincare. Balancing gel cleanser, Moi Day Creme, Prana rose mist & Aquaporin moisture serum.',
      url: request.url,
    },
  });
}

export const meta = ({data}: MetaArgs<typeof loader>) => {
  return getSeoMeta(data?.seo);
};

export default function Homepage() {
  const {variants} = useLoaderData<typeof loader>();
  return <JinHomePage variants={variants} />;
}
