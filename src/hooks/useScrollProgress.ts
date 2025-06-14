import { useEffect, useState } from 'react'

export function useScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement
      const totalScroll = scrollHeight - clientHeight;
      const progress = (scrollTop / totalScroll) * 100;
      setScrollProgress(progress);
    }

    window.addEventListener('scroll', updateScrollProgress);
    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, [])

  return scrollProgress
}
