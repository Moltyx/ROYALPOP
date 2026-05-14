// Top of page: Nav, Hero, Scroll Story (flat -> formed), Sticky product detail reveal.

const Nav = () => {
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onS = () => setScrolled(window.scrollY > 30);
    onS();
    window.addEventListener('scroll', onS, { passive: true });
    return () => window.removeEventListener('scroll', onS);
  }, []);
  const links = ['Adapter', 'Colorways', 'Material', 'Compatibility', 'FAQ'];
  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: scrolled ? 'rgba(255,255,255,0.72)' : 'rgba(255,255,255,0.0)',
        backdropFilter: scrolled ? 'saturate(180%) blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'saturate(180%) blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(0,0,0,0.06)' : '1px solid transparent',
        transition: 'all .35s ease',
      }}
    >
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 h-14 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2">
          <Logo />
          <span className="font-bold tracking-tightest text-[18px]">POPFORM</span>
        </a>
        <nav className="hidden md:flex items-center gap-7 text-[13px] text-ink/80">
          {links.map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} className="hover:text-ink transition-colors">{l}</a>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-2">
          <Button variant="ghost" className="!px-3">Sign in</Button>
          <Button variant="primary" as="a" href="#preorder">Pre-order</Button>
        </div>
        <button
          onClick={() => setOpen((o) => !o)}
          className="md:hidden w-10 h-10 grid place-items-center rounded-full hover:bg-fog"
          aria-label="Menu"
        >
          <svg width="18" height="14" viewBox="0 0 18 14">
            <line x1="0" y1={open ? 7 : 1} x2="18" y2={open ? 7 : 1}
              stroke="currentColor" strokeWidth="1.6" style={{ transition: 'all .3s', transform: open ? 'rotate(45deg)' : 'none', transformOrigin: 'center' }}/>
            <line x1="0" y1={open ? 7 : 13} x2="18" y2={open ? 7 : 13}
              stroke="currentColor" strokeWidth="1.6" style={{ transition: 'all .3s', transform: open ? 'rotate(-45deg)' : 'none', transformOrigin: 'center' }}/>
          </svg>
        </button>
      </div>
      <div
        className="md:hidden overflow-hidden bg-white border-b border-line"
        style={{ maxHeight: open ? 360 : 0, transition: 'max-height .45s cubic-bezier(.2,.7,.2,1)' }}
      >
        <div className="px-5 py-4 flex flex-col gap-3 text-[18px] font-medium">
          {links.map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setOpen(false)} className="py-1.5">{l}</a>
          ))}
          <Button variant="primary" as="a" href="#preorder" className="mt-2 self-start">Pre-order</Button>
        </div>
      </div>
    </header>
  );
};

const Logo = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden>
    <circle cx="11" cy="11" r="9" fill="none" stroke="currentColor" strokeWidth="1.6"/>
    <circle cx="11" cy="11" r="2.2" fill="currentColor"/>
    <rect x="6" y="10" width="10" height="2" fill="currentColor" opacity=".15"/>
  </svg>
);

// 1. HERO — interactive horizontal product carousel on the right.
const HERO_ORDER = ['pink', 'white', 'green', 'navy', 'arctic', 'mono', 'yellow', 'red'];

const HeroCarousel = () => {
  const [idx, setIdx] = React.useState(0);
  const [drag, setDrag] = React.useState(0); // current pointer drag offset (px)
  const trackRef = React.useRef(null);
  const startRef = React.useRef(null);
  const widthRef = React.useRef(1);

  const items = HERO_ORDER.map((k) => ({ id: k, ...COLORWAYS[k] }));
  const n = items.length;
  const clampIdx = (i) => Math.max(0, Math.min(n - 1, i));
  const go = (delta) => setIdx((i) => clampIdx(i + delta));

  // Pointer-based drag
  const onDown = (e) => {
    if (trackRef.current) widthRef.current = trackRef.current.getBoundingClientRect().width;
    startRef.current = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
    setDrag(0);
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };
  const onMove = (e) => {
    if (startRef.current == null) return;
    const x = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
    setDrag(x - startRef.current);
  };
  const onUp = () => {
    if (startRef.current == null) return;
    const threshold = widthRef.current * 0.15;
    if (drag < -threshold) go(1);
    else if (drag > threshold) go(-1);
    startRef.current = null;
    setDrag(0);
  };

  // Keyboard
  React.useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const active = items[idx];
  // Each slide occupies 100% of the track. We translate by idx and add drag offset.
  const tx = drag !== 0
    ? `calc(${-idx * 100}% + ${drag}px)`
    : `${-idx * 100}%`;

  return (
    <div className="relative w-full h-full select-none">
      {/* soft pink/colorway glow behind the product, eases with active colorway */}
      <div className="absolute inset-0 pointer-events-none transition-opacity duration-700"
        style={{ background: `radial-gradient(48% 42% at 50% 55%, ${active.accent}22, transparent 70%)` }}/>

      {/* track */}
      <div
        ref={trackRef}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        className="absolute inset-0 overflow-hidden touch-pan-y cursor-grab active:cursor-grabbing"
        style={{ touchAction: 'pan-y' }}
      >
        <div className="absolute inset-0 flex"
          style={{
            transform: `translateX(${tx})`,
            transition: drag !== 0 ? 'none' : 'transform .65s cubic-bezier(.2,.7,.2,1)',
          }}>
          {items.map((it, i) => {
            const dist = Math.abs(i - idx);
            const isActive = i === idx;
            return (
              <div key={it.id} className="relative shrink-0 w-full h-full pointer-events-none">
                <div
                  className="absolute inset-0"
                  style={{
                    opacity: dist === 0 ? 1 : 0.55,
                    transform: `scale(${isActive ? 1 : 0.94})`,
                    transition: 'opacity .5s ease, transform .55s cubic-bezier(.2,.7,.2,1)',
                  }}>
                  <Product colorway={it.id} view="lifestyle" alt={`${it.name} strap adapter`}/>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* desktop arrows — visible on hover of the hero column */}
      <button
        aria-label="Previous colorway"
        onClick={() => go(-1)}
        disabled={idx === 0}
        className="hidden md:grid place-items-center absolute left-2 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/85 backdrop-blur ring-1 ring-line shadow-sm opacity-60 hover:opacity-100 focus:opacity-100 disabled:opacity-20 transition-opacity z-10">
        <svg width="14" height="14" viewBox="0 0 14 14"><path d="M9 1L3 7l6 6" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </button>
      <button
        aria-label="Next colorway"
        onClick={() => go(1)}
        disabled={idx === n - 1}
        className="hidden md:grid place-items-center absolute right-2 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/85 backdrop-blur ring-1 ring-line shadow-sm opacity-60 hover:opacity-100 focus:opacity-100 disabled:opacity-20 transition-opacity z-10">
        <svg width="14" height="14" viewBox="0 0 14 14"><path d="M5 1l6 6-6 6" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </button>

      {/* floor shadow */}
      <div className="absolute left-1/2 bottom-16 -translate-x-1/2 w-[46%] h-6 rounded-[50%] pointer-events-none"
        style={{ background:'radial-gradient(50% 100% at 50% 50%, rgba(0,0,0,.16), transparent 70%)' }}/>

      {/* colorway label — sits below the product */}
      <div className="absolute left-0 right-0 bottom-6 flex flex-col items-center gap-3">
        <div key={active.id} className="flex items-center gap-2 cw-pop">
          <span className="inline-block w-2 h-2 rounded-full" style={{ background: active.accent }}/>
          <span className="font-mono text-[11px] uppercase tracking-widest text-ink">{active.name}</span>
          <span className="font-mono text-[11px] uppercase tracking-widest text-mute">· 0{idx+1} / 0{n}</span>
        </div>
        {/* dots */}
        <div className="flex items-center gap-1.5">
          {items.map((it, i) => (
            <button key={it.id} onClick={() => setIdx(i)} aria-label={`Go to ${it.name}`}
              className="rounded-full transition-all"
              style={{
                width: i === idx ? 22 : 6, height: 6,
                background: i === idx ? '#111' : 'rgba(0,0,0,.18)',
              }}/>
          ))}
        </div>
      </div>

      <style>{`
        .cw-pop { animation: cwpop .45s cubic-bezier(.2,.7,.2,1); }
        @keyframes cwpop {
          from { opacity: 0; transform: translateY(4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

const Hero = () => {
  const ref = React.useRef(null);
  // subtle parallax on the carousel
  const [py, setPy] = React.useState(0);
  React.useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const t = (r.top + r.height / 2 - window.innerHeight / 2) / window.innerHeight;
        setPy(t * -20);
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); if (raf) cancelAnimationFrame(raf); };
  }, []);

  return (
    <section id="top" ref={ref} className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden group/hero">
      <div className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(60% 40% at 50% 30%, rgba(255,47,135,0.04), transparent 70%),' +
            'radial-gradient(60% 50% at 50% 70%, rgba(159,211,255,0.08), transparent 70%)',
        }}
      />
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 grid md:grid-cols-12 gap-8 items-center relative">
        <div className="md:col-span-5 md:col-start-1 z-10">
          <div className="eyebrow text-magenta mb-5 intro-up" style={{ animationDelay: '60ms' }}>
            FKM strap adapter · First drop
          </div>
          <h1 className="display text-[clamp(44px,7vw,104px)] intro-up" style={{ animationDelay: '120ms' }}>
            Turn your Royal Pop<br/>into a wristwatch.
          </h1>
          <p className="mt-6 text-[clamp(15px,1.3vw,19px)] text-mute max-w-xl leading-relaxed intro-up"
            style={{ animationDelay: '260ms' }}>
            Premium FKM strap adapters designed for Royal&nbsp;Pop collectors.
            Clip-in cradle. Color-matched. Worn all day.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3 intro-up" style={{ animationDelay: '380ms' }}>
            <Button variant="primary" as="a" href="#preorder">Pre-order now →</Button>
            <Button variant="secondary" as="a" href="#colorways">Explore colorways</Button>
          </div>
          <div className="mt-10 flex items-center gap-6 text-[12px] text-mute font-mono intro-up" style={{ animationDelay: '480ms' }}>
            <span>From €89</span>
            <span className="w-1 h-1 rounded-full bg-line"/>
            <span>8 colorways</span>
            <span className="w-1 h-1 rounded-full bg-line"/>
            <span>Ships Q3</span>
          </div>
        </div>

        <div className="md:col-span-7 relative h-[520px] md:h-[680px]">
          <div className="hero-image absolute inset-0" style={{ transform: `translateY(${py}px)`, transition: 'transform .2s linear' }}>
            <HeroCarousel/>
          </div>
        </div>
      </div>

      <div className="mt-10 text-center font-mono text-[10px] tracking-widest uppercase text-mute intro-up"
        style={{ animationDelay: '700ms' }}>
        Royal Pop watch head not included · Independent accessory brand
      </div>

      <style>{`
        @keyframes intro-up {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .intro-up {
          opacity: 0;
          animation: intro-up 1s cubic-bezier(.2,.7,.2,1) both;
        }
        @keyframes hero-image-in {
          from { opacity: 0; transform: scale(.94); }
          to   { opacity: 1; transform: scale(1); }
        }
        .hero-image {
          opacity: 0;
          animation: hero-image-in 1.2s cubic-bezier(.2,.7,.2,1) 200ms both;
        }
      `}</style>
    </section>
  );
};

// 2. SCROLL STORY — Sticky 500vh sequence with five stages.
// Visually a "progressive reveal": clip-path expands from the watch face outward,
// then the full product settles, with a click-pulse and a CTA at the end.
const ScrollStory = () => {
  const ref = React.useRef(null);
  const p = useScrollProgress(ref, { mode: 'sticky' });

  const stages = [
    { caption: 'A collectible pocket piece.',
      sub: 'Built to be carried, collected, and displayed.' },
    { caption: 'Now designed for the wrist.',
      sub: 'A premium FKM strap adapter gives it a new everyday form.' },
    { caption: 'Precision clip-in cradle.',
      sub: 'The watch head aligns cleanly inside the adapter.' },
    { caption: 'One clean motion.',
      sub: 'No permanent modification. No complicated setup.' },
    { caption: 'From pocket piece to wrist icon.',
      sub: 'Ready to wear. Built to stand out.' },
  ];
  const idx = Math.max(0, Math.min(4, Math.floor(p * 5 - 0.0001)));
  const localProgress = (p * 5) - idx; // 0..1 within current stage

  // Visual choreography — pure scale + position so the frame is never empty.
  // The image starts massively zoomed-in on the watch face and gradually scales out
  // to reveal the full assembled product. No clip-path / empty-area tricks.
  // 0.00..0.45 : scale from 2.6 → 1.05 (watch face → full product)
  // 0.45..0.55 : settle to 1.0
  // 0.58..0.72 : brief click pulse (+0.05 then back)
  // 0.40..0.52 : cradle highlight ring fades in/out
  // 0.85..1.00 : CTA fades in
  const zoomOut = lerp(2.6, 1.0, range(p, 0.0, 0.55));
  const pulse = Math.sin(range(p, 0.58, 0.72) * Math.PI) * 0.05;
  const scale = zoomOut + (p > 0.55 ? pulse : 0);
  // Object-position pans slightly so the watch face stays centered through the zoom
  const ox = 50;
  const oy = lerp(48, 50, range(p, 0.0, 0.55));
  const cradleRing = range(p, 0.40, 0.48) - range(p, 0.55, 0.62);
  const clickGlow = Math.sin(range(p, 0.58, 0.72) * Math.PI);
  const ctaOp = range(p, 0.85, 1.0);

  return (
    <section id="adapter" ref={ref} className="relative" style={{ height: '500vh' }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-paper">
        {/* ambient gradient gets warmer with progress */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(55% 60% at 50% 50%, rgba(225,29,110,${0.04 + p*0.06}), transparent 70%)`,
            transition: 'background .3s linear' }}/>

        {/* progress rail (top center) */}
        <div className="absolute left-1/2 -translate-x-1/2 top-20 hidden md:flex items-center gap-2 z-10">
          {stages.map((_, i) => (
            <span key={i} className="h-[3px] rounded-full bg-line overflow-hidden" style={{ width: 44 }}>
              <span className="block h-full bg-ink"
                style={{ width: i < idx ? '100%' : i === idx ? `${localProgress*100}%` : '0%',
                  transition: 'width .15s linear' }}/>
            </span>
          ))}
        </div>
        <div className="absolute left-1/2 -translate-x-1/2 top-9 font-mono text-[10px] uppercase tracking-widest text-mute hidden md:block">
          From pocket piece to wrist icon · Step 0{idx+1} / 05
        </div>

        {/* product stage — image is positioned to keep the watch face centered
            and scaled with a soft eased zoom-out from 2.6× to 1.0× as the user scrolls. */}
        <div className="absolute inset-0 flex items-center justify-center px-6 pt-24 pb-56 md:pb-48">
          <div className="relative w-full max-w-[1000px] h-full">
            <img src="assets/pink-lifestyle.png"
              draggable="false"
              alt="POPFORM strap adapter — Pink Pop"
              className="absolute inset-0 w-full h-full select-none"
              style={{
                objectFit: 'contain',
                objectPosition: `${ox}% ${oy}%`,
                transform: `scale(${scale})`,
                transformOrigin: `${ox}% ${oy}%`,
                transition: 'transform .3s cubic-bezier(.2,.7,.2,1)',
              }}/>
            {/* dashed cradle highlight during stage 3 */}
            <div className="absolute pointer-events-none"
              style={{
                left: '24%', top: '36%', width: '15%', height: '36%',
                border: '1.5px dashed rgba(225,29,110,0.75)',
                borderRadius: '12px',
                opacity: cradleRing,
                transition: 'opacity .25s linear',
              }}/>
            {/* click pulse */}
            <div className="absolute inset-0 grid place-items-center pointer-events-none"
              style={{ opacity: clickGlow }}>
              <div className="rounded-full"
                style={{ width: '24%', aspectRatio: 1,
                  boxShadow: '0 0 0 12px rgba(225,29,110,0.18), 0 0 80px 28px rgba(225,29,110,0.30)' }}/>
            </div>
          </div>
        </div>

        {/* captions — sit in the bottom band of the viewport */}
        <div className="absolute left-0 right-0 bottom-16 px-6 text-center">
          <div className="relative h-[150px] max-w-2xl mx-auto">
            {stages.map((s, i) => (
              <div key={i} className="absolute inset-0"
                style={{ opacity: i === idx ? 1 : 0,
                  transform: `translateY(${i === idx ? 0 : 14}px)`,
                  transition: 'all .5s cubic-bezier(.2,.7,.2,1)' }}>
                <div className="md:hidden font-mono text-[10px] uppercase tracking-widest text-mute mb-3">
                  Step 0{i+1} / 05
                </div>
                <h3 className="display text-[clamp(26px,3.6vw,46px)]">{s.caption}</h3>
                <p className="mt-3 text-[15px] text-mute max-w-md mx-auto leading-relaxed">{s.sub}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA reveal at the end (sits just below the captions) */}
        <div className="absolute left-1/2 bottom-5"
          style={{ opacity: ctaOp,
            transform: `translate(-50%, ${(1 - ctaOp) * 14}px)`,
            transition: 'all .3s ease',
            pointerEvents: ctaOp > 0.4 ? 'auto' : 'none' }}>
          <Button variant="primary" as="a" href="#colorways">Explore colorways →</Button>
        </div>

        {/* scroll hint — pinned to the very bottom edge, only shows at the start */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-1 font-mono text-[10px] tracking-widest uppercase text-mute"
          style={{ opacity: (1 - range(p, 0, 0.12)) * (1 - ctaOp) }}>
          Scroll to assemble ↓
        </div>
      </div>
    </section>
  );
};

// 3. PRODUCT DETAIL — sticky reveal that zoom-pans across the lifestyle image.
const ProductDetail = () => {
  const ref = React.useRef(null);
  const p = useScrollProgress(ref, { mode: 'sticky' });
  // 4 focus regions on the pink-lifestyle photo.
  // The watch face is roughly center-right of the frame; left strap area, right strap area.
  // Coordinates are object-position % values (0..100) and a scale factor.
  const shots = [
    { key: 'overview', label: 'An integrated form.',
      desc: 'Cradle, end-links and FKM strap finished in a single, considered palette. Reads as one piece on the wrist.',
      focus: { x: 50, y: 50, scale: 1.0 } },
    { key: 'dial',     label: 'Color-matched bezel.',
      desc: 'A precision-machined cradle wraps the Royal Pop case in matching color. The dial reads cleanly through.',
      focus: { x: 55, y: 50, scale: 1.6 } },
    { key: 'fkm',      label: 'Premium FKM rubber.',
      desc: 'Soft matte touch, sweat- and water-resistant, dimensionally stable. Designed to be worn every day.',
      focus: { x: 86, y: 55, scale: 1.85 } },
    { key: 'clip',     label: 'Clip-in cradle.',
      desc: 'A secure seat captures the watch head without permanent modification. Pops back out for pendant wear.',
      focus: { x: 18, y: 48, scale: 1.85 } },
  ];
  const shotIndex = Math.min(3, Math.floor(p / 0.25));
  const shot = shots[shotIndex];
  const local = (p - shotIndex * 0.25) / 0.25;

  return (
    <section ref={ref} className="relative" style={{ height: '380vh' }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-fog">
        <div className="absolute inset-0 transition-colors duration-700"
          style={{ background:
            shotIndex === 0 ? 'radial-gradient(60% 50% at 50% 50%, rgba(225,29,110,0.06), transparent 70%)' :
            shotIndex === 1 ? 'radial-gradient(60% 50% at 30% 50%, rgba(159,211,255,0.10), transparent 70%)' :
            shotIndex === 2 ? 'radial-gradient(60% 50% at 50% 70%, rgba(246,210,74,0.10), transparent 70%)' :
                              'radial-gradient(60% 50% at 70% 50%, rgba(70,163,106,0.06), transparent 70%)'
          }} />

        <div className="absolute inset-0 grid grid-cols-12 items-center">
          <div className="col-span-12 md:col-span-7 md:col-start-1 h-screen relative">
            <div className="absolute inset-0 grid place-items-center p-6 md:p-10">
              <div className="relative w-full max-w-[820px] h-[80%]">
                <Product colorway="pink" view="lifestyle" focus={shot.focus} alt="Pink Pop FKM strap adapter, detail view" />
              </div>
            </div>
          </div>

          <div className="hidden md:flex col-span-5 col-start-8 pr-10 lg:pr-16 flex-col gap-4">
            <Eyebrow>Detail · 0{shotIndex + 1} / 04</Eyebrow>
            <div className="relative h-[220px]">
              {shots.map((s, i) => (
                <div key={s.key} className="absolute inset-0"
                  style={{ opacity: i === shotIndex ? 1 : 0, transform: `translateY(${i === shotIndex ? 0 : 14}px)`,
                    transition: 'all .5s cubic-bezier(.2,.7,.2,1)' }}>
                  <h3 className="display text-[clamp(28px,3.6vw,56px)]">{s.label}</h3>
                  <p className="mt-4 text-[16px] text-mute leading-relaxed max-w-[420px]">{s.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-2 flex gap-2">
              {shots.map((s, i) => (
                <div key={s.key} className="h-1 flex-1 rounded-full bg-line overflow-hidden">
                  <div className="h-full bg-ink"
                    style={{ width: i < shotIndex ? '100%' : i === shotIndex ? `${local*100}%` : '0%',
                      transition: 'width .2s linear' }}/>
                </div>
              ))}
            </div>
          </div>

          <div className="md:hidden col-span-12 absolute left-0 right-0 bottom-10 px-6">
            <Eyebrow>Detail · 0{shotIndex + 1} / 04</Eyebrow>
            <h3 className="display text-[30px] mt-2">{shot.label}</h3>
            <p className="text-[14px] text-mute mt-2">{shot.desc}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

Object.assign(window, { Nav, Hero, ScrollStory, ProductDetail });
