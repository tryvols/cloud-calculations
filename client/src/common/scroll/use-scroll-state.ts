import { useEffect, useState } from "react"

const scrollToTop = () => {
  window.scrollTo(0, 0);
}

export const useScrollState = () => {
  const [isScrollDown, scrollDown] = useState(false);

  const onScroll = () => {
    window.pageYOffset > 20 ? scrollDown(true) : scrollDown(false);
  }

  useEffect(() => {
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
    }
  });

  return { isScrollDown, scrollToTop };
}
