// useScrollProgress: returns 0..1 progress through an element relative to viewport.
// startAt = 0 means starts when top of element reaches bottom of viewport.
// endAt = 1 means ends when bottom of element reaches top of viewport.
function useScrollProgress(ref, opts = {}) {
  const { mode = 'cover' } = opts;
  const [p, setP] = React.useState(0);
  React.useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const vh = window.innerHeight;
        let prog = 0;
        if (mode === 'cover') {
          // 0 when top hits bottom of viewport; 1 when bottom hits top
          prog = (vh - r.top) / (vh + r.height);
        } else if (mode === 'sticky') {
          // for a sticky/pinned section: 0 when top hits top; 1 when bottom hits bottom of viewport
          prog = (-r.top) / (r.height - vh);
        } else if (mode === 'enter') {
          // 0 when top at bottom of viewport, 1 when top at top of viewport
          prog = (vh - r.top) / vh;
        }
        setP(Math.max(0, Math.min(1, prog)));
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [ref, mode]);
  return p;
}

// useInView: simple intersection observer for fade-in
function useInView(ref, opts = {}) {
  const [seen, setSeen] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setSeen(true);
        });
      },
      { rootMargin: opts.rootMargin || '0px 0px -10% 0px', threshold: opts.threshold ?? 0.05 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref]);
  return seen;
}

// lerp util
function lerp(a, b, t) { return a + (b - a) * t; }
function clamp(v, lo = 0, hi = 1) { return Math.max(lo, Math.min(hi, v)); }
// map t in [a,b] -> [0,1]
function range(t, a, b) { return clamp((t - a) / (b - a)); }

Object.assign(window, { useScrollProgress, useInView, lerp, clamp, range });
