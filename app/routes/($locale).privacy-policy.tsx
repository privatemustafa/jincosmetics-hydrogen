import {json, type MetaArgs, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {getSeoMeta} from '@shopify/hydrogen';

import {JinLegalPage} from '~/components/jin/JinLegalPage';
import {getJinLegalPage} from '~/lib/jin-legal-content';
import {routeHeaders} from '~/data/cache';

export const headers = routeHeaders;

export async function loader({request}: LoaderFunctionArgs) {
  const page = getJinLegalPage('privacy');

  return json({
    page,
    seo: {
      title: page.seo.en.title,
      description: page.seo.en.description,
      url: request.url,
    },
  });
}

export const meta = ({data}: MetaArgs<typeof loader>) => {
  return getSeoMeta(data?.seo);
};

export default function PrivacyPolicyRoute() {
  return <JinLegalPage page={getJinLegalPage('privacy')} />;
}
