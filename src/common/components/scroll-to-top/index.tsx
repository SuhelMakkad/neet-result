"use client";

import { MoveUp } from "lucide-react";
import { useIntersectionObserver } from "usehooks-ts";

const scrollToTop = () => {
  if (typeof window === "undefined") return;

  window.scrollTo({
    left: 0,
    top: 0,
    behavior: "smooth",
  });
};

const ScrollToTop = () => {
  const { isIntersecting, ref } = useIntersectionObserver();

  return (
    <>
      <div ref={ref} className="absolute top-0 h-20" />

      {!isIntersecting && (
        <button className="group fixed bottom-4 right-6 z-10 bg-background" onClick={scrollToTop}>
          <MoveUp className="h-10 w-10 rounded-full border bg-brand-50 p-2 text-brand shadow-sm transition-shadow group-hover:shadow-md" />
        </button>
      )}
    </>
  );
};

export default ScrollToTop;
