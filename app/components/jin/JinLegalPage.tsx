import {useState} from 'react';
import {Link} from '~/components/Link';
import type {JinLegalLang, JinLegalPage as JinLegalPageContent} from '~/lib/jin-legal-content';

type Props = {
  page: JinLegalPageContent;
};

function renderParagraph(text: string) {
  const emailMatch = text.match(/^(E-posta|Email):\s*(.+)$/i);
  if (emailMatch) {
    const email = emailMatch[2].trim();
    return (
      <>
        {emailMatch[1]}:{' '}
        <a href={`mailto:${email}`} className="link-cta">
          {email}
        </a>
      </>
    );
  }
  return text;
}

export function JinLegalPage({page}: Props) {
  const [lang, setLang] = useState<JinLegalLang>('en');
  const updated = new Date(page.updated).toLocaleDateString(
    lang === 'tr' ? 'tr-TR' : 'en-GB',
    {day: 'numeric', month: 'long', year: 'numeric'},
  );

  return (
    <div className="legal-page">
      <section className="legal-hero watch-in-view">
        <div className="container container--narrow">
          <p className="figuration text-frost">{page.eyebrow[lang]}</p>
          <h1 className="heading-1 text-frost">{page.title[lang]}</h1>
          <p className="body-md legal-hero__lead">{page.intro[lang]}</p>

          <div className="legal-lang" role="tablist" aria-label="Language">
            <button
              type="button"
              role="tab"
              aria-selected={lang === 'en'}
              className={`legal-lang__btn${lang === 'en' ? ' is-active' : ''}`}
              onClick={() => setLang('en')}
            >
              English
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={lang === 'tr'}
              className={`legal-lang__btn${lang === 'tr' ? ' is-active' : ''}`}
              onClick={() => setLang('tr')}
            >
              Türkçe
            </button>
          </div>
        </div>
      </section>

      <section className="legal-body watch-in-view" aria-label={page.title[lang]}>
        <div className="container container--narrow">
          <p className="body-xs text-muted legal-updated">
            {lang === 'tr' ? 'Son güncelleme' : 'Last updated'}: {updated}
          </p>

          <div className="legal-content" role="tabpanel">
            {page.blocks[lang].map((block, index) => (
              <article key={`${lang}-${index}`} className="legal-block">
                {block.heading && <h2 className="heading-2">{block.heading}</h2>}
                {block.paragraphs?.map((paragraph) => (
                  <p key={paragraph} className="body-sm">
                    {renderParagraph(paragraph)}
                  </p>
                ))}
                {block.list && (
                  <ul className="legal-list body-sm">
                    {block.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </article>
            ))}
          </div>

          <Link to="/" className="link-cta legal-back">
            {lang === 'tr' ? 'Ana sayfaya dön' : 'Return home'}
          </Link>
        </div>
      </section>
    </div>
  );
}
