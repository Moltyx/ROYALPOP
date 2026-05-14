// Product image library + Product component.
// Real product photography replaces the previous SVG drawing entirely.

const COLORWAYS = {
  pink:   { name: 'Pink Pop',      strap: '#F4BCC6', cradle: '#E11D6E', accent: '#E11D6E', bgTint: 'rgba(225,29,110,.05)',
            lifestyle: 'assets/pink-lifestyle.png', flat: 'assets/pink-flat.png' },
  arctic: { name: 'Lan Ba',        strap: '#B5D6E5', cradle: '#5E89A8', accent: '#3F6F94', bgTint: 'rgba(95,140,180,.06)',
            lifestyle: 'assets/arctic-lifestyle.png', flat: 'assets/arctic-flat.png' },
  mono:   { name: 'Ocho Negro',    strap: '#1A1A1C', cradle: '#FFFFFF', accent: '#FFFFFF', bgTint: 'rgba(0,0,0,.04)',
            lifestyle: 'assets/mono-lifestyle.png', flat: 'assets/mono-flat.png' },
  yellow: { name: 'Blaue Acht',    strap: '#F0E6A4', cradle: '#A8C4D6', accent: '#7AA3BD', bgTint: 'rgba(168,196,214,.08)',
            lifestyle: 'assets/yellow-lifestyle.png', flat: 'assets/yellow-flat.png' },
  green:  { name: 'Green Eight',   strap: '#2DA84A', cradle: '#FFFFFF', accent: '#2DA84A', bgTint: 'rgba(45,168,74,.06)',
            lifestyle: 'assets/green-lifestyle.png', flat: 'assets/green-flat.png' },
  white:  { name: 'Huit Blanc',    strap: '#F2F2F4', cradle: '#FFFFFF', accent: '#E63D8C', bgTint: 'rgba(63,139,217,.05)',
            lifestyle: 'assets/white-lifestyle.png', flat: 'assets/white-flat.png',
            swatch: 'conic-gradient(from 0deg, #E63D8C, #F08A2E 14%, #F6D24A 28%, #46A36A 43%, #3F8BD9 57%, #6B3FD9 72%, #C77DFF 86%, #E63D8C)',
            swatchInner: '#FFFFFF' },
  red:    { name: 'Otto Rosso',    strap: '#F5CC0F', cradle: '#F08FB4', accent: '#5BC7C2', bgTint: 'rgba(91,199,194,.08)',
            lifestyle: 'assets/red-lifestyle.png', flat: 'assets/red-flat.png',
            swatch: 'conic-gradient(from 0deg, #F5CC0F 0 40%, #F08FB4 40% 70%, #5BC7C2 70% 100%)' },
  navy:   { name: 'Orenji Hachi',  strap: '#1B2A4A', cradle: '#1B2A4A', accent: '#F08A2E', bgTint: 'rgba(240,138,46,.06)',
            lifestyle: 'assets/navy-lifestyle.png', flat: 'assets/navy-flat.png' },
};

// Render the real product image. If unavailable for that colorway, render a
// premium placeholder (swatch + label) — never invent a fake watch.
//
// Props:
//   colorway: key into COLORWAYS
//   view: 'lifestyle' | 'flat'
//   focus: { x, y, scale } — optional, used by detail-zoom sections (CSS transform-origin)
//   className: applied to the outer wrapper (controls box)
const Product = ({
  colorway = 'pink',
  view = 'lifestyle',
  focus = null,
  className = '',
  style = {},
  alt = '',
  imgClass = '',
  imgStyle = {},
}) => {
  const c = COLORWAYS[colorway] || COLORWAYS.pink;
  const src = c[view];

  if (!src) {
    return (
      <div className={`relative w-full h-full grid place-items-center ${className}`} style={style}>
        <Placeholder colorway={colorway}/>
      </div>
    );
  }

  // Object-position controls panning when we scale > 1. Default centred.
  const ox = focus ? `${focus.x ?? 50}% ${focus.y ?? 50}%` : '50% 50%';
  const scale = focus?.scale ?? 1;

  return (
    <div className={`relative w-full h-full ${className}`} style={style}>
      <img
        src={src}
        alt={alt || `${c.name} strap adapter`}
        draggable="false"
        className={`absolute inset-0 w-full h-full select-none ${imgClass}`}
        style={{
          objectFit: 'contain',
          objectPosition: ox,
          transform: `scale(${scale})`,
          transformOrigin: ox,
          transition: 'transform 900ms cubic-bezier(.2,.7,.2,1), object-position 900ms cubic-bezier(.2,.7,.2,1)',
          ...imgStyle,
        }}
      />
    </div>
  );
};

// Placeholder for colorways without uploaded photography yet.
// Premium-feeling, signals "coming soon" without being a fake watch.
const Placeholder = ({ colorway }) => {
  const c = COLORWAYS[colorway] || COLORWAYS.pink;
  return (
    <div className="relative w-[78%] h-[78%] grid place-items-center">
      <div className="absolute inset-0 rounded-[36px] bg-fog ph-stripes"/>
      <div className="absolute inset-0 rounded-[36px]"
        style={{ background: `radial-gradient(60% 60% at 50% 40%, ${c.strap}33, transparent 70%)` }}/>
      <div className="relative flex flex-col items-center gap-5 px-6 text-center">
        <div className="w-20 h-20 rounded-full ring-1 ring-line shadow-sm"
          style={{ background: `conic-gradient(${c.cradle} 0 25%, ${c.strap} 25% 100%)` }}/>
        <div>
          <div className="text-[15px] font-semibold tracking-tight">{c.name}</div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-mute mt-2">Photography coming soon</div>
        </div>
      </div>
    </div>
  );
};

// Small swatch dot used in pickers.
// Default = conic split of cradle / strap. Override with `swatch` (any CSS background)
// and `swatchInner` (an inner disc color, e.g. for multicolor variants).
const Swatch = ({ colorway, size = 36, active = false }) => {
  const c = COLORWAYS[colorway] || COLORWAYS.pink;
  const bg = c.swatch || `conic-gradient(${c.cradle} 0 25%, ${c.strap} 25% 100%)`;
  return (
    <span className="relative inline-block rounded-full"
      style={{
        width: size, height: size,
        background: bg,
        boxShadow: active ? '0 0 0 2px #111, 0 0 0 4px #fff' : 'inset 0 0 0 1px rgba(0,0,0,.08)',
        transition: 'box-shadow .2s ease',
      }}>
      {c.swatchInner && (
        <span className="absolute rounded-full"
          style={{
            inset: Math.max(3, size * 0.18),
            background: c.swatchInner,
            boxShadow: 'inset 0 0 0 1px rgba(0,0,0,.06)',
          }}/>
      )}
    </span>
  );
};

Object.assign(window, { COLORWAYS, Product, Placeholder, Swatch });
