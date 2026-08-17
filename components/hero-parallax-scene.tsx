"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const MAX_SHIFT = 42;

export function HeroParallaxScene() {
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduceMotion.matches) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const section = layer.closest("section");
      if (!section) return;

      const bounds = section.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const sectionCenter = bounds.top + bounds.height / 2;
      const shift = Math.max(-MAX_SHIFT, Math.min(MAX_SHIFT, (viewportCenter - sectionCenter) * 0.08));
      layer.style.setProperty("--hero-parallax-y", `${shift.toFixed(2)}px`);
    };

    const onScroll = () => {
      if (frame === 0) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame !== 0) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="hero-parallax-layer" ref={layerRef}>
      <Image
        alt=""
        fill
        preload
        sizes="(max-width: 800px) 110vw, 72vw"
        src="/assets/hero/yuri-pos-parallax.webp"
      />
    </div>
  );
}
