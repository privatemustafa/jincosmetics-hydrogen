import {useEffect} from 'react';
import {useLocation} from '@remix-run/react';

function setupInViewObserver() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('in-view');
      });
    },
    {threshold: 0.12, rootMargin: '0px 0px -40px 0px'},
  );

  document.querySelectorAll('.watch-in-view:not(.in-view)').forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      el.classList.add('in-view');
    }
    observer.observe(el);
  });

  return observer;
}

export function JinClientEffects() {
  const location = useLocation();

  useEffect(() => {
    const observer = setupInViewObserver();
    return () => observer.disconnect();
  }, [location.pathname]);

  useEffect(() => {
    const onAnchorClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement).closest('a[href^="#"]');
      if (!link) return;
      const id = link.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({behavior: 'smooth'});
    };

    const onAddToCartClick = (e: MouseEvent) => {
      const btn = (e.target as HTMLElement).closest('.add-to-cart');
      if (!btn || btn.closest('form')) return;
      e.preventDefault();
      const card = btn.closest('.product-card');
      if (!card) return;

        const id = card.getAttribute('data-product-id') || '';
        const name = card.getAttribute('data-name') || '';
        const price = Number(card.getAttribute('data-price') || 0);
        const image = card.getAttribute('data-image') || '';
        const imageMap: Record<string, string> = {
          cleanser: '/images/product-cleanser-crop.png',
          moi: '/images/product-moi-crop.png',
          mist: '/images/product-mist-crop.png',
          serum: '/images/product-serum-crop.png',
        };

        window.dispatchEvent(
          new CustomEvent('jin:add-to-cart', {
            detail: {id, name, price, qty: 1, image: image || imageMap[id] || ''},
          }),
        );
      window.dispatchEvent(new Event('jin:open-cart'));
    };

    document.addEventListener('click', onAnchorClick);
    document.addEventListener('click', onAddToCartClick);

    const header = document.getElementById('header');
    const sections = [...document.querySelectorAll('main > section')];
    const BLEND = 110;
    let currentTone = 0;
    let rafId: number | null = null;

    function clamp(v: number, min: number, max: number) {
      return Math.max(min, Math.min(max, v));
    }

    function smoothstep(t: number) {
      const x = clamp(t, 0, 1);
      return x * x * (3 - 2 * x);
    }

    function sectionTone(el: Element) {
      const raw = getComputedStyle(el).getPropertyValue('--section-header-tone').trim();
      return raw ? parseFloat(raw) : 0;
    }

    function computeTargetTone() {
      if (!header) return 0;
      const y = window.scrollY + header.offsetHeight * 0.5;

      for (let i = 0; i < sections.length; i++) {
        const el = sections[i] as HTMLElement;
        const top = el.offsetTop;
        const bottom = top + el.offsetHeight;
        if (y < top || y > bottom) continue;

        const tone = sectionTone(el);
        let t = tone;

        if (i > 0 && y < top + BLEND) {
          const prevTone = sectionTone(sections[i - 1]);
          t = prevTone + (tone - prevTone) * smoothstep((y - top) / BLEND);
        } else if (i < sections.length - 1 && y > bottom - BLEND) {
          const nextTone = sectionTone(sections[i + 1]);
          t = tone + (nextTone - tone) * smoothstep((y - (bottom - BLEND)) / BLEND);
        }

        return t;
      }

      return parseFloat(getComputedStyle(document.body).getPropertyValue('--page-header-tone')) || 0;
    }

    function applyTone(value: number) {
      header?.style.setProperty('--header-tone', String(clamp(value, 0, 1)));
    }

    function animate() {
      const target = computeTargetTone();
      currentTone += (target - currentTone) * 0.16;

      if (Math.abs(currentTone - target) > 0.003) {
        applyTone(currentTone);
        rafId = requestAnimationFrame(animate);
      } else {
        currentTone = target;
        applyTone(currentTone);
        rafId = null;
      }
    }

    function schedule() {
      if (rafId) return;
      rafId = requestAnimationFrame(animate);
    }

    const onScroll = () => {
      header?.style.setProperty('--scroll', String(Math.min(window.scrollY / 200, 1)));
      schedule();
    };

    window.addEventListener('scroll', onScroll, {passive: true});
    window.addEventListener('resize', schedule, {passive: true});
    applyTone(computeTargetTone());
    schedule();

    const carouselTrack = document.getElementById('carouselTrack');
    const carouselPrev = document.getElementById('carouselPrev') as HTMLButtonElement | null;
    const carouselNext = document.getElementById('carouselNext') as HTMLButtonElement | null;
    const carouselProgress = document.getElementById('carouselProgress');
    const cards = carouselTrack ? [...carouselTrack.querySelectorAll('.product-card')] : [];

    function updateCarousel() {
      if (!carouselTrack) return;
      const cardWidth = (cards[0] as HTMLElement)?.offsetWidth || 1;
      const index = Math.round(carouselTrack.scrollLeft / (cardWidth + 30));
      if (carouselPrev) carouselPrev.disabled = index <= 0;
      if (carouselNext) carouselNext.disabled = index >= cards.length - 1;
      if (carouselProgress) {
        carouselProgress.style.width = `${((index + 1) / cards.length) * 100}%`;
      }
    }

    carouselPrev?.addEventListener('click', () => {
      const cardWidth = (cards[0] as HTMLElement)?.offsetWidth || 480;
      carouselTrack?.scrollBy({left: -(cardWidth + 30), behavior: 'smooth'});
    });
    carouselNext?.addEventListener('click', () => {
      const cardWidth = (cards[0] as HTMLElement)?.offsetWidth || 480;
      carouselTrack?.scrollBy({left: cardWidth + 30, behavior: 'smooth'});
    });
    carouselTrack?.addEventListener('scroll', updateCarousel, {passive: true});
    updateCarousel();

    const testimonials = [...document.querySelectorAll('.testimonial')];
    let testIndex = 0;

    function showTestimonial(index: number) {
      testimonials.forEach((t, i) => t.classList.toggle('active', i === index));
    }

    document.getElementById('testPrev')?.addEventListener('click', () => {
      testIndex = (testIndex - 1 + testimonials.length) % testimonials.length;
      showTestimonial(testIndex);
    });
    document.getElementById('testNext')?.addEventListener('click', () => {
      testIndex = (testIndex + 1) % testimonials.length;
      showTestimonial(testIndex);
    });

    const testimonialTimer = window.setInterval(() => {
      testIndex = (testIndex + 1) % testimonials.length;
      showTestimonial(testIndex);
    }, 6000);

    const cookieBanner = document.getElementById('cookieBanner');
    const cookieTimer = window.setTimeout(() => cookieBanner?.classList.add('is-visible'), 3000);

    document.getElementById('cookieAccept')?.addEventListener('click', () => {
      cookieBanner?.classList.remove('is-visible');
      localStorage.setItem('jin-cookies', 'accepted');
    });
    document.getElementById('cookieDecline')?.addEventListener('click', () => {
      cookieBanner?.classList.remove('is-visible');
    });
    if (localStorage.getItem('jin-cookies')) cookieBanner?.classList.remove('is-visible');

    document.getElementById('newsletterForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = (e.target as HTMLFormElement).querySelector('.link-cta') as HTMLElement | null;
      if (btn) {
        btn.textContent = 'Thank you';
        btn.style.pointerEvents = 'none';
      }
    });

    return () => {
      document.removeEventListener('click', onAnchorClick);
      document.removeEventListener('click', onAddToCartClick);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', schedule);
      window.clearInterval(testimonialTimer);
      window.clearTimeout(cookieTimer);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return null;
}
