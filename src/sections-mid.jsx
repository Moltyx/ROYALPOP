// Mid page: Colorways interactive, Material (dark), Design details grid, Product cards.

// 4. COLORWAYS
const Colorways = () => {
  const ref = React.useRef(null);
  const [active, setActive] = React.useState('pink');
  const c = COLORWAYS[active];
  const order = ['pink', 'white', 'green', 'navy', 'arctic', 'mono', 'yellow', 'red'];
  const comingSoon = [];

  return (
    <section id="colorways" ref={ref} className="relative py-20 md:py-28 overflow-hidden"
      style={{ background: `linear-gradient(180deg, #fff 0%, ${c.bgTint} 50%, #fff 100%)`,
        transition: 'background 700ms ease' }}>
      <div className="max-w-[1280px] mx-auto px-5 md:px-8">
        <SectionHead
          eyebrow="Colorways"
          title="Pick a personality."
          sub="One launch colorway shown — seven more in production. Tap to swap; image and accents update together."
        />

        <div className="mt-16 grid md:grid-cols-12 gap-10 md:gap-16 items-center">
          {/* product stage */}
          <div className="md:col-span-7 relative h-[480px] md:h-[640px]">
            <div className="absolute inset-0 grid place-items-center">
              <div key={active} className="cw-pop relative w-[92%] max-w-[640px] h-[80%]">
                <Product colorway={active} view="lifestyle"/>
              </div>
            </div>
            {/* color ring picker overlay */}
            <div className="absolute left-1/2 -translate-x-1/2 bottom-4 flex items-center gap-3 p-2 rounded-full bg-white/85 backdrop-blur ring-1 ring-line">
              {order.map((k) => (
                <button key={k} onClick={() => setActive(k)}
                  aria-label={COLORWAYS[k].name}
                  className="relative transition-transform hover:scale-110 grid place-items-center"
                  style={{ width: 40, height: 40 }}>
                  <Swatch colorway={k} size={32} active={k === active}/>
                  {!COLORWAYS[k].lifestyle && (
                    <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-white ring-1 ring-line grid place-items-center">
                      <span className="w-1 h-1 rounded-full bg-mute"/>
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* details */}
          <div className="md:col-span-5">
            <div className="font-mono text-[11px] uppercase tracking-widest text-mute">Colorway 0{order.indexOf(active)+1} / 0{order.length} in drop 01</div>
            <div key={active + '-name'} className="cw-pop mt-2">
              <h3 className="display text-[clamp(34px,4.4vw,64px)]">
                {c.name}.
              </h3>
            </div>
            <div className="mt-6 flex items-center gap-6">
              <div className="text-[15px] text-mute">
                <div>From</div>
                <div className="text-ink text-[28px] font-semibold tracking-tight">€89</div>
              </div>
              <div className="h-12 w-px bg-line"/>
              <span className="pill ring-1 ring-line text-[12px] font-mono uppercase tracking-widest">
                {COLORWAYS[active].lifestyle ? 'Pre-order' : 'Coming soon'}
              </span>
            </div>

            <ul className="mt-8 space-y-3 text-[15px] text-ink/80">
              <li className="flex items-center gap-3"><Dot color={c.accent}/> Color-matched cradle, bezel & strap</li>
              <li className="flex items-center gap-3"><Dot color={c.accent}/> Soft-touch matte FKM rubber</li>
              <li className="flex items-center gap-3"><Dot color={c.accent}/> Clip-in installation, no modification</li>
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button variant="primary" as="a" href="#preorder"
                className={COLORWAYS[active].lifestyle ? '' : 'opacity-60 pointer-events-none'}>
                {COLORWAYS[active].lifestyle ? `Pre-order ${c.name}` : 'Notify me'}
              </Button>
              <Button variant="secondary" as="a" href="#products">View all colorways</Button>
            </div>

            <p className="mt-6 font-mono text-[10px] uppercase tracking-widest text-mute">
              Royal Pop watch head not included
            </p>
          </div>
        </div>

        {/* coming soon strip — hidden when all colorways are live */}
        {comingSoon.length > 0 && (
          <div className="mt-20 pt-10 border-t border-line">
            <div className="flex items-end justify-between mb-6">
              <Eyebrow>Drop 02 · Coming soon</Eyebrow>
              <span className="font-mono text-[11px] text-mute uppercase tracking-widest">Photography in production</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {comingSoon.map((k) => (
                <div key={k} className="rounded-2xl bg-fog ph-stripes aspect-square relative overflow-hidden group">
                  <div className="absolute right-4 top-4">
                    <Swatch colorway={k} size={40}/>
                  </div>
                  <div className="absolute left-5 bottom-5 right-5">
                    <div className="text-[14px] font-semibold leading-tight">{COLORWAYS[k].name}</div>
                    <div className="font-mono text-[10px] uppercase tracking-widest text-mute mt-2">Notify me →</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <style>{`
        .cw-pop { animation: cwpop .55s cubic-bezier(.2,.7,.2,1); }
        @keyframes cwpop {
          from { opacity: 0; transform: translateY(8px) scale(.985); filter: blur(2px); }
          to   { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
        }
      `}</style>
    </section>
  );
};

const Dot = ({ color }) => (
  <span className="inline-block w-2 h-2 rounded-full" style={{ background: color }}/>
);

// 5. MATERIAL — dark section. Macro = a heavily-zoomed crop of the flat-lay strap rubber.
const Material = () => {
  const ref = React.useRef(null);
  const p = useScrollProgress(ref, { mode: 'cover' });
  const lightX = lerp(20, 80, p);

  const points = [
    'Premium FKM rubber',
    'Sweat-resistant',
    'Water-resistant',
    'Smooth matte touch',
    'Flexible & durable',
    'Built for daily wear',
  ];

  return (
    <section id="material" ref={ref} className="relative bg-ink2 text-white overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(40% 40% at ${lightX}% 30%, rgba(255,255,255,0.10), transparent 70%)`,
        }}/>
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 py-20 md:py-28 grid md:grid-cols-12 gap-10 relative">
        <div className="md:col-span-6">
          <Eyebrow className="text-magenta">Material</Eyebrow>
          <Reveal>
            <h2 className="display text-[clamp(36px,5.5vw,80px)] text-white mt-5">
              Soft matte FKM.<br/>Built to be worn.
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-6 text-white/65 max-w-md leading-relaxed text-[clamp(15px,1.3vw,18px)]">
              A premium fluoroelastomer rubber with a velvety hand-feel. Resistant to sweat, chlorine and UV — and color-stable after thousands of wears.
            </p>
          </Reveal>
          <ul className="mt-10 grid grid-cols-2 gap-4 max-w-md">
            {points.map((pt, i) => (
              <Reveal key={pt} delay={100 + i * 80}>
                <li className="flex items-start gap-3">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-magenta"/>
                  <span className="text-[14px] text-white/85 leading-snug">{pt}</span>
                </li>
              </Reveal>
            ))}
          </ul>
          <div className="mt-12 grid grid-cols-3 gap-6 max-w-md">
            <Stat label="Shore A" value="65"/>
            <Stat label="Tensile MPa" value="14.2"/>
            <Stat label="Color stable" value="5y+"/>
          </div>
        </div>

        {/* macro = real product macro photograph */}
        <div className="md:col-span-6 relative h-[420px] md:h-[640px]">
          <div className="absolute inset-0 rounded-3xl overflow-hidden ring-1 ring-white/5 bg-[#0a0a0b]">
            {/* The image already has a dark backdrop baked in — let it bleed edge to edge */}
            <img src="assets/material-macro.png"
              draggable="false"
              alt="FKM strap macro on pink Royal Pop"
              className="absolute inset-0 w-full h-full select-none"
              style={{
                objectFit: 'cover',
                objectPosition: `${lerp(48, 56, p)}% ${lerp(40, 55, p)}%`,
                transition: 'object-position .4s ease',
              }}/>
            {/* subtle moving highlight tracks scroll */}
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: `radial-gradient(28% 28% at ${lightX}% 30%, rgba(255,255,255,0.14), transparent 70%)`,
                transition: 'background .3s linear', mixBlendMode: 'screen' }}/>
            {/* gentle vignette to deepen the corners */}
            <div className="absolute inset-0 pointer-events-none"
              style={{ background:'radial-gradient(85% 90% at 50% 50%, transparent, rgba(0,0,0,.35) 95%)' }}/>
            <div className="absolute left-5 bottom-4 font-mono text-[10px] tracking-widest uppercase text-white/55">
              Macro · FKM rubber surface
            </div>
            <div className="absolute right-5 top-5 font-mono text-[10px] tracking-widest uppercase text-white/55">
              Studio capture
            </div>
          </div>
          {/* floating tag — kept; sits over plain rubber, doesn't cover any product detail */}
          <div className="absolute -bottom-6 left-6 md:left-auto md:right-6 md:w-[260px] rounded-2xl bg-white text-ink p-5 shadow-2xl">
            <div className="font-mono text-[10px] uppercase tracking-widest text-mute">Hand-feel</div>
            <div className="text-[18px] font-semibold mt-1">Velvet matte</div>
            <div className="text-[13px] text-mute mt-1">No-cling, no-pull. Stays clean.</div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Stat = ({ label, value }) => (
  <div>
    <div className="text-[28px] font-semibold tracking-tight text-white">{value}</div>
    <div className="font-mono text-[10px] uppercase tracking-widest text-white/40 mt-1">{label}</div>
  </div>
);

// 6. DESIGN DETAILS GRID — four panels that show different framings of the product.
const DesignDetails = () => {
  const cards = [
    {
      title: 'Integrated silhouette',
      desc: 'Cradle, end-links and strap profile flow as a single line.',
      view: 'flat',
      focus: { x: 50, y: 50, scale: 1.0 },
      tint: '#F4BCC6',
    },
    {
      title: 'Color-matched bezel',
      desc: 'The cradle wraps the watch head in matching color, accented in red.',
      view: 'lifestyle',
      focus: { x: 50, y: 48, scale: 1.5 },
      tint: '#BFE0FF',
    },
    {
      title: 'Premium FKM rubber',
      desc: 'Soft matte hand-feel. Color-stable. Resists sweat and chlorine.',
      view: 'lifestyle',
      focus: { x: 88, y: 55, scale: 1.7 },
      tint: '#F6D24A',
    },
    {
      title: 'Clip-in cradle',
      desc: 'Captures the Royal Pop head securely — and pops back out.',
      view: 'lifestyle',
      focus: { x: 18, y: 48, scale: 1.7 },
      tint: '#A7DEB6',
    },
  ];
  return (
    <section className="bg-paper py-28 md:py-40">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8">
        <SectionHead
          eyebrow="Design"
          title="Details, where they matter."
          sub="Everything you'd notice on the wrist — and a few things you wouldn't, until you turn it over."
        />
        <div className="mt-16 grid md:grid-cols-2 gap-4 md:gap-6">
          {cards.map((c, i) => (
            <Reveal key={c.title} delay={i * 80}>
              <DetailCard {...c}/>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const DetailCard = ({ title, desc, view, focus, tint }) => {
  const [hover, setHover] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="relative rounded-3xl overflow-hidden bg-fog aspect-[4/3] group cursor-pointer">
      <div className="absolute inset-0"
        style={{ background: `linear-gradient(135deg, ${tint}33, transparent 60%)` }} />
      {/* Image, zoomed to the focus area; subtle parallax on hover */}
      <div className="absolute inset-0">
        <Product colorway="pink" view={view}
          focus={{ ...focus, scale: focus.scale * (hover ? 1.04 : 1) }} />
      </div>
      {/* glass overlay at bottom for legibility */}
      <div className="absolute inset-x-0 bottom-0 p-7 md:p-9"
        style={{ background:'linear-gradient(180deg, transparent, rgba(255,255,255,.92) 60%)' }}>
        <h3 className="display text-[clamp(22px,2.4vw,30px)]"
          style={{ transform: hover ? 'translateY(-4px)' : 'translateY(0)', transition: 'transform .4s ease' }}>{title}</h3>
        <p className="mt-1 text-[14px] text-mute max-w-md">{desc}</p>
      </div>
      <div className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white ring-1 ring-line grid place-items-center"
        style={{ transform: hover ? 'scale(1.08) rotate(45deg)' : 'scale(1) rotate(0)', transition: 'transform .5s cubic-bezier(.2,.7,.2,1)' }}>
        <svg width="14" height="14" viewBox="0 0 14 14"><path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
      </div>
    </div>
  );
};

// 7. PRODUCT CARDS — flat-lay images for cards (clean white-bg e-commerce look)
const Products = () => {
  const cards = [
    { id: 'pink',   tagline: 'Bold · Playful · Collectible' },
    { id: 'white',  tagline: 'Iconic · Multicolor accents' },
    { id: 'green',  tagline: 'Fresh · Statement · Bold' },
    { id: 'navy',   tagline: 'Sharp · Sport · Bold contrast' },
    { id: 'arctic', tagline: 'Sky · Soft · Sub-dial detail' },
    { id: 'mono',   tagline: 'Stealth · White bezel · Sharp' },
    { id: 'yellow', tagline: 'Pastel · Soft · Considered' },
    { id: 'red',    tagline: 'Loud · Tri-color · Pampelonne' },
  ];
  return (
    <section id="products" className="bg-fog py-20 md:py-28">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-14">
          <SectionHead
            eyebrow="Shop"
            title="The first drop."
            sub="Eight colorways. Same architecture, eight moods. Each ships in a protective sleeve with a microfiber cloth."
            className="!max-w-2xl"
          />
          <div className="font-mono text-[11px] uppercase tracking-widest text-mute">
            From €89
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {cards.map((c, i) => (
            <Reveal key={c.id} delay={i * 70}>
              <ProductCard id={c.id} tagline={c.tagline}/>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const ProductCard = ({ id, tagline }) => {
  const c = COLORWAYS[id];
  const [hover, setHover] = React.useState(false);
  const available = !!c.flat;
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="relative rounded-3xl bg-white p-5 flex flex-col h-full ring-1 ring-line/70 transition-shadow hover:shadow-[0_22px_60px_-20px_rgba(0,0,0,0.18)]">
      <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-5 bg-white">
        <div className="absolute inset-0"
          style={{ background: `linear-gradient(160deg, ${c.bgTint}, #ffffff 80%)` }}/>
        <div className="absolute inset-0"
          style={{ transform: hover ? 'translateY(-6px) scale(1.02)' : 'translateY(0) scale(1)',
            transition: 'transform .6s cubic-bezier(.2,.7,.2,1)' }}>
          <Product colorway={id} view="flat"/>
        </div>
        <div className="absolute top-4 left-4 pill bg-white ring-1 ring-line text-[10px] uppercase tracking-widest font-mono">
          {available ? 'Pre-order' : 'Coming soon'}
        </div>
      </div>
      <div className="flex-1">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="text-[18px] font-semibold tracking-tight">{c.name}</h3>
          <span className="text-[14px] text-mute">€89</span>
        </div>
        <div className="text-[12px] text-mute mt-1">{tagline}</div>
        <div className="font-mono text-[10px] uppercase tracking-widest text-mute mt-3">
          Adapter only · Royal Pop head not included
        </div>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-2">
        <Button variant="primary" as="a" href="#preorder"
          className={`!text-[13px] !py-2.5 ${available ? '' : 'opacity-60 pointer-events-none'}`}>
          {available ? 'Pre-order' : 'Notify me'}
        </Button>
        <Button variant="secondary" as="a" href="#colorways" className="!text-[13px] !py-2.5">View details</Button>
      </div>
    </div>
  );
};

Object.assign(window, { Colorways, Material, DesignDetails, Products });
