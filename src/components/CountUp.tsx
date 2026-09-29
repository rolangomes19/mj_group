import { useEffect, useRef, useState } from 'react'

/** Counts up once when first seen. Years never count (they read as a gimmick). */
export function CountUp({ to, ms = 1100 }: { to: number; ms?: number }) {
  const [n, setN] = useState(to)
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const el = ref.current
    if (!el) return
    setN(0)
    let raf = 0
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      io.disconnect()
      const start = performance.now()
      const tick = (now: number) => {
        const p = Math.min(1, (now - start) / ms)
        setN(Math.round(to * (1 - Math.pow(1 - p, 3))))
        if (p < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    })
    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [to, ms])
  return <span ref={ref}>{n}</span>
}
