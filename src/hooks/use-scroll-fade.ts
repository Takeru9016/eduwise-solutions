import { useEffect, useRef, useState } from "react";

const END_THRESHOLD_PX = 4;

export function useScrollFade<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) {
      return;
    }
    const update = () => {
      setCanScrollRight(
        el.scrollWidth - el.clientWidth - el.scrollLeft > END_THRESHOLD_PX
      );
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => {
      el.removeEventListener("scroll", update);
      observer.disconnect();
    };
  }, []);

  return { fadeClass: canScrollRight ? "scroll-fade-r" : "", ref };
}
