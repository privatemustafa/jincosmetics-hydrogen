import {Link} from '~/components/Link';
import {JinProductCard} from '~/components/jin/JinProductCard';
import {findJinProduct, type JinProduct} from '~/lib/jin-products';

type Props = {
  products: JinProduct[];
};

export function JinHomePage({products}: Props) {
  const mist = findJinProduct(products, 'prana-rose-mist');
  const moi = findJinProduct(products, 'moi-day-creme');
  return (
    <>
      <section className="hero watch-in-view" id="hero">
        <div className="hero__stage" aria-hidden="true">
          <div className="hero__pan">
            <img
              src="/images/hero-main.png"
              alt=""
              className="hero__img"
              width={1024}
              height={576}
            />
          </div>
        </div>
        <p className="hero__tagline body-md">
          THIS IS <em className="serif-accent">Jin</em>.
        </p>
      </section>

      <section className="section section--light intro-text watch-in-view">
        <div className="container">
          <p className="heading-2 text-animate">
            Where clinical precision meets the quiet luxury of ritual. Jin is skincare distilled to
            its essence — four formulations, one uncompromising standard, housed in frosted mercury
            glass for skin that deserves nothing less.
          </p>
        </div>
      </section>

      <section className="collection-strip watch-in-view" id="ritual" aria-label="The Jin Collection">
        <div className="collection-strip__inner">
          <article className="collection-card">
            <p className="collection-card__name body-md">
              Prana
              <br />
              Rose Mist
            </p>
            <div className="collection-card__wireframe">
              <img src="/images/wireframes/prana-rose-mist.svg" alt="" width={140} height={340} aria-hidden="true" />
            </div>
            <Link to="/#collection" className="link-cta link-cta--light collection-card__cta">
              Discover
            </Link>
          </article>

          <article className="collection-card">
            <p className="collection-card__name body-md">
              Balancing
              <br />
              Gel Cleanser
            </p>
            <div className="collection-card__wireframe">
              <img src="/images/wireframes/gel-cleanser.svg" alt="" width={120} height={360} aria-hidden="true" />
            </div>
            <Link to="/#collection" className="link-cta link-cta--light collection-card__cta">
              Discover
            </Link>
          </article>

          <article className="collection-card">
            <p className="collection-card__name body-md">
              Moi
              <br />
              Day Creme
            </p>
            <div className="collection-card__wireframe">
              <img src="/images/wireframes/moi-day-creme.svg" alt="" width={200} height={220} aria-hidden="true" />
            </div>
            <Link to="/#collection" className="link-cta link-cta--light collection-card__cta">
              Discover
            </Link>
          </article>

          <article className="collection-card">
            <p className="collection-card__name body-md">
              Aquaporin
              <br />
              Moisture Serum
            </p>
            <div className="collection-card__wireframe">
              <img src="/images/wireframes/aquaporin-serum.svg" alt="" width={110} height={320} aria-hidden="true" />
            </div>
            <Link to="/#collection" className="link-cta link-cta--light collection-card__cta">
              Discover
            </Link>
          </article>
        </div>
        <div className="collection-strip__swipe-hint" id="collectionSwipeHint" aria-hidden="true">
          <div className="collection-strip__swipe-pill glass-pill">
            <span className="collection-strip__swipe-motion" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path
                  d="M4 9h8M10 6l3 3-3 3"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span className="figuration">Swipe to explore</span>
          </div>
        </div>
      </section>

      <section className="section section--deep" id="collection">
        <div className="container">
          <div className="section-head watch-in-view">
            <p className="figuration text-frost">The Collection</p>
            <h2 className="heading-1 text-frost">
              Formulated for transformation.
              <br />
              Designed to be kept.
            </h2>
          </div>

          <div className="carousel" id="productCarousel">
            <div className="carousel__track" id="carouselTrack">
              {products.map((product) => (
                <JinProductCard
                  key={product.handle}
                  product={product}
                  layout="carousel"
                />
              ))}
            </div>

            <div className="carousel__controls">
              <button
                type="button"
                className="glass-pill glass-pill--icon"
                id="carouselPrev"
                aria-label="Previous product"
                disabled
              >
                <svg width="12" height="12" viewBox="0 0 12 12">
                  <path d="M8 2L4 6l4 4" stroke="currentColor" strokeWidth="1.5" fill="none" />
                </svg>
              </button>
              <div className="carousel__progress">
                <span id="carouselProgress" />
              </div>
              <button
                type="button"
                className="glass-pill glass-pill--icon"
                id="carouselNext"
                aria-label="Next product"
              >
                <svg width="12" height="12" viewBox="0 0 12 12">
                  <path d="M4 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" fill="none" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="promo-grid">
        <Link to="/#collection" className="promo-card watch-in-view">
          <div className="promo-card__img">
            <img
              src={mist?.image || '/images/product-prana-rose-mist.png'}
              alt={mist?.title || 'Prana Rose Mist'}
              loading="lazy"
            />
          </div>
          <div className="promo-card__content">
            <p className="figuration">Just Arrived</p>
            <h3 className="heading-2">{mist?.title || 'Prana Rose Mist'}</h3>
            <span className="link-cta">Discover the mist</span>
          </div>
        </Link>
        <Link to="/#collection" className="promo-card watch-in-view">
          <div className="promo-card__img">
            <img
              src={moi?.image || '/images/product-moi-day-creme.png'}
              alt={moi?.title || 'Moi Day Creme'}
              loading="lazy"
            />
          </div>
          <div className="promo-card__content">
            <p className="figuration">Cult Favourite</p>
            <h3 className="heading-2">{moi?.title || 'Moi Day Creme'}</h3>
            <span className="link-cta">Experience the creme</span>
          </div>
        </Link>
      </section>

      <section className="section section--mercury philosophy watch-in-view" id="about">
        <div className="philosophy__inner">
          <p className="figuration">About Jin</p>
          <h2 className="heading-1">The art of considered beauty.</h2>
          <p className="body-md philosophy__text">
            Jin was born from a singular conviction: that skincare should feel as refined as it
            performs. Every formula is developed with dermatological rigour and housed in frosted
            mercury glass — a material chosen for what it represents. Clarity. Restraint. The quiet
            confidence of things made with intention. We do not chase trends. We refine rituals that
            endure.
          </p>
          <Link to="/#collection" className="link-cta">
            Shop the collection
          </Link>
        </div>
        <div className="philosophy__visual">
          <img
            src="/images/editorial/about-editorial.jpg"
            alt="Jin model holding Prana Rose Mist"
            className="philosophy__editorial"
            loading="lazy"
            width={1600}
            height={2000}
          />
        </div>
      </section>

      <section className="section section--light testimonials watch-in-view">
        <div className="container container--narrow testimonials__inner">
          <p className="figuration">In Their Words</p>
          <div className="testimonial-slider" id="testimonialSlider">
            <blockquote className="testimonial active">
              <p className="heading-2">
                &ldquo;The Moi Day Creme is the only SPF I&apos;ve ever wanted to wear. It melts in,
                protects all day, and my skin has never looked this even.&rdquo;
              </p>
              <cite className="figuration">— Elena M., London</cite>
            </blockquote>
            <blockquote className="testimonial">
              <p className="heading-2">
                &ldquo;Prana Rose Mist is the pause my routine was missing. One spritz and everything
                feels rebalanced — I keep one at my desk and one in my bag.&rdquo;
              </p>
              <cite className="figuration">— Sofia K., New York</cite>
            </blockquote>
            <blockquote className="testimonial">
              <p className="heading-2">
                &ldquo;After three weeks with Aquaporin Serum, my barrier is visibly stronger. This is
                the kind of result you expect from a clinic, not a bathroom shelf.&rdquo;
              </p>
              <cite className="figuration">— Amara T., Paris</cite>
            </blockquote>
          </div>
          <div className="testimonial-controls">
            <button type="button" className="glass-pill glass-pill--icon" id="testPrev" aria-label="Previous testimonial">
              <svg width="12" height="12" viewBox="0 0 12 12">
                <path d="M8 2L4 6l4 4" stroke="currentColor" strokeWidth="1.5" fill="none" />
              </svg>
            </button>
            <button type="button" className="glass-pill glass-pill--icon" id="testNext" aria-label="Next testimonial">
              <svg width="12" height="12" viewBox="0 0 12 12">
                <path d="M4 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" fill="none" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      <section className="section newsletter watch-in-view" id="signup">
        <div className="newsletter__bg" aria-hidden="true">
          <img src="/images/editorial/newsletter-mood.jpg" alt="" loading="lazy" width={1800} height={1200} />
        </div>
        <div className="container container--narrow newsletter__inner">
          <p className="figuration">The Inner Circle</p>
          <h2 className="heading-1">Become part of the ritual</h2>
          <p className="body-sm text-muted newsletter__sub">
            Early access to new formulations, ritual guides, and exclusive offers — delivered with
            intention, never excess.
          </p>
          <form className="newsletter-form" id="newsletterForm">
            <input type="text" placeholder="First name" required aria-label="First name" />
            <input type="email" placeholder="Your email address" required aria-label="Email address" />
            <button type="submit" className="link-cta">
              Sign up
            </button>
          </form>
          <p className="body-xs text-muted">
            By signing up you agree to our{' '}
            <Link to="/privacy-policy" className="link-cta link-cta--muted">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
