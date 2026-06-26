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
};

export const JIN_PRODUCTS: JinProduct[] = [
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
  },
];

export type JinVariantMap = Record<string, string>;

export function mapJinVariants(
  products: Array<
    {handle: string; variants: {nodes: Array<{id: string}>}} | null | undefined
  >,
): JinVariantMap {
  const map: JinVariantMap = {};
  for (const product of products) {
    if (!product?.variants?.nodes?.[0]?.id) continue;
    map[product.handle] = product.variants.nodes[0].id;
  }
  return map;
}

export const JIN_VARIANTS_QUERY = `#graphql
  query JinProductVariants($country: CountryCode, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
    cleanser: product(handle: "balancing-gel-cleanser") {
      handle
      variants(first: 1) {
        nodes {
          id
        }
      }
    }
    moi: product(handle: "moi-day-creme") {
      handle
      variants(first: 1) {
        nodes {
          id
        }
      }
    }
    mist: product(handle: "prana-rose-mist") {
      handle
      variants(first: 1) {
        nodes {
          id
        }
      }
    }
    serum: product(handle: "aquaporin-moisture-serum") {
      handle
      variants(first: 1) {
        nodes {
          id
        }
      }
    }
  }
` as const;
