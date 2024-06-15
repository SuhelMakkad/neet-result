"use client";

import { useIntersectionObserver } from "usehooks-ts";
import { MoveUp } from "lucide-react";
import { scrollToTop } from "@/utils/helpers";

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
