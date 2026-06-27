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

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function JinClientEffects() {
  const location = useLocation();

  useEffect(() => {
    const observer = setupInViewObserver();
    return () => observer.disconnect();
  }, [location.pathname]);

  useEffect(() => {
    const strip = document.querySelector('.collection-strip');
    const stripInner = document.querySelector('.collection-strip__inner');
    const hint = document.getElementById('collectionSwipeHint');
    if (!strip || !stripInner || !hint) return;

    const storageKey = 'jin-collection-swipe-hint';

    const dismissHint = () => {
      strip.classList.add('is-scrolled');
      hint.classList.add('is-dismissed');
      localStorage.setItem(storageKey, '1');
    };

    if (localStorage.getItem(storageKey)) {
      dismissHint();
      return;
    }

    const onScroll = () => {
      if (stripInner.scrollLeft > 12) dismissHint();
    };

    stripInner.addEventListener('scroll', onScroll, {passive: true});
    return () => stripInner.removeEventListener('scroll', onScroll);
  }, [location.pathname]);

  useEffect(() => {
    const scrollBehavior = prefersReducedMotion() || window.innerWidth <= 768 ? 'auto' : 'smooth';

    const onAnchorClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement).closest('a[href^="#"]');
      if (!link) return;
      const id = link.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({behavior: scrollBehavior});
    };

    document.addEventListener('click', onAnchorClick);

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
      const y = window.scrollY + header.getBoundingClientRect().height * 0.5;

      for (let i = 0; i < sections.length; i++) {
        const el = sections[i] as HTMLElement;
        const rect = el.getBoundingClientRect();
        const top = rect.top + window.scrollY;
        const bottom = top + rect.height;
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
    const carouselGap = carouselTrack
      ? parseFloat(getComputedStyle(carouselTrack).columnGap || getComputedStyle(carouselTrack).gap) || 24
      : 24;

    function updateCarousel() {
      if (!carouselTrack || !cards.length) return;
      const cardWidth = (cards[0] as HTMLElement).offsetWidth || 1;
      const index = Math.round(carouselTrack.scrollLeft / (cardWidth + carouselGap));
      if (carouselPrev) carouselPrev.disabled = index <= 0;
      if (carouselNext) carouselNext.disabled = index >= cards.length - 1;
      if (carouselProgress) {
        carouselProgress.style.width = `${((index + 1) / cards.length) * 100}%`;
      }
    }

    const onCarouselPrev = () => {
      const cardWidth = (cards[0] as HTMLElement)?.offsetWidth || 480;
      carouselTrack?.scrollBy({left: -(cardWidth + carouselGap), behavior: scrollBehavior});
    };
    const onCarouselNext = () => {
      const cardWidth = (cards[0] as HTMLElement)?.offsetWidth || 480;
      carouselTrack?.scrollBy({left: cardWidth + carouselGap, behavior: scrollBehavior});
    };

    carouselPrev?.addEventListener('click', onCarouselPrev);
    carouselNext?.addEventListener('click', onCarouselNext);
    carouselTrack?.addEventListener('scroll', updateCarousel, {passive: true});
    updateCarousel();

    const testimonials = [...document.querySelectorAll('.testimonial')];
    let testIndex = 0;

    function showTestimonial(index: number) {
      testimonials.forEach((t, i) => t.classList.toggle('active', i === index));
    }

    const onTestPrev = () => {
      testIndex = (testIndex - 1 + testimonials.length) % testimonials.length;
      showTestimonial(testIndex);
    };
    const onTestNext = () => {
      testIndex = (testIndex + 1) % testimonials.length;
      showTestimonial(testIndex);
    };

    document.getElementById('testPrev')?.addEventListener('click', onTestPrev);
    document.getElementById('testNext')?.addEventListener('click', onTestNext);

    const testimonialTimer =
      testimonials.length > 1
        ? window.setInterval(() => {
            testIndex = (testIndex + 1) % testimonials.length;
            showTestimonial(testIndex);
          }, 6000)
        : 0;

    const cookieBanner = document.getElementById('cookieBanner');
    const cookieTimer = window.setTimeout(() => cookieBanner?.classList.add('is-visible'), 3000);

    const onCookieAccept = () => {
      cookieBanner?.classList.remove('is-visible');
      localStorage.setItem('jin-cookies', 'accepted');
    };
    const onCookieDecline = () => {
      cookieBanner?.classList.remove('is-visible');
    };
    const onNewsletterSubmit = (e: Event) => {
      e.preventDefault();
      const btn = (e.target as HTMLFormElement).querySelector('.link-cta') as HTMLElement | null;
      if (btn) {
        btn.textContent = 'Thank you';
        btn.style.pointerEvents = 'none';
      }
    };

    document.getElementById('cookieAccept')?.addEventListener('click', onCookieAccept);
    document.getElementById('cookieDecline')?.addEventListener('click', onCookieDecline);
    if (localStorage.getItem('jin-cookies')) cookieBanner?.classList.remove('is-visible');

    const newsletterForm = document.getElementById('newsletterForm');
    newsletterForm?.addEventListener('submit', onNewsletterSubmit);

    return () => {
      document.removeEventListener('click', onAnchorClick);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', schedule);
      carouselPrev?.removeEventListener('click', onCarouselPrev);
      carouselNext?.removeEventListener('click', onCarouselNext);
      carouselTrack?.removeEventListener('scroll', updateCarousel);
      document.getElementById('testPrev')?.removeEventListener('click', onTestPrev);
      document.getElementById('testNext')?.removeEventListener('click', onTestNext);
      document.getElementById('cookieAccept')?.removeEventListener('click', onCookieAccept);
      document.getElementById('cookieDecline')?.removeEventListener('click', onCookieDecline);
      newsletterForm?.removeEventListener('submit', onNewsletterSubmit);
      if (testimonialTimer) window.clearInterval(testimonialTimer);
      window.clearTimeout(cookieTimer);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [location.pathname]);

  return null;
}
