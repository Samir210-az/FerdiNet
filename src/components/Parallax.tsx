"use client";
import { useEffect, useRef } from "react";

/**
 * Sürüşmə zamanı fərqli sürətlə hərəkət edən dekorativ fon elementi.
 * speed > 0: aşağıya doğru daha yavaş/sürətli hərəkət edir (parallax effekti).
 */
export default function ParallaxBlob({
  speed = 0.3,
  className = "",
  style = {},
}: {
  speed?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    function onScroll() {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        if (ref.current) {
          const rect = ref.current.parentElement?.getBoundingClientRect();
          const offset = rect ? -rect.top * speed : 0;
          ref.current.style.transform = `translate3d(0, ${offset}px, 0)`;
        }
        frame = 0;
      });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [speed]);

  return <div ref={ref} className={className} style={{ position: "absolute", willChange: "transform", ...style }} />;
}
