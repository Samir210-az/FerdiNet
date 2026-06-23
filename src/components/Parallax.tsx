"use client";
import { useEffect, useRef } from "react";

/**
 * Sürüşmə zamanı fərqli sürətlə hərəkət edən dekorativ fon elementi (parallax).
 * speed: müsbət = aşağı sürətlə düşür, mənfi = əksinə yuxarı hərəkət edir.
 */
export default function ParallaxBlob({
  speed = 0.3,
  className = "",
  style = {},
  children,
}: {
  speed?: number;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    function update() {
      if (ref.current) {
        const y = window.scrollY * speed;
        ref.current.style.transform = `translate3d(0, ${y}px, 0)`;
      }
      frame = 0;
    }
    function onScroll() {
      if (frame) return;
      frame = requestAnimationFrame(update);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => window.removeEventListener("scroll", onScroll);
  }, [speed]);

  return (
    <div ref={ref} className={className} style={{ position: "absolute", willChange: "transform", ...style }}>
      {children}
    </div>
  );
}
