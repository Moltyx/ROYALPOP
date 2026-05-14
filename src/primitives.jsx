// Small UI primitives used across the page.

const Reveal = ({ children, delay = 0, y = 24, className = '', as = 'div' }) => {
  const ref = React.useRef(null);
  const seen = useInView(ref);
  const Comp = as;
  return (
    <Comp
      ref={ref}
      className={className}
      style={{
        opacity: seen ? 1 : 0,
        transform: seen ? 'translate3d(0,0,0)' : `translate3d(0,${y}px,0)`,
        transition: `opacity 700ms cubic-bezier(.2,.7,.2,1) ${delay}ms, transform 700ms cubic-bezier(.2,.7,.2,1) ${delay}ms`,
      }}
    >
      {children}
    </Comp>
  );
};

const Eyebrow = ({ children, className = '', dark = false }) => (
  <div className={`eyebrow ${dark ? 'text-magenta' : 'text-magenta'} ${className}`}>{children}</div>
);

const Button = ({ children, variant = 'primary', as = 'button', href, onClick, className = '' }) => {
  const base = 'pill inline-flex items-center justify-center gap-2 whitespace-nowrap transition-colors duration-200 select-none cursor-pointer';
  const styles = {
    primary: 'bg-ink text-white hover:bg-ink2',
    secondary: 'bg-white text-ink ring-1 ring-line hover:bg-fog',
    ghost: 'text-ink hover:opacity-70',
    primaryDark: 'bg-white text-ink hover:bg-mist',
    secondaryDark: 'bg-transparent text-white ring-1 ring-white/30 hover:ring-white/60',
  };
  const cls = `${base} ${styles[variant]} ${className}`;
  if (as === 'a') return <a href={href} onClick={onClick} className={cls}>{children}</a>;
  return <button onClick={onClick} className={cls}>{children}</button>;
};

// Stripe placeholder block (replace later with real photography)
const PhotoSlot = ({ label = 'product shot', dark = false, className = '', children, ratio }) => (
  <div
    className={`relative overflow-hidden rounded-2xl ${dark ? 'bg-[#161618] ph-stripes-d' : 'bg-fog ph-stripes'} ${className}`}
    style={ratio ? { aspectRatio: ratio } : undefined}
  >
    {children}
    <div className={`absolute left-4 bottom-4 font-mono text-[10px] tracking-widest uppercase ${dark ? 'text-white/40' : 'text-mute'}`}>
      {label}
    </div>
  </div>
);

// Section heading scaffold
const SectionHead = ({ eyebrow, title, sub, align = 'left', dark = false, className = '' }) => (
  <div className={`max-w-3xl ${align === 'center' ? 'mx-auto text-center' : ''} ${className}`}>
    {eyebrow ? <Eyebrow className="mb-5">{eyebrow}</Eyebrow> : null}
    <Reveal>
      <h2 className={`display text-[clamp(34px,5.4vw,76px)] ${dark ? 'text-white' : 'text-ink'}`}>{title}</h2>
    </Reveal>
    {sub ? (
      <Reveal delay={120}>
        <p className={`mt-5 text-[clamp(15px,1.3vw,19px)] leading-relaxed ${dark ? 'text-white/65' : 'text-mute'}`}>{sub}</p>
      </Reveal>
    ) : null}
  </div>
);

// Tiny chevron
const Chev = ({ open }) => (
  <svg width="18" height="18" viewBox="0 0 18 18" style={{ transform: open ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform .35s ease' }}>
    <path d="M4 7l5 5 5-5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

Object.assign(window, { Reveal, Eyebrow, Button, PhotoSlot, SectionHead, Chev });
