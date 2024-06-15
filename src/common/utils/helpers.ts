export const scrollToTop = () => {
  if (typeof window === "undefined") return;

  window.scrollTo({
    left: 0,
    top: 0,
    behavior: "smooth",
  });
};
