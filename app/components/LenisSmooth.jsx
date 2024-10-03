"use client";

import Lenis from "lenis";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const LenisSmooth = () => {
  const lenisRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    // Scroll to the top of the page when the pathname changes
    if (lenisRef.current) lenisRef.current.scrollTo(0, { immediate: true });
  }, [pathname, lenisRef]);

  useEffect(() => {
    const lenis = new Lenis();
    lenisRef.current = lenis;

    const handleAnimationFrame = (time) => {
      lenis.raf(time);
      requestAnimationFrame(handleAnimationFrame);
    };

    requestAnimationFrame(handleAnimationFrame);

    return () => {
      lenis.destroy(); 
    };
  }, []);

  return null;
};

export default LenisSmooth;
