import { useEffect, useRef, useState } from 'react';

export function useScrollReveal(options = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el); // fire once
        }
      },
      { threshold: options.threshold || 0.15, rootMargin: options.rootMargin || '0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [options.threshold, options.rootMargin]);

  return { ref, isVisible };
}

export function useScrollRevealMultiple(count, options = {}) {
  const refs = useRef([]);
  const [visibleMap, setVisibleMap] = useState({});

  useEffect(() => {
    const observers = [];

    refs.current.forEach((el, i) => {
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleMap((prev) => ({ ...prev, [i]: true }));
            observer.unobserve(el);
          }
        },
        { threshold: options.threshold || 0.1 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [count, options.threshold]);

  const setRef = (i) => (el) => {
    refs.current[i] = el;
  };

  return { setRef, visibleMap };
}
