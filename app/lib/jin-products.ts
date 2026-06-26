import type {Storefront} from '@shopify/hydrogen';

import {CACHE_SHORT} from '~/data/cache';

export type JinProduct = {
  id: string;
  handle: string;
  cardClass: string;
  step: string;
  title: string;
  description: string;
  gridDescription: string;
  price: string;
  priceValue: number;
  image: string;
  variantId?: string;
  availableForSale: boolean;
};

/** Display order + CSS presentation. Handles must match Shopify product handles. */
export const JIN_PRODUCT_HANDLES = [
  'balancing-gel-cleanser',
  'moi-day-creme',
  'prana-rose-mist',
  'aquaporin-moisture-serum',
] as const;

const JIN_PRODUCT_PRESENTATION: Record<
  string,
  {id: string; cardClass: string; step: string}
> = {
  'balancing-gel-cleanser': {
    id: 'cleanser',
    cardClass: 'cleanser',
    step: 'Step 01 — Cleanse',
  },
  'moi-day-creme': {
    id: 'moi',
    cardClass: 'moi',
    step: 'Step 02 — Protect',
  },
  'prana-rose-mist': {
    id: 'mist',
    cardClass: 'mist',
    step: 'Step 03 — Revive',
  },
  'aquaporin-moisture-serum': {
    id: 'serum',
    cardClass: 'serum',
    step: 'Step 04 — Restore',
  },
};

/** Offline fallback if Shopify is unreachable. */
export const JIN_PRODUCTS_FALLBACK: JinProduct[] = [
  {
    id: 'cleanser',
    handle: 'balancing-gel-cleanser',
    cardClass: 'cleanser',
    step: 'Step 01 — Cleanse',
    title: 'Balancing Gel Cleanser',
    description:
      "A weightless pH-balanced gel that dissolves impurities while preserving your skin's natural equilibrium. The essential first gesture of every Jin ritual.",
    gridDescription:
      "A weightless pH-balanced gel that dissolves impurities while preserving your skin's natural equilibrium.",
    price: '£48',
    priceValue: 48,
    image: '/images/product-cleanser-crop.png',
    availableForSale: true,
  },
  {
    id: 'moi',
    handle: 'moi-day-creme',
    cardClass: 'moi',
    step: 'Step 02 — Protect',
    title: 'Moi Day Creme',
    description:
      "SPF 30 protection meets deep, lasting hydration. A featherlight daily shield that nourishes without weight — your skin's most refined defence.",
    gridDescription:
      'SPF 30 protection meets deep, lasting hydration. A featherlight daily shield that nourishes without weight.',
    price: '£62',
    priceValue: 62,
    image: '/images/product-moi-crop.png',
    availableForSale: true,
  },
  {
    id: 'mist',
    handle: 'prana-rose-mist',
    cardClass: 'mist',
    step: 'Step 03 — Revive',
    title: 'Prana Rose Mist',
    description:
      'An atmospheric rose mist that rebalances pH and awakens tired skin. One breath. Instant radiance. The interlude your ritual deserves.',
    gridDescription:
      'An atmospheric rose mist that rebalances pH and awakens tired skin. One breath. Instant radiance.',
    price: '£38',
    priceValue: 38,
    image: '/images/product-mist-crop.png',
    availableForSale: true,
  },
  {
    id: 'serum',
    handle: 'aquaporin-moisture-serum',
    cardClass: 'serum',
    step: 'Step 04 — Restore',
    title: 'Aquaporin Moisture Serum',
    description:
      'Aquaporin-channel technology delivers hydration to the deepest layers. Rebuilds, repairs, and restores — the final act of the Jin ritual.',
    gridDescription:
      'Aquaporin-channel technology delivers hydration to the deepest layers. Rebuilds, repairs, and restores.',
    price: '£72',
    priceValue: 72,
    image: '/images/product-serum-crop.png',
    availableForSale: true,
  },
];

type ShopifyJinProductNode = {
  handle: string;
  title: string;
  description?: string | null;
  featuredImage?: {url: string} | null;
  variants: {
    nodes: Array<{
      id: string;
      availableForSale: boolean;
      price: {amount: string; currencyCode: string};
      image?: {url: string} | null;
    }>;
  };
} | null;

type JinProductsQueryResult = {
  cleanser?: ShopifyJinProductNode;
  moi?: ShopifyJinProductNode;
  mist?: ShopifyJinProductNode;
  serum?: ShopifyJinProductNode;
};

function stripHtml(html: string) {
  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function truncate(text: string, max = 140) {
  if (text.length <= max) return text;
  return `${text.slice(0, max).trimEnd()}…`;
}

function formatPrice(amount: string, currencyCode: string) {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: currencyCode,
  }).format(parseFloat(amount));
}

function mapShopifyProduct(
  node: ShopifyJinProductNode,
  fallback?: JinProduct,
): JinProduct | null {
  if (!node?.handle) return null;

  const presentation = JIN_PRODUCT_PRESENTATION[node.handle] ?? {
    id: node.handle,
    cardClass: 'cleanser',
    step: '',
  };

  const variant = node.variants.nodes[0];
  const description = stripHtml(node.description || fallback?.description || '');
  const image =
    variant?.image?.url ||
    node.featuredImage?.url ||
    fallback?.image ||
    '/images/product-cleanser-crop.png';

  const priceValue = variant
    ? parseFloat(variant.price.amount)
    : fallback?.priceValue ?? 0;

  const price = variant
    ? formatPrice(variant.price.amount, variant.price.currencyCode)
    : fallback?.price ?? '£0';

  return {
    id: presentation.id,
    handle: node.handle,
    cardClass: presentation.cardClass,
    step: presentation.step,
    title: node.title || fallback?.title || node.handle,
    description: description || fallback?.description || '',
    gridDescription: truncate(description || fallback?.gridDescription || ''),
    price,
    priceValue,
    image,
    variantId: variant?.id,
    availableForSale: variant?.availableForSale ?? false,
  };
}

export function mapJinProductsFromShopify(data: JinProductsQueryResult): JinProduct[] {
  const byHandle: Record<string, ShopifyJinProductNode> = {
    'balancing-gel-cleanser': data.cleanser ?? null,
    'moi-day-creme': data.moi ?? null,
    'prana-rose-mist': data.mist ?? null,
    'aquaporin-moisture-serum': data.serum ?? null,
  };

  const fallbackByHandle = Object.fromEntries(
    JIN_PRODUCTS_FALLBACK.map((product) => [product.handle, product]),
  );

  return JIN_PRODUCT_HANDLES.flatMap((handle) => {
    const mapped = mapShopifyProduct(byHandle[handle], fallbackByHandle[handle]);
    return mapped ? [mapped] : [];
  });
}

export async function loadJinProducts(storefront: Storefront): Promise<JinProduct[]> {
  try {
    const data = await storefront.query<JinProductsQueryResult>(JIN_PRODUCTS_QUERY, {
      cache: storefront.CacheShort(),
    });

    const products = mapJinProductsFromShopify(data);
    if (products.length > 0) return products;
  } catch (error) {
    console.error('[jin] Shopify product sync failed, using fallback', error);
  }

  return JIN_PRODUCTS_FALLBACK;
}

export function findJinProduct(
  products: JinProduct[],
  handle: string,
): JinProduct | undefined {
  return products.find((product) => product.handle === handle);
}

export const JIN_PRODUCTS_QUERY = `#graphql
  fragment JinProductFields on Product {
    handle
    title
    description
    featuredImage {
      url
      altText
    }
    variants(first: 1) {
      nodes {
        id
        availableForSale
        price {
          amount
          currencyCode
        }
        image {
          url
          altText
        }
      }
    }
  }

  query JinProducts($country: CountryCode, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
    cleanser: product(handle: "balancing-gel-cleanser") {
      ...JinProductFields
    }
    moi: product(handle: "moi-day-creme") {
      ...JinProductFields
    }
    mist: product(handle: "prana-rose-mist") {
      ...JinProductFields
    }
    serum: product(handle: "aquaporin-moisture-serum") {
      ...JinProductFields
    }
  }
` as const;

export const jinProductsCacheHeaders = {
  'Cache-Control': CACHE_SHORT,
};
