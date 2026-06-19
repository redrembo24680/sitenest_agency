import { useEffect, useRef } from 'react';
import type { RefObject } from 'react';

export function useScrollAnimate<T extends HTMLElement>(): RefObject<T | null> {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    const el = ref.current;
    if (!el) return;

    const targets = el.querySelectorAll('.scroll-reveal');
    targets.forEach((t, i) => {
      (t as HTMLElement).style.transitionDelay = `${i * 0.08}s`;
      observer.observe(t);
    });

    return () => observer.disconnect();
  }, []);

  return ref;
}
