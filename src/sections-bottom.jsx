// Bottom of page: Compatibility, Reviews, FAQ, Pre-order, Footer.

// 8. COMPATIBILITY
const Compatibility = () => {
  const ref = React.useRef(null);
  const p = useScrollProgress(ref, { mode: 'cover' });
  // animate the 3-step diagram
  const a = range(p, 0.10, 0.35);
  const b = range(p, 0.25, 0.50);
  const c = range(p, 0.40, 0.65);

  return (
    <section id="compatibility" ref={ref} className="bg-paper py-20 md:py-28 relative overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 grid md:grid-cols-12 gap-10 items-start">
        <div className="md:col-span-5">
          <Eyebrow>Compatibility</Eyebrow>
          <Reveal>
            <h2 className="display text-[clamp(34px,5vw,72px)] mt-5">
              Designed for Royal Pop.<br/>Nothing else.
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-6 text-mute leading-relaxed max-w-md text-[clamp(15px,1.3vw,18px)]">
              This adapter is engineered specifically for Royal&nbsp;Pop watch heads. The watch clips into the cradle without permanent modification — and pops out just as cleanly when you want to wear it as a pendant again.
            </p>
          </Reveal>
          <ul className="mt-10 space-y-4">
            {[
              ['Royal Pop compatible', 'Cradle is dimensioned to Royal Pop case profile.'],
              ['Clip-in installation', 'Seat the watch, press, done. ~20 seconds.'],
              ['No permanent modification', 'No glue, no cutting, no hardware changes.'],
              ['Crown alignment preserved', 'Crown stays in its original 3-o\'clock position.'],
              ['Adapter only', 'Watch head not included with this product.'],
            ].map(([t, d], i) => (
              <Reveal key={t} delay={i * 70}>
                <li className="flex gap-4">
                  <span className="mt-1 font-mono text-[11px] text-mute w-8 shrink-0">{String(i+1).padStart(2,'0')}</span>
                  <div>
                    <div className="font-semibold text-[15px]">{t}</div>
                    <div className="text-[14px] text-mute mt-0.5">{d}</div>
                  </div>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>

        {/* schematic */}
        <div className="md:col-span-7">
          <div className="rounded-3xl bg-fog ph-stripes p-8 md:p-12 relative overflow-hidden">
            <div className="grid grid-cols-3 gap-6 items-center">
              <Schematic step={1} label="Royal Pop head" active={a}>
                <div className="w-full h-full grid place-items-center p-2">
                  <svg viewBox="0 0 200 200" className="w-full h-full">
                    <defs>
                      <radialGradient id="dial-grad" cx="0.5" cy="0.4" r="0.6">
                        <stop offset="0%" stopColor="#fff5f8"/>
                        <stop offset="100%" stopColor="#f4c5d0"/>
                      </radialGradient>
                    </defs>
                    {/* pendant chain */}
                    <path d="M100 18 L100 42" stroke="#C9C9CE" strokeWidth="1.5"/>
                    <circle cx="100" cy="50" r="6" fill="none" stroke="#C9C9CE" strokeWidth="2"/>
                    {/* octagonal pink bezel */}
                    <polygon points="65,75 100,60 135,75 145,110 135,145 100,160 65,145 55,110"
                      fill="#F4BCC6" stroke="#E11D6E" strokeWidth="3"/>
                    {/* inner dial */}
                    <circle cx="100" cy="110" r="32" fill="url(#dial-grad)"/>
                    {/* tiny indices */}
                    {Array.from({length: 12}).map((_, i) => {
                      const a2 = (i / 12) * Math.PI * 2 - Math.PI / 2;
                      const r1 = 28, r2 = i % 3 === 0 ? 22 : 25;
                      return <line key={i}
                        x1={100 + Math.cos(a2) * r1} y1={110 + Math.sin(a2) * r1}
                        x2={100 + Math.cos(a2) * r2} y2={110 + Math.sin(a2) * r2}
                        stroke="#E11D6E" strokeWidth={i % 3 === 0 ? 1.4 : 0.7}/>;
                    })}
                    {/* crown */}
                    <rect x="142" y="100" width="6" height="10" rx="1.5" fill="#E11D6E"/>
                  </svg>
                </div>
              </Schematic>
              <Schematic step={2} label="POPFORM adapter" active={b}>
                <div className="w-full h-full grid place-items-center p-2">
                  <svg viewBox="0 0 200 200" className="w-full h-full">
                    {/* flat strap silhouette */}
                    <rect x="14" y="92" width="36" height="22" rx="3" fill="#F4BCC6" stroke="rgba(0,0,0,.18)"/>
                    <path d="M50 88 H 150 V 118 H 50 Z" fill="#F4BCC6" stroke="rgba(0,0,0,.18)"/>
                    {/* cradle opening */}
                    <polygon points="78,75 100,68 122,75 128,103 122,131 100,138 78,131 72,103"
                      fill="#fff" stroke="#E11D6E" strokeWidth="2.5"/>
                    {/* keeper loops */}
                    <rect x="40" y="92" width="10" height="22" fill="rgba(0,0,0,.12)"/>
                    <rect x="150" y="92" width="10" height="22" fill="rgba(0,0,0,.12)"/>
                    {/* arrows showing the clip-in motion */}
                    <path d="M100 50 L100 70" stroke="#E11D6E" strokeWidth="1.5" markerEnd="url(#arrow-h)"/>
                    <defs>
                      <marker id="arrow-h" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
                        <path d="M0 0 L6 3 L0 6 z" fill="#E11D6E"/>
                      </marker>
                    </defs>
                  </svg>
                </div>
              </Schematic>
              <Schematic step={3} label="Clipped & worn" active={c}>
                <div className="w-full h-full grid place-items-center p-2">
                  <svg viewBox="0 0 200 200" className="w-full h-full">
                    {/* flat strap underneath */}
                    <rect x="14" y="92" width="36" height="22" rx="3" fill="#F4BCC6" stroke="rgba(0,0,0,.18)"/>
                    <path d="M50 88 H 150 V 118 H 50 Z" fill="#F4BCC6" stroke="rgba(0,0,0,.18)"/>
                    <rect x="40" y="92" width="10" height="22" fill="rgba(0,0,0,.12)"/>
                    <rect x="150" y="92" width="10" height="22" fill="rgba(0,0,0,.12)"/>
                    {/* watch seated */}
                    <polygon points="78,75 100,68 122,75 128,103 122,131 100,138 78,131 72,103"
                      fill="#F4BCC6" stroke="#E11D6E" strokeWidth="2.5"/>
                    <circle cx="100" cy="103" r="20" fill="#fbe0e6"/>
                    {Array.from({length: 12}).map((_, i) => {
                      const a2 = (i / 12) * Math.PI * 2 - Math.PI / 2;
                      const r1 = 17, r2 = i % 3 === 0 ? 13 : 15;
                      return <line key={i}
                        x1={100 + Math.cos(a2) * r1} y1={103 + Math.sin(a2) * r1}
                        x2={100 + Math.cos(a2) * r2} y2={103 + Math.sin(a2) * r2}
                        stroke="#E11D6E" strokeWidth={i % 3 === 0 ? 1 : 0.6}/>;
                    })}
                    <rect x="122" y="98" width="6" height="10" rx="1.5" fill="#E11D6E"/>
                  </svg>
                </div>
              </Schematic>
            </div>

            {/* arrows between steps */}
            <div className="mt-8 grid grid-cols-3">
              <div className="col-start-1 col-end-3 relative h-6">
                <div className="absolute left-[33%] right-[0%] top-1/2 -translate-y-1/2 h-px bg-line"/>
                <div className="absolute left-[33%] top-1/2 -translate-y-1/2 h-px bg-magenta"
                  style={{ width: `${Math.max(a, b) * 67}%`, transition: 'width .4s ease' }}/>
              </div>
            </div>

            <div className="mt-8 font-mono text-[10px] uppercase tracking-widest text-mute">
              Diagram is conceptual. Refer to fitment guide before installation.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Schematic = ({ step, label, active, children }) => (
  <div className="relative">
    <div className="aspect-square rounded-2xl bg-white ring-1 ring-line overflow-hidden grid place-items-center p-3"
      style={{ opacity: 0.55 + 0.45 * active, transform: `scale(${0.96 + 0.04 * active})`, transition: 'all .5s ease' }}>
      {children}
    </div>
    <div className="mt-4 flex items-center gap-2">
      <span className="font-mono text-[10px] uppercase tracking-widest text-mute whitespace-nowrap">Step 0{step}</span>
      <span className="h-px flex-1 bg-line"/>
    </div>
    <div className="mt-1 text-[14px] font-semibold leading-tight">{label}</div>
  </div>
);

// 9. REVIEWS
const Reviews = () => {
  const items = [
    { q: 'Finally makes the Royal Pop wearable every day.', a: 'L. Marchand', loc: 'Paris · Drop 01 backer' },
    { q: 'The integrated look changes everything.', a: 'K. Tanaka', loc: 'Tokyo · Collector' },
    { q: 'The material feels way better than I expected.', a: 'S. Whitlock', loc: 'London · Watch fair regular' },
    { q: 'Looks like the way it should have been released.', a: 'D. Voss', loc: 'Berlin · Drop 01 backer' },
    { q: 'I wore it for three days straight without thinking about it.', a: 'A. Brennan', loc: 'New York · Drop 01 backer' },
    { q: 'Cradle holds the head with zero play. Confidence-inspiring.', a: 'R. Mistry', loc: 'Mumbai · Collector' },
  ];
  return (
    <section className="bg-paper py-20 md:py-28">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-12">
          <SectionHead eyebrow="Wearers" title="What early backers say." className="!max-w-2xl"/>
          <div className="font-mono text-[11px] uppercase tracking-widest text-mute">
            Verified pre-order owners
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-4 md:gap-6">
          {items.map((it, i) => (
            <Reveal key={i} delay={i * 60}>
              <figure className="rounded-3xl bg-fog p-7 md:p-9 h-full flex flex-col">
                <svg width="22" height="18" viewBox="0 0 22 18" className="text-magenta">
                  <path d="M0 18V11C0 5.5 2.4 1.6 8 0L9.4 3.4C6 4.6 4.6 6.4 4.4 9H8.6V18H0ZM12.4 18V11C12.4 5.5 14.8 1.6 20.4 0L21.8 3.4C18.4 4.6 17 6.4 16.8 9H21V18H12.4Z" fill="currentColor"/>
                </svg>
                <blockquote className="mt-5 text-[clamp(17px,1.6vw,21px)] leading-snug font-medium text-ink">
                  {it.q}
                </blockquote>
                <figcaption className="mt-auto pt-8 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-ink/10 grid place-items-center text-[12px] font-semibold">
                    {it.a.split(' ').map(s => s[0]).join('')}
                  </div>
                  <div>
                    <div className="text-[13px] font-semibold">{it.a}</div>
                    <div className="text-[11px] text-mute font-mono uppercase tracking-widest">{it.loc}</div>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

// 10. FAQ
const Faq = () => {
  const qs = [
    ['Is the Royal Pop watch included?', 'No. This product is the strap adapter only. You provide the watch head.'],
    ['Which watches are compatible?', 'Designed for Royal Pop watch heads only. Not compatible with other cases.'],
    ['Is it easy to install?', 'Yes. The watch head clips into the adapter cradle in about 20 seconds. No tools required.'],
    ['Does it modify the watch?', 'No. There is no permanent modification — no glue, no cutting, no hardware changes.'],
    ['What material is used?', 'A premium FKM (fluoroelastomer) rubber with a soft matte finish.'],
    ['Is it water-resistant?', 'The FKM rubber is water-resistant and sweat-resistant. The watch head\'s own rating is unchanged.'],
    ['When will pre-orders ship?', 'Estimated shipping date will be confirmed before production starts. Backers are notified first.'],
  ];
  const [open, setOpen] = React.useState(0);
  return (
    <section id="faq" className="bg-paper py-20 md:py-28">
      <div className="max-w-[1100px] mx-auto px-5 md:px-8 grid md:grid-cols-12 gap-10">
        <div className="md:col-span-4">
          <Eyebrow>FAQ</Eyebrow>
          <Reveal>
            <h2 className="display text-[clamp(34px,4.6vw,64px)] mt-5">Questions, answered.</h2>
          </Reveal>
          <p className="mt-5 text-mute text-[15px] max-w-sm">
            Anything else? Reach us at <a href="#" className="text-ink underline underline-offset-4">hello@popform.studio</a>.
          </p>
        </div>
        <div className="md:col-span-8">
          <div className="divide-y divide-line border-t border-b border-line">
            {qs.map(([q, a], i) => (
              <FaqRow key={i} q={q} a={a} open={i === open} onClick={() => setOpen(i === open ? -1 : i)} index={i}/>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const FaqRow = ({ q, a, open, onClick, index }) => {
  const ref = React.useRef(null);
  const [h, setH] = React.useState(0);
  React.useEffect(() => {
    if (ref.current) setH(ref.current.scrollHeight);
  }, [a, open]);
  return (
    <div>
      <button onClick={onClick}
        className="w-full text-left py-6 flex items-start gap-6 group">
        <span className="font-mono text-[11px] text-mute w-8 mt-1.5 shrink-0">{String(index+1).padStart(2,'0')}</span>
        <span className="flex-1 text-[clamp(17px,1.6vw,22px)] font-semibold tracking-tight">{q}</span>
        <span className="shrink-0 mt-1.5 text-mute group-hover:text-ink transition-colors">
          <Chev open={open}/>
        </span>
      </button>
      <div
        style={{ maxHeight: open ? h : 0, transition: 'max-height .5s cubic-bezier(.2,.7,.2,1)' }}
        className="overflow-hidden">
        <div ref={ref} className="pb-7 pl-14 pr-10 text-[15px] text-mute leading-relaxed">{a}</div>
      </div>
    </div>
  );
};

// 11. PRE-ORDER
const PreOrder = () => {
  const [form, setForm] = React.useState({
    name: '', email: '', colorway: 'pink', qty: 1, country: '', message: '',
  });
  const [submitted, setSubmitted] = React.useState(false);
  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const onSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    setSubmitted(true);
  };

  return (
    <section id="preorder" className="bg-ink text-white py-20 md:py-28 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background:
          'radial-gradient(40% 40% at 30% 20%, rgba(255,47,135,0.12), transparent 70%),' +
          'radial-gradient(40% 40% at 80% 80%, rgba(159,211,255,0.10), transparent 70%)' }}/>
      <div className="max-w-[1100px] mx-auto px-5 md:px-8 grid md:grid-cols-12 gap-10 relative">
        <div className="md:col-span-5">
          <Eyebrow className="text-magenta">Pre-order</Eyebrow>
          <Reveal>
            <h2 className="display text-[clamp(36px,5.4vw,76px)] text-white mt-5">Join the first drop.</h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-6 text-white/65 max-w-md leading-relaxed text-[clamp(15px,1.3vw,18px)]">
              Limited first batch. Choose your colorway and get notified before production starts. No charge today — we confirm with you first.
            </p>
          </Reveal>
          <div className="mt-10 flex flex-col gap-4 max-w-md">
            {[
              ['€89', 'From — first batch'],
              ['~ 400', 'Units in drop 01'],
              ['Q3', 'Estimated ship window'],
            ].map(([v, l], i) => (
              <Reveal key={l} delay={120 + i * 60}>
                <div className="flex items-baseline gap-5 border-t border-white/10 pt-4">
                  <span className="text-[24px] font-semibold tracking-tight text-white w-24">{v}</span>
                  <span className="font-mono text-[11px] uppercase tracking-widest text-white/50">{l}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="md:col-span-7">
          <div className="rounded-3xl bg-white/[0.04] backdrop-blur ring-1 ring-white/10 p-6 md:p-10">
            {submitted ? (
              <div className="py-16 text-center">
                <div className="inline-flex w-14 h-14 rounded-full bg-magenta/15 ring-1 ring-magenta/40 grid place-items-center mb-6">
                  <svg width="22" height="22" viewBox="0 0 22 22"><path d="M4 11l5 5 9-10" stroke="#FF2F87" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <h3 className="display text-[34px] text-white">Thank you.</h3>
                <p className="mt-3 text-white/65 max-w-sm mx-auto">
                  We'll contact you before the first batch ships. Watch your inbox for {form.email}.
                </p>
                <Button variant="secondaryDark" className="mt-8" onClick={() => setSubmitted(false)}>Submit another</Button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="grid md:grid-cols-2 gap-5">
                <Field label="Name" value={form.name} onChange={(v) => update('name', v)} required/>
                <Field label="Email" type="email" value={form.email} onChange={(v) => update('email', v)} required/>
                <div className="md:col-span-1">
                  <FieldLabel>Preferred colorway</FieldLabel>
                  <div className="mt-2 flex gap-2 flex-wrap">
                    {['pink','white','green','navy','arctic','mono','yellow','red'].map((k) => (
                      <button key={k} type="button" onClick={() => update('colorway', k)}
                        className={`px-3.5 py-2.5 rounded-full text-[12px] font-mono uppercase tracking-widest flex items-center gap-2 ring-1 transition-colors
                          ${form.colorway === k ? 'bg-white text-ink ring-white' : 'text-white/75 ring-white/15 hover:ring-white/40'}`}>
                        <Swatch colorway={k} size={14}/>
                        {COLORWAYS[k].name}
                      </button>
                    ))}
                  </div>
                </div>
                <Field label="Quantity" type="number" min={1} max={5} value={form.qty} onChange={(v) => update('qty', v)}/>
                <Field label="Country" value={form.country} onChange={(v) => update('country', v)} className="md:col-span-2"/>
                <Field label="Message (optional)" as="textarea" value={form.message} onChange={(v) => update('message', v)} className="md:col-span-2"/>
                <div className="md:col-span-2 flex flex-wrap items-center justify-between gap-4 mt-2">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-white/40 max-w-sm">
                    No charge today. We confirm pricing & ship date before production.
                  </p>
                  <Button variant="primaryDark" as="button" className="!px-7">Join pre-order list →</Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const FieldLabel = ({ children }) => (
  <label className="font-mono text-[10px] uppercase tracking-widest text-white/50">{children}</label>
);

const Field = ({ label, type = 'text', value, onChange, required, as = 'input', className = '', ...rest }) => (
  <div className={className}>
    <FieldLabel>{label}{required ? ' *' : ''}</FieldLabel>
    {as === 'textarea' ? (
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
        className="mt-2 w-full bg-transparent border-b border-white/20 focus:border-white outline-none py-2 text-[15px] text-white placeholder:text-white/30 transition-colors resize-none"
        placeholder="Tell us anything"
      />
    ) : (
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        {...rest}
        className="mt-2 w-full bg-transparent border-b border-white/20 focus:border-white outline-none py-2 text-[15px] text-white placeholder:text-white/30 transition-colors"
        placeholder=" "
      />
    )}
  </div>
);

// 12. FOOTER
const Footer = () => {
  const cols = [
    {
      title: 'Products',
      links: ['Pink Pop Adapter','Arctic Blue Adapter','Mono Black Adapter','Pop Yellow Adapter','Coming soon'],
    },
    {
      title: 'Support',
      links: ['Fitment guide','Pre-order FAQ','Shipping','Returns','Contact'],
    },
    {
      title: 'Studio',
      links: ['About POPFORM','Press kit','Journal','Wholesale','Careers'],
    },
    {
      title: 'Social',
      links: ['Instagram','TikTok','YouTube','Newsletter'],
    },
  ];
  return (
    <footer className="bg-paper border-t border-line">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 py-20">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            <div className="flex items-center gap-2">
              <Logo/>
              <span className="font-bold tracking-tightest text-[22px]">POPFORM</span>
            </div>
            <p className="mt-4 text-[15px] text-mute max-w-sm leading-relaxed">
              Architectural strap adapters for Royal&nbsp;Pop collectors. Designed in Paris. Made in Europe.
            </p>
            <div className="mt-8">
              <FieldLabelLight>Newsletter</FieldLabelLight>
              <form onSubmit={(e) => e.preventDefault()} className="mt-3 flex items-center gap-2 max-w-sm">
                <input className="flex-1 bg-fog rounded-full px-5 py-3 text-[14px] outline-none ring-1 ring-line focus:ring-ink"
                  placeholder="you@domain.com"/>
                <Button variant="primary" as="button" className="!px-5 !py-3">Subscribe</Button>
              </form>
            </div>
          </div>
          <div className="md:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-6">
            {cols.map((col) => (
              <div key={col.title}>
                <div className="font-mono text-[10px] uppercase tracking-widest text-mute">{col.title}</div>
                <ul className="mt-4 space-y-2 text-[14px]">
                  {col.links.map((l) => (
                    <li key={l}><a href="#" className="hover:underline underline-offset-4">{l}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-line text-[12px] text-mute leading-relaxed">
          <p className="font-mono uppercase tracking-widest text-[10px]">
            Watch head not included. Strap adapter only.
          </p>
          <p className="mt-3 max-w-3xl">
            POPFORM is an independent accessory brand. We are not affiliated with, endorsed by, or sponsored by Audemars Piguet, Swatch Group, or any watchmaker referenced for fitment purposes. All trademarks remain the property of their respective owners.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <div>© {new Date().getFullYear()} POPFORM Studio · Paris</div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-ink">Legal</a>
              <a href="#" className="hover:text-ink">Privacy</a>
              <a href="#" className="hover:text-ink">Disclaimer</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

const FieldLabelLight = ({ children }) => (
  <label className="font-mono text-[10px] uppercase tracking-widest text-mute">{children}</label>
);

Object.assign(window, { Compatibility, Reviews, Faq, PreOrder, Footer });
